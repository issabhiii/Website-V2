const POLL_MS = 2500;
const KEEP = 90;
const LIVE_SEC = 15;
const STALE_SEC = 60;

function telemetryUrl() {
  const explicit = document.documentElement.dataset.telemetryUrl;
  if (explicit) return explicit;
  const host = location.hostname;
  if (host === "127.0.0.1" || host === "localhost") {
    return "http://127.0.0.1:8787/telemetry";
  }
  return "https://abhis-telemetry.abhis.workers.dev/telemetry";
}

const TELEMETRY_URL = telemetryUrl();

const history = {
  cpu: [],
  gpu: [],
  mem: [],
  rx: [],
  tx: [],
};

const displayed = {};
let lastSnapshot = null;
let lastOkAt = 0;
let tweening = false;

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function push(list, value) {
  list.push(value);
  if (list.length > KEEP) list.shift();
}

function spark(svg, series, color) {
  const w = 280;
  const h = 72;
  const pad = 3;
  if (!svg) return;
  if (series.length < 2) {
    svg.innerHTML = "";
    return;
  }
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const pts = series.map((v, i) => {
    const x = pad + (i / (series.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / span) * (h - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = pts.join(" ");
  const area = `${pad},${h - pad} ${line} ${w - pad},${h - pad}`;
  svg.innerHTML =
    `<path d="M${area}Z" fill="${color}" fill-opacity="0.16"></path>` +
    `<polyline points="${line}" fill="none" stroke="${color}" stroke-width="1.5"></polyline>`;
}

function formatUptime(sec) {
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

function relativeAge(ts) {
  const age = Math.max(0, Math.floor(Date.now() / 1000) - ts);
  if (age < 3) return "just now";
  if (age < 60) return `${age}s ago`;
  const m = Math.floor(age / 60);
  const s = age % 60;
  if (m < 60) return s ? `${m}m ${s}s ago` : `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m ago`;
}

function toneFor(ts) {
  if (!ts) return lastSnapshot ? "offline" : "idle";
  const age = Math.max(0, Math.floor(Date.now() / 1000) - ts);
  if (age <= LIVE_SEC) return "live";
  if (age <= STALE_SEC) return "stale";
  return "offline";
}

function wordFor(tone) {
  if (tone === "live") return "live";
  if (tone === "stale") return "stale";
  if (tone === "offline") return "offline";
  return "waiting";
}

function readPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function formatNum(path, value) {
  if (value == null || Number.isNaN(value)) return "—";
  if (path.includes("vram") || path === "uptimeSeconds") return String(Math.round(value));
  return (Math.round(value * 10) / 10).toFixed(1);
}

function setCounts(target) {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const path = el.getAttribute("data-count");
    const next = readPath(target, path);
    el.textContent = formatNum(path, next);
  });
  document.querySelectorAll("[data-int]").forEach((el) => {
    const path = el.getAttribute("data-int");
    const next = readPath(target, path);
    el.textContent = next == null ? "—" : String(Math.round(next));
  });
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function tweenTo(snapshot) {
  const from = { ...displayed };
  const keys = [
    "cpu.usage",
    "cpu.temp",
    "gpu.usage",
    "gpu.temp",
    "gpu.vramUsedMB",
    "memory.usedGB",
    "memory.totalGB",
    "memory.percent",
    "network.rxMbps",
    "network.txMbps",
  ];
  for (const path of keys) {
    if (displayed[path] == null) displayed[path] = readPath(snapshot, path);
  }
  if (reduced) {
    for (const path of keys) displayed[path] = readPath(snapshot, path);
    applyDisplayed(snapshot);
    return;
  }
  const start = performance.now();
  const dur = 400;
  tweening = true;
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - (1 - t) * (1 - t);
    const view = {
      cpu: {
        usage: lerp(from["cpu.usage"] ?? snapshot.cpu.usage, snapshot.cpu.usage, eased),
        temp: lerp(from["cpu.temp"] ?? snapshot.cpu.temp, snapshot.cpu.temp, eased),
      },
      gpu: {
        usage: lerp(from["gpu.usage"] ?? snapshot.gpu.usage, snapshot.gpu.usage, eased),
        temp: lerp(from["gpu.temp"] ?? snapshot.gpu.temp, snapshot.gpu.temp, eased),
        vramUsedMB: lerp(
          from["gpu.vramUsedMB"] ?? snapshot.gpu.vramUsedMB,
          snapshot.gpu.vramUsedMB,
          eased
        ),
        vramTotalMB: snapshot.gpu.vramTotalMB,
      },
      memory: {
        usedGB: lerp(from["memory.usedGB"] ?? snapshot.memory.usedGB, snapshot.memory.usedGB, eased),
        totalGB: snapshot.memory.totalGB,
        percent: lerp(from["memory.percent"] ?? snapshot.memory.percent, snapshot.memory.percent, eased),
      },
      network: {
        rxMbps: lerp(from["network.rxMbps"] ?? snapshot.network.rxMbps, snapshot.network.rxMbps, eased),
        txMbps: lerp(from["network.txMbps"] ?? snapshot.network.txMbps, snapshot.network.txMbps, eased),
      },
    };
    applyDisplayed(view, snapshot);
    if (t < 1) requestAnimationFrame(step);
    else {
      for (const path of keys) displayed[path] = readPath(snapshot, path);
      tweening = false;
    }
  };
  requestAnimationFrame(step);
}

function applyDisplayed(view, snapshot = lastSnapshot) {
  setCounts(view);
  if (!snapshot) return;
  document.getElementById("uptime-text").textContent = formatUptime(snapshot.uptimeSeconds);
  document.getElementById("uptime-seconds").textContent =
    `${snapshot.uptimeSeconds.toLocaleString()} seconds`;
}

function paintStatus(tone, ts) {
  const card = document.getElementById("card-status");
  card.dataset.tone = tone;
  document.getElementById("status-word").textContent = wordFor(tone);
  document.getElementById("status-age").textContent = ts ? relativeAge(ts) : "—";
}

function record(snapshot) {
  push(history.cpu, snapshot.cpu.usage);
  push(history.gpu, snapshot.gpu.usage);
  push(history.mem, snapshot.memory.percent);
  push(history.rx, snapshot.network.rxMbps);
  push(history.tx, snapshot.network.txMbps);
  const css = getComputedStyle(document.documentElement);
  spark(document.getElementById("spark-cpu"), history.cpu, css.getPropertyValue("--cpu").trim());
  spark(document.getElementById("spark-gpu"), history.gpu, css.getPropertyValue("--gpu").trim());
  spark(document.getElementById("spark-mem"), history.mem, css.getPropertyValue("--mem").trim());
  spark(document.getElementById("spark-net"), history.rx, css.getPropertyValue("--net").trim());
}

async function poll() {
  try {
    const res = await fetch(TELEMETRY_URL, { cache: "no-store" });
    if (res.status === 204) {
      paintStatus(toneFor(lastSnapshot ? lastSnapshot.timestamp : null), lastSnapshot ? lastSnapshot.timestamp : null);
      return;
    }
    if (!res.ok) throw new Error("bad status");
    const snapshot = await res.json();
    lastOkAt = Date.now();
    const isNew = !lastSnapshot || snapshot.timestamp !== lastSnapshot.timestamp;
    lastSnapshot = snapshot;
    if (isNew) {
      record(snapshot);
      tweenTo(snapshot);
    }
    paintStatus(toneFor(snapshot.timestamp), snapshot.timestamp);
  } catch {
    const ts = lastSnapshot ? lastSnapshot.timestamp : null;
    paintStatus(toneFor(ts), ts);
  }
}

poll();
setInterval(poll, POLL_MS);
setInterval(() => {
  if (lastSnapshot) paintStatus(toneFor(lastSnapshot.timestamp), lastSnapshot.timestamp);
}, 1000);
