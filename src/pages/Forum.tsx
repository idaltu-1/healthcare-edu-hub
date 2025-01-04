import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import ForumHeader from "@/components/forum/ForumHeader";
import CategoryFilter from "@/components/forum/CategoryFilter";
import TopicList from "@/components/forum/TopicList";
import NewTopicDialog from "@/components/forum/NewTopicDialog";
import CategoryManagement from "@/components/forum/CategoryManagement";

interface TopicWithUser {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  category_id: string;
  updated_at: string;
  profiles?: {
    username: string | null;
    full_name: string | null;
  } | null;
  reply_count: number;
}

const Forum = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState<TopicWithUser[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchTopics();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      console.log("Fetching categories...");
      const { data, error } = await supabase
        .from("forum_categories")
        .select("*")
        .order("name");
      
      if (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
      
      console.log("Categories fetched:", data);
      setCategories(data);
    } catch (error) {
      console.error("Error in fetchCategories:", error);
      toast.error("Failed to load forum categories");
    }
  };

  const fetchTopics = async () => {
    try {
      console.log("Fetching topics with category filter:", selectedCategory);
      let query = supabase
        .from("forum_topics")
        .select(`
          *,
          profiles (
            username,
            full_name
          ),
          forum_replies (count)
        `)
        .order("created_at", { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq("category_id", selectedCategory);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching topics:", error);
        throw error;
      }

      console.log("Topics fetched:", data);
      
      const transformedTopics = data.map(topic => ({
        ...topic,
        reply_count: topic.forum_replies?.[0]?.count || 0
      }));

      setTopics(transformedTopics);
    } catch (error) {
      console.error("Error in fetchTopics:", error);
      toast.error("Failed to load forum topics");
    }
  };

  const handleCreateTopic = async (newTopic) => {
    if (!session) {
      toast.error("Please sign in to create a topic");
      navigate("/auth");
      return;
    }

    try {
      console.log("Creating new topic:", newTopic);
      const { data, error } = await supabase
        .from("forum_topics")
        .insert([
          {
            title: newTopic.title,
            content: newTopic.content,
            category_id: newTopic.category_id,
            user_id: session.user.id,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Error inserting topic:", error);
        throw error;
      }

      console.log("Topic created successfully:", data);
      toast.success("Topic created successfully");
      setIsNewTopicOpen(false);
      await fetchTopics();
    } catch (error) {
      console.error("Error creating topic:", error);
      toast.error("Failed to create topic");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-center mb-8">
          <ForumHeader onNewTopic={() => setIsNewTopicOpen(true)} />
          <CategoryManagement onCategoryCreated={fetchCategories} />
        </div>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <TopicList topics={topics} />
        <NewTopicDialog
          isOpen={isNewTopicOpen}
          onOpenChange={setIsNewTopicOpen}
          onCreateTopic={handleCreateTopic}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default Forum;