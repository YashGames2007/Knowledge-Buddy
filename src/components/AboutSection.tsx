import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Code, BookOpen, Award, Github, Linkedin, Mail } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">About the Creator</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Passionate computer science student sharing knowledge and projects with the community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* About Content */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold">Yash Bhavsar</h3>
                <p className="text-sm sm:text-base text-muted-foreground">AI & Data Science Student | Game Developer</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              I'm Yash Bhavsar, a passionate student pursuing a Bachelor's Degree in Artificial Intelligence 
              and Data Science. With a deep interest in Game Development and over 4 years of coding experience, 
              I've created 20+ projects ranging from educational resources to innovative applications.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every resource here represents hours of research, coding, and refinement. While I offer 
              everything for free, contributions help me continue creating and sharing valuable content 
              with the community. Check out my complete portfolio for more of my work!
            </p>

            <a 
              href="https://yashgames2007-dev-portfolio-web.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              View My Portfolio
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Skills */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Technical Skills</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  "React", "TypeScript", "Node.js", "Python", "Java", "MongoDB", 
                  "PostgreSQL", "AWS", "Docker", "Git", "Machine Learning", "Data Structures"
                ].map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs sm:text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
              <a href="#" className="p-3 bg-card border border-border rounded-lg hover:bg-secondary transition-colors">
                <Github className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="p-3 bg-card border border-border rounded-lg hover:bg-secondary transition-colors">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="p-3 bg-card border border-border rounded-lg hover:bg-secondary transition-colors">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <Card className="bg-card border-border/50">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="p-2 sm:p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-2 sm:mb-4">
                  <Code className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-primary mb-1 sm:mb-2">4+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Years of Coding</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="p-2 sm:p-3 bg-accent/10 rounded-lg w-fit mx-auto mb-2 sm:mb-4">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-accent mb-1 sm:mb-2">20+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Projects Created</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="p-2 sm:p-3 bg-success/10 rounded-lg w-fit mx-auto mb-2 sm:mb-4">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-success mb-1 sm:mb-2">AI & DS</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Specialization</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="p-2 sm:p-3 bg-warning/10 rounded-lg w-fit mx-auto mb-2 sm:mb-4">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-warning" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-warning mb-1 sm:mb-2">Game Dev</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Core Interest</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;