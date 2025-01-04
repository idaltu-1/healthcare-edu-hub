import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import Logo from "./navigation/Logo";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";
import { menuItems } from "./navigation/MenuItems";

const Navbar = () => {
  const navigate = useNavigate();
  const session = useSession();
  const supabase = useSupabaseClient();

  console.log("Current session:", session); // Debug log

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
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
  };

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Logo handleNavigation={handleNavigation} />
          <DesktopNav
            menuItems={menuItems}
            session={session}
            handleNavigation={handleNavigation}
            handleLogout={handleLogout}
            handleAuth={handleAuth}
          />
          <MobileNav
            menuItems={menuItems}
            session={session}
            handleNavigation={handleNavigation}
            handleLogout={handleLogout}
            handleAuth={handleAuth}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;