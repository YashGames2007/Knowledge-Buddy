import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Heart, Star, Code, FileText, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  category: "project" | "notes" | "misc" | "presentation" | "reference-material";
  tags: string[];
  downloadCount: number;
  rating: number;
  suggestedPrice: number;
  driveFileId: string;
  onCardClick: () => void;
}

const categoryIcons = {
  project: Code,
  notes: BookOpen,
  misc: FileText,
  presentation: Star,
  "reference-material": Heart,
};

const categoryColors = {
  project: "bg-primary/10 text-primary",
  notes: "bg-accent/10 text-accent",
  misc: "bg-success/10 text-success",
  presentation: "bg-warning/10 text-warning",
  "reference-material": "bg-destructive/10 text-destructive",
};

const ProjectCard = ({
  id,
  title,
  description,
  category,
  tags,
  downloadCount,
  rating,
  suggestedPrice,
  driveFileId,
  onCardClick,
}: ProjectCardProps) => {
  const IconComponent = categoryIcons[category];

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card border-border/50 cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-lg ${categoryColors[category]}`}>
              <IconComponent className="h-4 w-4" />
            </div>
            <Badge variant="secondary" className="text-xs">
              {category.replace("-", " ").toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-warning">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
    
    <CardContent>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>{downloadCount} downloads</span>
        </div>
        <div className="font-semibold text-primary">
          {suggestedPrice} Rs suggested
        </div>
      </div>
    </CardContent>
    
    <CardFooter>
      <Button 
        variant="default" 
        className="w-full"
        onClick={onCardClick}
      >
        <Download className="h-4 w-4 mr-2" />
        View Details
      </Button>
    </CardFooter>
  </Card>
  );
};

export default ProjectCard;