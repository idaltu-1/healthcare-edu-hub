import { AuthError } from "@supabase/supabase-js";
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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