import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LINKS = [
  { n: "01", label: "HOME", href: "#home" },
  { n: "02", label: "ABOUT", href: "#about" },
  { n: "03", label: "SKILLS", href: "#skills" },
  { n: "04", label: "PROJECTS", href: "#projects" },
  { n: "05", label: "EXPERIENCE", href: "#experience" },
  { n: "06", label: "CONTACT", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md bg-[#0a0a0a]/70 border-b border-white/5" : ""
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-5 flex items-center justify-between">
          <a href="#home" className="font-mono text-sm tracking-[0.2em] text-white font-bold">
            KG<span style={{ color: "#C8FF3D" }}>.</span>DEV
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <a
                key={l.n}
                href={l.href}
                className="group font-mono text-[11px] tracking-[0.15em] text-white/60 hover:text-white transition-colors"
              >
                <span style={{ color: "#C8FF3D" }} className="opacity-60 group-hover:opacity-100">
                  {l.n}
                </span>
                <span className="mx-1 text-white/30">/</span>
                {l.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden font-mono text-xs tracking-widest text-white"
            aria-label="Menu"
          >
            MENU +
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-[#0a0a0a] md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-mono text-sm tracking-[0.2em] text-white font-bold">
                KG<span style={{ color: "#C8FF3D" }}>.</span>DEV
              </span>
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-xs tracking-widest text-white"
              >
                CLOSE ×
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-6">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.n}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="font-display text-4xl font-bold text-white flex items-baseline gap-3"
                >
                  <span className="font-mono text-xs" style={{ color: "#C8FF3D" }}>
                    {l.n}/
                  </span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
