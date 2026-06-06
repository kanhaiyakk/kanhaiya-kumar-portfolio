import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const projects = [
  {
    title: "Quiz Management System (Microservices)",
    description: "A comprehensive quiz platform built with microservices architecture, featuring dynamic service discovery and secure API design.",
    features: ["Microservices for quizzes, questions, results", "Eureka service discovery", "API Gateway routing", "Feign Client inter-service comm"],
    techStack: ["Java", "Spring Boot", "Eureka", "Feign", "MySQL", "API Gateway"],
    github: "https://github.com/kanhaiyakk/Quiz-App-Microservices",
  },
  {
    title: "Movie Ticket Booking System",
    description: "A robust ticket booking platform with real-time seat allocation, validation, and comprehensive exception handling.",
    features: ["REST APIs for booking & cancellations", "Real-time seat allocation", "Custom exception handling", "Optimized DB queries"],
    techStack: ["Java", "Spring Boot", "JPA", "Hibernate", "MySQL"],
    github: "https://github.com/kanhaiyakk/Movie_Ticket_Booking_System",
  },
];

export function Projects() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Other Projects"
          subtitle={
            <>
              Explore more on{" "}
              <a href="https://github.com/kanhaiyakk" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent font-semibold">
                GitHub
              </a>
            </>
          }
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <TiltCard className="h-full">
              <Card className="p-7 glass border-border/50 flex flex-col h-full transition-smooth hover:shadow-glow">
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-xs text-primary mb-2 uppercase tracking-wider">Key Features</h4>
                  <ul className="space-y-1">
                    {p.features.map((f) => (
                      <li key={f} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-accent mt-0.5">▸</span>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-xs text-primary mb-2 uppercase tracking-wider">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs bg-secondary/60">{t}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex gap-3 relative z-10">
                  <Button asChild className="flex-1 gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
                    <a href={p.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> View Code
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="border-primary/40 hover:border-primary">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="Open project on GitHub">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
