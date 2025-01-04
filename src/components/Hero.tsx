import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-primary min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Empowering Healthcare Professionals</span>
            <span className="block text-secondary">with Business Mastery</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Learn, connect, and grow with tailored business education and resources designed specifically for healthcare professionals.
          </p>
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="rounded-md shadow">
              <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium bg-secondary text-primary hover:bg-secondary/90 md:py-4 md:text-lg md:px-10">
                Explore Courses
              </Button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium border-2 border-white text-white hover:bg-white/10 md:py-4 md:text-lg md:px-10">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;