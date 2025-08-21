import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  // Sample project data - you'll replace this with your actual projects
  const projects = [
    {
      id: 1,
      title: "React E-commerce Dashboard",
      description: "Complete admin dashboard with React, TypeScript, and modern UI components. Includes authentication, charts, and data management.",
      category: "programming" as const,
      tags: ["React", "TypeScript", "Tailwind", "Vite"],
      downloadCount: 245,
      rating: 4.8,
      suggestedPrice: 149,
    },
    {
      id: 2,
      title: "Data Structures & Algorithms Notes",
      description: "Comprehensive study material covering all major DSA topics with examples, complexity analysis, and practice problems.",
      category: "study-material" as const,
      tags: ["DSA", "Programming", "Interview Prep", "PDF"],
      downloadCount: 892,
      rating: 4.9,
      suggestedPrice: 99,
    },
    {
      id: 3,
      title: "Modern Resume Templates",
      description: "Professional resume templates for CS students and developers. Multiple formats including LaTeX and Word versions.",
      category: "template" as const,
      tags: ["Resume", "LaTeX", "Word", "Professional"],
      downloadCount: 567,
      rating: 4.7,
      suggestedPrice: 79,
    },
    {
      id: 4,
      title: "Machine Learning Research Paper",
      description: "Original research on neural network optimization techniques. Includes code implementation and detailed analysis.",
      category: "research" as const,
      tags: ["ML", "Neural Networks", "Research", "Python"],
      downloadCount: 123,
      rating: 4.6,
      suggestedPrice: 199,
    },
    {
      id: 5,
      title: "Database Management System Notes",
      description: "Complete DBMS study material with SQL queries, normalization concepts, and real-world examples.",
      category: "study-material" as const,
      tags: ["DBMS", "SQL", "Database", "Study Material"],
      downloadCount: 634,
      rating: 4.8,
      suggestedPrice: 89,
    },
    {
      id: 6,
      title: "Full-Stack MERN Application",
      description: "Social media platform built with MongoDB, Express, React, and Node.js. Includes authentication and real-time features.",
      category: "programming" as const,
      tags: ["MERN", "MongoDB", "React", "Node.js"],
      downloadCount: 398,
      rating: 4.9,
      suggestedPrice: 299,
    },
  ];

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleContribute = (project: any) => {
    toast({
      title: "Payment Integration Coming Soon!",
      description: `Contribute ₹${project.suggestedPrice} for "${project.title}"`,
    });
  };

  const handleFreeDownload = (project: any) => {
    toast({
      title: "Download Started",
      description: `Downloading "${project.title}" for free. Thank you for your interest!`,
    });
  };

  return (
    <section id="projects" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Projects & Resources</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover high-quality projects, study materials, and templates created during my academic journey
          </p>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="programming">Programming</TabsTrigger>
            <TabsTrigger value="study-material">Study Material</TabsTrigger>
            <TabsTrigger value="template">Templates</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  tags={project.tags}
                  downloadCount={project.downloadCount}
                  rating={project.rating}
                  suggestedPrice={project.suggestedPrice}
                  onContribute={() => handleContribute(project)}
                  onFreeDownload={() => handleFreeDownload(project)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;