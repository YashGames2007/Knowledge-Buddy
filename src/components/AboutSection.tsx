import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Code, BookOpen, Award, Github, Linkedin, Mail } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">About the Creator</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate computer science student sharing knowledge and projects with the community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Final Year CS Student</h3>
                <p className="text-muted-foreground">Specializing in Full-Stack Development & AI</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate computer science student in my final year, dedicated to creating high-quality 
              educational resources and open-source projects. My journey through academics has led me to 
              develop comprehensive study materials, innovative projects, and practical templates that I now 
              share with fellow students and developers.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Every resource here represents hours of research, coding, and refinement. While I offer 
              everything for free, contributions help me continue creating and sharing valuable content 
              with the community.
            </p>

            {/* Skills */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "React", "TypeScript", "Node.js", "Python", "Java", "MongoDB", 
                  "PostgreSQL", "AWS", "Docker", "Git", "Machine Learning", "Data Structures"
                ].map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-card border border-border rounded-lg hover:bg-secondary transition-colors">
                <Github className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="p-2 bg-card border border-border rounded-lg hover:bg-secondary transition-colors">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="p-2 bg-card border border-border rounded-lg hover:bg-secondary transition-colors">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">3+</div>
                <div className="text-muted-foreground">Years of Coding</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-accent/10 rounded-lg w-fit mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent mb-2">50+</div>
                <div className="text-muted-foreground">Projects Created</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-success/10 rounded-lg w-fit mx-auto mb-4">
                  <Award className="h-6 w-6 text-success" />
                </div>
                <div className="text-2xl font-bold text-success mb-2">95%</div>
                <div className="text-muted-foreground">Academic Average</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-warning/10 rounded-lg w-fit mx-auto mb-4">
                  <GraduationCap className="h-6 w-6 text-warning" />
                </div>
                <div className="text-2xl font-bold text-warning mb-2">2024</div>
                <div className="text-muted-foreground">Expected Graduation</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;