import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ForumHeaderProps {
  onNewTopic: () => void;
}

const ForumHeader = ({ onNewTopic }: ForumHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Community Forum
        </h1>
        <p className="text-gray-600">
          Join discussions with fellow healthcare professionals
        </p>
      </div>
      <Button className="bg-primary" onClick={onNewTopic}>
        <Plus className="mr-2 h-4 w-4" />
        New Topic
      </Button>
    </div>
  );
};

export default ForumHeader;