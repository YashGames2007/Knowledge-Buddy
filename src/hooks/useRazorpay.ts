import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentOptions {
  amount: number;
  projectId: string;
  projectTitle: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: any) => void;
}

export const useRazorpay = () => {
  const { toast } = useToast();

  const initiatePayment = useCallback(async (options: PaymentOptions) => {
    try {
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      // Create payment order via Supabase edge function
      const { data: orderData, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: options.amount,
          projectId: options.projectId,
          projectTitle: options.projectTitle
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to create payment order');
      }

      // Configure Razorpay options
      const razorpayOptions = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Knowledge Buddy',
        description: `Contribution for ${options.projectTitle}`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            // Verify payment via Supabase edge function
            const { data: verificationData, error: verifyError } = await supabase.functions.invoke('verify-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }
            });

            if (verifyError || !verificationData.success) {
              throw new Error('Payment verification failed');
            }

            toast({
              title: 'Payment Successful!',
              description: `Thank you for your contribution of ${options.amount} Rs`,
              variant: 'default'
            });

            options.onSuccess?.(response.razorpay_payment_id);
          } catch (error) {
            console.error('Payment verification error:', error);
            toast({
              title: 'Payment Verification Failed',
              description: 'Please contact support if amount was deducted',
              variant: 'destructive'
            });
            options.onError?.(error);
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: () => {
            toast({
              title: 'Payment Cancelled',
              description: 'You can contribute anytime to support the creator',
              variant: 'default'
            });
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();

    } catch (error) {
      console.error('Payment initiation error:', error);
      toast({
        title: 'Payment Failed',
        description: error instanceof Error ? error.message : 'Failed to initiate payment',
        variant: 'destructive'
      });
      options.onError?.(error);
    }
  }, [toast]);

  return { initiatePayment };
};