import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SignInForm } from "@/components/auth/SignInForm";
import { RegistrationForm } from "@/components/auth/RegistrationForm";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    toast.success("Authentication successful");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6">
        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignInForm onSuccess={handleSuccess} />
          </TabsContent>
          <TabsContent value="register">
            <RegistrationForm onSuccess={handleSuccess} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;