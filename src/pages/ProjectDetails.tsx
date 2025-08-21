import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Heart, Star, Code, FileText, BookOpen, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ProjectDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState(99);

  // Sample project data - you'll replace this with your actual projects
  const projects = [
    {
      id: 1,
      title: "React E-commerce Dashboard",
      description: "Complete admin dashboard with React, TypeScript, and modern UI components. Includes authentication, charts, and data management.",
      fullDescription: "This comprehensive e-commerce dashboard is built with modern React patterns and TypeScript for type safety. Features include user authentication, dynamic charts using Recharts, responsive design with Tailwind CSS, and efficient state management. The dashboard includes modules for product management, order tracking, user analytics, and sales reporting. Perfect for learning full-stack development or as a starting point for your own e-commerce project.",
      category: "programming" as const,
      tags: ["React", "TypeScript", "Tailwind", "Vite"],
      downloadCount: 245,
      rating: 4.8,
      suggestedPrice: 99,
      previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&crop=entropy&auto=format",
    },
    {
      id: 2,
      title: "Data Structures & Algorithms Notes",
      description: "Comprehensive study material covering all major DSA topics with examples, complexity analysis, and practice problems.",
      fullDescription: "Complete DSA study material designed for computer science students and interview preparation. Covers arrays, linked lists, stacks, queues, trees, graphs, sorting algorithms, searching algorithms, dynamic programming, and more. Each topic includes detailed explanations, code examples in multiple languages, time/space complexity analysis, and practice problems with solutions.",
      category: "study-material" as const,
      tags: ["DSA", "Programming", "Interview Prep", "PDF"],
      downloadCount: 892,
      rating: 4.9,
      suggestedPrice: 99,
      previewImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&crop=entropy&auto=format",
    },
    {
      id: 3,
      title: "Modern Resume Templates",
      description: "Professional resume templates for CS students and developers. Multiple formats including LaTeX and Word versions.",
      fullDescription: "Collection of 5 professionally designed resume templates specifically crafted for computer science students and software developers. Includes both LaTeX source files for precise formatting and Word versions for easy editing. Templates feature modern typography, clean layouts, and sections optimized for technical roles. Comes with detailed customization guide and tips for highlighting technical skills.",
      category: "template" as const,
      tags: ["Resume", "LaTeX", "Word", "Professional"],
      downloadCount: 567,
      rating: 4.7,
      suggestedPrice: 99,
      previewImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop&crop=entropy&auto=format",
    },
    {
      id: 4,
      title: "Machine Learning Research Paper",
      description: "Original research on neural network optimization techniques. Includes code implementation and detailed analysis.",
      fullDescription: "Original research paper exploring novel optimization techniques for deep neural networks. The paper presents a comprehensive analysis of gradient descent variants and proposes an adaptive learning rate algorithm. Includes complete Python implementation using PyTorch, experimental results on standard datasets, and detailed mathematical derivations. Valuable for ML researchers and advanced students.",
      category: "research" as const,
      tags: ["ML", "Neural Networks", "Research", "Python"],
      downloadCount: 123,
      rating: 4.6,
      suggestedPrice: 99,
      previewImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=entropy&auto=format",
    },
    {
      id: 5,
      title: "Database Management System Notes",
      description: "Complete DBMS study material with SQL queries, normalization concepts, and real-world examples.",
      fullDescription: "Comprehensive DBMS study material covering relational database concepts, SQL programming, database design principles, normalization techniques, transaction management, and indexing strategies. Includes practical exercises, real-world case studies, and sample database schemas. Perfect for database courses and interview preparation.",
      category: "study-material" as const,
      tags: ["DBMS", "SQL", "Database", "Study Material"],
      downloadCount: 634,
      rating: 4.8,
      suggestedPrice: 99,
      previewImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop&crop=entropy&auto=format",
    },
    {
      id: 6,
      title: "Full-Stack MERN Application",
      description: "Social media platform built with MongoDB, Express, React, and Node.js. Includes authentication and real-time features.",
      fullDescription: "Complete social media platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Features include user authentication with JWT, real-time messaging using Socket.io, image upload with Cloudinary, responsive design, post creation and interaction, user profiles, and friend connections. Includes deployment guides for Heroku and Netlify.",
      category: "programming" as const,
      tags: ["MERN", "MongoDB", "React", "Node.js"],
      downloadCount: 398,
      rating: 4.9,
      suggestedPrice: 99,
      previewImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop&crop=entropy&auto=format",
    },
  ];

  const project = projects.find(p => p.id === parseInt(id || ""));

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
            <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Go Back Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categoryIcons = {
    programming: Code,
    "study-material": BookOpen,
    template: FileText,
    research: Star,
  };

  const categoryColors = {
    programming: "bg-primary/10 text-primary",
    "study-material": "bg-accent/10 text-accent",
    template: "bg-success/10 text-success",
    research: "bg-warning/10 text-warning",
  };

  const IconComponent = categoryIcons[project.category];
  const contributionAmounts = [99, 199, 299, 499];

  const handleContribute = () => {
    toast({
      title: "Payment Integration Coming Soon!",
      description: `Contribute ₹${selectedAmount} for "${project.title}"`,
    });
  };

  const handleFreeDownload = () => {
    toast({
      title: "Download Started",
      description: `Downloading "${project.title}" for free. Thank you for your interest!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button variant="ghost" asChild className="mb-0">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${categoryColors[project.category]}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {project.category.replace("-", " ").toUpperCase()}
                  </Badge>
                  <h1 className="text-3xl font-bold">{project.title}</h1>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-warning fill-current" />
                  <span className="font-medium">{project.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>{project.downloadCount} downloads</span>
                </div>
              </div>
            </div>

            {/* Preview Image */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={project.previewImage} 
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 rounded-lg p-3 flex items-center gap-2 text-white">
                      <ImageIcon className="h-5 w-5" />
                      <span>Preview Image</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Resource</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {project.fullDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Contribution Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Support This Work
                </CardTitle>
                <CardDescription>
                  Choose an amount to contribute and help me create more resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Amount Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Choose contribution amount:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {contributionAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setSelectedAmount(amount)}
                        className={`p-3 rounded-lg border-2 transition-all text-center font-medium ${
                          selectedAmount === amount
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contribute Button */}
                <Button 
                  variant="contribute" 
                  className="w-full"
                  onClick={handleContribute}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Contribute ₹{selectedAmount}
                </Button>

                {/* Free Download - Minimal */}
                <div className="pt-4 border-t border-border/50">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100"
                    onClick={handleFreeDownload}
                  >
                    Download for free
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    Complete source files
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    Documentation & setup guide
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    Lifetime access & updates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    Commercial use allowed
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;