import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface TopicListProps {
  topics: Topic[];
}

const TopicList = ({ topics }: TopicListProps) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default TopicList;