import { Button } from "@/components/ui/button";
import { UserCog, LogOut, LogIn, Menu, Settings2 } from "lucide-react";
import { MenuItem } from "./MenuItems";
import { Session } from "@supabase/auth-helpers-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileNavProps {
  menuItems: MenuItem[];
  session: Session | null;
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
  console.log("Mobile Nav session:", session); // Debug log

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="flex flex-col space-y-4 mt-4">
            {menuItems.map((item) => {
              if (item.requiresAuth && !session) return null;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => handleNavigation(item.path)}
                  className="justify-start"
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
                  className="justify-start"
                >
                  <UserCog className="h-5 w-5 mr-2" />
                  Account
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("/settings")}
                  className="justify-start"
                >
                  <Settings2 className="h-5 w-5 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="justify-start"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                onClick={handleAuth}
                className="justify-start cursor-pointer"
              >
                <LogIn className="h-5 w-5 mr-2" />
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