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
import RatingDialog from "@/components/RatingDialog";
import ContributionDialog from "@/components/ContributionDialog";

const ProjectDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { initiatePayment } = useRazorpay();
  const [selectedAmount, setSelectedAmount] = useState(99);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [showContributionDialog, setShowContributionDialog] = useState(false);
  
  const { projects, loading, refetch } = useProjects();
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

  const handleContribute = (amount?: number) => {
    if (!project) return;
    
    const contributionAmount = amount || selectedAmount;
    
    initiatePayment({
      amount: contributionAmount,
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
        // Show rating dialog after successful download
        setTimeout(() => setShowRatingDialog(true), 1000);
      },
      onError: (error) => {
        console.error('Payment failed:', error);
      }
    });
  };

  const startDownload = async () => {
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
    
    // Refresh project data to update download count (with small delay to ensure DB is updated)
    console.log('Scheduling refetch after paid download...');
    setTimeout(() => {
      console.log('Refetching project data after paid download');
      refetch();
    }, 500);
  };

  const handleFreeDownload = async () => {
    // Show contribution dialog instead of directly downloading
    setShowContributionDialog(true);
  };

  const handleActualFreeDownload = async () => {
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
    
    // Refresh project data to update download count (with small delay to ensure DB is updated)
    console.log('Scheduling refetch after download...');
    setTimeout(() => {
      console.log('Refetching project data after download');
      refetch();
    }, 500);
    
    // Show rating dialog after free download
    setTimeout(() => setShowRatingDialog(true), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" asChild className="mb-0 text-sm sm:text-base">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Project Header */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className={`p-2 sm:p-3 rounded-lg ${categoryColors[project.category]} flex-shrink-0`}>
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {project.category.replace("-", " ").toUpperCase()}
                  </Badge>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold break-words">{project.title}</h1>
                </div>
              </div>
              
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground flex-wrap">
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
                  {project.thumbnail_url ? (
                    <img 
                      src={project.thumbnail_url} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Preview image coming soon</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">About This Resource</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Contribution Options */}
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Heart className="h-5 w-5 text-primary" />
                  Support This Work
                </CardTitle>
                <CardDescription className="text-sm">
                  Choose an amount to contribute and help me create more resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Amount Selection */}
                <div className="space-y-3">
                  <label className="text-xs sm:text-sm font-medium">Choose contribution amount:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {contributionAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setSelectedAmount(amount)}
                        className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-center font-medium text-sm sm:text-base touch-manipulation ${
                          selectedAmount === amount
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 active:border-primary"
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
                  className="w-full text-base sm:text-lg py-5 sm:py-6 touch-manipulation"
                  onClick={() => handleContribute()}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Contribute {selectedAmount} Rs
                </Button>

                {/* Free Download - Minimal */}
                <div className="pt-4 border-t border-border/50">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs sm:text-sm text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100 py-4 touch-manipulation"
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
                <CardTitle className="text-base sm:text-lg">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
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
                    Quality Study Materials
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    Handwritten Notes
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Rating Dialog */}
      <RatingDialog
        isOpen={showRatingDialog}
        onClose={() => setShowRatingDialog(false)}
        projectId={project.id}
        projectTitle={project.title}
        onRatingSubmitted={() => {
          setShowRatingDialog(false);
          // Refresh project data to update rating (with delay to ensure DB is updated)
          console.log('Scheduling refetch after rating...');
          setTimeout(() => {
            console.log('Refetching project data after rating submission');
            refetch();
          }, 1000);
          toast({
            title: "Thank you!",
            description: "Your rating helps improve our resources.",
          });
        }}
      />

      {/* Contribution Dialog */}
      <ContributionDialog
        isOpen={showContributionDialog}
        onClose={() => setShowContributionDialog(false)}
        onContribute={handleContribute}
        onFreeDownload={handleActualFreeDownload}
        projectTitle={project.title}
      />
    </div>
  );
};

export default ProjectDetails;