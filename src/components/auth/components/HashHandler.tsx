import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handlePasswordReset, handleSessionUpdate } from "../utils/authStateHandler";
import { toast } from "sonner";

export const HashHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleHash = async () => {
      console.log('Current URL hash:', window.location.hash);
      
      if (!window.location.hash) {
        console.log('No hash present in URL');
        return;
      }

      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const error = hashParams.get('error');
      const errorDescription = hashParams.get('error_description');
      const type = hashParams.get('type');
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      console.log('Hash params:', { 
        error, 
        errorDescription, 
        type, 
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken 
      });
      
      if (error) {
        console.error('Auth error:', error, errorDescription);
        toast.error(`Authentication error: ${errorDescription || error}`);
        navigate('/auth');
        return;
      }
      
      if (type === 'recovery' && accessToken && refreshToken) {
        console.log('Password recovery flow detected with tokens');
        const sessionResult = await handleSessionUpdate(accessToken, refreshToken, navigate);
        
        if (!sessionResult) {
          const newPassword = prompt('Please enter your new password:');
          if (newPassword) {
            await handlePasswordReset(newPassword, navigate);
          }
        }
      }
      
      // Clear the hash after processing
      window.location.hash = '';
    };

    handleHash();
  }, [navigate]);

  return null;
};