export function measureBox(el) {
  if (!el) return { width: 0, height: 0 };
  const width = Math.max(0, Math.round(el.clientWidth || el.getBoundingClientRect().width));
  const height = Math.max(0, Math.round(el.clientHeight || el.getBoundingClientRect().height));
  return { width, height };
}

export function fitCanvasBuffer(canvas, width, height) {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const w = Math.max(1, width);
  const h = Math.max(1, height);
  const bw = Math.round(w * dpr);
  const bh = Math.round(h * dpr);
  if (canvas.width !== bw) canvas.width = bw;
  if (canvas.height !== bh) canvas.height = bh;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  return { dpr, width: w, height: h };
}

export function observeBox(el, onSize) {
  if (!el) return () => {};

  let last = '';
  const run = () => {
    const { width, height } = measureBox(el);
    if (width < 2 || height < 2) return;
    const key = `${width}x${height}`;
    if (key === last) return;
    last = key;
    onSize(width, height);
  };

  run();
  const raf = requestAnimationFrame(() => requestAnimationFrame(run));
  const t1 = setTimeout(run, 50);
  const t2 = setTimeout(run, 350);
  const ro = new ResizeObserver(run);
  ro.observe(el);
  window.addEventListener('resize', run);

  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(t1);
    clearTimeout(t2);
    ro.disconnect();
    window.removeEventListener('resize', run);
  };
}
