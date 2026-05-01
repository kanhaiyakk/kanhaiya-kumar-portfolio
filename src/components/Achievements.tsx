import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Code, Award, ExternalLink, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

const platforms = [
  { name: "LeetCode", problems: "300+", link: "https://leetcode.com/u/kanhaiya20598/", icon: Code, color: "text-yellow-400" },
  { name: "GeeksforGeeks", problems: "200+", link: "https://www.geeksforgeeks.org/user/kanh20598/", icon: Code, color: "text-green-400" },
  { name: "HackerRank", problems: "100+", link: "https://www.hackerrank.com/", icon: Trophy, color: "text-emerald-400" },
];

export function Achievements() {
  return (
    <section id="achievements" className="section-padding bg-muted/20 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Achievements & Certifications" />

        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal direction="left">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-bold">Problem Solving</h3>
            </div>

            <div className="space-y-4">
              {platforms.map((p) => (
                <Card key={p.name} className="p-5 hover-lift bg-gradient-card border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <p.icon className={`h-7 w-7 ${p.color}`} />
                    <div>
                      <h4 className="font-bold text-base">{p.name}</h4>
                      <p className="text-xl font-bold text-primary">{p.problems}</p>
                      <p className="text-xs text-muted-foreground">Problems Solved</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full border-border hover:border-primary/60">
                    <a href={p.link} target="_blank" rel="noopener noreferrer">
                      View Profile <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </Card>
              ))}
            </div>

            <Card className="mt-4 p-5 gradient-primary text-primary-foreground text-center shadow-glow">
              <p className="text-4xl font-bold">500+</p>
              <p className="text-base font-semibold opacity-90">Total Problems Solved</p>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="flex items-center gap-2 mb-6">
              <Award className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-bold">Certifications & Recognition</h3>
            </div>

            <div className="space-y-4">
              <Card className="p-5 hover-lift bg-gradient-card border-border/50">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg gradient-primary"><Award className="h-5 w-5 text-primary-foreground" /></div>
                  <div>
                    <h4 className="font-bold text-base mb-1">Microsoft Certified: Azure Fundamentals</h4>
                    <p className="text-sm text-muted-foreground">Microsoft</p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 hover-lift bg-gradient-card border-border/50">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg gradient-primary"><Sparkles className="h-5 w-5 text-primary-foreground" /></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-base mb-1">Generative AI Fundamentals</h4>
                    <p className="text-sm text-muted-foreground mb-2">Databricks</p>
                    <a
                      href="https://credentials.databricks.com/32c7a21c-3df9-40a7-b71d-f84effe0015e"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      Verify credential <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-5 hover-lift bg-gradient-card border-border/50">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg gradient-primary"><Sparkles className="h-5 w-5 text-primary-foreground" /></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-base mb-1">AI / LLM Engineering Certification</h4>
                    <p className="text-sm text-muted-foreground mb-2">Skilljar</p>
                    <a
                      href="https://verify.skilljar.com/c/uqtyytyptppt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      Verify credential <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-5 hover-lift bg-gradient-card border-border/50">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg gradient-primary"><Award className="h-5 w-5 text-primary-foreground" /></div>
                  <div>
                    <h4 className="font-bold text-base mb-1">Technical Interviewer</h4>
                    <p className="text-sm text-muted-foreground">Conducted 20+ interviews for Java backend roles</p>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
