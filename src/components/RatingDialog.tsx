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
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Tell us how much the resource helped you</DialogTitle>
          <DialogDescription className="text-sm">
            Rate your experience with "{projectTitle}" to help other students.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 py-4">
          <div className="flex space-x-2 sm:space-x-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onTouchStart={() => setHoveredRating(star)}
                onTouchEnd={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110 active:scale-95 touch-manipulation p-1"
              >
                <Star
                  className={`h-10 w-10 sm:h-12 sm:w-12 ${
                    star <= (hoveredRating || selectedRating)
                      ? 'fill-warning text-warning'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
          
          {selectedRating > 0 && (
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              {selectedRating === 1 && "Poor - Not helpful"}
              {selectedRating === 2 && "Fair - Somewhat helpful"}
              {selectedRating === 3 && "Good - Helpful"}
              {selectedRating === 4 && "Very Good - Very helpful"}
              {selectedRating === 5 && "Excellent - Extremely helpful"}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="flex-1 py-5 sm:py-3 touch-manipulation"
            disabled={isSubmitting}
          >
            Skip
          </Button>
          <Button
            onClick={handleSubmitRating}
            className="flex-1 py-5 sm:py-3 touch-manipulation"
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