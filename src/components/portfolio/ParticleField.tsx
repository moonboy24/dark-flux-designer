import { useEffect, useRef } from "react";

export function ParticleField({ opacity = 1 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

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
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouse);

    let t = 0;
    let raf = 0;
    const render = () => {
      t += reduced ? 0 : 0.008;
      ctx.clearRect(0, 0, width, height);
      const spacingX = width / cols;
      const spacingY = height / rows;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacingX;
          const y = j * spacingY;
          const wave = Math.sin(i * 0.15 + j * 0.12 + t) * 8 +
                       Math.cos(i * 0.08 - j * 0.1 + t * 1.3) * 6;
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 220);
          const offset = wave + influence * 20;
          const px = x + offset * 0.3;
          const py = y + offset * 0.5;
          const brightness = 0.15 + influence * 0.7 + Math.sin(t + i * 0.1) * 0.05;
          const size = 0.8 + influence * 1.4;
          if (influence > 0.3) {
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
