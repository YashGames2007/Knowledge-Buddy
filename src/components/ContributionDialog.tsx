import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Download } from "lucide-react";

interface ContributionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onContribute: (amount: number) => void;
  onFreeDownload: () => void;
  projectTitle: string;
}

const ContributionDialog = ({
  isOpen,
  onClose,
  onContribute,
  onFreeDownload,
  projectTitle,
}: ContributionDialogProps) => {
  const [selectedAmount, setSelectedAmount] = useState(99);
  const contributionAmounts = [99, 199, 299, 499];

  const handleContributeClick = () => {
    onContribute(selectedAmount);
    onClose();
  };

  const handleFreeDownloadClick = () => {
    onFreeDownload();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-3">
            <div className="text-5xl sm:text-6xl">😢</div>
          </div>
          <DialogTitle className="text-lg sm:text-xl font-bold text-center">
            Wait! Your support means everything
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Creating <span className="font-bold">{projectTitle}</span> took countless hours of hard work and dedication.
            </p>
            <p className="text-sm text-muted-foreground">
              Your contribution helps me continue creating amazing resources for everyone.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          {/* Contribution Options */}
          <div className="space-y-3 sm:space-y-4">
            <div className="text-center">
              <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-primary">
                ❤️ Show Your Appreciation
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Choose an amount that feels right for the value you're getting:
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {contributionAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-center font-medium ${
                    selectedAmount === amount
                      ? "border-primary bg-primary/10 text-primary shadow-lg transform scale-105"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <div className="text-base sm:text-lg font-bold">{amount} Rs.</div>
                  <div className="text-xs text-muted-foreground">
                    {amount === 99 && "Buy me a coffee ☕"}
                    {amount === 199 && "Really helpful! 🙌"}
                    {amount === 299 && "Amazing work! ⭐"}
                    {amount === 499 && "You're awesome! 🚀"}
                  </div>
                </button>
              ))}
            </div>

            {/* Contribute Button */}
            <Button 
              variant="contribute" 
              className="w-full py-2 sm:py-3 text-base sm:text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
              onClick={handleContributeClick}
            >
              <Heart className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
              Contribute {selectedAmount} Rs. & Download
            </Button>
          </div>

          {/* Free Download - Made less prominent */}
          <div className="pt-3 sm:pt-4 border-t border-border/30">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs text-muted-foreground/60 hover:text-muted-foreground opacity-50 hover:opacity-90 py-2"
              onClick={handleFreeDownloadClick}
            >
              <Download className="h-3 w-3 mr-2" />
              I'll download for free this time...
            </Button>
            <p className="text-center text-xs text-muted-foreground/100 mt-1 sm:mt-2">
              (But maybe consider contributing next time? 🥺)
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContributionDialog;