import { AuthError, Session } from "@supabase/supabase-js";
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const handleAuthStateChange = (
  event: string,
  session: Session | null,
  navigate: NavigateFunction
) => {
  console.log("Auth state changed:", event, session);
  
  try {
    if (event === 'SIGNED_IN' && session) {
      console.log("User signed in, redirecting to home");
      navigate('/');
    } else if (event === 'PASSWORD_RECOVERY') {
      console.log("Password recovery event detected");
    }
  } catch (error) {
    console.error('Error handling auth state change:', error);
    toast.error('An error occurred while processing your request');
  }
};

export const handlePasswordReset = async (
  newPassword: string,
  navigate: NavigateFunction
): Promise<AuthError | null> => {
  try {
    console.log('Attempting to update password');
    const { error } = await supabase.auth.updateUser({ 
      password: newPassword 
    });
    
    if (error) {
      console.error('Error updating password:', error);
      toast.error('Error updating password: ' + error.message);
      return error;
    }
    
    console.log('Password updated successfully');
    toast.success('Password updated successfully! Please sign in with your new password.');
    window.location.hash = '';
    navigate('/auth');
    return null;
  } catch (error) {
    console.error('Error in password update:', error);
    toast.error('Failed to update password. Please try again.');
    return error as AuthError;
  }
};

export const handleSessionUpdate = async (
  accessToken: string,
  refreshToken: string,
  navigate: NavigateFunction
): Promise<AuthError | null> => {
  try {
    console.log('Attempting to set session');
    const { error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    
    if (error) {
      console.error('Error setting session:', error);
      toast.error('Error setting session: ' + error.message);
      return error;
    }
    
    console.log('Session set successfully');
    window.location.hash = '';
    navigate('/');
    return null;
  } catch (error) {
    console.error('Error handling session:', error);
    toast.error('Failed to set session. Please try logging in again.');
    return error as AuthError;
  }
};