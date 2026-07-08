import { defineTool } from "@lovable.dev/mcp-js";

const skills = [
  { category: "Languages", skills: ["Java 21"] },
  { category: "Frameworks", skills: ["Spring Boot", "Spring MVC", "Spring Data JPA", "Spring Security", "Hibernate"] },
  { category: "Backend & Architecture", skills: ["REST APIs", "Microservices", "Hexagonal Architecture", "Rate Limiting"] },
  { category: "AI / Intelligent Systems", skills: ["LLM Integration", "Google Gemini API", "AI-powered CV Parsing", "Semantic Search", "Embeddings", "Document Processing", "pgvector"] },
  { category: "Databases", skills: ["MySQL", "PostgreSQL", "pgvector"] },
  { category: "Tools", skills: ["Gradle", "Git", "GitHub", "Docker", "Postman", "Swagger", "Sentry", "Jira"] },
  { category: "Integrations", skills: ["Meta WhatsApp Cloud API", "Razorpay Payment Integration", "Webhook Integration", "MSG91 / Twilio SMS"] },
  { category: "Testing", skills: ["JUnit", "Mockito"] },
  { category: "Cloud", skills: ["AWS", "Azure"] },
  { category: "Core CS", skills: ["DSA", "OOPs", "Collections", "Java 8+"] },
  { category: "Methodology", skills: ["Agile", "TDD", "Code Review"] },
];

export default defineTool({
  name: "get_skills",
  title: "Get skills",
  description: "Get Kanhaiya Kumar's technical skills grouped by category (languages, frameworks, AI, databases, etc.).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(skills, null, 2) }],
    structuredContent: { categories: skills },
  }),
});