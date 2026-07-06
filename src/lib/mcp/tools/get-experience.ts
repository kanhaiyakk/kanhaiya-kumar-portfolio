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
      "Building backend features for Duruper using Java 21 and Spring Boot with Hexagonal Architecture (Ports & Adapters).",
      "Architected an AI-powered CV Parsing system with Apache Tika and Gemini 2.5 Flash — ~80% less manual processing time, ~90% parsing accuracy.",
      "Built an AI Candidate Fitness Scoring system generating 0–100 job-fit scores using Gemini LLM.",
      "Developed an AI job classification engine using Gemini embeddings (768-d) and PostgreSQL pgvector cosine similarity.",
      "Reduced CI/CD deployment time ~40% (18 → 11 min) via Gradle caching in GitHub Actions.",
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
  {
    company: "Agimus Technologies",
    role: "IoT Intern",
    period: "Internship",
    location: "Remote",
    techStack: "IoT · Embedded systems",
    achievements: ["Worked on IoT-based projects and gained hands-on experience with emerging technologies."],
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