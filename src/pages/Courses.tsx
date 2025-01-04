import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

const Courses = () => {
  const navigate = useNavigate();
  const session = useSession();

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching courses:", error);
        throw error;
      }

      return data;
    },
  });

  const handleEnroll = async (courseId: string, price: number) => {
    if (!session) {
      toast.error("Please sign in to enroll in courses");
      navigate("/auth");
      return;
    }

    try {
      // Check if already enrolled
      const { data: enrollment, error: enrollmentError } = await supabase
        .from("course_enrollments")
        .select("*")
        .eq("course_id", courseId)
        .eq("user_id", session.user.id)
        .single();

      if (enrollmentError && enrollmentError.code !== "PGRST116") {
        console.error("Error checking enrollment:", enrollmentError);
        toast.error("Error checking enrollment status");
        return;
      }

      if (enrollment) {
        toast.error("You are already enrolled in this course");
        return;
      }

      // Create checkout session
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
        "create-checkout",
        {
          body: { courseId },
        }
      );

      if (checkoutError) {
        console.error("Error creating checkout session:", checkoutError);
        toast.error("Failed to create checkout session");
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = checkoutData.url;
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Failed to enroll in course");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Loading courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <BookOpen className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">Available Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance your healthcare business knowledge with our comprehensive courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses?.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <BookOpen className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-primary">
                        <DollarSign className="h-5 w-5" />
                        <span className="font-semibold">{course.price}</span>
                      </div>
                      <Button
                        variant="default"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => handleEnroll(course.id, course.price)}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;