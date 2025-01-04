import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { toast } from "sonner";

const Community = () => {
  return (
    <div className="min-h-screen bg-primary-foreground pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Users className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">Healthcare Professional Community</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with fellow healthcare professionals, share experiences, and grow together in your business journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Discussion Groups</h2>
            <p className="text-gray-600 mb-4">Join specialized groups based on your interests and specialty.</p>
            <Button 
              onClick={() => toast.info("Discussion groups coming soon!")}
              className="w-full bg-primary"
            >
              Browse Groups
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Networking Events</h2>
            <p className="text-gray-600 mb-4">Participate in virtual and in-person networking events.</p>
            <Button 
              onClick={() => toast.info("Events feature coming soon!")}
              className="w-full bg-primary"
            >
              View Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;