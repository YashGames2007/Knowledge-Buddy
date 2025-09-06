import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Heart, Star, Code, FileText, BookOpen, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { useDownloads } from "@/hooks/useDownloads";

const ProjectDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { initiatePayment } = useRazorpay();
  const [selectedAmount, setSelectedAmount] = useState(99);
  
  const { projects, loading } = useProjects();
  const { recordDownload } = useDownloads();

  const project = projects.find(p => p.id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

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

  const IconComponent = categoryIcons[project.category];
  const contributionAmounts = [99, 199, 299, 499];

  const handleContribute = () => {
    if (!project) return;
    
    initiatePayment({
      amount: selectedAmount,
      projectId: project.id.toString(),
      projectTitle: project.title,
      onSuccess: (paymentId) => {
        console.log('Payment successful:', paymentId);
        // Start automatic download after successful payment
        startDownload();
        // Update toast to show payment and download success
        toast({
          title: "Payment Successful!",
          description: `Thank you for your contribution! Download has started automatically.`,
        });
      },
      onError: (error) => {
        console.error('Payment failed:', error);
      }
    });
  };

  const startDownload = () => {
    if (!project.drive_file_id) return;
    
    // Create hidden anchor element and trigger download from Google Drive
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${project.drive_file_id}`;
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = project.title;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleFreeDownload = async () => {
    if (!project.drive_file_id) return;
    
    // Record the download in database
    await recordDownload(project.id);
    
    // Create hidden anchor element and trigger download from Google Drive
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${project.drive_file_id}`;
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = project.title;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

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
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Preview image coming soon</p>
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
                  {project.description}
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
                        {amount} Rs
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
                  Contribute {selectedAmount} Rs
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