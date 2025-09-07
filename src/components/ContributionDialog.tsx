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
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="text-6xl">😢</div>
          </div>
          <DialogTitle className="text-xl font-bold">
            Wait! Your support means everything
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <p className="text-muted-foreground">
              Creating "{projectTitle}" took countless hours of hard work and dedication.
            </p>
            <p className="text-muted-foreground">
              Your contribution helps me continue creating amazing resources for everyone.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Contribution Options */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-3 text-primary">
                ❤️ Show Your Appreciation
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose an amount that feels right for the value you're getting:
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {contributionAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
                    selectedAmount === amount
                      ? "border-primary bg-primary/10 text-primary shadow-lg transform scale-105"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <div className="text-lg font-bold">₹{amount}</div>
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
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
              onClick={handleContributeClick}
            >
              <Heart className="h-5 w-5 mr-2" />
              Contribute ₹{selectedAmount} & Download
            </Button>
          </div>

          {/* Free Download - Made less prominent */}
          <div className="pt-4 border-t border-border/30">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs text-muted-foreground/60 hover:text-muted-foreground/80 opacity-50 hover:opacity-70 py-2"
              onClick={handleFreeDownloadClick}
            >
              <Download className="h-3 w-3 mr-2" />
              I'll download for free this time...
            </Button>
            <p className="text-center text-xs text-muted-foreground/40 mt-2">
              (But maybe consider contributing next time? 🥺)
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContributionDialog;