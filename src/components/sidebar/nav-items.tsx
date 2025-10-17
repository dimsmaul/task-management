import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const location = useLocation();
  return (
    <SidebarGroup className="">
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem
            key={item.name}
            className={cn(
              location.pathname?.split("/")[1] === item.url?.split("/")[1] &&
                "bg-foreground/20 rounded-md"
            )}
          >
            <SidebarMenuButton asChild>
              <Link to={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
