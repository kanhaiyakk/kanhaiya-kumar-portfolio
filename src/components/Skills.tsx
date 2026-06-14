import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { TechCanvas } from "./three/TechCanvas";
import { useState } from "react";

export function Skills() {
  const categories = [
    { title: "Languages", color: "#22d3ee", size: 0.26, skills: ["Java 21"] },
    { title: "Frameworks", color: "#a855f7", size: 0.3, skills: ["Spring Boot", "Spring MVC", "Spring Data JPA", "Spring Security", "Hibernate"] },
    { title: "Backend & Architecture", color: "#67e8f9", size: 0.28, skills: ["REST APIs", "Microservices", "Hexagonal Architecture", "Rate Limiting"] },
    { title: "AI / Intelligent Systems", color: "#c084fc", size: 0.32, skills: ["LLM Integration", "Google Gemini API", "AI-powered CV Parsing", "Semantic Search", "Embeddings", "AI-driven Backend Systems", "Document Processing", "pgvector"] },
    { title: "Databases", color: "#34d399", size: 0.24, skills: ["MySQL", "PostgreSQL", "pgvector"] },
    { title: "Tools", color: "#f0abfc", size: 0.26, skills: ["Gradle", "Git", "GitHub", "Docker", "Postman", "Swagger", "Sentry", "Jira"] },
    { title: "Testing", color: "#38bdf8", size: 0.2, skills: ["JUnit", "Mockito"] },
    { title: "Cloud", color: "#818cf8", size: 0.24, skills: ["AWS", "Azure"] },
    { title: "Core CS", color: "#2dd4bf", size: 0.22, skills: ["DSA", "OOPs", "Collections", "Java 8+"] },
    { title: "Methodology", color: "#e879f9", size: 0.2, skills: ["Agile", "TDD", "Code Review"] },
  ];

  const [active, setActive] = useState<string | null>(null);
  const topSkills = [
    { title: "Java", color: "#22d3ee", size: 0.3 },
    { title: "Spring Boot", color: "#34d399", size: 0.3 },
    { title: "AI / LLM", color: "#c084fc", size: 0.32 },
    { title: "REST APIs", color: "#67e8f9", size: 0.26 },
    { title: "Microservices", color: "#a855f7", size: 0.28 },
    { title: "Databases", color: "#f0abfc", size: 0.26 },
  ];
  const planets = topSkills;
  const toggle = (title: string) => setActive((prev) => (prev === title ? null : title));

  return (
    <section id="skills" className="section-padding relative bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Skills & Tech Stack" subtitle="The tools I use to design, build, and ship reliable systems." />

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* 3D tech cluster */}
          <ScrollReveal direction="left">
            <div className="relative h-[460px] rounded-2xl glass border border-border/50 overflow-hidden">
              <TechCanvas planets={planets} active={active} onSelect={toggle} />
              <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-muted-foreground">
                Tap a planet to explore that skill orbit
              </div>
            </div>
          </ScrollReveal>

          {/* Skill cards */}
          <ScrollReveal direction="right">
            <div className="grid sm:grid-cols-2 gap-3">
              {categories.map((c, i) => (
                <Card
                  key={i}
                  onMouseEnter={() => setActive(c.title)}
                  onClick={() => toggle(c.title)}
                  className={`cursor-pointer p-4 glass neon-border border-border/50 transition-smooth hover:-translate-y-1 hover:shadow-glow ${
                    active === c.title ? "ring-2 ring-primary shadow-glow -translate-y-1" : ""
                  } ${active && active !== c.title ? "opacity-50" : ""}`}
                >
                  <h3 className="font-bold text-sm mb-2 flex items-center gap-2" style={{ color: c.color }}>
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {c.skills.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs bg-secondary/60 hover:bg-primary/20 hover:text-primary transition-smooth">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
