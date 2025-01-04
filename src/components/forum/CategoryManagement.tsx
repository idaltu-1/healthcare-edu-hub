import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CategoryManagementProps {
  onCategoryCreated: () => void;
}

const CategoryManagement = ({ onCategoryCreated }: CategoryManagementProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const handleCreateCategory = async () => {
    try {
      console.log("Creating new category:", newCategory);
      const { data, error } = await supabase
        .from("forum_categories")
        .insert([newCategory])
        .select()
        .single();

      if (error) {
        console.error("Error creating category:", error);
        throw error;
      }

      console.log("Category created successfully:", data);
      toast.success("Category created successfully");
      setIsOpen(false);
      setNewCategory({ name: "", description: "" });
      onCategoryCreated();
    } catch (error) {
      console.error("Error in handleCreateCategory:", error);
      toast.error("Failed to create category. Make sure you have admin privileges.");
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline" size="sm">
        <Plus className="h-4 w-4 mr-2" />
        New Category
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />
            <Textarea
              placeholder="Category Description (optional)"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
            />
            <Button
              className="w-full"
              onClick={handleCreateCategory}
              disabled={!newCategory.name}
            >
              Create Category
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryManagement;