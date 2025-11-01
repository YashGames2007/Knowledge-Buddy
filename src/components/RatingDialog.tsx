import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useRatings } from '@/hooks/useRatings';
import { useToast } from '@/hooks/use-toast';

interface RatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectTitle: string;
  onRatingSubmitted: () => void;
}

const RatingDialog = ({ 
  isOpen, 
  onClose, 
  projectId, 
  projectTitle, 
  onRatingSubmitted 
}: RatingDialogProps) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitRating } = useRatings();
  const { toast } = useToast();

  const handleSubmitRating = async () => {
    if (selectedRating === 0) {
      toast({
        title: "Please select a rating",
        description: "Choose between 1 and 5 stars to rate this resource.",
        variant: "destructive",
      });
      return;
    }

    console.log('Submitting rating:', selectedRating, 'for project:', projectId);
    setIsSubmitting(true);
    const success = await submitRating(projectId, selectedRating);
    console.log('Rating submission result:', success);
    
    if (success) {
      toast({
        title: "Thank you for your feedback!",
        description: `You rated "${projectTitle}" ${selectedRating} star${selectedRating > 1 ? 's' : ''}.`,
      });
      onRatingSubmitted();
      onClose();
    } else {
      toast({
        title: "Failed to submit rating",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-full max-w-md mx-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-base sm:text-lg lg:text-xl text-center">
            Tell us how much the resource helped you
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-center">
            Rate your experience with "{projectTitle}" to help other students.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 sm:space-y-8 py-6 sm:py-8">
          {/* Star Rating */}
          <div className="flex justify-center gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onTouchStart={() => {
                  setHoveredRating(star);
                  setSelectedRating(star);
                }}
                onTouchEnd={() => setHoveredRating(0)}
                className="transition-all duration-200 hover:scale-110 active:scale-95 p-2 sm:p-1 rounded-full hover:bg-muted/50 active:bg-muted touch-manipulation"
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  className={`h-12 w-12 sm:h-10 sm:w-10 transition-colors duration-200 ${
                    star <= (hoveredRating || selectedRating)
                      ? 'fill-warning text-warning drop-shadow-md'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
          
          {/* Rating Description */}
          {selectedRating > 0 && (
            <p className="text-sm sm:text-base text-muted-foreground text-center font-medium px-4 animate-fade-in">
              {selectedRating === 1 && "😞 Poor - Not helpful"}
              {selectedRating === 2 && "😕 Fair - Somewhat helpful"}
              {selectedRating === 3 && "😊 Good - Helpful"}
              {selectedRating === 4 && "😃 Very Good - Very helpful"}
              {selectedRating === 5 && "🤩 Excellent - Extremely helpful"}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 w-full">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="w-full h-12 sm:h-11 text-base touch-manipulation"
            disabled={isSubmitting}
          >
            Skip
          </Button>
          <Button
            onClick={handleSubmitRating}
            className="w-full h-12 sm:h-11 text-base touch-manipulation font-semibold"
            disabled={isSubmitting || selectedRating === 0}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;