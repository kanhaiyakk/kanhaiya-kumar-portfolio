import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

const notes = [
  {
    title: "Why we chose Postgres over DynamoDB for our ledger",
    date: "2025-09-14",
    summary:
      "Strong consistency, joins, and boring tooling beat single-digit-ms reads when correctness is the product.",
    href: "#",
  },
  {
    title: "Debugging a Kafka consumer lag that only happened on Tuesdays",
    date: "2025-08-02",
    summary:
      "A weekly cron, a quiet rebalance, and a 30-minute window where everything queued up. Mostly a story about logs.",
    href: "#",
  },
  {
    title: "The quiet art of idempotent API design",
    date: "2025-06-21",
    summary:
      "Idempotency keys, dedupe windows, and what to do when the client retries before you've finished writing.",
    href: "#",
  },
];

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export function Notes() {
  return (
    <section id="notes" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Notes"
          title="Things I've written down."
          subtitle="Short technical posts — mostly things I wish I'd known six months earlier."
        />

        <ScrollReveal>
          <ul className="divide-y divide-white/5 border-y border-white/5">
            {notes.map((n) => (
              <li key={n.title}>
                <a
                  href={n.href}
                  className="grid md:grid-cols-[120px_1fr_auto] items-baseline gap-4 py-8 group"
                >
                  <time className="font-mono-ui text-xs text-muted-foreground">
                    {fmt(n.date)}
                  </time>
                  <div>
                    <h3 className="font-display text-lg md:text-xl text-foreground group-hover:text-primary transition-colors mb-1">
                      {n.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {n.summary}
                    </p>
                  </div>
                  <span className="font-mono-ui text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    read →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
