import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NAME = "KEERTHIVASAN G";
const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [text, setText] = useState("");
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setTimeout(() => setExiting(true), 400);
        setTimeout(onDone, 1200);
      }
      setPct(Math.floor(p));
    }, 80);
    return () => clearInterval(iv);
  }, [onDone]);

  useEffect(() => {
    let frame = 0;
    const total = 40;
    const iv = setInterval(() => {
      frame++;
      const progress = frame / total;
      const revealed = Math.floor(NAME.length * progress);
      let out = "";
      for (let i = 0; i < NAME.length; i++) {
        if (i < revealed) out += NAME[i];
        else if (NAME[i] === " ") out += " ";
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setText(out);
      if (frame >= total) {
        setText(NAME);
        clearInterval(iv);
      }
    }, 45);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={exiting ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0a]"
    >
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
        // Initializing
      </div>
      <div className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-10">
        {text || "\u00A0"}
      </div>
      <div className="w-[280px] md:w-[420px]">
        <div className="h-[2px] w-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full"
            style={{ background: "#C8FF3D" }}
            animate={{ width: `${pct}%` }}
            transition={{ ease: "linear", duration: 0.08 }}
          />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/40">
          <span>Loading assets</span>
          <span style={{ color: "#C8FF3D" }}>{String(pct).padStart(3, "0")}%</span>
        </div>
      </div>
    </motion.div>
  );
}
