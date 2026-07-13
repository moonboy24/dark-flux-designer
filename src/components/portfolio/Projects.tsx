import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const PROJECTS = [
  {
    n: "01",
    title: "Quite Authority",
    subtitle: "Email Automation & AI System",
    live: "https://moon-portfolio-ai.netlify.app/",
    body: [
      "End-to-end email automation that classifies incoming mail by priority level and dispatches responses accordingly.",
      "Automated proposal generation piped through classification results, with color-coded Google Sheets storage.",
      "RAG-powered chatbot answers user queries with persistent context in a vector database.",
    ],
    stack: ["Python", "LangChain", "RAG", "Vector DB", "Google Sheets API"],
  },
  {
    n: "02",
    title: "Naive RAG Pipeline",
    subtitle: "Retrieval-Augmented Generation, from scratch",
    body: [
      "Built a naive RAG pipeline end-to-end in Python: ingestion, chunking, embedding generation, vector storage, retrieval and grounded response synthesis.",
      "Demonstrates how LLMs anchor answers in external knowledge — no hand-waving, all the internals visible.",
    ],
    stack: ["Python", "Embeddings", "Vector Store", "LLM"],
  },
  {
    n: "03",
    title: "Offline Chatbot",
    subtitle: "Fully local LLM via Ollama",
    body: [
      "A conversational chatbot that runs 100% offline — no internet, no API keys, no data leaving the machine.",
      "Local LLM handles natural-language queries with low latency, suited for on-premise enterprise use cases where privacy is non-negotiable.",
    ],
    stack: ["Ollama", "Python", "Local LLM", "On-Prem"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-32 md:py-48 border-t border-white/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-20">
          <Reveal>
            <div className="font-mono text-[11px] tracking-[0.25em] text-white/50">
              <span style={{ color: "#C8FF3D" }}>04</span> / SELECTED WORK
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight uppercase">
              Projects
            </h2>
          </Reveal>
        </div>

        <div className="space-y-6 md:space-y-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <motion.a
                href={p.live || "#"}
                target={p.live ? "_blank" : undefined}
                rel="noreferrer"
                whileHover={{ y: -4 }}
                data-hover
                className="group block border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#C8FF3D]/40 transition-all duration-300 p-8 md:p-12 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700" style={{ background: "#C8FF3D" }} />
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-1 font-mono text-xs text-white/40">{p.n}</div>
                  <div className="md:col-span-5">
                    <h3 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight uppercase leading-none">
                      {p.title}
                    </h3>
                    <div className="mt-3 font-mono text-xs tracking-widest text-white/50">
                      // {p.subtitle}
                    </div>
                    {p.live && (
                      <div className="mt-6 font-mono text-[11px] tracking-widest">
                        <span className="text-white/40">LIVE </span>
                        <span style={{ color: "#C8FF3D" }}>↗ {new URL(p.live).host}</span>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-6">
                    <div className="space-y-3 text-white/70 text-sm md:text-[15px] leading-relaxed">
                      {p.body.map((b, j) => (
                        <p key={j}>{b}</p>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] tracking-widest text-white/50 border border-white/10 px-2.5 py-1"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 font-mono text-xs tracking-widest text-white/40 group-hover:text-[#C8FF3D] transition-colors flex items-center gap-2">
                      VIEW PROJECT
                      <span className="inline-block group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
