import { Heart, Code, Coffee } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-primary">Student Resources Hub</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              Quality educational resources and projects by a passionate CS student.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
              <span>and</span>
              <Coffee className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
              <span>by YashGames2007</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li><a href="https://yashgames2007-dev-portfolio-web.netlify.app/pages/projects/projects" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="https://yashgames2007-dev-portfolio-web.netlify.app/pages/about/about" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="mailto:yashbhavsar.dev2007@gmail.com" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Categories</h4>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Notes</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Presentations</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Reference Material</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="text-muted-foreground text-xs sm:text-sm text-center md:text-left">
            © 2024 Student Resources Hub. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Code className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Built with React & TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;