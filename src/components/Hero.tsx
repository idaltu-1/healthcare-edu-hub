import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-primary min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-primary-foreground sm:text-5xl md:text-6xl">
            <span className="block">Transforming Healthcare Professionals</span>
            <span className="block text-secondary">into Business Leaders</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-accent sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Comprehensive business education and resources designed specifically for healthcare professionals seeking to excel in entrepreneurship.
          </p>
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12 gap-4">
            <Button 
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-base font-medium bg-secondary text-primary hover:bg-secondary/90 md:py-4 md:text-lg md:px-10"
            >
              Join Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-3 text-base font-medium border-2 border-secondary text-primary-foreground hover:bg-secondary/10 md:py-4 md:text-lg md:px-10"
            >
              Explore Courses <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;