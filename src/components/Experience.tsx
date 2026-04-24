import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

const experiences = [
  {
    company: "Duru Cooperation",
    role: "Backend Developer — Product Development",
    period: "Jul 2025 — Present",
    location: "Bengaluru, India",
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "JUnit", "Mockito"],
    points: [
      "Architected an enterprise CV-parsing service in Hexagonal Architecture using Apache Tika + Gemini 2.0 Flash, achieving ~90% parsing accuracy.",
      "Built an async Application Fitness Scoring system that ranks candidates 0–100 with isolated AI failure handling.",
      "Shipped an AI auto-suggest engine using 768-dim Gemini embeddings and Postgres pgvector for semantic search.",
      "Cut CI/CD time ~40% (18 → 11 min) via Gradle dependency caching and Docker layer optimization.",
    ],
  },
  {
    company: "Cognizant Technology Solutions",
    role: "Software Engineer",
    period: "May 2022 — Nov 2024",
    location: "Bengaluru, India",
    stack: ["Java", "Spring Boot", "Microservices", "MySQL"],
    points: [
      "Designed scalable Spring Boot REST APIs, improving response times by ~10%.",
      "Optimized JPA + MySQL queries, reducing retrieval latency by ~15%.",
      "Maintained 90%+ test coverage with comprehensive unit and integration suites.",
      "Conducted 20+ technical interviews for Java backend roles.",
    ],
  },
  {
    company: "Agimus Technologies",
    role: "IoT Intern",
    period: "Internship",
    location: "Remote",
    stack: ["IoT", "Embedded"],
    points: [
      "Built IoT-based projects and gained hands-on exposure to embedded systems.",
    ],
  },
];

const recognition = [
  { label: "Microsoft Certified: Azure Fundamentals", meta: "Microsoft" },
  { label: "Technical Interviewer", meta: "20+ Java backend interviews" },
  { label: "500+ DSA problems solved", meta: "LeetCode · GeeksforGeeks · HackerRank" },
];

export function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked."
          subtitle="Backend and platform work across product and banking domains."
        />

        <ol className="space-y-16">
          {experiences.map((e) => (
            <ScrollReveal key={e.company}>
              <li className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12">
                <div>
                  <p className="font-mono-ui text-xs text-muted-foreground">
                    {e.period}
                  </p>
                  <p className="font-mono-ui text-xs text-muted-foreground mt-1">
                    {e.location}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-2xl text-foreground leading-tight">
                    {e.role}
                  </h3>
                  <p className="text-base text-primary mt-1 mb-4">{e.company}</p>
                  <ul className="space-y-2.5 mb-5">
                    {e.points.map((p) => (
                      <li
                        key={p}
                        className="text-sm md:text-base text-foreground/85 leading-relaxed flex gap-3"
                      >
                        <span className="text-muted-foreground mt-1.5">—</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-mono-ui text-xs text-muted-foreground">
                    {e.stack.join(" · ")}
                  </p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>

        <ScrollReveal className="mt-20">
          <p className="font-mono-ui text-xs text-muted-foreground mb-6">
            // recognition
          </p>
          <ul className="divide-y divide-white/5 border-y border-white/5">
            {recognition.map((r) => (
              <li
                key={r.label}
                className="grid md:grid-cols-[1fr_auto] gap-2 py-4"
              >
                <span className="text-foreground">{r.label}</span>
                <span className="font-mono-ui text-xs text-muted-foreground">
                  {r.meta}
                </span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
