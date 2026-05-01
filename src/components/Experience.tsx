import { Card } from "@/components/ui/card";
import { Briefcase, MapPin } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

const experiences = [
  {
    company: "Duru Cooperation",
    role: "Backend Developer – Product Development",
    period: "July 2025 - Present",
    location: "Bengaluru, India",
    techStack: "Java 21 · Spring Boot · Hexagonal Architecture · Google Gemini API · PostgreSQL · pgvector · REST",
    achievements: [
      "Architected an enterprise-grade AI-powered CV Parsing system using Hexagonal Architecture, integrating Apache Tika 2.9.1 and Google Gemini 2.0 Flash LLM — ~90% parsing accuracy via prompt engineering, schema-driven validation and JSON contracts.",
      "Built an AI Application Fitness Scoring system that ranks candidates 0–100 using Gemini 2.0 Flash, with async processing and resilient error handling so AI failures never block submissions.",
      "Built an AI Auto-Suggestion engine using 768-d embeddings (gemini-embedding-001) and PostgreSQL pgvector cosine similarity to return Job Function & Industry in real time.",
      "Developed Java 21 and Spring Boot backend modules with Hexagonal Architecture, keeping domain logic cleanly separated from AI, persistence and file-processing adapters for easier testing and maintenance.",
      "Engineered scalable REST APIs, validation workflows and Swagger-friendly contracts to support AI-powered recruitment features with reliable throughput and clear integration boundaries.",
      "Optimized PostgreSQL queries, async execution paths and service-level error handling to improve response times and keep AI-assisted backend operations stable under higher load.",
      "Reduced CI/CD deployment time ~40% (18 → 11 min) by removing redundant Gradle builds from Docker images and adding Gradle dependency caching in GitHub Actions.",
      "Implemented JUnit + Mockito tests across service layers to maintain high code quality while shipping production-facing backend features faster.",
    ],
  },
  {
    company: "Cognizant Technology Solutions",
    role: "Software Engineer",
    period: "May 2022 - Nov 2024",
    location: "Bengaluru, India",
    techStack: "Java · Spring Boot · Microservices · MySQL",
    achievements: [
      "Designed scalable RESTful APIs with Spring Boot, improving response times by 10%.",
      "Optimized database queries using JPA and MySQL, reducing retrieval times by 15%.",
      "Achieved 90%+ test coverage via comprehensive unit and integration tests.",
      "Conducted 20+ technical interviews for Java backend developer positions.",
    ],
  },
  {
    company: "Agimus Technologies",
    role: "IoT Intern",
    period: "Internship",
    location: "Remote",
    techStack: "IoT · Embedded systems",
    achievements: ["Worked on IoT-based projects and gained hands-on experience with emerging technologies."],
  },
];

export function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Work Experience" subtitle="A journey of building, breaking, and shipping production systems." />

        <div className="relative">
          {/* timeline spine */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="relative md:grid md:grid-cols-2 md:gap-8 items-center">
                  {/* node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full gradient-primary shadow-glow z-10 ring-4 ring-background" />

                  <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}>
                    <Card className="p-6 hover-lift bg-gradient-card border-border/50">
                      <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-accent">{exp.period}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                      <p className="text-base font-semibold text-primary mb-1">{exp.company}</p>
                      <div className={`flex items-center gap-1.5 text-xs text-muted-foreground mb-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                        <MapPin className="h-3 w-3" /> {exp.location}
                      </div>
                      <p className="text-xs text-muted-foreground/80 mb-3 font-mono">{exp.techStack}</p>
                      <ul className="space-y-2 text-left">
                        {exp.achievements.map((a, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-accent mt-0.5">▸</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
