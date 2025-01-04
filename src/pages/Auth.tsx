import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      setIsLoading(false);
      
      if (event === 'PASSWORD_RECOVERY') {
        console.log('Password recovery event detected');
        navigate("/settings");
        toast({
          title: "Password Reset",
          description: "You can now set your new password in the settings page",
          duration: 5000,
        });
        return;
      }

      if (event === 'SIGNED_IN') {
        if (session?.user) {
          console.log('User signed in:', session.user);
          
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
              variant: "destructive",
              duration: 5000,
            });
            return;
          }

          console.log('User profile:', profile);
          toast({
            title: "Welcome back!",
            description: "Successfully logged in",
            duration: 3000,
          });
          navigate("/");
        }
      }

      // Handle email confirmation and user updates
      if (event === 'USER_UPDATED') {
        console.log('User updated');
        toast({
          title: "Email Confirmation",
          description: "Please check your email for the confirmation link",
          duration: 5000,
        });
      }

      // Handle initial signup - using USER_UPDATED instead of SIGNED_UP
      if (event === 'USER_UPDATED') {
        console.log('New user signed up');
        toast({
          title: "Welcome to Doc.MBA!",
          description: "Please check your email for the confirmation link",
          duration: 5000,
        });
      }
    });

    // Check for auth errors in URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const error = hashParams.get('error');
    const errorDescription = hashParams.get('error_description');
    
    if (error) {
      console.error('Auth error:', error, errorDescription);
      if (error === 'access_denied' && errorDescription?.includes('Email link is invalid')) {
        toast({
          title: "Link Expired",
          description: "The email confirmation link has expired. Please request a new one.",
          variant: "destructive",
          duration: 5000,
        });
      } else {
        toast({
          title: "Authentication Error",
          description: errorDescription || 'An error occurred during authentication',
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  }, [navigate]);

  const handleBackToHome = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          className="flex items-center gap-2 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img
              src="/lovable-uploads/2116ad73-ff5d-4c19-a805-159b9bde9446.png"
              alt="Doc.MBA Logo"
              className="h-16 w-auto mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-primary">Welcome to Doc.MBA</h2>
            <p className="mt-2 text-muted-foreground">
              Sign in to your account or create a new one
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-lg border">
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
              redirectTo="https://doc.mba"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;