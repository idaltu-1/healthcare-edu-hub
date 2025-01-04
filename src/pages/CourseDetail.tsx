import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSession } from "@supabase/auth-helpers-react";
import CourseResourceManager from "@/components/CourseResourceManager";
import CourseProgress from "@/components/course/CourseProgress";
import ModuleList from "@/components/course/ModuleList";

const CourseDetail = () => {
  const { courseId } = useParams();
  const session = useSession();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    if (success === "true") {
      handleSuccessfulEnrollment();
    } else if (canceled === "true") {
      toast.error("Course enrollment was canceled");
    }
  }, [success, canceled]);

  const handleSuccessfulEnrollment = async () => {
    if (!session?.user?.id) return;

    try {
      const { error } = await supabase
        .from("course_enrollments")
        .insert([{ course_id: courseId, user_id: session.user.id }]);

      if (error) {
        console.error("Error recording enrollment:", error);
        toast.error("Failed to record enrollment");
        return;
      }

      toast.success("Successfully enrolled in course!");
    } catch (error) {
      console.error("Error recording enrollment:", error);
      toast.error("Failed to record enrollment");
    }
  };

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: enrollment } = useQuery({
    queryKey: ["enrollment", courseId, session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_enrollments")
        .select("*")
        .eq("course_id", courseId)
        .eq("user_id", session?.user?.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Loading course details...</div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Course not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <div>
                    <h1 className="text-2xl font-bold">{course.title}</h1>
                    <p className="text-gray-500">
                      {enrollment ? "Enrolled" : `$${course.price}`}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{course.description}</p>
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
              <ModuleList courseId={courseId!} isEnrolled={!!enrollment} />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Course Resources</h2>
              <CourseResourceManager courseId={courseId!} />
            </div>
          </div>

          <div>
            {enrollment && session?.user?.id && (
              <CourseProgress courseId={courseId!} userId={session.user.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;