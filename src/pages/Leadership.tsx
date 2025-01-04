import { Trophy, Users, Target, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Leadership = () => {
  const programs = [
    {
      title: "Healthcare Leadership Essentials",
      description: "Master fundamental leadership skills for healthcare professionals.",
      duration: "8 weeks",
      icon: Trophy
    },
    {
      title: "Team Management Excellence",
      description: "Learn effective strategies for managing healthcare teams.",
      duration: "6 weeks",
      icon: Users
    },
    {
      title: "Strategic Decision Making",
      description: "Develop critical thinking and decision-making skills.",
      duration: "4 weeks",
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen bg-primary-foreground">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <Trophy className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">Leadership Development</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build essential leadership skills to effectively manage teams and drive success in healthcare.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {programs.map((program, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <program.icon className="h-8 w-8 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-2">{program.title}</h2>
                <p className="text-gray-600 mb-2">{program.description}</p>
                <p className="text-sm text-primary mb-4">Duration: {program.duration}</p>
                <Button 
                  onClick={() => toast.info("Program enrollment coming soon!")}
                  className="w-full bg-primary"
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <BookOpen className="mx-auto h-8 w-8 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Mentorship Program</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with experienced healthcare leaders and receive personalized guidance to accelerate your leadership journey.
            </p>
          </div>
          <div className="flex justify-center">
            <Button 
              size="lg"
              onClick={() => toast.info("Mentorship program coming soon!")}
              className="bg-primary"
            >
              Join Mentorship Program
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;