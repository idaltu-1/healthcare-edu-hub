import { Button } from "@/components/ui/button";
import { UserCog, LogOut, LogIn, Settings2 } from "lucide-react";
import { MenuItem } from "./MenuItems";

interface DesktopNavProps {
  menuItems: MenuItem[];
  session: boolean;
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
  return (
    <div className="hidden md:flex md:items-center md:space-x-4">
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
        <div className="flex items-center space-x-2">
          <Button 
            variant="default"
            className="bg-secondary text-primary hover:bg-secondary/90"
            onClick={() => handleNavigation("/settings")}
          >
            <Settings2 size={18} className="mr-2" />
            Settings
          </Button>
          <Button 
            variant="default"
            className="bg-secondary text-primary hover:bg-secondary/90"
            onClick={() => handleNavigation("/my-account")}
          >
            <UserCog size={18} className="mr-2" />
            My Account
          </Button>
          <Button 
            variant="ghost" 
            className="text-primary-foreground hover:text-secondary"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      ) : (
        <Button 
          variant="default" 
          className="bg-secondary text-primary hover:bg-secondary/90"
          onClick={handleAuth}
        >
          <LogIn size={18} className="mr-2" />
          Login
        </Button>
      )}
    </div>
  );
};

export default DesktopNav;