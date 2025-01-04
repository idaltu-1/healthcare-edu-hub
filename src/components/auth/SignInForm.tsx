import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashHandler } from "./components/HashHandler";
import { authAppearance } from "./components/AuthAppearance";
import { handleAuthStateChange } from "./utils/authStateHandler";

export const SignInForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => handleAuthStateChange(event, session, navigate)
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const siteUrl = "https://doc.mba";
  const redirectTo = `${siteUrl}/auth`;
  
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
      />
    </>
  );
};