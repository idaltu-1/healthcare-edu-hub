import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Parse Twilio webhook payload
    const formData = await req.formData()
    const from = formData.get('From')?.toString()
    const body = formData.get('Body')?.toString()

    if (!from || !body) {
      throw new Error('Missing required SMS data')
    }

    console.log('Received SMS from:', from)

    // Find user by phone number
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('phone_number', from)
      .single()

    if (profileError) {
      console.error('Error finding user:', profileError)
      throw profileError
    }

    // Store the incoming message
    const { error: dbError } = await supabase
      .from('sms_messages')
      .insert([
        {
          user_id: profiles.user_id,
          phone_number: from,
          content: body,
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
    console.error('Error processing incoming SMS:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})