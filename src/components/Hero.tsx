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
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent leading-normal pb-2">
            Knowledge Buddy
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 mb-4 sm:mb-6">
            Student Resources Hub
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Premium projects, study materials, and academic resources created by a passionate degree student. 
            Pay what you think it's worth, or download for free.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 w-full px-2 sm:px-0">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto text-base sm:text-lg py-5 sm:py-6"
          >
            Explore Projects
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto text-base sm:text-lg py-5 sm:py-6"
          >
            About Me
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-center px-2">
          <div className="bg-card/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-border/50">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">50+</div>
            <div className="text-sm sm:text-base text-muted-foreground">Projects Available</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-border/50">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">1000+</div>
            <div className="text-sm sm:text-base text-muted-foreground">Happy Students</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-border/50">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">99 Rs</div>
            <div className="text-sm sm:text-base text-muted-foreground">Suggested Contribution</div>
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