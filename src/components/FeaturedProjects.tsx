import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Brain, Search, TrendingUp, Zap, CheckCircle, Layers, Server } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { AutoSuggestionContent } from "./AutoSuggestionContent";

function CVParsingContent() {
  return (
    <div className="space-y-8">
      <div>
        <Badge className="mb-4 gradient-primary border-0 text-primary-foreground">AI & ML · Enterprise Backend</Badge>
        <h3 className="text-2xl md:text-3xl font-bold mb-3">AI-Powered CV Parsing System</h3>
        <p className="text-muted-foreground leading-relaxed">
          Enterprise-grade resume parsing engine built with <strong className="text-foreground">Hexagonal Architecture</strong>, leveraging Apache Tika for multi-format document processing and Google Gemini 2.5 Flash LLM for intelligent structured data extraction — enabling fully automated candidate profile creation.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-sm text-primary mb-3">Technology Stack</h4>
        <div className="flex flex-wrap gap-2">
          {["Java 21", "Spring Boot", "Hexagonal Architecture", "Apache Tika 2.9.1", "Gemini 2.5 Flash", "PostgreSQL", "JPA", "REST API", "JWT", "Swagger"].map((t) => (
            <Badge key={t} variant="outline" className="text-sm">{t}</Badge>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="text-lg font-semibold flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Key Features</h4>
          <ul className="space-y-2">
            {["Automated extraction into validated JSON", "One-click profile auto-population", "Multi-format support (PDF, DOCX, RTF, ODT, TXT)", "Schema-driven JSON validation", "Atomic transactional persistence"].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm"><CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{f}</span></li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-lg font-semibold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Impact</h4>
          <ul className="space-y-2">
            {["~90% parsing accuracy via prompt engineering", "Manual data entry reduced to seconds", "2–5s LLM response at $0.075 per 1M tokens", "Provider-agnostic — easy LLM swap", "Structured error handling with HTTP responses"].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm"><CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{f}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-5 bg-muted/40 rounded-lg border border-border/40">
        <h4 className="text-base font-semibold mb-3 flex items-center gap-2"><Server className="h-5 w-5 text-primary" /> Technical Highlights</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {["Prompt templates with JSON schema for consistent LLM output", "Pipeline cleans LLM responses + auto-calculates work experience", "Port interfaces decouple core from Tika/Gemini", "JWT auth + 11MB file size validation", "@Transactional ensures atomic saves with full rollback"].map((h) => (
            <li key={h} className="flex items-start gap-2"><span className="text-accent font-bold">•</span><span>{h}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FitnessContent() {
  return (
    <div className="space-y-8">
      <div>
        <Badge className="mb-4 gradient-primary border-0 text-primary-foreground">AI · Recruitment Automation</Badge>
        <h3 className="text-2xl md:text-3xl font-bold mb-3">AI-Powered Application Fitness Scoring</h3>
        <p className="text-muted-foreground leading-relaxed">
          An intelligent candidate-to-job matching engine built with <strong className="text-foreground">Hexagonal Architecture</strong>, using Gemini 2.5 Flash to generate fitness scores (0–100) so recruiters can instantly rank applicants.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-sm text-primary mb-3">Technology Stack</h4>
        <div className="flex flex-wrap gap-2">
          {["Java 21", "Spring Boot", "Hexagonal Architecture", "Gemini 2.5 Flash", "PostgreSQL", "JPA", "REST", "JWT", "Async Processing"].map((t) => (
            <Badge key={t} variant="outline" className="text-sm">{t}</Badge>
          ))}
        </div>
      </div>

      <div className="p-5 bg-muted/40 rounded-lg border border-border/40">
        <h4 className="text-base font-semibold mb-3 flex items-center gap-2"><Layers className="h-5 w-5 text-primary" /> Architecture</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            { l: "Controller Layer:", d: "Receives applications via REST, triggers fitness evaluation asynchronously." },
            { l: "Application Layer:", d: "Fetches application + resume + posting data, delegates to AI adapter." },
            { l: "Domain Layer:", d: "Immutable value objects with sentinel values (-1) instead of nulls." },
            { l: "Adapter Layer:", d: "Gemini LLM adapter for AI scoring + JPA adapter for persistence." },
          ].map((it) => (
            <li key={it.l} className="flex items-start gap-2"><span className="text-accent font-bold">→</span><span><strong className="text-foreground">{it.l}</strong> {it.d}</span></li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="text-lg font-semibold flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Features</h4>
          <ul className="space-y-2">
            {["Automatic 0–100 suitability scoring", "Async — instant user response", "AI failures never block submissions", "Dashboard sorting/filtering", "Auto + manual re-evaluation"].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm"><CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{f}</span></li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-lg font-semibold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Impact</h4>
          <ul className="space-y-2">
            {["Eliminated manual screening", "2–5s scoring per application", "Data-driven hiring with analytics", "Scales to high-volume without blocking", "Provider-agnostic — easy swap"].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm"><CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{f}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  return (
    <section id="featured-project" className="section-padding bg-muted/20 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Featured Projects" subtitle="Production AI-powered systems I designed and shipped." />

        <ScrollReveal>
          <Tabs defaultValue="cv-parsing" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-card/60 backdrop-blur border border-border/50">
              <TabsTrigger value="cv-parsing" className="flex items-center gap-2 py-3 text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Sparkles className="h-4 w-4" /> <span className="hidden sm:inline">AI CV Parsing</span><span className="sm:hidden">CV</span>
              </TabsTrigger>
              <TabsTrigger value="fitness-scoring" className="flex items-center gap-2 py-3 text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Brain className="h-4 w-4" /> <span className="hidden sm:inline">AI Fitness Scoring</span><span className="sm:hidden">Fitness</span>
              </TabsTrigger>
              <TabsTrigger value="auto-suggestion" className="flex items-center gap-2 py-3 text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Search className="h-4 w-4" /> <span className="hidden sm:inline">AI Auto Suggestion</span><span className="sm:hidden">Suggest</span>
              </TabsTrigger>
            </TabsList>

            <Card className="p-6 md:p-10 bg-gradient-card border-border/50 hover-lift">
              <TabsContent value="cv-parsing" className="mt-0"><CVParsingContent /></TabsContent>
              <TabsContent value="fitness-scoring" className="mt-0"><FitnessContent /></TabsContent>
              <TabsContent value="auto-suggestion" className="mt-0"><AutoSuggestionContent /></TabsContent>
            </Card>
          </Tabs>
        </ScrollReveal>
      </div>
    </section>
  );
}
