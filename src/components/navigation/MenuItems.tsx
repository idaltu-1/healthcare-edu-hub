import { Home, BookOpen, Users, MessageSquare, UserCog } from "lucide-react";

export interface MenuItem {
  label: string;
  path: string;
  icon: any;
  requiresAuth?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "Courses",
    path: "/courses",
    icon: BookOpen,
  },
  {
    label: "Community",
    path: "/community",
    icon: Users,
  },
  {
    label: "Forum",
    path: "/forum",
    icon: MessageSquare,
  },
  {
    label: "My Account",
    path: "/settings",
    icon: UserCog,
    requiresAuth: true,
  },
];