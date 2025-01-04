import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "@/components/auth/SignInForm";
import RegistrationForm from "@/components/auth/RegistrationForm";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signin");

  const handleSuccess = () => {
    toast.success("Authentication successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {activeTab === "signin" ? "Sign In" : "Create Account"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;