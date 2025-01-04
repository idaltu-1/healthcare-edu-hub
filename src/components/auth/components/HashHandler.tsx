import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { handleSessionUpdate } from "../utils/handlers/tokenHandler";
import { handlePasswordReset } from "../utils/handlers/passwordHandler";

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
        // Get the full hash content and decode it
        const hashContent = decodeURIComponent(window.location.hash.substring(1));
        console.log('Processing decoded hash content:', hashContent);

        // Create URLSearchParams from the decoded hash
        const hashParams = new URLSearchParams(hashContent);
        
        // Extract all relevant parameters
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
        if (type === 'recovery') {
          console.log('Processing password recovery flow');
          
          if (!accessToken || !refreshToken) {
            toast.error('Invalid recovery link');
            navigate('/auth');
            return;
          }

          // Set the session first
          const sessionError = await handleSessionUpdate(accessToken, refreshToken, navigate);
          if (sessionError) {
            console.error('Error setting session:', sessionError);
            toast.error('Failed to process recovery link');
            navigate('/auth');
            return;
          }

          // For recovery flow, immediately prompt for new password
          const newPassword = prompt('Please enter your new password:');
          if (!newPassword) {
            toast.error('Password reset cancelled');
            navigate('/auth');
            return;
          }

          const passwordError = await handlePasswordReset(newPassword, navigate);
          if (passwordError) {
            console.error('Error resetting password:', passwordError);
            toast.error('Failed to reset password');
            navigate('/auth');
            return;
          }

          toast.success('Password has been reset successfully');
          navigate('/');
        } else if (accessToken && refreshToken) {
          // Handle normal authentication flow
          console.log('Processing normal authentication flow');
          const sessionError = await handleSessionUpdate(accessToken, refreshToken, navigate);
          
          if (sessionError) {
            console.error('Error setting session:', sessionError);
            toast.error('Failed to authenticate');
            navigate('/auth');
            return;
          }

          navigate('/');
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