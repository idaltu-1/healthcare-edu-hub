import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  practiceName: z.string().optional(),
  specialty: z.string().optional(),
});

const ProfileForm = ({ user }: { user: User | undefined }) => {
  console.log("Current user data:", user);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      practiceName: "",
      specialty: "",
    },
  });

  // Load initial user data
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.user_metadata?.full_name || "",
        email: user?.email || "",
        phoneNumber: user.user_metadata?.phone_number || "",
        practiceName: user.user_metadata?.practice_name || "",
        specialty: user.user_metadata?.specialty || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting form with values:", values);

      // Update user metadata and email
      const { error: updateError } = await supabase.auth.updateUser({
        email: values.email,
        data: {
          full_name: values.fullName,
          phone_number: values.phoneNumber,
          practice_name: values.practiceName,
          specialty: values.specialty,
        },
      });

      if (updateError) throw updateError;

      // Also update the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: values.fullName,
          phone_number: values.phoneNumber,
          practice_name: values.practiceName,
          specialty: values.specialty,
        })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      toast.success("Profile updated successfully");
      console.log("Profile updated successfully");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your full name" />
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
                <Input {...field} type="email" placeholder="Enter your email address" />
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
                <Input {...field} placeholder="Enter your phone number" />
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
                <Input {...field} placeholder="Enter your practice name" />
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
                <Input {...field} placeholder="Enter your specialty" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;