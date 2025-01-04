import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";
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
  );
};

export default DesktopNav;