import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PaymentRequestSchema = z.object({
  amount: z.number()
    .int('Amount must be an integer')
    .min(1, 'Amount must be at least 1 Rs')
    .max(100000, 'Amount cannot exceed 100,000 Rs'),
  projectId: z.string()
    .uuid('Invalid project ID format'),
  projectTitle: z.string()
    .min(1, 'Project title is required')
    .max(200, 'Project title too long')
    .trim()
})

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const razorpayKeyId = Deno.env.get('RAZORPAY_API_KEY');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    
    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error('Payment system not configured');
    }

    // Parse and validate input
    const rawData = await req.json();
    const validated = PaymentRequestSchema.parse(rawData);
    
    // Verify project exists in database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, title')
      .eq('id', validated.projectId)
      .single();
    
    if (projectError || !project) {
      return new Response(
        JSON.stringify({ error: 'Project not found' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        },
      );
    }

    const { amount, projectId, projectTitle } = validated;

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
      console.error('Razorpay order creation failed', {
        status: response.status,
        project: projectId
      });
      throw new Error(`Failed to create payment order`);
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
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input',
          details: error.errors
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      );
    }
    
    console.error('Payment error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Payment system error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})