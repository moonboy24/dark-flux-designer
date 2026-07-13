import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-48 border-t border-white/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <Reveal>
            <div className="font-mono text-[11px] tracking-[0.25em] text-white/50 sticky top-32">
              <span style={{ color: "#C8FF3D" }}>02</span> / ABOUT
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-9 space-y-16">
          <Reveal>
            <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-white">
              I'm an aspiring <span style={{ color: "#C8FF3D" }}>AI engineer</span> in my final
              year of B.Tech, building RAG pipelines, offline chatbots and automation systems that
              turn messy human workflows into <span className="ghost-text">clean, quiet software.</span>
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 pt-6">
            <Reveal delay={0.1}>
              <div>
                <div className="font-mono text-[11px] tracking-widest text-white/40 mb-4">
                  // EDUCATION
                </div>
                <div className="text-white text-xl font-display">
                  B.Tech — Artificial Intelligence &amp; Data Science
                </div>
                <div className="mt-2 text-white/60 font-mono text-sm">
                  Anand Institute of Higher Technology
                </div>
                <div className="mt-4 flex items-center gap-6 font-mono text-xs text-white/50">
                  <span>FINAL YEAR</span>
                  <span className="w-6 h-px bg-white/20" />
                  <span>
                    CGPA <span style={{ color: "#C8FF3D" }} className="ml-1">8.69</span>
                    <span className="text-white/30">/10</span>
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <div className="font-mono text-[11px] tracking-widest text-white/40 mb-4">
                  // LANGUAGES
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-white">Tamil</span>
                    <span className="text-white/50">Native</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-white">English</span>
                    <span className="text-white/50">Professional</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
