import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Search, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type CommunityMember = Database['public']['Tables']['community_members']['Row'];

const Community = () => {
  const session = useSession();
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchMembers();
    if (session?.user) {
      checkMembership();
    }
  }, [session]);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('community_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error("Error fetching members:", error);
      toast.error("Failed to load community members");
    } finally {
      setIsLoading(false);
    }
  };

  const checkMembership = async () => {
    if (!session?.user) return;
    
    try {
      const { data, error } = await supabase
        .from('community_members')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setIsMember(!!data);
    } catch (error) {
      console.error("Error checking membership:", error);
    }
  };

  const handleJoinCommunity = async () => {
    if (!session) {
      toast.error("Please sign in to join the community");
      return;
    }

    try {
      const { error } = await supabase
        .from('community_members')
        .insert([
          {
            user_id: session.user.id,
            full_name: session.user.email?.split("@")[0] || "Anonymous",
            specialty: "Not specified",
            location: "Not specified",
          },
        ]);

      if (error) throw error;
      toast.success("Successfully joined the community!");
      setIsMember(true);
      fetchMembers();
    } catch (error) {
      console.error("Error joining community:", error);
      toast.error("Failed to join community");
    }
  };

  const handleSendMessage = async () => {
    if (!session?.user || !selectedMember) {
      toast.error("Please sign in to send messages");
      return;
    }

    if (!messageContent.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSending(true);

    try {
      const { error } = await supabase
        .from('direct_messages')
        .insert([
          {
            sender_id: session.user.id,
            recipient_id: selectedMember.user_id,
            content: messageContent.trim(),
          },
        ]);

      if (error) throw error;

      toast.success("Message sent successfully!");
      setMessageContent("");
      setMessageDialogOpen(false);
      setSelectedMember(null);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const openMessageDialog = (member: CommunityMember) => {
    if (!session) {
      toast.error("Please sign in to send messages");
      return;
    }
    setSelectedMember(member);
    setMessageDialogOpen(true);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.specialty?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (member.location?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary-foreground">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <Users className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">
            Healthcare Professional Community
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Connect with fellow healthcare professionals, share experiences, and
            grow together in your business journey.
          </p>
          {!isMember && (
            <Button
              onClick={handleJoinCommunity}
              className="bg-primary hover:bg-primary/90"
              disabled={!session}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Join Community
            </Button>
          )}
        </div>

        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <Input
              type="search"
              placeholder="Search members by name, specialty, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p className="text-center col-span-3">Loading members...</p>
          ) : filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <Card
                key={member.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {member.full_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    {member.specialty || "Specialty not specified"}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.location || "Location not specified"}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => openMessageDialog(member)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center col-span-3">No members found</p>
          )}
        </div>
      </div>

      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message to {selectedMember?.full_name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Type your message here..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMessageDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={isSending || !messageContent.trim()}
            >
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Community;