import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PaymentRequest {
  amount: number;
  projectId: string;
  projectTitle: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const razorpayKeyId = Deno.env.get('RAZORPAY_API_KEY');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    
    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error('Razorpay API credentials not configured');
    }

    const { amount, projectId, projectTitle }: PaymentRequest = await req.json();

    // Create Razorpay order
    const orderData = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`, // Keep under 40 chars limit
      notes: {
        project_id: projectId,
        project_title: projectTitle
      }
    };

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(razorpayKeyId + ':' + razorpayKeySecret)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Razorpay API error:', errorText);
      throw new Error(`Failed to create Razorpay order: ${response.status}`);
    }

    const order = await response.json();

    return new Response(
      JSON.stringify({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: razorpayKeyId // Return the key ID for frontend
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in create-payment function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create payment order' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})