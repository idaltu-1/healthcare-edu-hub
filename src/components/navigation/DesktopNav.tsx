import { Button } from "@/components/ui/button";
import { UserCog, LogOut, LogIn, Settings2 } from "lucide-react";
import { MenuItem } from "./MenuItems";
import { Session } from "@supabase/auth-helpers-react";

interface DesktopNavProps {
  menuItems: MenuItem[];
  session: Session | null;
  handleNavigation: (path: string) => void;
  handleLogout: () => void;
  handleAuth: () => void;
}

const DesktopNav = ({
  menuItems,
  session,
  handleNavigation,
  handleLogout,
  handleAuth,
}: DesktopNavProps) => {
  console.log("Desktop Nav session:", session); // Debug log

  return (
    <div className="hidden md:flex md:items-center md:space-x-4">
      {menuItems.map((item) => {
        if (item.requiresAuth && !session) return null;
        return (
          <Button
            key={item.path}
            variant="ghost"
            onClick={() => handleNavigation(item.path)}
            className="text-gray-600 hover:text-gray-900"
          >
            {item.label}
          </Button>
        );
      })}
      {session ? (
        <>
          <Button
            variant="ghost"
            onClick={() => handleNavigation("/my-account")}
            className="text-gray-600 hover:text-gray-900"
          >
            <UserCog className="h-5 w-5 mr-2" />
            Account
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleNavigation("/settings")}
            className="text-gray-600 hover:text-gray-900"
          >
            <Settings2 className="h-5 w-5 mr-2" />
            Settings
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </>
      ) : (
        <Button
          variant="ghost"
          onClick={handleAuth}
          className="text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <LogIn className="h-5 w-5 mr-2" />
          Login
        </Button>
      )}
    </div>
  );
};

export default DesktopNav;