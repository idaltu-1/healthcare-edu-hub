import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const SignInForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      try {
        if (event === 'SIGNED_IN' && session) {
          console.log("User signed in, redirecting to home");
          navigate('/');
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log("Password recovery event received");
          const newPassword = prompt('What would you like your new password to be?');
          if (newPassword) {
            try {
              const { error } = await supabase.auth.updateUser({ 
                password: newPassword 
              });
              
              if (error) {
                console.error('Error updating password:', error);
                toast.error('Error updating password: ' + error.message);
              } else {
                toast.success('Password updated successfully!');
                navigate('/');
              }
            } catch (updateError) {
              console.error('Error in password update:', updateError);
              toast.error('Failed to update password. Please try again.');
            }
          }
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
      redirectTo={`${window.location.origin}/auth`}
    />
  );
};