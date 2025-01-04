import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

type ForumTopic = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
};

type ForumReply = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
};

const TopicDetail = () => {
  const { topicId } = useParams();
  const session = useSession();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [newReply, setNewReply] = useState("");

  useEffect(() => {
    if (topicId) {
      fetchTopic();
      fetchReplies();
    }
  }, [topicId]);

  const fetchTopic = async () => {
    try {
      const { data, error } = await supabase
        .from("forum_topics")
        .select("*")
        .eq("id", topicId)
        .single();
      if (error) throw error;
      setTopic(data);
    } catch (error) {
      console.error("Error fetching topic:", error);
      toast.error("Failed to load topic");
    }
  };

  const fetchReplies = async () => {
    try {
      const { data, error } = await supabase
        .from("forum_replies")
        .select("*")
        .eq("topic_id", topicId)
        .order("created_at");
      if (error) throw error;
      setReplies(data);
    } catch (error) {
      console.error("Error fetching replies:", error);
      toast.error("Failed to load replies");
    }
  };

  const handleCreateReply = async () => {
    if (!session) {
      toast.error("Please sign in to reply");
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase.from("forum_replies").insert([
        {
          content: newReply,
          topic_id: topicId,
          user_id: session.user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Reply posted successfully");
      setNewReply("");
      fetchReplies();
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Failed to post reply");
    }
  };

  if (!topic) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate("/forum")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forum
        </Button>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>
            <p className="text-gray-600 mb-4">{topic.content}</p>
            <div className="text-sm text-gray-500">
              Posted on {new Date(topic.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {replies.map((reply) => (
            <Card key={reply.id}>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-2">{reply.content}</p>
                <div className="text-sm text-gray-500">
                  Posted on {new Date(reply.created_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Post a Reply</h2>
          <Textarea
            placeholder="Write your reply..."
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            className="mb-4"
          />
          <Button
            className="bg-primary"
            onClick={handleCreateReply}
            disabled={!newReply.trim()}
          >
            Post Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;