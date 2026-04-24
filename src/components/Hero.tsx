import { ArrowRight } from "lucide-react";

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 pt-24 pb-20"
    >
      <div className="max-w-5xl mx-auto w-full">
        <p className="font-mono-ui text-sm text-muted-foreground mb-8 animate-fade-in">
          // Backend Engineer, Bengaluru
        </p>

        <h1
          className="font-display font-bold text-foreground leading-[1.02] mb-10 animate-fade-in"
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            animationDelay: "60ms",
          }}
        >
          Kanhaiya Kumar<span className="text-primary">.</span>
        </h1>

        <p
          className="text-lg md:text-xl text-foreground max-w-2xl leading-relaxed mb-12 animate-fade-in"
          style={{ animationDelay: "120ms" }}
        >
          I build Java services that stay boring in production — Spring Boot,
          Kafka, Postgres, and the quiet work of keeping things up at 3 AM.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-x-10 gap-y-3 font-mono-ui text-sm animate-fade-in"
          style={{ animationDelay: "180ms" }}
        >
          <button
            onClick={() => scrollTo("work")}
            className="group inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <span aria-hidden>→</span>
            <span className="border-b border-transparent group-hover:border-primary/60">
              See the work
            </span>
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="group inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <span aria-hidden>→</span>
            <span className="border-b border-transparent group-hover:border-primary/60">
              Get in touch
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
