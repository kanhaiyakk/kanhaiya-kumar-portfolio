import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Notes } from "@/components/Notes";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Work />
        <Experience />
        <About />
        <Notes />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
