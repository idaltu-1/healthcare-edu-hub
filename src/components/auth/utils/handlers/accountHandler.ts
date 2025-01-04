import { AuthError } from "@supabase/supabase-js";
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const handleUserDeletion = async (
  navigate: NavigateFunction
): Promise<AuthError | null> => {
  try {
    console.log('Attempting to delete user account');
    
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