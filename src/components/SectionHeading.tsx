import { ScrollReveal } from "./ScrollReveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: React.ReactNode;
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <ScrollReveal className="mb-16 max-w-3xl">
      {eyebrow && (
        <p className="font-mono-ui text-xs text-muted-foreground mb-4">
          // {eyebrow}
        </p>
      )}
      <h2 className="font-display font-bold text-foreground text-4xl md:text-5xl leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
