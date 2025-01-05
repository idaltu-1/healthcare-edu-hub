import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const { senderId, recipientId, content } = await req.json()

    console.log('Received message request:', { senderId, recipientId, content })

    // Validate input
    if (!senderId || !recipientId || !content) {
      console.error('Missing required fields')
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Verify both users exist in community_members
    const { data: senderExists, error: senderError } = await supabase
      .from('community_members')
      .select('id')
      .eq('user_id', senderId)
      .single()

    if (senderError || !senderExists) {
      console.error('Sender not found in community:', senderError)
      return new Response(
        JSON.stringify({ error: 'Sender not found in community' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    const { data: recipientExists, error: recipientError } = await supabase
      .from('community_members')
      .select('id')
      .eq('user_id', recipientId)
      .single()

    if (recipientError || !recipientExists) {
      console.error('Recipient not found in community:', recipientError)
      return new Response(
        JSON.stringify({ error: 'Recipient not found in community' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    // Send message
    const { error: messageError } = await supabase
      .from('direct_messages')
      .insert([
        {
          sender_id: senderId,
          recipient_id: recipientId,
          content: content,
        },
      ])

    if (messageError) {
      console.error('Error sending message:', messageError)
      return new Response(
        JSON.stringify({ error: 'Failed to send message', details: messageError }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    console.log('Message sent successfully')
    return new Response(
      JSON.stringify({ message: 'Message sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})