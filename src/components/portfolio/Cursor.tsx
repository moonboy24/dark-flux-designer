import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const el = dotRef.current;
    if (!el) return;

    let x = -100;
    let y = -100;
    let hover = false;
    let raf = 0;
    let dirty = true;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      const isHover = !!target?.closest("a, button, [data-hover]");
      if (isHover !== hover) hover = isHover;
      dirty = true;
    };

    const loop = () => {
      if (dirty) {
        dirty = false;
        const size = hover ? 40 : 8;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.background = hover ? "#C8FF3D" : "#ffffff";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full mix-blend-difference will-change-transform transition-[width,height] duration-200"
      style={{ width: 8, height: 8, background: "#ffffff" }}
    />
  );
}
