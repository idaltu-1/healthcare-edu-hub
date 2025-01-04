import { BookOpen, Users, Trophy } from "lucide-react";

const features = [
  {
    name: "Learn from Comprehensive Courses",
    description: "Access expertly crafted courses designed specifically for healthcare professionals seeking business mastery.",
    icon: BookOpen,
  },
  {
    name: "Engage with a Thriving Community",
    description: "Connect with like-minded healthcare professionals and learn from their experiences and insights.",
    icon: Users,
  },
  {
    name: "Succeed with Expert Insights",
    description: "Gain practical knowledge and tools to transform your healthcare practice into a thriving business.",
    icon: Trophy,
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            Why Choose Doc.MBA?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Comprehensive business education tailored for healthcare professionals.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-primary">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;