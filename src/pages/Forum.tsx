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

const Forum = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchTopics();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("forum_categories")
        .select("*")
        .order("name");
      if (error) throw error;
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load forum categories");
    }
  };

  const fetchTopics = async () => {
    try {
      const query = supabase
        .from("forum_topics")
        .select("*")
        .order("created_at", { ascending: false });

      if (selectedCategory) {
        query.eq("category_id", selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      setTopics(data);
    } catch (error) {
      console.error("Error fetching topics:", error);
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
      const { error } = await supabase.from("forum_topics").insert([
        {
          title: newTopic.title,
          content: newTopic.content,
          category_id: newTopic.category_id,
          user_id: session.user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Topic created successfully");
      setIsNewTopicOpen(false);
      fetchTopics();
    } catch (error) {
      console.error("Error creating topic:", error);
      toast.error("Failed to create topic");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ForumHeader onNewTopic={() => setIsNewTopicOpen(true)} />
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