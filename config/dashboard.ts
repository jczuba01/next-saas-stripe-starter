import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/admin",
        icon: "laptop",
        title: "Admin Panel",
        authorizeOnly: UserRole.ADMIN,
      },
      { href: "/", icon: "home", title: "Homepage" },
      { href: "/dashboard", icon: "dashboard", title: "Dashboard" },
      { href: "/chat", icon: "laptop", title: "Chat" },
    ],
  },
];
