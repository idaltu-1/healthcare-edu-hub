import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Doc.MBA</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#courses" className="text-gray-700 hover:text-primary">Courses</a>
            <a href="#resources" className="text-gray-700 hover:text-primary">Resources</a>
            <a href="#about" className="text-gray-700 hover:text-primary">About</a>
            <Button variant="default">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <a href="#courses" className="block px-3 py-2 text-gray-700 hover:text-primary">Courses</a>
            <a href="#resources" className="block px-3 py-2 text-gray-700 hover:text-primary">Resources</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-primary">About</a>
            <Button variant="default" className="w-full mt-2">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;