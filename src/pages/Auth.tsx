import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SignInForm from "@/components/auth/SignInForm";
import RegistrationForm from "@/components/auth/RegistrationForm";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleSignInSuccess = () => {
    toast.success("Signed in successfully!");
    navigate("/");
  };

  const handleRegistrationSuccess = () => {
    toast.success("Registration successful! Please sign in.");
    setIsSignIn(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignIn ? "Sign In" : "Register"}
        </h1>
        {isSignIn ? (
          <SignInForm onSuccess={handleSignInSuccess} />
        ) : (
          <RegistrationForm onSuccess={handleRegistrationSuccess} />
        )}
        <button
          className="mt-4 text-primary hover:underline"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn ? "Need an account? Register" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
