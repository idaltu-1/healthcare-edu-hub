import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { MessageSquare, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";

type ForumCategory = {
  id: string;
  name: string;
  description: string;
};

type ForumTopic = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  category_id: string;
  user_id: string;
};

const Forum = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newTopic, setNewTopic] = useState({
    title: "",
    content: "",
    category_id: "",
  });
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchTopics();
  }, []);

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

  const handleCreateTopic = async () => {
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
      setNewTopic({ title: "", content: "", category_id: "" });
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              Community Forum
            </h1>
            <p className="text-gray-600">
              Join discussions with fellow healthcare professionals
            </p>
          </div>
          <Dialog open={isNewTopicOpen} onOpenChange={setIsNewTopicOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary">
                <Plus className="mr-2 h-4 w-4" />
                New Topic
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Topic</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Topic Title"
                  value={newTopic.title}
                  onChange={(e) =>
                    setNewTopic({ ...newTopic, title: e.target.value })
                  }
                />
                <Select
                  value={newTopic.category_id}
                  onValueChange={(value) =>
                    setNewTopic({ ...newTopic, category_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Topic Content"
                  value={newTopic.content}
                  onChange={(e) =>
                    setNewTopic({ ...newTopic, content: e.target.value })
                  }
                  className="min-h-[100px]"
                />
                <Button
                  className="w-full bg-primary"
                  onClick={handleCreateTopic}
                  disabled={
                    !newTopic.title ||
                    !newTopic.content ||
                    !newTopic.category_id
                  }
                >
                  Create Topic
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-8">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/forum/topic/${topic.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                    <p className="text-gray-600 line-clamp-2">{topic.content}</p>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>0</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Posted on {new Date(topic.created_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;