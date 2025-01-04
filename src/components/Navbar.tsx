import { useState } from "react";
import { Menu, X, Users, BookOpen, Rss, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  const handleAuth = () => {
    navigate("/auth");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close mobile menu when navigating
  };

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
          <div className="hidden md:flex md:items-center md:space-x-6">
            <button 
              onClick={() => handleNavigation('/courses')} 
              className="text-primary-foreground hover:text-secondary transition-colors"
            >
              Courses
            </button>
            <a href="#community" className="text-primary-foreground hover:text-secondary transition-colors flex items-center gap-1">
              <Users size={18} />
              Community
            </a>
            <a href="#blog" className="text-primary-foreground hover:text-secondary transition-colors flex items-center gap-1">
              <BookOpen size={18} />
              Blog
            </a>
            <a href="#newsletter" className="text-primary-foreground hover:text-secondary transition-colors flex items-center gap-1">
              <Rss size={18} />
              Newsletter
            </a>
            <a href="#forum" className="text-primary-foreground hover:text-secondary transition-colors flex items-center gap-1">
              <MessageSquare size={18} />
              Forum
            </a>
            {session ? (
              <Button 
                variant="default" 
                className="bg-secondary text-primary hover:bg-secondary/90"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </Button>
            ) : (
              <Button 
                variant="default" 
                className="bg-secondary text-primary hover:bg-secondary/90"
                onClick={handleAuth}
              >
                Get Started
              </Button>
            )}
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
            <button 
              onClick={() => handleNavigation('/courses')}
              className="block w-full text-left px-3 py-2 text-primary-foreground hover:text-secondary"
            >
              Courses
            </button>
            <a href="#community" className="block px-3 py-2 text-primary-foreground hover:text-secondary flex items-center gap-2">
              <Users size={18} />
              Community
            </a>
            <a href="#blog" className="block px-3 py-2 text-primary-foreground hover:text-secondary flex items-center gap-2">
              <BookOpen size={18} />
              Blog
            </a>
            <a href="#newsletter" className="block px-3 py-2 text-primary-foreground hover:text-secondary flex items-center gap-2">
              <Rss size={18} />
              Newsletter
            </a>
            <a href="#forum" className="block px-3 py-2 text-primary-foreground hover:text-secondary flex items-center gap-2">
              <MessageSquare size={18} />
              Forum
            </a>
            {session ? (
              <Button 
                variant="default" 
                className="w-full mt-2 bg-secondary text-primary hover:bg-secondary/90"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </Button>
            ) : (
              <Button 
                variant="default" 
                className="w-full mt-2 bg-secondary text-primary hover:bg-secondary/90"
                onClick={handleAuth}
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;