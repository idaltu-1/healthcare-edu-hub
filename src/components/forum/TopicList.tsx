import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, UserRound } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Topic {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user: {
    full_name?: string;
    username?: string;
  };
  reply_count: number;
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
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                <p className="text-gray-600 line-clamp-2">{topic.content}</p>
                <div className="flex items-center mt-4 text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <UserRound className="h-4 w-4 mr-1" />
                    <span>
                      {topic.user?.full_name || topic.user?.username || "Anonymous"}
                    </span>
                  </div>
                  <span>
                    {formatDistanceToNow(new Date(topic.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-gray-500 ml-4">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{topic.reply_count}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopicList;