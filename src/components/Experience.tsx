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
    techStack: "Java 21 · Spring Boot · Hexagonal Architecture · Google Gemini · PostgreSQL · pgvector · REST",
    product: "Product: Duruper – Global Recruitment Platform",
    achievements: [
      "Architected an enterprise-grade AI-powered CV Parsing system integrating Apache Tika and Google Gemini 2.5 Flash LLM, with rate limiting for secure and scalable API consumption — reducing manual resume processing time by ~80% with ~90% parsing accuracy via schema-driven prompt engineering.",
      "Built an AI Candidate Fitness Scoring system that generates 0–100 job-fit scores using Gemini LLM, enabling recruiters to rank and filter applicants quickly with async, resilient pipelines.",
      "Developed an AI job classification engine using Gemini embeddings (768-d) and PostgreSQL pgvector cosine similarity — analyzing job title, description and skills to auto-suggest Job Function & Industry in real time.",
      "Built an end-to-end WhatsApp recruitment funnel (Meta Cloud API) where candidates sign up, apply, and pay via Razorpay inside a single WhatsApp conversation, with a webhook-driven conversation engine and recruiter tracking dashboard.",
      "Designed scalable REST APIs and Swagger-friendly contracts to integrate Duruper's frontend and external systems with reliable throughput and clean integration boundaries.",
      "Reduced CI/CD deployment time ~40% (18 → 11 min) by removing redundant Gradle builds from Docker images and adding Gradle dependency caching in GitHub Actions, lowering CI infrastructure costs.",
      "Leveraged Gradle for build automation, Swagger for API docs and Sentry for monitoring & error tracking; collaborated with PMs, designers, frontend and QA in an Agile (Jira) environment.",
      "Conducted technical interviews and candidate evaluations for backend roles, assessing Java, Spring Boot and problem-solving skills.",

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
      "Conducted 100+ technical interviews for Java backend developer positions.",
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
                      {exp.product && (
                        <p className="text-sm font-bold text-accent/90 uppercase tracking-wide mb-1">{exp.product}</p>
                      )}
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
