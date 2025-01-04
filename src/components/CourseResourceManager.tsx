import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AddResourceForm from "./course/resources/AddResourceForm";
import ResourceList from "./course/resources/ResourceList";

export type ResourceType = "pdf" | "link";

export interface Resource {
  id: string;
  course_id: string;
  title: string;
  description: string;
  resource_type: ResourceType;
  resource_url: string;
  created_at: string;
  updated_at: string;
}

interface CourseResourceManagerProps {
  courseId: string;
}

const CourseResourceManager = ({ courseId }: CourseResourceManagerProps) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, [courseId]);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from("course_resources")
        .select("*")
        .eq("course_id", courseId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Type assertion to ensure resource_type is correct
      const typedResources = data.map(resource => ({
        ...resource,
        resource_type: resource.resource_type as ResourceType
      }));

      setResources(typedResources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Failed to load course resources");
    } finally {
      setLoading(false);
    }
  };

  const handleResourceAdded = () => {
    fetchResources();
  };

  return (
    <div className="space-y-6">
      <AddResourceForm courseId={courseId} onResourceAdded={handleResourceAdded} />
      <ResourceList resources={resources} loading={loading} />
    </div>
  );
};

export default CourseResourceManager;