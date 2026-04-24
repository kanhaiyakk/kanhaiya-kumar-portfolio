import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/kanhaiyakk", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/kanhaiya20598/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:kanhaiya.kk20598@gmail.com", label: "Email", isEmail: true },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="font-mono-ui text-xs">
          <p className="text-foreground">Kanhaiya Kumar</p>
          <p className="text-muted-foreground mt-1">
            Built and maintained in Bengaluru.
          </p>
        </div>

        <div className="flex gap-2">
          {socials.map(({ icon: Icon, href, label, isEmail }) => (
            <a
              key={href}
              href={href}
              target={isEmail ? undefined : "_blank"}
              rel={isEmail ? undefined : "noopener noreferrer"}
              aria-label={label}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
