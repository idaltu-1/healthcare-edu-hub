import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AddResourceForm from "./course/resources/AddResourceForm";
import ResourceList from "./course/resources/ResourceList";

interface CourseResourceManagerProps {
  courseId: string;
}

const CourseResourceManager: React.FC<CourseResourceManagerProps> = ({ courseId }) => {
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

  return (
    <div className="space-y-6">
      <AddResourceForm courseId={courseId} onResourceAdded={refetch} />
      <ResourceList resources={resources || []} />
    </div>
  );
};

export default CourseResourceManager;