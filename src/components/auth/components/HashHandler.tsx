import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { handlePasswordReset, handleSessionUpdate } from "../utils/authStateHandler";

export const HashHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUrlHash = async () => {
      const hash = window.location.hash;
      console.log('Current URL hash:', hash);
      
      if (!hash) {
        console.log('No hash present in URL');
        return;
      }

      const hashParams = new URLSearchParams(hash.substring(1));
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
        toast.error(errorDescription || 'Authentication error occurred');
        window.location.hash = '';
        return;
      }
      
      if (type === 'recovery' && accessToken && refreshToken) {
        console.log('Password recovery flow detected with tokens');
        await handleSessionUpdate(accessToken, refreshToken, navigate);
        const newPassword = prompt('Please enter your new password:');
        if (newPassword) {
          await handlePasswordReset(newPassword, navigate);
        }
      } else if (accessToken && refreshToken) {
        console.log('Access token detected in URL');
        await handleSessionUpdate(accessToken, refreshToken, navigate);
      }
    };

    checkUrlHash();
  }, [navigate]);

  return null;
};