import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'PASSWORD_RECOVERY') {
        console.log('Password recovery event detected');
        toast({
          title: "Password Recovery",
          description: "Please enter your new password"
        });
      }

      if (event === 'SIGNED_IN') {
        if (session?.user) {
          // Get user profile to check membership tier
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('membership_tier')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            toast({
              title: "Error",
              description: "Error fetching user profile",
              variant: "destructive"
            });
            return;
          }

          console.log('User profile:', profile);
          toast({
            title: "Success",
            description: "Successfully logged in"
          });
          navigate("/");
        }
      }

      // Handle email confirmation errors
      if (event === 'USER_UPDATED' || event === 'SIGNED_UP') {
        console.log('User updated or signed up');
        toast({
          title: "Success",
          description: "Please check your email for confirmation link"
        });
      }
    });

    // Check for auth errors in URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const error = hashParams.get('error');
    const errorDescription = hashParams.get('error_description');
    
    if (error) {
      console.error('Auth error:', error, errorDescription);
      // Handle specific error cases
      if (error === 'access_denied' && errorDescription?.includes('Email link is invalid')) {
        toast({
          title: "Error",
          description: "The email confirmation link has expired or is invalid. Please request a new one.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Authentication Error",
          description: errorDescription || 'An error occurred during authentication',
          variant: "destructive"
        });
      }
    }
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
          view="sign_in"
          showLinks={true}
          redirectTo={window.location.origin}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email',
                password_label: 'Password',
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default AuthPage;