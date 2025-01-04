import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SignInForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === 'SIGNED_IN' && session) {
        console.log("User signed in, redirecting to home");
        navigate('/');
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