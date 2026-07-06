import { defineTool } from "@lovable.dev/mcp-js";

const contact = {
  email: "kanhaiya.kk20598@gmail.com",
  phone: "+91 8804936144",
  location: "Bengaluru, India",
  linkedin: "https://www.linkedin.com/in/kanhaiya20598/",
  github: "https://github.com/kanhaiyakk",
  openTo: "Backend Development, Microservices, and System Design opportunities.",
};

export default defineTool({
  name: "get_contact",
  title: "Get contact info",
  description: "Get Kanhaiya Kumar's public contact details and social links (email, phone, LinkedIn, GitHub).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
    structuredContent: contact,
  }),
});