import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSession } from "@supabase/auth-helpers-react";

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
        if (error.code === "23505") {
          toast.error("You are already enrolled in this course");
        } else {
          console.error("Error recording enrollment:", error);
          toast.error("Failed to record enrollment");
        }
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

  const { data: modules, isLoading: modulesLoading } = useQuery({
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

  if (courseLoading || modulesLoading) {
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
          {/* Course Info */}
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

            {/* Course Modules */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
              <div className="space-y-4">
                {modules?.map((module) => (
                  <Card key={module.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        {enrollment ? (
                          <CheckCircle className="h-6 w-6 text-primary mt-1" />
                        ) : (
                          <Clock className="h-6 w-6 text-gray-400 mt-1" />
                        )}
                        <div>
                          <h3 className="font-semibold">{module.title}</h3>
                          <p className="text-gray-600">{module.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Course Progress/Status */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Course Status</h2>
                {enrollment ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>Enrolled</span>
                    </div>
                    <p className="text-gray-600">
                      You have access to all course materials.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Enroll to get access to all course materials.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;