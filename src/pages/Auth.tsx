import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  practiceName: z.string().min(2, "Practice name must be at least 2 characters"),
  specialty: z.string().min(2, "Specialty must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
});

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      practiceName: "",
      specialty: "",
      phoneNumber: "",
    },
  });

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
            title: "Welcome!",
            description: "Successfully logged in",
            duration: 3000,
          });
          navigate("/");
        }
      }
    });

    // Check for auth errors in URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const error = hashParams.get('error');
    const errorDescription = hashParams.get('error_description');
    
    if (error) {
      console.error('Auth error:', error, errorDescription);
      toast({
        title: "Authentication Error",
        description: errorDescription || 'An error occurred during authentication',
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [navigate]);

  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            practice_name: values.practiceName,
            specialty: values.specialty,
            phone_number: values.phoneNumber,
          }
        }
      });

      if (error) throw error;

      if (data) {
        toast({
          title: "Registration Successful",
          description: "Please check your email to verify your account",
          duration: 5000,
        });
      }
    } catch (error: any) {
      console.error('Error during registration:', error);
      toast({
        title: "Registration Error",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      });
    }
  };

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
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
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
                  view="sign_in"
                />
              </TabsContent>
              
              <TabsContent value="signup">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Create a password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="practiceName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Practice Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your practice name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="specialty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialty</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your specialty" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;