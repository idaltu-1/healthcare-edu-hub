import { AuthError, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const handleAuthStateChange = (
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
    } else if (event === 'PASSWORD_RECOVERY') {
      console.log("Password recovery event detected");
      toast.info("Password recovery initiated");
    } else if (event === 'USER_UPDATED') {
      console.log("User profile updated");
      toast.success("Profile updated successfully");
    } else if (event === 'USER_DELETED') {
      console.log("User account deleted");
      toast.info("Account deleted successfully");
      navigate('/auth');
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
    return null;
  } catch (error) {
    console.error('Error handling session:', error);
    toast.error('Failed to set session. Please try logging in again.');
    return error as AuthError;
  }
};

export const handleUserDeletion = async (
  navigate: NavigateFunction
): Promise<AuthError | null> => {
  try {
    console.log('Attempting to delete user account');
    
    // Delete the user
    const { error } = await supabase.auth.admin.deleteUser(
      (await supabase.auth.getUser()).data.user?.id as string
    );
    
    if (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting account: ' + error.message);
      return error;
    }
    
    console.log('User deleted successfully');
    toast.success('Your account has been successfully deleted.');
    navigate('/auth');
    return null;
  } catch (error) {
    console.error('Error in user deletion:', error);
    toast.error('Failed to delete account. Please try again.');
    return error as AuthError;
  }
};
