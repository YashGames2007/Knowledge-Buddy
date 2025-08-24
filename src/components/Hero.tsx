import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Student Resources Hub
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Premium projects, study materials, and academic resources created by a passionate degree student. 
            Pay what you think it's worth, or download for free.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="hero" size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Projects
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            About Me
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Projects Available</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50">
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground">Happy Students</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50">
            <div className="text-3xl font-bold text-primary mb-2">Rs 99</div>
            <div className="text-muted-foreground">Suggested Contribution</div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
    </section>
  );
};

export default Hero;