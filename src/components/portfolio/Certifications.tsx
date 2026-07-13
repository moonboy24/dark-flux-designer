import { Reveal } from "./Reveal";

const CERTS = [
  { title: "JavaScript Bootcamp", by: "Let's Upgrade" },
  { title: "UI/UX Design Webinar", by: "Dot Upskill Academy" },
  { title: "AI Behind the Prompt", by: "Genorcarsx" },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative py-32 md:py-48 border-t border-white/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <Reveal>
            <div className="font-mono text-[11px] tracking-[0.25em] text-white/50">
              <span style={{ color: "#C8FF3D" }}>06</span> / CREDENTIALS
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight uppercase">
              Certifications
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div
                data-hover
                className="group border border-white/10 p-8 hover:border-[#C8FF3D]/50 transition-colors relative overflow-hidden h-full"
              >
                <div className="font-mono text-[10px] tracking-widest text-white/40 mb-6">
                  0{i + 1} · CERTIFICATE
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">
                  {c.title}
                </h3>
                <div className="mt-4 font-mono text-xs text-white/50">
                  ISSUED BY <span className="text-white ml-1">{c.by}</span>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: "#C8FF3D" }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
