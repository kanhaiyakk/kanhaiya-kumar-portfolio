import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import getSkills from "./tools/get-skills";
import getExperience from "./tools/get-experience";
import getContact from "./tools/get-contact";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "kanhaiya-kumar-portfolio-mcp",
  title: "Kanhaiya Kumar Portfolio MCP",
  version: "0.1.0",
  instructions:
    "Tools for exploring Kanhaiya Kumar's developer portfolio. Use `get_profile` for a summary, `get_skills` for the tech stack, `get_experience` for work history, and `get_contact` for public contact details.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getProfile, getSkills, getExperience, getContact],
});