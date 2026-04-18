import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { StarsCanvas } from "@/components/three/StarsCanvas";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-background">
      {/* Global animated star-field behind everything */}
      <StarsCanvas />

      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <FeaturedProjects />
        <Projects />
        <Achievements />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
