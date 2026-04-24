import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

const info = [
  { icon: Mail, label: "Email", value: "kanhaiya.kk20598@gmail.com", link: "mailto:kanhaiya.kk20598@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 8804936144", link: "tel:+918804936144" },
  { icon: MapPin, label: "Location", value: "Bengaluru, India", link: null as string | null },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/kanhaiya20598", link: "https://www.linkedin.com/in/kanhaiya20598/" },
  { icon: Github, label: "GitHub", value: "github.com/kanhaiyakk", link: "https://github.com/kanhaiyakk" },
];

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk backend."
          subtitle="Open to backend, microservices, and platform roles. The fastest way to reach me is email."
        />

        <ScrollReveal>
          <dl className="divide-y divide-white/5 border-y border-white/5">
            {info.map((c) => (
              <div
                key={c.label}
                className="grid grid-cols-[120px_1fr] items-center py-5 gap-4"
              >
                <dt className="font-mono-ui text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <c.icon className="h-3.5 w-3.5" />
                  {c.label}
                </dt>
                <dd className="font-mono-ui text-sm md:text-base">
                  {c.link ? (
                    <a
                      href={c.link}
                      target={c.link.startsWith("http") ? "_blank" : undefined}
                      rel={c.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-foreground hover:text-primary transition-colors break-all"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-foreground">{c.value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  );
}
