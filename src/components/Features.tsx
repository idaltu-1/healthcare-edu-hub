import { BookOpen, Users, Trophy, Target, ChartBar, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const features = [
  {
    name: "Business Foundations",
    description: "Master essential business concepts tailored for healthcare professionals.",
    icon: BookOpen,
    path: "/business",
  },
  {
    name: "Practice Management",
    description: "Learn effective strategies to optimize and grow your healthcare practice.",
    icon: Target,
    path: "/practice",
  },
  {
    name: "Financial Strategy",
    description: "Develop strong financial acumen for sustainable business growth.",
    icon: ChartBar,
    path: "/finance",
  },
  {
    name: "Leadership Development",
    description: "Build leadership skills to effectively manage teams and drive success.",
    icon: Trophy,
    path: "/leadership",
  },
  {
    name: "Community Network",
    description: "Connect with like-minded healthcare professionals and industry leaders.",
    icon: Users,
    path: "/community",
  },
  {
    name: "Innovation & Growth",
    description: "Stay ahead with cutting-edge business strategies in healthcare.",
    icon: Lightbulb,
    path: "/innovation",
  },
];

const Features = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="py-24 bg-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            Comprehensive Healthcare Business Education
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Transform your healthcare expertise into business success with our specialized programs.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card 
                key={feature.name} 
                className="border border-secondary/20 hover:border-secondary hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleCardClick(feature.path)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-secondary mb-4">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{feature.name}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;