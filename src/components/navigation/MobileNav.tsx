import { Button } from "@/components/ui/button";
import { Settings, LogOut, LogIn } from "lucide-react";
import { MenuItem } from "./MenuItems";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface MobileNavProps {
  menuItems: MenuItem[];
  session: boolean;
  handleNavigation: (path: string) => void;
  handleLogout: () => void;
  handleAuth: () => void;
}

const MobileNav = ({
  menuItems,
  session,
  handleNavigation,
  handleLogout,
  handleAuth,
}: MobileNavProps) => {
  return (
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
                  My Account
                </Button>
                <Button 
                  variant="default" 
                  className="bg-secondary text-primary hover:bg-secondary/90 w-full"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="default" 
                className="bg-secondary text-primary hover:bg-secondary/90 w-full"
                onClick={handleAuth}
              >
                <LogIn size={18} className="mr-2" />
                Login
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;