import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

const skillGroups = [
  { label: "Languages", items: ["Java 21"] },
  { label: "Frameworks", items: ["Spring Boot", "Spring Data JPA", "Spring Security", "Hibernate"] },
  { label: "Architecture", items: ["Microservices", "REST", "Hexagonal"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "Redis"] },
  { label: "Infra & Tools", items: ["Docker", "AWS", "Gradle", "Git", "Sentry"] },
  { label: "Testing", items: ["JUnit", "Mockito"] },
];

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="About"
          title="Backend, the unglamorous parts."
          subtitle="I'm a backend engineer who likes systems that don't need attention. Most of the work I'm proud of is invisible — fewer pages, lower latency tails, cleaner failure modes."
        />

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <ScrollReveal direction="left" className="md:col-span-3 space-y-5">
            <p className="text-foreground leading-relaxed">
              I work mostly in <span className="text-primary">Java and Spring Boot</span>, building monoliths
              and microservices for banking and product teams. I care about test
              coverage (typically 85–90%), clean boundaries (Hexagonal when it earns
              its keep), and APIs that other people don't have to read the source to
              use.
            </p>
            <p className="text-foreground leading-relaxed">
              On the side, I've solved <span className="text-primary">500+ DSA problems</span> across
              LeetCode, GeeksforGeeks, and HackerRank — partly for interviews, mostly because
              I like the puzzle.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" className="md:col-span-2">
            <p className="font-mono-ui text-xs text-muted-foreground mb-4">// stack</p>
            <dl className="space-y-4">
              {skillGroups.map((g) => (
                <div key={g.label}>
                  <dt className="font-mono-ui text-xs text-muted-foreground mb-1">
                    {g.label}
                  </dt>
                  <dd className="font-mono-ui text-sm text-foreground">
                    {g.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
