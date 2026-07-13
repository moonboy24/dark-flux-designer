import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { ParticleField } from "./ParticleField";

const LINKS = [
  { label: "EMAIL", value: "gkeerthivasan00@gmail.com", href: "mailto:gkeerthivasan00@gmail.com" },
  { label: "PHONE", value: "+91 93604 77198", href: "tel:+919360477198" },
  { label: "LINKEDIN", value: "in/keerthivasang15", href: "https://www.linkedin.com/in/keerthivasang15/" },
  { label: "GITHUB", value: "github.com/moonboy24", href: "https://github.com/moonboy24" },
];

export function Contact() {
  return (
    <section id="contact" className="relative pt-32 md:pt-48 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <ParticleField opacity={0.5} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <div className="font-mono text-[11px] tracking-[0.25em] text-white/50 mb-10">
            <span style={{ color: "#C8FF3D" }}>07</span> / GET IN TOUCH
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display font-bold uppercase leading-[0.85] tracking-[-0.03em] text-white text-[16vw] md:text-[11vw]">
            Let's build
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="ghost-text font-display font-bold uppercase leading-[0.85] tracking-[-0.03em] text-[16vw] md:text-[11vw] -mt-2 md:-mt-4">
            Something
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-16 grid md:grid-cols-2 gap-10 md:gap-16 border-t border-white/10 pt-12">
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-lg">
              Open to internships, collaborations and roles in{" "}
              <span style={{ color: "#C8FF3D" }}>AI engineering</span> and full-stack development.
              I read every message.
            </p>
            <div className="space-y-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-hover
                  whileHover={{ x: 6 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group flex items-baseline justify-between border-b border-white/10 py-4 hover:border-[#C8FF3D] transition-colors"
                >
                  <span className="font-mono text-[11px] tracking-[0.25em] text-white/40">
                    {l.label}
                  </span>
                  <span className="font-display text-lg md:text-2xl text-white group-hover:text-[#C8FF3D] transition-colors flex items-center gap-3">
                    {l.value}
                    <span className="inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>

        <footer className="mt-24 md:mt-32 pb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-[11px] tracking-widest text-white/40 border-t border-white/10 pt-6">
          <span>© 2026 KEERTHIVASAN G — ALL RIGHTS RESERVED</span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#C8FF3D" }} />
            DESIGNED &amp; BUILT WITH INTENT
          </span>
        </footer>
      </div>
    </section>
  );
}
