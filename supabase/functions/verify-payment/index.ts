import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createHash } from "https://deno.land/std@0.168.0/crypto/crypto.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const razorpayKey = Deno.env.get('RAZORPAY_API_KEY');
    const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');
    
    if (!razorpayKey || !webhookSecret) {
      throw new Error('Razorpay credentials not configured');
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature }: PaymentVerification = await req.json();

    // Verify signature
    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = createHash("sha256")
      .update(text + webhookSecret)
      .toString("hex");

    const isValidSignature = expectedSignature === razorpay_signature;

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({ error: 'Invalid payment signature' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      )
    }

    // Fetch payment details from Razorpay
    const paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
      headers: {
        'Authorization': `Basic ${btoa(razorpayKey + ':')}`,
      },
    });

    if (!paymentResponse.ok) {
      throw new Error('Failed to fetch payment details');
    }

    const paymentDetails = await paymentResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        payment: {
          id: paymentDetails.id,
          amount: paymentDetails.amount,
          status: paymentDetails.status,
          method: paymentDetails.method,
          order_id: paymentDetails.order_id
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in verify-payment function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Payment verification failed' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})