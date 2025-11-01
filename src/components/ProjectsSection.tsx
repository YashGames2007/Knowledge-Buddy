import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import RatingDialog from "./RatingDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useProjects } from "@/hooks/useProjects";


const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingDialog, setRatingDialog] = useState<{
    isOpen: boolean;
    projectId: string;
    projectTitle: string;
  }>({ isOpen: false, projectId: "", projectTitle: "" });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projects, loading, error, refetch } = useProjects();
  

  // Filter projects based on category and search query
  const filteredProjects = projects.filter(project => {
    // Filter by category
    const categoryMatch = selectedCategory === "all" || project.category === selectedCategory;
    
    // Filter by search query (title and description)
    const searchMatch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const handleCardClick = (project: any) => {
    // Navigate to project details page using React Router
    navigate(`/project/${project.id}`);
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-destructive">Failed to load projects: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Featured Projects & Resources</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Discover high-quality projects, study materials, and templates created during my academic journey
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mt-6 sm:mt-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6 sm:mb-8">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 sm:grid-cols-6 h-auto gap-1 p-1">
            <TabsTrigger value="all" className="text-xs sm:text-sm py-2">All</TabsTrigger>
            <TabsTrigger value="project" className="text-xs sm:text-sm py-2">Project</TabsTrigger>
            <TabsTrigger value="notes" className="text-xs sm:text-sm py-2">Notes</TabsTrigger>
            <TabsTrigger value="misc" className="text-xs sm:text-sm py-2">Misc</TabsTrigger>
            <TabsTrigger value="presentation" className="text-xs sm:text-sm py-2">Presentation</TabsTrigger>
            <TabsTrigger value="reference-material" className="text-xs sm:text-sm py-2 col-span-3 sm:col-span-1">Reference</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  tags={project.tags}
                  downloadCount={project.downloadCount}
                  rating={project.rating}
                  suggestedPrice={project.suggested_price}
                  driveFileId={project.drive_file_id}
                  onCardClick={() => handleCardClick(project)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery 
                ? `No materials found matching "${searchQuery}"`
                : "No projects found in this category."
              }
            </p>
          </div>
        )}
        
        <RatingDialog
          isOpen={ratingDialog.isOpen}
          onClose={() => setRatingDialog({ isOpen: false, projectId: "", projectTitle: "" })}
          projectId={ratingDialog.projectId}
          projectTitle={ratingDialog.projectTitle}
          onRatingSubmitted={refetch}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;