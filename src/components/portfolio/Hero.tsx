import { motion } from "framer-motion";
import { ParticleField } from "./ParticleField";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <ParticleField />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 pt-40 md:pt-44 pb-24 min-h-screen flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-mono text-[11px] tracking-[0.25em] text-white/50 flex items-center gap-3"
        >
          <span style={{ color: "#C8FF3D" }}>●</span> AVAILABLE FOR OPPORTUNITIES — 2026
        </motion.div>

        <div className="flex-1 flex flex-col justify-center mt-10 md:mt-16">
          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-4 bottom-6 w-[2px] origin-top hidden md:block"
              style={{ background: "#C8FF3D" }}
            />
            <div className="md:pl-8">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold uppercase leading-[0.85] tracking-[-0.03em] text-white text-[18vw] md:text-[13vw]"
              >
                AI Engineer
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="ghost-text font-display font-bold uppercase leading-[0.85] tracking-[-0.03em] text-[18vw] md:text-[13vw] -mt-2 md:-mt-4"
              >
                & Full-Stack
              </motion.h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:pl-8"
          >
            <div>
              <div className="font-mono text-[11px] tracking-[0.25em] text-white/50">
                // BUILDING PRACTICAL AI SYSTEMS.
              </div>
              <div className="mt-3 font-mono text-sm text-white/80">
                Keerthivasan G <span className="text-white/30 mx-2">/</span>
                <span style={{ color: "#C8FF3D" }}>AI &amp; Full-Stack Developer</span>
              </div>
            </div>
            <p className="max-w-md text-sm md:text-[15px] leading-relaxed text-white/60 font-mono">
              Final-year B.Tech engineer shipping RAG pipelines, offline LLM tooling and
              email-automation systems — bridging modern AI with production-grade web apps.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-16 flex items-center justify-between border-t border-white/10 pt-6"
        >
          <a
            href="#projects"
            className="group font-mono text-[11px] tracking-[0.25em] text-white flex items-center gap-3"
          >
            EXPLORE MY WORK
            <span className="animate-scroll-bounce inline-block" style={{ color: "#C8FF3D" }}>↓</span>
          </a>
          <div className="hidden md:flex items-center gap-6 font-mono text-[10px] tracking-widest text-white/40">
            <span>LAT 13.08° N</span>
            <span>LONG 80.27° E</span>
            <span style={{ color: "#C8FF3D" }}>CHENNAI, IN</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
