import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (session?.user) {
        // Get user profile to check membership tier
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('membership_tier')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          toast.error('Error fetching user profile');
          return;
        }

        console.log('User profile:', profile);
        toast.success('Successfully logged in');
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img
            src="/lovable-uploads/2116ad73-ff5d-4c19-a805-159b9bde9446.png"
            alt="Doc.MBA Logo"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-primary">Welcome to Doc.MBA</h2>
          <p className="mt-2 text-muted-foreground">Sign in or create an account</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#000000',
                  brandAccent: '#333333',
                }
              }
            }
          }}
          theme="light"
          providers={[]}
          redirectTo={window.location.origin}
        />
      </div>
    </div>
  );
};

export default AuthPage;