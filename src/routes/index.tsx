import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/portfolio/Loader";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Cursor } from "@/components/portfolio/Cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Keerthivasan G — AI Engineer & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Keerthivasan G — final-year B.Tech AI & Data Science student building RAG pipelines, offline LLM tooling and full-stack web systems.",
      },
      { property: "og:title", content: "Keerthivasan G — AI Engineer & Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Practical AI systems, RAG pipelines and modern web engineering. Available for opportunities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("kg_loaded") === "1") {
      setLoading(false);
    }
  }, []);

  const done = () => {
    sessionStorage.setItem("kg_loaded", "1");
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      <AnimatePresence>{loading && <Loader key="loader" onDone={done} />}</AnimatePresence>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}
