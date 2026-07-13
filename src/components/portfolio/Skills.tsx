import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const GROUPS = [
  {
    label: "WEB DEVELOPMENT",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    label: "AI & MACHINE LEARNING",
    skills: [
      "Python",
      "LangChain",
      "Ollama",
      "RAG Pipelines",
      "Vector Databases",
      "Prompt Engineering",
      "Embeddings",
    ],
  },
  {
    label: "DATA & BI",
    skills: ["Power BI", "Data Analysis"],
  },
  {
    label: "CURRENTLY LEARNING",
    skills: ["React.js", "Next.js", "Figma (UI/UX)", "SEO Optimization"],
    learning: true,
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 md:py-48 border-t border-white/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <Reveal>
            <div className="font-mono text-[11px] tracking-[0.25em] text-white/50">
              <span style={{ color: "#C8FF3D" }}>03</span> / STACK
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight uppercase">
              Toolbelt
            </h2>
          </Reveal>
        </div>

        <div className="space-y-14">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.label} delay={gi * 0.05}>
              <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start border-t border-white/10 pt-8">
                <div className="md:col-span-3">
                  <div className="font-mono text-xs tracking-[0.2em] text-white/50 flex items-center gap-2">
                    {g.learning && (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full animate-pulse-dot"
                        style={{ background: "#C8FF3D" }}
                      />
                    )}
                    {g.label}
                  </div>
                </div>
                <div className="md:col-span-9 flex flex-wrap gap-2 md:gap-3">
                  {g.skills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      whileHover={{ y: -3 }}
                      data-hover
                      className="group font-mono text-xs md:text-sm px-4 py-2 border border-white/15 text-white/80 hover:text-[#0a0a0a] hover:border-[#C8FF3D] transition-all cursor-none relative overflow-hidden"
                    >
                      <span
                        className="absolute inset-0 -z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                        style={{ background: "#C8FF3D" }}
                      />
                      <span className="relative z-10">{s}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
