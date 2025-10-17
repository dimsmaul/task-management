import { useDashboardRouter } from "@/features/users/hooks/useDashboardRouter";
// import { useSidebarHandler } from "@/features/users/hooks/useSidebarHandler";
import React from "react";
import { Outlet } from "react-router-dom";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

const DashboardLayouts: React.FC = () => {
  const { generateBreadcrumbs } = useDashboardRouter();
  // const { sidebar, toggleSidebar } = useSidebarHandler();
  const { logout } = useLogout();
  // const { pathname } = window.location;

  return (
    <SidebarProvider>
      <div className="flex flex-row h-screen w-screen overflow-hidden bg-primary-100 transition-all duration-300">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <SidebarInset>
          <header className="flex h-16 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    {generateBreadcrumbs().map((item, index) => (
                      <BreadcrumbLink
                        href={item.path}
                        key={index}
                        className="flex items-center gap-1"
                      >
                        {item.name}
                      </BreadcrumbLink>
                    ))}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2 px-4">
              <Button variant={"outline"} size={"icon"}>
                <AnimatedThemeToggler />
              </Button>
              <Button variant={"outline"} size={"icon"} onClick={logout}>
                <LogOut />
              </Button>
            </div>
          </header>

          <Wrapper>
            <Outlet />
          </Wrapper>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayouts;

export interface IWrapper {
  children?: React.ReactNode;
}

const Wrapper: React.FC<IWrapper> = ({ children }) => {
  const { open } = useSidebar();

  return (
    <div
      className={cn(
        "p-4 overflow-y-auto transition-all duration-300 ease-in-out ",
        open
          ? "w-[calc(100vw-var(--sidebar-width))]"
          : "w-[calc(100vw-var(--sidebar-width-icon))]"
      )}
    >
      <div className="">{children}</div>
    </div>
  );
};
