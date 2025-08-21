import { Heart, Code, Coffee } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Student Resources Hub</h3>
            <p className="text-muted-foreground mb-4">
              Quality educational resources and projects by a passionate CS student.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>and</span>
              <Coffee className="h-4 w-4 text-amber-500" />
              <span>by a student</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Programming Projects</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Study Materials</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Research Papers</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 Student Resources Hub. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code className="h-4 w-4" />
            <span>Built with React & TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;