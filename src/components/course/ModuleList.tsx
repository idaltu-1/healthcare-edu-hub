import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { toast } from "sonner";

interface ModuleListProps {
  courseId: string;
  isEnrolled: boolean;
}

const ModuleList = ({ courseId, isEnrolled }: ModuleListProps) => {
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

  const handleStartModule = (moduleId: string) => {
    if (!isEnrolled) {
      toast.error("Please enroll in the course to access modules");
      return;
    }
    // This will be implemented when we add module content viewing
    toast.info("Module content viewing coming soon!");
  };

  return (
    <div className="space-y-4">
      {modules?.map((module, index) => (
        <Card key={module.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {isEnrolled ? (
                  <PlayCircle className="h-6 w-6 text-primary" />
                ) : (
                  <Lock className="h-6 w-6 text-gray-400" />
                )}
                <div>
                  <h3 className="font-semibold">
                    Module {index + 1}: {module.title}
                  </h3>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              </div>
              <Button
                variant={isEnrolled ? "default" : "secondary"}
                onClick={() => handleStartModule(module.id)}
                disabled={!isEnrolled}
              >
                {isEnrolled ? "Start Module" : "Locked"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModuleList;