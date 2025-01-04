import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary/95 backdrop-blur-sm shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/2116ad73-ff5d-4c19-a805-159b9bde9446.png" 
                alt="Doc.MBA Logo" 
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-secondary hidden sm:inline">Doc.MBA</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#courses" className="text-primary-foreground hover:text-secondary transition-colors">Courses</a>
            <a href="#resources" className="text-primary-foreground hover:text-secondary transition-colors">Resources</a>
            <a href="#about" className="text-primary-foreground hover:text-secondary transition-colors">About</a>
            <Button variant="default" className="bg-secondary text-primary hover:bg-secondary/90">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-foreground hover:text-secondary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary">
            <a href="#courses" className="block px-3 py-2 text-primary-foreground hover:text-secondary">Courses</a>
            <a href="#resources" className="block px-3 py-2 text-primary-foreground hover:text-secondary">Resources</a>
            <a href="#about" className="block px-3 py-2 text-primary-foreground hover:text-secondary">About</a>
            <Button variant="default" className="w-full mt-2 bg-secondary text-primary hover:bg-secondary/90">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;