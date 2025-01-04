import { Users, BookOpen, Rss, MessageSquare } from "lucide-react";

export const menuItems = [
  { label: "Courses", path: "/courses", icon: BookOpen },
  { label: "Community", path: "#community", icon: Users },
  { label: "Blog", path: "#blog", icon: BookOpen },
  { label: "Newsletter", path: "#newsletter", icon: Rss },
  { label: "Forum", path: "#forum", icon: MessageSquare },
];

export type MenuItem = (typeof menuItems)[number];