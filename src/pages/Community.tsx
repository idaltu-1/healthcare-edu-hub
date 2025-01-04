import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Search, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";

interface CommunityMember {
  id: string;
  full_name: string;
  specialty: string;
  location: string;
  created_at: string;
}

const Community = () => {
  const session = useSession();
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    fetchMembers();
    if (session?.user) {
      checkMembership();
    }
  }, [session]);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("community_members")
        .select("*")
        .order("created_at", { ascending: false });

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
    try {
      const { data, error } = await supabase
        .from("community_members")
        .select("id")
        .eq("user_id", session?.user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
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
      const { error } = await supabase.from("community_members").insert([
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

  const filteredMembers = members.filter(
    (member) =>
      member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.location.toLowerCase().includes(searchTerm.toLowerCase())
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
                    {member.specialty}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.location}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      toast.info("Direct messaging coming soon!")
                    }
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
    </div>
  );
};

export default Community;