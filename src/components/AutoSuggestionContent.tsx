import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle, TrendingUp, Layers, Server, Shield } from "lucide-react";

export function AutoSuggestionContent() {
  return (
    <div className="space-y-8">
      <div>
        <Badge className="mb-4 gradient-primary border-0 text-primary-foreground">
          AI & Vector Search · Enterprise Backend
        </Badge>
        <h3 className="text-2xl md:text-3xl font-bold mb-3">AI-Powered Auto Suggestion System</h3>
        <p className="text-muted-foreground leading-relaxed">
          AI-powered suggestion engine built with <strong className="text-foreground">Hexagonal Architecture</strong> that converts a job posting's title, description, and skills into a <strong className="text-foreground">768-dim vector embedding</strong> via Google Gemini, then matches it against pre-computed embeddings in <strong className="text-foreground">PostgreSQL pgvector</strong> using cosine similarity — eliminating manual tagging with zero-latency semantic search.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-sm text-primary mb-3">Technology Stack</h4>
        <div className="flex flex-wrap gap-2">
          {["Java 21", "Spring Boot", "Hexagonal Architecture", "Gemini Embeddings", "PostgreSQL + pgvector", "Cosine Similarity", "768-dim Vectors", "JPA", "REST", "JWT"].map((t) => (
            <Badge key={t} variant="outline" className="text-sm">{t}</Badge>
          ))}
        </div>
      </div>

      <div className="p-5 bg-muted/40 rounded-lg border border-border/40">
        <h4 className="text-base font-semibold mb-3 flex items-center gap-2"><Layers className="h-5 w-5 text-primary" /> Architecture & Design</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            { l: "Controller Layer:", d: "REST endpoint mapping job title, description and skills into domain objects." },
            { l: "Application Layer:", d: "Builds query text, generates embeddings via Gemini, orchestrates dual vector searches." },
            { l: "Domain Layer:", d: "Immutable value objects with factory methods and sentinel handling." },
            { l: "Adapter Layer:", d: "Gemini HTTP adapter + JPA adapters executing pgvector cosine distance queries." },
          ].map((it) => (
            <li key={it.l} className="flex items-start gap-2"><span className="text-accent font-bold">→</span><span><strong className="text-foreground">{it.l}</strong> {it.d}</span></li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="text-lg font-semibold flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Key Features</h4>
          <ul className="space-y-2">
            {["Semantic search via 768-dim embeddings", "Single API returns job function + industry", "Pre-computed embeddings — works offline from LLM", "Hierarchical industry path embedding"].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm"><CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{f}</span></li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-lg font-semibold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Impact</h4>
          <ul className="space-y-2">
            {["Eliminated manual classification — AI suggests in real-time", "Sub-second vector search via pgvector (<=>)", "Reduced recruiter form-fill time", "Scalable to thousands of categories with HNSW indexing"].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm"><CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{f}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-5 bg-muted/40 rounded-lg border border-border/40">
        <h4 className="text-base font-semibold mb-3 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Design Principles</h4>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
          {[
            { t: "Dependency Inversion", d: "App depends on abstractions, not implementations" },
            { t: "Single Responsibility", d: "Each class has one well-defined purpose" },
            { t: "Open/Closed", d: "Extensible for new embedding providers without modifying core" },
            { t: "DDD", d: "Immutable value objects with encapsulated logic" },
          ].map((p) => (
            <div key={p.t} className="flex items-start gap-2"><span className="text-accent font-bold">✓</span><span><strong className="text-foreground">{p.t}</strong> — {p.d}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
