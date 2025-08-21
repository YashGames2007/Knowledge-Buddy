import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
