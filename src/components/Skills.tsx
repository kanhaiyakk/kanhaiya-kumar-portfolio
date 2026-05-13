import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { TechCanvas } from "./three/TechCanvas";

export function Skills() {
  const categories = [
    { title: "Languages", skills: ["Java 21"] },
    { title: "Frameworks", skills: ["Spring Boot", "Spring MVC", "Spring Data JPA", "Spring Security", "Hibernate"] },
    { title: "Backend & Architecture", skills: ["REST APIs", "Microservices", "Hexagonal Architecture", "Rate Limiting"] },
    { title: "AI / Intelligent Systems", skills: ["LLM Integration", "Google Gemini API", "AI-powered CV Parsing", "Semantic Search", "Embeddings", "AI-driven Backend Systems", "Document Processing", "pgvector"] },
    { title: "Databases", skills: ["MySQL", "PostgreSQL", "pgvector"] },
    { title: "Tools", skills: ["Gradle", "Git", "GitHub", "Docker", "Postman", "Swagger", "Sentry", "Jira"] },
    { title: "Testing", skills: ["JUnit", "Mockito"] },
    { title: "Cloud", skills: ["AWS", "Azure"] },
    { title: "Core CS", skills: ["DSA", "OOPs", "Collections", "Java 8+"] },
    { title: "Methodology", skills: ["Agile", "TDD", "Code Review"] },
  ];

  return (
    <section id="skills" className="section-padding relative bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Skills & Tech Stack" subtitle="The tools I use to design, build, and ship reliable systems." />

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* 3D tech cluster */}
          <ScrollReveal direction="left">
            <div className="h-[420px] rounded-2xl glass border border-border/50 overflow-hidden">
              <TechCanvas />
            </div>
          </ScrollReveal>

          {/* Skill cards */}
          <ScrollReveal direction="right">
            <div className="grid sm:grid-cols-2 gap-3">
              {categories.map((c, i) => (
                <Card key={i} className="p-4 hover-lift bg-gradient-card border-border/50">
                  <h3 className="font-bold text-sm mb-2 text-primary">{c.title}</h3>
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
