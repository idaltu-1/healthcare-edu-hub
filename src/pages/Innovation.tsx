import { Lightbulb, TrendingUp, Target, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Innovation = () => {
  const resources = [
    {
      title: "Digital Health Transformation",
      description: "Learn about implementing digital solutions in healthcare practices.",
      icon: TrendingUp,
    },
    {
      title: "Practice Optimization",
      description: "Discover strategies to streamline your healthcare operations.",
      icon: Target,
    },
    {
      title: "Future of Healthcare",
      description: "Stay ahead with insights on emerging healthcare trends.",
      icon: BookOpen,
    }
  ];

  return (
    <div className="min-h-screen bg-primary-foreground">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <Lightbulb className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">Innovation & Growth</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay ahead with cutting-edge business strategies and innovative approaches in healthcare.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <resource.icon className="h-8 w-8 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <Button 
                  onClick={() => toast.info("Resource access coming soon!")}
                  className="w-full bg-primary"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Transform Your Practice?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get access to our comprehensive innovation toolkit and start implementing cutting-edge solutions in your healthcare practice.
          </p>
          <Button 
            size="lg"
            onClick={() => toast.info("Innovation toolkit coming soon!")}
            className="bg-primary"
          >
            Access Innovation Toolkit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Innovation;