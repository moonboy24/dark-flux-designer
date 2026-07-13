import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const ITEMS = [
  {
    role: "Web Development & Data Analyst Intern",
    company: "Chez IT Solutions",
    period: "3 MONTHS",
    bullets: [
      "Built responsive web and app interfaces across production projects.",
      "Delivered IoT prototypes — Water Level Indicator and Traffic Light Controller.",
      "Performed data analysis and dashboarding in Power BI (certificate awarded).",
    ],
  },
  {
    role: "AI & Machine Learning Virtual Intern",
    company: "Digitalytic Technologies",
    period: "1 MONTH · VIRTUAL",
    bullets: [
      "Hands-on real-time implementation of ML and AI models.",
      "Applied academic theory to practical AI use cases in industry contexts.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 md:py-48 border-t border-white/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-20">
          <Reveal>
            <div className="font-mono text-[11px] tracking-[0.25em] text-white/50">
              <span style={{ color: "#C8FF3D" }}>05</span> / TIMELINE
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight uppercase">
              Experience
            </h2>
          </Reveal>
        </div>

        <div className="relative pl-10 md:pl-16">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-2 md:left-4 top-2 bottom-2 w-px origin-top bg-white/20"
          />
          <div className="space-y-16 md:space-y-24">
            {ITEMS.map((it, i) => (
              <Reveal key={it.company} delay={i * 0.15}>
                <div className="relative">
                  <span
                    className="absolute -left-[38px] md:-left-[54px] top-2 w-3 h-3 rounded-full animate-pulse-dot"
                    style={{ background: "#C8FF3D" }}
                  />
                  <div className="font-mono text-[11px] tracking-[0.25em] text-white/50">
                    {it.period}
                  </div>
                  <h3 className="mt-3 font-display text-2xl md:text-4xl font-bold text-white tracking-tight">
                    {it.role}
                  </h3>
                  <div className="mt-2 font-mono text-sm" style={{ color: "#C8FF3D" }}>
                    @ {it.company}
                  </div>
                  <ul className="mt-6 space-y-2 max-w-2xl">
                    {it.bullets.map((b, j) => (
                      <li key={j} className="text-white/70 text-sm md:text-[15px] leading-relaxed flex gap-3">
                        <span className="text-white/30 font-mono">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
