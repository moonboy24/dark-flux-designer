import { useEffect, useRef } from "react";

export function ParticleField({ opacity = 1 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0,
      height = 0,
      dpr = 1;
    const resize = () => {
      // Cap DPR — 2x on a large hero canvas quadruples fill cost for no visual gain here
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    };
    window.addEventListener("resize", onResize);

    const isMobile = window.innerWidth < 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cols = isMobile ? 28 : 52;
    const rows = isMobile ? 20 : 34;

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = e.clientX - rect.left;
      mouseRef.current.ty = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    const RADIUS = isMobile ? 220 : 340;
    const RADIUS_SQ = RADIUS * RADIUS;

    // Precompute per-cell wave phase so the inner loop stays arithmetic-only
    const total = cols * rows;
    const phaseA = new Float32Array(total);
    const phaseB = new Float32Array(total);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const k = i * rows + j;
        phaseA[k] = i * 0.15 + j * 0.12;
        phaseB[k] = i * 0.08 - j * 0.1;
      }
    }

    let t = 0;
    let raf = 0;
    let last = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - last) / 16.667, 3);
      last = now;
      t += reduced ? 0 : 0.008 * dt;

      // Frame-rate independent easing toward the cursor
      const ease = 1 - Math.pow(1 - 0.12, dt);
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * ease;
      m.y += (m.ty - m.y) * ease;

      ctx.clearRect(0, 0, width, height);
      const spacingX = width / cols;
      const spacingY = height / rows;

      // Batch into two paths (dim white / accent) — 2 fill calls per frame instead of thousands
      const dim = new Path2D();
      const hot = new Path2D();

      for (let i = 0; i < cols; i++) {
        const x = i * spacingX;
        for (let j = 0; j < rows; j++) {
          const y = j * spacingY;
          const k = i * rows + j;
          const wave =
            Math.sin(phaseA[k] + t) * 8 + Math.cos(phaseB[k] + t * 1.3) * 6;

          const dx = x - m.x;
          const dy = y - m.y;
          const distSq = dx * dx + dy * dy;

          if (distSq > RADIUS_SQ) {
            const size = 0.8;
            const px = x + wave * 0.3;
            const py = y + wave * 0.5;
            dim.moveTo(px + size, py);
            dim.arc(px, py, size, 0, 6.283185307179586);
            continue;
          }

          const dist = Math.sqrt(distSq) || 0.0001;
          const raw = 1 - dist / RADIUS;
          const influence = raw * raw;

          const push = influence * 55;
          const px = x + (dx / dist) * push + wave * 0.3;
          const py = y + (dy / dist) * push + wave * 0.5;
          const size = 0.8 + influence * 2.4;

          const target = influence > 0.15 ? hot : dim;
          target.moveTo(px + size, py);
          target.arc(px, py, size, 0, 6.283185307179586);
        }
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${0.1 * opacity})`;
      ctx.fill(dim);
      ctx.fillStyle = `rgba(200, 255, 61, ${0.85 * opacity})`;
      ctx.fill(hot);

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
