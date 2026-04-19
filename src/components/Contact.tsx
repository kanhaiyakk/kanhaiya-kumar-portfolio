import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { EarthCanvas } from "./three/EarthCanvas";

const info = [
  { icon: Mail, label: "Email", value: "kanhaiya.kk20598@gmail.com", link: "mailto:kanhaiya.kk20598@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 8804936144", link: "tel:+918804936144" },
  { icon: MapPin, label: "Location", value: "Bengaluru, India", link: null as string | null },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/kanhaiya20598", link: "https://www.linkedin.com/in/kanhaiya20598/" },
  { icon: Github, label: "GitHub", value: "github.com/kanhaiyakk", link: "https://github.com/kanhaiyakk" },
];

export function Contact() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Get In Touch" subtitle="Looking for a Backend Developer? Let's connect." />

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <ScrollReveal direction="left">
            <Card className="p-8 md:p-10 bg-gradient-card border-border/50 h-full">
              <div className="space-y-5 mb-8">
                {info.map((c) => (
                  <div key={c.label} className="flex items-start gap-4 group">
                    <div className="p-2.5 rounded-lg gradient-primary group-hover:shadow-glow transition-smooth flex-shrink-0">
                      <c.icon className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">{c.label}</p>
                      {c.link ? (
                        <a
                          href={c.link}
                          target={c.link.includes("linkedin.com") ? "_top" : c.link.startsWith("http") ? "_blank" : undefined}
                          rel={c.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm text-foreground font-medium hover:text-primary transition-smooth break-all"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground font-medium">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground mb-4">Open to opportunities in Backend Development, Microservices, and System Design.</p>
                <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 shadow-glow"
                  onClick={() => (window.location.href = "mailto:kanhaiya.kk20598@gmail.com")}>
                  <Mail className="mr-2 h-5 w-5" /> Send Email
                </Button>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="h-[450px] lg:h-full min-h-[400px] rounded-2xl glass border border-border/50 overflow-hidden">
              <EarthCanvas />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
