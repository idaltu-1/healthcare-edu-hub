import { AuthError } from "@supabase/supabase-js";
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const handleSessionUpdate = async (
  accessToken: string,
  refreshToken: string,
  navigate: NavigateFunction
): Promise<AuthError | null> => {
  try {
    console.log('Attempting to set session with tokens');
    const { data: { session }, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    
    if (error) {
      console.error('Error setting session:', error);
      toast.error('Error setting session: ' + error.message);
      return error;
    }
    
    if (!session) {
      console.error('No session returned after setting tokens');
      return new Error('No session returned') as AuthError;
    }
    
    console.log('Session set successfully');
    return null;
  } catch (error) {
    console.error('Error handling session:', error);
    toast.error('Failed to set session. Please try logging in again.');
    return error as AuthError;
  }
};