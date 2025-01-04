import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Leadership = () => {
  return (
    <div className="min-h-screen bg-primary-foreground pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Trophy className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">Leadership Development</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build essential leadership skills to effectively manage teams and drive success in healthcare.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Leadership Courses</h2>
            <p className="text-gray-600 mb-4">Access comprehensive leadership training programs.</p>
            <Button 
              onClick={() => toast.info("Courses coming soon!")}
              className="w-full bg-primary"
            >
              Browse Courses
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Mentorship Program</h2>
            <p className="text-gray-600 mb-4">Connect with experienced healthcare leaders for guidance.</p>
            <Button 
              onClick={() => toast.info("Mentorship program coming soon!")}
              className="w-full bg-primary"
            >
              Join Program
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;