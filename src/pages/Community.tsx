import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, UserPlus, Users } from "lucide-react";

interface CommunityMember {
  id: string;
  user_id: string;
  full_name: string;
  specialty: string;
  location: string;
  created_at: string;
}

const Community = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchCommunityMembers();
  }, []);

  const fetchCommunityMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("community_members")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (error: any) {
      console.error("Error fetching members:", error);
      toast.error("Failed to load community members");
    }
  };

  const handleSendMessage = async () => {
    if (!session?.user) {
      toast.error("Please sign in to send messages");
      return;
    }

    if (!selectedMember) {
      toast.error("No recipient selected");
      return;
    }

    if (!messageContent.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSending(true);
    console.log("Attempting to send message to:", selectedMember.user_id);

    try {
      const { error } = await supabase.functions.invoke('send-message', {
        body: {
          senderId: session.user.id,
          recipientId: selectedMember.user_id,
          content: messageContent.trim()
        }
      });

      if (error) {
        console.error("Error from edge function:", error);
        throw error;
      }

      console.log("Message sent successfully");
      toast.success("Message sent successfully!");
      setMessageContent("");
      setMessageDialogOpen(false);
      setSelectedMember(null);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleConnect = async (member: CommunityMember) => {
    if (!session?.user) {
      toast.error("Please sign in to connect with members");
      return;
    }

    try {
      const { error } = await supabase.from("connections").insert([
        {
          user_id: session.user.id,
          connected_user_id: member.user_id,
          status: "pending",
        },
      ]);

      if (error) throw error;
      toast.success(`Connection request sent to ${member.full_name}`);
    } catch (error: any) {
      console.error("Error connecting:", error);
      toast.error("Failed to send connection request");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Community</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{member.full_name}</h3>
                <p className="text-gray-600 mb-1">{member.specialty}</p>
                <p className="text-gray-600 mb-4">{member.location}</p>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => {
                      setSelectedMember(member);
                      setMessageDialogOpen(true);
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleConnect(member)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Send Message to {selectedMember?.full_name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Type your message..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                disabled={isSending}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setMessageDialogOpen(false)}
                  disabled={isSending}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSendMessage}
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Community;