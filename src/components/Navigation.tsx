import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#featured-project", label: "Featured" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
          scrolled ? "glass-strong border-b border-border/50" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); go("#home"); }}
              className="text-2xl font-bold text-gradient"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              KK<span className="text-primary">.</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                <Button
                  key={l.href}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-primary/10"
                  onClick={(e) => { e.preventDefault(); go(l.href); }}
                >
                  {l.label}
                </Button>
              ))}
            </div>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden glass-strong pt-20">
          <div className="flex flex-col items-center gap-2 p-8">
            {navLinks.map((l) => (
              <Button
                key={l.href}
                variant="ghost"
                className="text-lg w-full"
                onClick={(e) => { e.preventDefault(); go(l.href); }}
              >
                {l.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
