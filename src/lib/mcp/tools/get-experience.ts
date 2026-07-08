import { defineTool } from "@lovable.dev/mcp-js";

const experiences = [
  {
    company: "Duru Cooperation",
    role: "Backend Developer – Product Development",
    period: "July 2025 - Present",
    location: "Bengaluru, India",
    product: "Duruper – Global Recruitment Platform",
    techStack: "Java 21 · Spring Boot · Hexagonal Architecture · Google Gemini · PostgreSQL · pgvector · REST",
    achievements: [
      "Building backend features for Duruper — a global recruitment platform — using Java 21 and Spring Boot following Hexagonal Architecture (Ports & Adapters) principles.",
      "Architected an enterprise-grade AI-powered CV Parsing system integrating Apache Tika and Google Gemini 2.5 Flash LLM, with rate limiting for secure and scalable API consumption — reducing manual resume processing time by ~80% with ~90% parsing accuracy via schema-driven prompt engineering.",
      "Built an AI Candidate Fitness Scoring system that generates 0–100 job-fit scores using Gemini LLM, enabling recruiters to rank and filter applicants quickly with async, resilient pipelines.",
      "Developed an AI job classification engine using Gemini embeddings (768-d) and PostgreSQL pgvector cosine similarity — analyzing job title, description and skills to auto-suggest Job Function & Industry in real time.",
      "Built an end-to-end WhatsApp recruitment funnel (Meta Cloud API) where candidates sign up, apply, and pay via Razorpay inside a single WhatsApp conversation, with a webhook-driven conversation engine and recruiter tracking dashboard.",
      "Designed scalable REST APIs and Swagger-friendly contracts to integrate Duruper's frontend and external systems with reliable throughput and clean integration boundaries.",
      "Reduced CI/CD deployment time ~40% (18 → 11 min) by removing redundant Gradle builds from Docker images and adding Gradle dependency caching in GitHub Actions, lowering CI infrastructure costs.",
      "Leveraged Gradle for build automation, Swagger for API docs and Sentry for monitoring & error tracking; collaborated with PMs, designers, frontend and QA in an Agile (Jira) environment.",
      "Conducted technical interviews and candidate evaluations for backend roles, assessing Java, Spring Boot and problem-solving skills.",
    ],
  },
  {
    company: "Cognizant Technology Solutions",
    role: "Software Engineer",
    period: "May 2022 - Nov 2024",
    location: "Bengaluru, India",
    techStack: "Java · Spring Boot · Microservices · MySQL",
    achievements: [
      "Designed scalable RESTful APIs with Spring Boot, improving response times by 10%.",
      "Optimized database queries using JPA and MySQL, reducing retrieval times by 15%.",
      "Achieved 90%+ test coverage via comprehensive unit and integration tests.",
      "Conducted 100+ technical interviews for Java backend developer positions.",
    ],
  },
];

export default defineTool({
  name: "get_experience",
  title: "Get work experience",
  description: "Get Kanhaiya Kumar's work experience history with roles, companies, tech stacks and achievements.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(experiences, null, 2) }],
    structuredContent: { experiences },
  }),
});