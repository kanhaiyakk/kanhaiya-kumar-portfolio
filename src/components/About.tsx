import { Card } from "@/components/ui/card";
import { Code2, Database, TestTube, Sparkles, MessageCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

export function About() {
  const highlights = [
    { icon: Sparkles, title: "AI-Powered Backend", description: "Gemini 2.0 Flash LLM integration, ~90% CV parsing accuracy & AI fitness scoring" },
    { icon: Database, title: "Semantic Search", description: "pgvector + 768-d embeddings for real-time auto-suggestion at scale" },
    { icon: Code2, title: "Hexagonal Architecture", description: "Java 21 & Spring Boot with cleanly separated AI, persistence & file adapters" },
    { icon: TestTube, title: "Test-Driven Delivery", description: "JUnit & Mockito with 85–90%+ coverage and 40% faster CI/CD pipelines" },
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="About Me" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <ScrollReveal direction="left">
            <div className="space-y-5">
              <p className="text-lg text-foreground/90 leading-relaxed">
                I'm a <span className="font-semibold text-primary">Backend Developer</span> building <span className="font-semibold text-foreground">AI-powered, production-grade systems</span> with <span className="font-semibold text-accent">Java 21, Spring Boot and Hexagonal Architecture</span>. At <span className="font-semibold text-primary">Duru Cooperation</span> I build <span className="font-semibold text-foreground">Duruper</span> — a global recruitment platform — architecting LLM-driven features like CV parsing, candidate fitness scoring and semantic auto-suggestion using Google Gemini and pgvector.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                I integrate <span className="font-semibold text-accent">Gemini 2.5 Flash LLMs</span>, <span className="font-semibold text-foreground">768-d embeddings</span> and <span className="font-semibold text-primary">PostgreSQL pgvector</span> to ship intelligent recruitment workflows — cutting manual resume processing time by ~80% with async processing, schema-driven validation and resilient error handling so AI failures never block the user.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                I care about <span className="font-semibold text-accent">clean, testable, maintainable code</span> — Hexagonal boundaries, <span className="font-semibold text-foreground">85–90%+ JUnit/Mockito coverage</span>, and a <span className="font-semibold text-primary">40% faster CI/CD pipeline</span>. Backed by <span className="font-semibold text-accent">500+ DSA problems</span> solved across LeetCode, GFG and HackerRank.
              </p>

              <a
                href="https://wa.me/918804936144?text=Hi%20Kanhaiya%2C%20I%20came%20across%20your%20portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium text-primary-foreground gradient-primary transition-smooth hover:shadow-glow"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="right">
                <TiltCard className="h-full">
                <Card className="p-5 glass border-border/50 h-full transition-smooth hover:shadow-glow">
                  <div className="p-2.5 rounded-lg gradient-primary inline-block mb-3">
                    <h.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-base mb-1">{h.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{h.description}</p>
                </Card>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
