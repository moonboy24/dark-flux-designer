import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Magnetic({
  children,
  strength = 0.35,
  className = "",
  href,
  target,
  rel,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 160, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 160, damping: 18, mass: 0.4 });
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    x.set(dx * strength);
    y.set(dy * strength);
    ry.set((dx / rect.width) * 6);
    rx.set((-dy / rect.height) * 6);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
