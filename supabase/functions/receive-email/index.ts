import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ResendWebhookPayload {
  from: string;
  to: string[];
  subject: string;
  html: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const payload: ResendWebhookPayload = await req.json()
    const { from, to, subject, html } = payload

    console.log('Received email from:', from)

    // Find user by email
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('email', to[0])
      .single()

    if (profileError) {
      console.error('Error finding user:', profileError)
      throw profileError
    }

    // Store the incoming email
    const { error: dbError } = await supabase
      .from('email_messages')
      .insert([
        {
          user_id: profiles.user_id,
          from_email: from,
          to_email: to,
          subject,
          content: html,
          direction: 'inbound',
          status: 'received',
        },
      ])

    if (dbError) {
      console.error('Database error:', dbError)
      throw dbError
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error processing incoming email:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})