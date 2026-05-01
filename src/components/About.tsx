import { Card } from "@/components/ui/card";
import { Code2, Database, TestTube, Award } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const highlights = [
    { icon: Code2, title: "Clean Architecture", description: "Expert in Hexagonal Architecture with 85-90%+ test coverage" },
    { icon: Database, title: "Database Optimization", description: "Proven track record of 15% performance improvements" },
    { icon: TestTube, title: "Test-Driven Development", description: "JUnit & Mockito expert ensuring maintainable code" },
    { icon: Award, title: "Problem Solver", description: "500+ DSA problems solved across platforms" },
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="About Me" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <ScrollReveal direction="left">
            <div className="space-y-5">
              <p className="text-lg text-foreground/90 leading-relaxed">
                I'm a <span className="font-semibold text-primary">Backend Developer</span> skilled in building <span className="font-semibold text-foreground">scalable, high-performance applications</span> using <span className="font-semibold text-accent">Java, Spring Boot, and REST APIs</span>. Proficient in both monolithic and microservices architectures, with expertise in bug fixing, performance optimization, and clean code.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                I have a <span className="font-semibold text-primary">strong problem-solving background</span> with <span className="font-semibold text-accent">500+ DSA problems solved</span>, and a proven ability to collaborate in Agile teams to deliver impactful solutions across banking and product-based domains.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                My approach emphasizes <span className="font-semibold text-accent">clean, testable, maintainable code</span> — implementing <span className="font-semibold text-primary">Hexagonal Architecture</span> and consistently achieving <span className="font-semibold text-foreground">85-90%+ test coverage</span> with JUnit and Mockito.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="right">
                <Card className="p-5 hover-lift bg-gradient-card backdrop-blur border-border/50 h-full">
                  <div className="p-2.5 rounded-lg gradient-primary inline-block mb-3">
                    <h.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-base mb-1">{h.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{h.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
