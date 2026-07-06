import { defineTool } from "@lovable.dev/mcp-js";

const profile = {
  name: "Kanhaiya Kumar",
  title: "Backend Developer",
  location: "Bengaluru, India",
  summary:
    "Backend Developer building AI-powered, production-grade systems with Java 21, Spring Boot and Hexagonal Architecture. Integrates Google Gemini LLMs, 768-d embeddings and PostgreSQL pgvector to ship intelligent recruitment workflows.",
  highlights: [
    "AI-Powered Backend — Gemini 2.0 Flash LLM integration, ~90% CV parsing accuracy & AI fitness scoring",
    "Semantic Search — pgvector + 768-d embeddings for real-time auto-suggestion at scale",
    "Hexagonal Architecture — Java 21 & Spring Boot with cleanly separated adapters",
    "Test-Driven Delivery — JUnit & Mockito with 85–90%+ coverage and 40% faster CI/CD",
  ],
  resumeUrl: "/Kanhaiya_Kumar_Resume.pdf",
};

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description: "Get Kanhaiya Kumar's professional profile summary, title, location and highlights.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
    structuredContent: profile,
  }),
});