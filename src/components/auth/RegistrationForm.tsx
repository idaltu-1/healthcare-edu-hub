import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RegistrationSteps } from "./registration/RegistrationSteps";
import { signUpSchema, type SignUpSchema } from "./registration/types";

export const RegistrationForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      practiceName: "",
      specialty: "",
      phoneNumber: "",
    },
  });

  const handleSignUp = async (values: SignUpSchema) => {
    try {
      setIsRegistering(true);
      console.log("Starting registration process", values);

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

      if (error) {
        console.error('Registration error:', error);
        throw error;
      }

      if (data?.user) {
        console.log("Registration successful", data);
        
        // Check if email confirmation is required
        if (data.user.identities?.length === 0) {
          toast.success("Registration successful! Please check your email to verify your account.");
        } else {
          toast.success("Registration successful! You can now sign in.");
        }
      }
    } catch (error: any) {
      console.error('Error during registration:', error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  const nextStep = () => {
    const currentFields = currentStep === 1 
      ? ['email', 'password', 'confirmPassword'] 
      : ['fullName', 'practiceName', 'specialty', 'phoneNumber'];
    
    form.trigger(currentFields as any).then((isValid) => {
      if (isValid) {
        setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      }
    });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 mx-1 rounded ${
                  idx + 1 <= currentStep ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-center text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        <RegistrationSteps currentStep={currentStep} form={form} />

        <div className="flex justify-between gap-4 pt-4">
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button type="button" onClick={nextStep} className="ml-auto">
              Next
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={isRegistering}
              className="ml-auto"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};