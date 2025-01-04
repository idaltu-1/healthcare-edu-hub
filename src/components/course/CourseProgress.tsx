import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";

interface CourseProgressProps {
  courseId: string;
  userId: string;
}

const CourseProgress = ({ courseId, userId }: CourseProgressProps) => {
  const { data: modules } = useQuery({
    queryKey: ["course-modules", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_modules")
        .select("*")
        .eq("course_id", courseId)
        .order("order_index");

      if (error) throw error;
      return data;
    },
  });

  const { data: enrollment } = useQuery({
    queryKey: ["enrollment", courseId, userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_enrollments")
        .select("*")
        .eq("course_id", courseId)
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const totalModules = modules?.length || 0;
  const completedModules = 0; // This will be implemented when we add module completion tracking
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-gray-600">
            {completedModules} of {totalModules} modules completed
          </p>
          <div className="flex items-center space-x-2">
            {enrollment?.completed_at ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-500">Course Completed</span>
              </>
            ) : (
              <>
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-blue-500">In Progress</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseProgress;