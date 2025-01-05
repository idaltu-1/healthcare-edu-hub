import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MessageSquare, Loader } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SMSForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    console.log("Attempting to send SMS to:", phoneNumber);

    try {
      const { error } = await supabase.functions.invoke("send-sms", {
        body: {
          phoneNumber,
          message,
          userId: (await supabase.auth.getUser()).data.user?.id,
        },
      });

      if (error) throw error;

      console.log("SMS sent successfully");
      toast.success("SMS sent successfully!");
      setPhoneNumber("");
      setMessage("");
    } catch (error) {
      console.error("Error sending SMS:", error);
      toast.error("Failed to send SMS");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send SMS</CardTitle>
        <CardDescription>Send text messages to your contacts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              required
            />
          </div>
          <Button type="submit" disabled={isSending} className="w-full">
            {isSending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send SMS
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SMSForm;