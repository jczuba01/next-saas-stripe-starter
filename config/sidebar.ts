import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      { href: "/home", icon: "home", title: "Home" },
      { href: "/chat", icon: "laptop", title: "Chat" },
    ],
  },
];
