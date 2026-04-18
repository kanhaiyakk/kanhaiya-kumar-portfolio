import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const socials = [
  { icon: Github, href: "https://github.com/kanhaiyakk" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/kanhaiya20598/" },
  { icon: Mail, href: "mailto:kanhaiya.kk20598@gmail.com", isEmail: true },
];

export function Footer() {
  return (
    <footer className="bg-card/40 backdrop-blur border-t border-border py-10 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-1 text-gradient" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Kanhaiya Kumar</h3>
            <p className="text-sm text-muted-foreground">Java Backend Developer · Building Scalable Systems</p>
          </div>

          <div className="flex gap-2">
            {socials.map(({ icon: Icon, href, isEmail }) => (
              <Button
                key={href}
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-smooth"
                onClick={() => (isEmail ? (window.location.href = href) : window.open(href, "_blank"))}
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center text-muted-foreground text-xs">
          © {new Date().getFullYear()} Kanhaiya Kumar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
