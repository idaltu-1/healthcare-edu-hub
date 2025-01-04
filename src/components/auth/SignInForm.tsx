import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashHandler } from "./components/HashHandler";
import { authAppearance } from "./components/AuthAppearance";
import { handleSessionEvents } from "./utils/authStateHandler";
import { toast } from "sonner";
import { AuthChangeEvent } from "@supabase/supabase-js";

export const SignInForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("User already authenticated, redirecting to home");
        navigate('/');
      }
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session) => {
        handleSessionEvents(event, session, navigate);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Get the current domain and construct the redirect URL
  const siteUrl = window.location.origin;
  // Ensure we're using the correct path for auth redirects
  const redirectTo = `${siteUrl}/auth/callback`;
  
  console.log('Auth redirect URL:', redirectTo);

  return (
    <>
      <HashHandler />
      <Auth
        supabaseClient={supabase}
        appearance={authAppearance}
        theme="light"
        providers={[]}
        redirectTo={redirectTo}
        onlyThirdPartyProviders={false}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email',
              password_label: 'Password',
              button_label: 'Sign in',
              loading_button_label: 'Signing in...',
              social_provider_text: 'Sign in with {{provider}}',
              link_text: "Already have an account? Sign in",
            },
            sign_up: {
              email_label: 'Email',
              password_label: 'Password',
              button_label: 'Sign up',
              loading_button_label: 'Signing up...',
              social_provider_text: 'Sign up with {{provider}}',
              link_text: "Don't have an account? Sign up",
            },
          },
        }}
      />
    </>
  );
};