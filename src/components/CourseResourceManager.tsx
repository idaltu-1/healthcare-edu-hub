import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link, FileText, Upload, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CourseResourceManagerProps {
  courseId: string;
}

const CourseResourceManager: React.FC<CourseResourceManagerProps> = ({ courseId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] = useState<"pdf" | "link">("link");
  const [file, setFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const { data: resources, refetch } = useQuery({
    queryKey: ["course-resources", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_resources")
        .select("*")
        .eq("course_id", courseId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

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
        const fileExt = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
          .from("course_materials")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("course_materials")
          .getPublicUrl(fileName);

        resourceUrl = publicUrl;
      }

      const { error } = await supabase.from("course_resources").insert({
        course_id: courseId,
        title,
        description,
        resource_type: resourceType,
        resource_url: resourceUrl,
      });

      if (error) throw error;

      toast.success("Resource added successfully");
      setTitle("");
      setDescription("");
      setFile(null);
      setLinkUrl("");
      refetch();
    } catch (error) {
      console.error("Error adding resource:", error);
      toast.error("Failed to add resource");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
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

      <Card>
        <CardHeader>
          <CardTitle>Course Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resources?.map((resource) => (
              <div
                key={resource.id}
                className="flex items-start space-x-4 p-4 border rounded-lg"
              >
                {resource.resource_type === "pdf" ? (
                  <FileText className="w-6 h-6 text-blue-500" />
                ) : (
                  <Link className="w-6 h-6 text-green-500" />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{resource.title}</h3>
                  {resource.description && (
                    <p className="text-sm text-gray-500">{resource.description}</p>
                  )}
                  <a
                    href={resource.resource_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline mt-1 inline-block"
                  >
                    {resource.resource_type === "pdf" ? "View PDF" : "Visit Link"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseResourceManager;