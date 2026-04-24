import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
          scrolled ? "nav-blur" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); go("#home"); }}
              className="font-mono-ui text-sm tracking-tight text-foreground hover:text-primary transition-colors"
            >
              kk<span className="text-primary">.</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={(e) => { e.preventDefault(); go(l.href); }}
                  className="font-mono-ui text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur pt-20">
          <div className="flex flex-col items-start gap-1 p-8">
            {navLinks.map((l) => (
              <button
                key={l.href}
                className="font-display text-3xl py-3 text-foreground hover:text-primary transition-colors"
                onClick={(e) => { e.preventDefault(); go(l.href); }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
