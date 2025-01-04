import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const SignInForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check URL hash for errors or password reset
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
      
      console.log('Hash params:', { error, errorDescription, type, hasAccessToken: !!accessToken });
      
      if (error) {
        console.error('Auth error:', error, errorDescription);
        toast.error(errorDescription || 'Authentication error occurred');
        window.location.hash = '';
        return;
      }
      
      if (type === 'recovery') {
        console.log('Password recovery flow detected');
        const newPassword = prompt('Please enter your new password:');
        if (newPassword) {
          try {
            const { error } = await supabase.auth.updateUser({ 
              password: newPassword 
            });
            
            if (error) {
              console.error('Error updating password:', error);
              toast.error('Error updating password: ' + error.message);
            } else {
              toast.success('Password updated successfully! Please sign in with your new password.');
              window.location.hash = '';
              navigate('/auth');
            }
          } catch (updateError) {
            console.error('Error in password update:', updateError);
            toast.error('Failed to update password. Please try again.');
          }
        }
      } else if (accessToken && refreshToken) {
        console.log('Access token detected in URL');
        try {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (error) {
            console.error('Error setting session:', error);
            toast.error('Error setting session: ' + error.message);
          } else {
            console.log('Session set successfully');
            window.location.hash = '';
            navigate('/');
          }
        } catch (sessionError) {
          console.error('Error handling session:', sessionError);
          toast.error('Failed to set session. Please try logging in again.');
        }
      }
    };

    checkUrlHash();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      try {
        if (event === 'SIGNED_IN' && session) {
          console.log("User signed in, redirecting to home");
          navigate('/');
        }
      } catch (error) {
        console.error('Error handling auth state change:', error);
        toast.error('An error occurred while processing your request');
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  console.log('Using doc.mba as redirect URL');

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ 
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#1a1f2c',
              brandAccent: '#c6a052',
              inputBackground: 'white',
              inputText: '#1a1f2c',
              inputPlaceholder: '#64748b',
              messageText: '#1a1f2c',
              messageTextDanger: '#ef4444',
            },
            radii: {
              borderRadiusButton: '0.5rem',
              buttonBorderRadius: '0.5rem',
              inputBorderRadius: '0.5rem',
            },
          }
        },
        className: {
          button: 'bg-primary hover:bg-primary/90 text-primary-foreground',
          input: 'border-input bg-background',
          label: 'text-foreground',
        }
      }}
      theme="light"
      providers={[]}
      redirectTo="https://doc.mba/auth"
    />
  );
};