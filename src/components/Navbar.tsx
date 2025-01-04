import { useState } from "react";
import { Menu, X, Users, BookOpen, Rss, MessageSquare, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    setIsOpen(false);
  };

  const menuItems = [
    { label: "Courses", path: "/courses", icon: BookOpen },
    { label: "Community", path: "#community", icon: Users },
    { label: "Blog", path: "#blog", icon: BookOpen },
    { label: "Newsletter", path: "#newsletter", icon: Rss },
    { label: "Forum", path: "#forum", icon: MessageSquare },
  ];

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
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className="text-primary-foreground hover:text-secondary transition-colors flex items-center gap-1"
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
            {session ? (
              <>
                <Button 
                  variant="ghost" 
                  className="text-primary-foreground hover:text-secondary"
                  onClick={() => handleNavigation("/settings")}
                >
                  <Settings size={18} className="mr-2" />
                  Account Settings
                </Button>
                <Button 
                  variant="default" 
                  className="bg-secondary text-primary hover:bg-secondary/90"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </>
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-primary-foreground hover:text-secondary">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-primary">
                <div className="flex flex-col space-y-4 mt-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavigation(item.path)}
                      className="flex items-center space-x-2 text-primary-foreground hover:text-secondary transition-colors px-4 py-2"
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                  {session ? (
                    <>
                      <Button 
                        variant="ghost" 
                        className="text-primary-foreground hover:text-secondary w-full justify-start"
                        onClick={() => handleNavigation("/settings")}
                      >
                        <Settings size={18} className="mr-2" />
                        Account Settings
                      </Button>
                      <Button 
                        variant="default" 
                        className="bg-secondary text-primary hover:bg-secondary/90 w-full mt-4"
                        onClick={handleLogout}
                      >
                        <LogOut size={18} className="mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="default" 
                      className="bg-secondary text-primary hover:bg-secondary/90 w-full mt-4"
                      onClick={handleAuth}
                    >
                      Get Started
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;