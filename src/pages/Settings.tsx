import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Settings2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  practiceName: z.string().min(2, "Practice name must be at least 2 characters"),
  specialtyType: z.string().min(2, "Specialty type must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      practiceName: "",
      specialtyType: "",
      email: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (!currentUser) {
        navigate("/auth");
        return;
      }
      
      setUser(currentUser);
      
      // Fetch profile data
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
        return;
      }

      if (profile) {
        form.reset({
          practiceName: profile.full_name || "",
          specialtyType: profile.specialty || "",
          email: currentUser.email || "",
        });
      }
    };

    fetchUserData();
  }, [navigate, form]);

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      // Update profile data
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: values.practiceName,
          specialty: values.specialtyType,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Update email if changed
      if (values.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: values.email,
        });
        
        if (emailError) throw emailError;
        toast.success("Email update confirmation sent. Please check your inbox.");
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });
      
      if (error) throw error;
      
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error(error.message || "Failed to send password reset email");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <Settings2 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Account Settings</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your practice and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="practiceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Practice Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter practice name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialtyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialty Type</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter specialty type" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Enter email address" />
                      </FormControl>
                      <FormDescription>
                        This will be used for account notifications and password reset
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePasswordReset}
                    className="w-full"
                  >
                    Reset Password
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;