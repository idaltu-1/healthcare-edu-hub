import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import NotificationSettings, { NotificationSettingsData } from "./NotificationSettings";
import LocalizationSettings, { LocalizationSettingsData } from "./LocalizationSettings";
import AppearanceSettings, { AppearanceSettingsData } from "./AppearanceSettings";

const PreferencesForm = () => {
  const session = useSession();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!session?.user?.id) return;

      try {
        const { data, error } = await supabase
          .from("user_settings")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (error) throw error;
        setSettings(data);
      } catch (error: any) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, [session?.user?.id]);

  const handleNotificationSubmit = async (values: NotificationSettingsData) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to update settings");
      return;
    }

    try {
      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: session.user.id,
          email_notifications: values.emailNotifications,
          sms_notifications: values.smsNotifications,
          marketing_emails: values.marketingEmails,
        });

      if (error) throw error;
      toast.success("Notification settings updated");
    } catch (error: any) {
      console.error("Error updating notification settings:", error);
      toast.error(error.message || "Failed to update notification settings");
    }
  };

  const handleLocalizationSubmit = async (values: LocalizationSettingsData) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to update settings");
      return;
    }

    try {
      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: session.user.id,
          language: values.language,
          timezone: values.timezone,
        });

      if (error) throw error;
      toast.success("Localization settings updated");
    } catch (error: any) {
      console.error("Error updating localization settings:", error);
      toast.error(error.message || "Failed to update localization settings");
    }
  };

  const handleAppearanceSubmit = async (values: AppearanceSettingsData) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to update settings");
      return;
    }

    try {
      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: session.user.id,
          dark_mode: values.darkMode,
        });

      if (error) throw error;
      toast.success("Appearance settings updated");
    } catch (error: any) {
      console.error("Error updating appearance settings:", error);
      toast.error(error.message || "Failed to update appearance settings");
    }
  };

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationSettings
            defaultValues={{
              emailNotifications: settings.email_notifications,
              smsNotifications: settings.sms_notifications,
              marketingEmails: settings.marketing_emails,
            }}
            onSubmit={handleNotificationSubmit}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Localization</CardTitle>
          <CardDescription>
            Customize your language and timezone preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LocalizationSettings
            defaultValues={{
              language: settings.language,
              timezone: settings.timezone,
            }}
            onSubmit={handleLocalizationSubmit}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how the application looks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AppearanceSettings
            defaultValues={{
              darkMode: settings.dark_mode,
            }}
            onSubmit={handleAppearanceSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesForm;