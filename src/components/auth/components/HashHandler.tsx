import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handlePasswordReset, handleSessionUpdate } from "../utils/authStateHandler";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const HashHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleHash = async () => {
      console.log('Current URL hash:', window.location.hash);
      
      if (!window.location.hash) {
        console.log('No hash present in URL');
        return;
      }

      try {
        // Remove the '#' from the start of the hash
        const hashContent = window.location.hash.substring(1);
        console.log('Processing hash content:', hashContent);

        // Parse all URL parameters
        const hashParams = new URLSearchParams(hashContent);
        
        // Extract relevant parameters
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');
        const type = hashParams.get('type');
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        console.log('Parsed hash parameters:', { 
          error, 
          errorDescription, 
          type,
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
        });

        if (error) {
          console.error('Auth error:', error, errorDescription);
          toast.error(`Authentication error: ${errorDescription || error}`);
          navigate('/auth');
          return;
        }

        // Handle password recovery flow
        if (type === 'recovery' && accessToken && refreshToken) {
          console.log('Processing password recovery flow');
          
          try {
            // First try to update the session with the provided tokens
            const { data: { session }, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });

            if (sessionError) {
              console.error('Session error:', sessionError);
              throw sessionError;
            }

            if (session) {
              // Prompt for new password
              const newPassword = prompt('Please enter your new password:');
              if (newPassword) {
                await handlePasswordReset(newPassword, navigate);
                toast.success('Password has been reset successfully');
                navigate('/');
              } else {
                toast.error('Password reset cancelled');
                navigate('/auth');
              }
            }
          } catch (error: any) {
            console.error('Error during password reset:', error);
            toast.error(error.message || 'Failed to process password reset');
            navigate('/auth');
          }
        }

        // Clear the hash after processing
        window.location.hash = '';
      } catch (error) {
        console.error('Error processing hash parameters:', error);
        toast.error('Failed to process authentication parameters');
        navigate('/auth');
      }
    };

    handleHash();
  }, [navigate]);

  return null;
};