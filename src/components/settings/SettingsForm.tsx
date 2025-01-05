import { Settings2 } from "lucide-react";
import PreferencesForm from "./PreferencesForm";

const SettingsForm = () => {
  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <Settings2 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Settings</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <PreferencesForm />
      </div>
    </>
  );
};

export default SettingsForm;