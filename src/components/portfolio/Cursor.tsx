import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement;
      setHover(!!el.closest("a, button, [data-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] rounded-full mix-blend-difference transition-[width,height,background] duration-200"
        style={{
          left: pos.x,
          top: pos.y,
          width: hover ? 40 : 8,
          height: hover ? 40 : 8,
          transform: "translate(-50%, -50%)",
          background: hover ? "#C8FF3D" : "#ffffff",
        }}
      />
    </>
  );
}
