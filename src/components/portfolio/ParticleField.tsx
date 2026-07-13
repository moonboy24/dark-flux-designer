import { useEffect, useRef } from "react";

export function ParticleField({ opacity = 1 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0, height = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 40 : 70;
    const rows = isMobile ? 30 : 50;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = e.clientX - rect.left;
      mouseRef.current.ty = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouse);

    const RADIUS = isMobile ? 220 : 340;

    let t = 0;
    let raf = 0;
    const render = () => {
      t += reduced ? 0 : 0.008;
      // Smoothly ease the tracked mouse toward the target for a fluid, trailing feel
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.12;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.12;

      ctx.clearRect(0, 0, width, height);
      const spacingX = width / cols;
      const spacingY = height / rows;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacingX;
          const y = j * spacingY;
          const wave =
            Math.sin(i * 0.15 + j * 0.12 + t) * 8 +
            Math.cos(i * 0.08 - j * 0.1 + t * 1.3) * 6;

          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          // Stronger falloff curve — nearby dots react much more
          const raw = Math.max(0, 1 - dist / RADIUS);
          const influence = raw * raw;

          // Push particles away from cursor (repulsion)
          const push = influence * 55;
          const nx = dx / dist;
          const ny = dy / dist;
          const px = x + nx * push + wave * 0.3;
          const py = y + ny * push + wave * 0.5;

          const brightness =
            0.15 + influence * 0.95 + Math.sin(t + i * 0.1) * 0.05;
          const size = 0.8 + influence * 2.4;

          if (influence > 0.15) {
            ctx.fillStyle = `rgba(200, 255, 61, ${brightness * opacity})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.5 * opacity})`;
          }
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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

