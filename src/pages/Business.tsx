import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CheckCircle } from "lucide-react";

const Business = () => {
  const topics = [
    "Healthcare Business Models",
    "Strategic Planning",
    "Market Analysis",
    "Operations Management",
    "Healthcare Economics",
    "Business Ethics in Healthcare"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <BookOpen className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">Business Foundations</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master the essential business concepts and principles tailored specifically for healthcare professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((topic, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{topic}</h3>
                    <p className="text-gray-600">
                      Learn about {topic.toLowerCase()} and how it applies to modern healthcare practices.
                    </p>
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

export default Business;