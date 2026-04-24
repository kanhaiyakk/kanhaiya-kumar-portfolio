import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { Github, ExternalLink } from "lucide-react";

interface CaseStudy {
  name: string;
  pitch: string;
  problem: string;
  approach: string;
  stack: string[];
  outcome: { metric: string; label: string };
  github?: string;
  demo?: string;
}

const featured: CaseStudy[] = [
  {
    name: "AI CV Parsing System",
    pitch: "Resume → structured candidate profile, in seconds, for an HR product.",
    problem:
      "Recruiters were re-typing the same fields out of every resume into the ATS. Manual entry was slow, error-prone, and the bottleneck before any actual screening could begin.",
    approach:
      "Built a Hexagonal-Architecture parsing service that pipes Apache Tika output through Gemini 2.0 Flash with a strict JSON schema, then validates and persists in a single transaction. Provider-agnostic ports make the LLM swappable.",
    stack: ["Java 21", "Spring Boot", "Hexagonal", "Apache Tika", "Gemini", "PostgreSQL"],
    outcome: { metric: "~90%", label: "parsing accuracy" },
    github: "https://github.com/kanhaiyakk",
  },
  {
    name: "Application Fitness Scoring",
    pitch: "Async candidate-to-job ranker that surfaces the right resume first.",
    problem:
      "Recruiters were drowning in applications and ranking candidates by gut. A scoring signal — fast, async, and resilient to LLM failures — was needed without blocking submissions.",
    approach:
      "An async pipeline computes a 0–100 fitness score per application via Gemini, with sentinel values instead of nulls and adapter-level isolation so AI failures never break the user submission flow.",
    stack: ["Java 21", "Spring Boot", "Async", "Gemini", "PostgreSQL", "JPA"],
    outcome: { metric: "2–5s", label: "scoring per application" },
    github: "https://github.com/kanhaiyakk",
  },
  {
    name: "Quiz Platform (Microservices)",
    pitch: "Discovery + gateway + Feign-wired services for a multi-tenant quiz app.",
    problem:
      "A monolithic quiz app was painful to deploy and scale. Question, quiz, and result domains all needed independent release cadence and isolated failure modes.",
    approach:
      "Split into three Spring Boot services behind an API Gateway, with Eureka discovery and Feign clients for inter-service calls. Each service owns its schema; the gateway handles auth and routing.",
    stack: ["Java", "Spring Boot", "Eureka", "API Gateway", "Feign", "MySQL"],
    outcome: { metric: "3", label: "independently deployable services" },
    github: "https://github.com/kanhaiyakk/Quiz-App-Microservices",
  },
];

const otherWork = [
  {
    name: "Movie Ticket Booking",
    line: "REST booking + cancellation with real-time seat allocation and custom exception handling.",
    href: "https://github.com/kanhaiyakk/Movie_Ticket_Booking_System",
  },
  {
    name: "AI Auto Suggestion Engine",
    line: "Semantic search via 768-dim Gemini embeddings + Postgres pgvector cosine similarity.",
    href: "https://github.com/kanhaiyakk",
  },
];

function StudyCard({ s }: { s: CaseStudy }) {
  return (
    <article className="surface rounded-lg p-8 md:p-10">
      <header className="mb-6">
        <h3 className="font-mono-ui text-xl md:text-2xl text-foreground mb-2">
          {s.name}
        </h3>
        <p className="text-base text-muted-foreground">{s.pitch}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <p className="font-mono-ui text-xs text-muted-foreground mb-2">// problem</p>
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
            {s.problem}
          </p>
        </div>
        <div>
          <p className="font-mono-ui text-xs text-muted-foreground mb-2">// approach</p>
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
            {s.approach}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6 border-t border-white/5">
        <div>
          <p className="font-mono-ui text-xs text-muted-foreground mb-2">// stack</p>
          <p className="font-mono-ui text-sm text-foreground">
            {s.stack.join(" · ")}
          </p>
        </div>

        <div className="md:text-right">
          <p className="font-mono-ui text-xs text-muted-foreground mb-1">// outcome</p>
          <p className="font-mono-ui text-3xl md:text-4xl text-primary leading-none">
            {s.outcome.metric}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{s.outcome.label}</p>
        </div>
      </div>

      {(s.github || s.demo) && (
        <div className="mt-6 flex gap-6 font-mono-ui text-xs">
          {s.github && (
            <a
              href={s.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-3.5 w-3.5" /> github
            </a>
          )}
          {s.demo && (
            <a
              href={s.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" /> live
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Selected work"
          title="A few systems I shipped."
          subtitle="Three case studies, written the way I'd actually explain them in a code review — problem, approach, and the one number that mattered."
        />

        <div className="space-y-8">
          {featured.map((s) => (
            <ScrollReveal key={s.name}>
              <StudyCard s={s} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-20">
          <p className="font-mono-ui text-xs text-muted-foreground mb-6">
            // other work
          </p>
          <ul className="divide-y divide-white/5 border-y border-white/5">
            {otherWork.map((o) => (
              <li key={o.name}>
                <a
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid md:grid-cols-[200px_1fr_auto] items-baseline gap-4 py-5 group"
                >
                  <span className="font-mono-ui text-sm text-foreground group-hover:text-primary transition-colors">
                    {o.name}
                  </span>
                  <span className="text-sm text-muted-foreground">{o.line}</span>
                  <span className="font-mono-ui text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
