import { Button } from "@/components/ui/button";
import { Github, Mail, Download, Linkedin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import profilePhoto from "@/assets/Kanhaiya_profile_photo.jpg";
import { HeroCanvas } from "./three/HeroCanvas";

const roles = [
  "Java Backend Developer",
  "Spring Boot Engineer",
  "Microservices Architect",
  "REST API Designer",
  "DSA Enthusiast",
];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % roles.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center hero-cinematic overflow-hidden pt-20">
      {/* 3D scene fills the right half on desktop, full background on mobile */}
      <div className="absolute inset-0 opacity-95">
        <HeroCanvas />
      </div>
      {/* Gradient mask so text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30 md:from-background/95 md:via-background/70 md:to-background/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16">
        {/* Left: copy */}
        <div className="text-center md:text-left max-w-3xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex md:justify-start justify-center"
          >
            <div className="avatar-glow rounded-full">
              <img
                src={profilePhoto}
                alt="Kanhaiya Kumar — Java Backend Developer"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-background"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm uppercase tracking-[0.4em] text-primary mb-3"
          >
            Hi, I'm
          </motion.p>

          <motion.h1
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 name-shimmer text-glow"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Kanhaiya Kumar
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="h-9 mb-5"
          >
            <motion.p
              key={i}
              initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl md:text-2xl font-semibold text-accent"
            >
              {roles[i]}
            </motion.p>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl md:mx-0 mx-auto leading-relaxed"
          >
            I craft scalable, high-performance backend systems with Java, Spring Boot & Microservices —
            architected for resilience, tested to 90% coverage, and shipped with care.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-3 md:justify-start justify-center"
          >
            <a href="/Kanhaiya_Kumar_Resume.pdf" download="Kanhaiya_Kumar_Resume.pdf">
              <Button size="lg" className="gradient-primary hover:opacity-90 transition-smooth shadow-glow text-primary-foreground">
                <Download className="mr-2 h-5 w-5" /> Download Resume
              </Button>
            </a>
            <Button size="lg" variant="outline" className="border-primary/40 hover:border-primary hover:bg-primary/10 transition-smooth"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              <Mail className="mr-2 h-5 w-5" /> Contact
            </Button>
            <Button asChild size="icon" variant="outline" className="border-primary/40 hover:border-primary hover:bg-primary/10">
              <a href="https://github.com/kanhaiyakk" target="_blank" rel="noopener noreferrer" aria-label="Open GitHub profile">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="icon" variant="outline" className="border-primary/40 hover:border-primary hover:bg-primary/10">
              <a
                href="https://www.linkedin.com/in/kanhaiya20598/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>

      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="h-6 w-6 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
