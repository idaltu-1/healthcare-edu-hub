import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import NotificationSettings, { NotificationSettingsData } from "./NotificationSettings";
import LocalizationSettings, { LocalizationSettingsData } from "./LocalizationSettings";
import AppearanceSettings, { AppearanceSettingsData } from "./AppearanceSettings";
import SecuritySettings, { SecuritySettingsData } from "./SecuritySettings";
import AccessibilitySettings, { AccessibilitySettingsData } from "./AccessibilitySettings";

const PreferencesForm = () => {
  const session = useSession();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
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

  const handleSecuritySubmit = async (values: SecuritySettingsData) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to update settings");
      return;
    }

    try {
      // Handle security settings update
      toast.success("Security settings updated");
    } catch (error: any) {
      console.error("Error updating security settings:", error);
      toast.error(error.message || "Failed to update security settings");
    }
  };

  const handleAccessibilitySubmit = async (values: AccessibilitySettingsData) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to update settings");
      return;
    }

    try {
      // Handle accessibility settings update
      toast.success("Accessibility settings updated");
    } catch (error: any) {
      console.error("Error updating accessibility settings:", error);
      toast.error(error.message || "Failed to update accessibility settings");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading settings...</div>;
  }

  if (!settings) {
    return <div>Error loading settings</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage how you receive notifications and updates
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
            Customize how the application looks and feels
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

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Manage your account security preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SecuritySettings
            defaultValues={{
              twoFactorEnabled: false,
              sessionTimeout: 30,
              loginNotifications: true,
            }}
            onSubmit={handleSecuritySubmit}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <CardDescription>
            Customize your accessibility preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccessibilitySettings
            defaultValues={{
              highContrast: false,
              reducedMotion: false,
              largeText: false,
            }}
            onSubmit={handleAccessibilitySubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesForm;