import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";

export const handleSessionEvents = (
  event: AuthChangeEvent,
  session: Session | null,
  navigate: NavigateFunction
) => {
  console.log("Auth state changed:", event, session);
  
  try {
    if (event === 'SIGNED_IN' && session) {
      console.log("User signed in, redirecting to home");
      toast.success("Successfully signed in!");
      navigate('/');
    } else if (event === 'SIGNED_OUT') {
      console.log("User signed out");
      toast.info("Signed out successfully");
      navigate('/auth');
    } else if (event === 'USER_UPDATED') {
      console.log("User profile updated");
      toast.success("Profile updated successfully");
    } else if (event === 'PASSWORD_RECOVERY') {
      console.log("Password recovery initiated");
      toast.info("Password recovery initiated");
    } else if (event === 'INITIAL_SESSION') {
      console.log("Initial session established");
    } else if (event === 'TOKEN_REFRESHED') {
      console.log("Token refreshed");
    } else if (event === 'MFA_CHALLENGE_VERIFIED') {
      console.log("MFA challenge verified");
    }
  } catch (error) {
    console.error('Error handling auth state change:', error);
    toast.error('An error occurred while processing your request');
  }
};