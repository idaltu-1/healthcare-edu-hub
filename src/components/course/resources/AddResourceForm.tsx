import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AddResourceFormProps {
  courseId: string;
  onResourceAdded: () => void;
}

const AddResourceForm: React.FC<AddResourceFormProps> = ({ courseId, onResourceAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] = useState<"pdf" | "link">("link");
  const [file, setFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let resourceUrl = linkUrl;

      if (resourceType === "pdf" && file) {
        console.log("Uploading PDF file:", file.name);
        const fileExt = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
          .from("course_materials")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw uploadError;
        }

        console.log("File uploaded successfully:", data);

        const { data: { publicUrl } } = supabase.storage
          .from("course_materials")
          .getPublicUrl(fileName);

        console.log("Generated public URL:", publicUrl);
        resourceUrl = publicUrl;
      }

      console.log("Inserting resource into database:", {
        courseId,
        title,
        resourceType,
        resourceUrl
      });

      const { error } = await supabase.from("course_resources").insert({
        course_id: courseId,
        title,
        description,
        resource_type: resourceType,
        resource_url: resourceUrl,
      });

      if (error) {
        console.error("Database insert error:", error);
        throw error;
      }

      toast.success("Resource added successfully");
      setTitle("");
      setDescription("");
      setFile(null);
      setLinkUrl("");
      onResourceAdded();
    } catch (error) {
      console.error("Error adding resource:", error);
      toast.error("Failed to add resource");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Course Resource</CardTitle>
        <CardDescription>Upload PDFs or add links to external resources</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resourceType">Resource Type</Label>
            <Select
              value={resourceType}
              onValueChange={(value: "pdf" | "link") => setResourceType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="link">Link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {resourceType === "pdf" ? (
            <div className="space-y-2">
              <Label htmlFor="file">PDF File</Label>
              <Input
                id="file"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="link">Resource URL</Label>
              <Input
                id="link"
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                required
              />
            </div>
          )}

          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              "Adding Resource..."
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Resource
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddResourceForm;