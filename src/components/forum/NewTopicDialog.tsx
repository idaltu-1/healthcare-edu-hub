import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface NewTopicDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTopic: (topic: { title: string; content: string; category_id: string }) => void;
  categories: Array<{ id: string; name: string }>;
}

const NewTopicDialog = ({
  isOpen,
  onOpenChange,
  onCreateTopic,
  categories,
}: NewTopicDialogProps) => {
  const session = useSession();
  const navigate = useNavigate();
  const [newTopic, setNewTopic] = useState({
    title: "",
    content: "",
    category_id: "",
  });

  const handleSubmit = () => {
    if (!session) {
      toast.error("Please sign in to create a topic");
      navigate("/auth");
      return;
    }
    onCreateTopic(newTopic);
    setNewTopic({ title: "", content: "", category_id: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
            onClick={handleSubmit}
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
  );
};

export default NewTopicDialog;