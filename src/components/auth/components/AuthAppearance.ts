import { ThemeSupa } from "@supabase/auth-ui-shared";

export const authAppearance = {
  theme: ThemeSupa,
  variables: {
    default: {
      colors: {
        brand: '#1a1f2c',
        brandAccent: '#c6a052',
        inputBackground: 'white',
        inputText: '#1a1f2c',
        inputPlaceholder: '#64748b',
        messageText: '#1a1f2c',
        messageTextDanger: '#ef4444',
      },
      radii: {
        borderRadiusButton: '0.5rem',
        buttonBorderRadius: '0.5rem',
        inputBorderRadius: '0.5rem',
      },
    }
  },
  className: {
    button: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    input: 'border-input bg-background',
    label: 'text-foreground',
  }
};