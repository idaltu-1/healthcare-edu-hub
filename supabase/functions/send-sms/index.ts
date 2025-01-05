import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SMSRequest {
  phoneNumber: string;
  message: string;
  userId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const twilioSid = Deno.env.get('TWILIO_SID')
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN')
    const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER')

    if (!twilioSid || !twilioAuthToken || !twilioPhoneNumber) {
      throw new Error('Missing Twilio credentials')
    }

    const { phoneNumber, message, userId }: SMSRequest = await req.json()

    console.log('Sending SMS to:', phoneNumber)

    // Send SMS via Twilio
    const twilioResponse = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${twilioSid}:${twilioAuthToken}`),
        },
        body: new URLSearchParams({
          To: phoneNumber,
          From: twilioPhoneNumber,
          Body: message,
        }),
      }
    )

    const twilioData = await twilioResponse.json()

    // Log SMS in database
    const { error: dbError } = await supabase
      .from('sms_messages')
      .insert([
        {
          user_id: userId,
          phone_number: phoneNumber,
          content: message,
          direction: 'outbound',
          status: twilioResponse.ok ? 'sent' : 'failed',
        },
      ])

    if (dbError) {
      console.error('Database error:', dbError)
      throw dbError
    }

    return new Response(
      JSON.stringify({ success: true, twilioResponse: twilioData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error sending SMS:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})