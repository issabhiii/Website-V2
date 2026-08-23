import { useEffect, useRef, useState } from "react";
import {
  isWorkUnlocked,
  unlockWorkSession,
  verifyPassphrase,
} from "../lib/workGate";
import "./WorkPage.css";

const LINKS = [
  {
    href: "https://libraryh3lp.com/webclient/client",
    label: "Ctrl + click · LibraryH3lp",
  },
  {
    href: "https://go.wisc.edu/collegewiki",
    label: "Ctrl + click · college wiki",
  },
  {
    href: "https://na02.alma.exlibrisgroup.com/ng/",
    label: "Ctrl + click · Alma",
  },
];

function ShiftDesk() {
  const startRef = useRef(null);
  const marksRef = useRef(null);
  const stepRef = useRef(0);

  useEffect(() => {
    const start = startRef.current;
    if (!start) return;

    // Mirror the original page: let the browser open the *current* href first,
    // then swap label/href on the next tick so navigation isn't raced.
    const advance = () => {
      if (stepRef.current >= LINKS.length) return;

      stepRef.current += 1;
      const step = stepRef.current;
      const marks = marksRef.current?.querySelectorAll("span") ?? [];
      marks.forEach((mark, index) => {
        mark.classList.toggle("on", index < step);
      });

      window.setTimeout(() => {
        if (step < LINKS.length) {
          start.href = LINKS[step].href;
          start.textContent = LINKS[step].label;
          return;
        }

        start.classList.add("done");
        start.removeAttribute("href");
        start.textContent = "All opened";
      }, 0);
    };

    const onAuxClick = (event) => {
      if (event.button === 1) advance();
    };

    start.addEventListener("click", advance);
    start.addEventListener("auxclick", onAuxClick);
    return () => {
      start.removeEventListener("click", advance);
      start.removeEventListener("auxclick", onAuxClick);
    };
  }, []);

  return (
    <main className="work-desk">
      <section className="card">
        <p className="kicker">Desk</p>
        <h1>Start shift</h1>
        <p className="lede">
          Hold <strong>Ctrl</strong> and click three times. Chrome only opens a
          quiet background tab when you do that (or middle-click). A normal click
          will always jump.
        </p>
        <div className="steps" aria-hidden="true" ref={marksRef}>
          <span />
          <span />
          <span />
        </div>
        <a
          className="tool"
          id="start"
          ref={startRef}
          href="https://libraryh3lp.com/webclient/client"
          target="_blank"
          rel="noreferrer"
        >
          Ctrl + click · LibraryH3lp
        </a>
        <p className="note">
          Plain click cannot stay here. Pages are not allowed to force a
          background tab.
        </p>
      </section>
    </main>
  );
}

function Gate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      // Small delay frustrates naive brute-force loops in the console
      await new Promise((r) => setTimeout(r, 350));
      const ok = await verifyPassphrase(value);
      if (!ok) {
        setError("Nope.");
        setValue("");
        return;
      }
      unlockWorkSession();
      onUnlock();
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="work-desk">
      <section className="card">
        <p className="kicker">Desk</p>
        <h1>Locked</h1>
        <p className="lede">Enter the shift code to continue.</p>
        <form onSubmit={submit} className="gate-form">
          <label className="sr-only" htmlFor="work-pass">
            Passphrase
          </label>
          <input
            id="work-pass"
            type="password"
            name="passphrase"
            autoComplete="current-password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="••••••"
            disabled={busy}
          />
          <button type="submit" className="tool" disabled={busy || !value}>
            {busy ? "Checking…" : "Unlock"}
          </button>
        </form>
        {error ? <p className="gate-error">{error}</p> : null}
      </section>
    </main>
  );
}

export default function WorkPage() {
  const [unlocked, setUnlocked] = useState(() => isWorkUnlocked());

  useEffect(() => {
    document.title = unlocked ? "Shift start" : "Desk";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
  }, [unlocked]);

  if (!unlocked) {
    return <Gate onUnlock={() => setUnlocked(true)} />;
  }

  return <ShiftDesk />;
}
