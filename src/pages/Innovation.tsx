import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Innovation = () => {
  return (
    <div className="min-h-screen bg-primary-foreground pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Lightbulb className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">Innovation & Growth</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay ahead with cutting-edge business strategies and innovative approaches in healthcare.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Latest Innovations</h2>
            <p className="text-gray-600 mb-4">Discover the latest trends and innovations in healthcare business.</p>
            <Button 
              onClick={() => toast.info("Innovation library coming soon!")}
              className="w-full bg-primary"
            >
              Explore Innovations
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Growth Strategies</h2>
            <p className="text-gray-600 mb-4">Learn proven strategies for scaling your healthcare practice.</p>
            <Button 
              onClick={() => toast.info("Strategy guides coming soon!")}
              className="w-full bg-primary"
            >
              View Strategies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Innovation;