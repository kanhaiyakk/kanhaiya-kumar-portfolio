import { ScrollReveal } from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: React.ReactNode;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <ScrollReveal className="text-center mb-16">
      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">What I bring</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {title}
      </h2>
      <div className="w-20 h-1 gradient-primary mx-auto rounded-full" />
      {subtitle && (
        <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </ScrollReveal>
  );
}
