import { useDashboardRouter } from "@/features/users/hooks/useDashboardRouter";
import { useSidebarHandler } from "@/features/users/hooks/useSidebarHandler";
import Icon from "@mdi/react";
import clsx from "clsx";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Drawer from "@/components/drawer/drawer";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

const DashboardLayouts: React.FC = () => {
  const { route, generateBreadcrumbs } = useDashboardRouter();
  const { sidebar, toggleSidebar } = useSidebarHandler();
  const { logout } = useLogout();
  const { pathname } = window.location;

  return (
    <SidebarProvider>
      <div className="flex flex-row h-screen w-screen bg-primary-100 transition-all duration-300">
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

          {/* Content */}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
          {/* <div className="overflow-y-auto h-[92vh] p-3 text-support-100">
            <Outlet />
          </div> */}
          {/* </div> */}
        </SidebarInset>
      </div>
      {/* <div className="md:hidden">
        <Drawer
          isOpen={sidebar === "full"}
          onClose={() => {
            toggleSidebar();
          }}
          placement="left"
          className="md:hidden "
        >
          <div className="mt-10">
            <div className="flex flex-col gap-2">
              {route.map((item) => (
                <Link
                  key={item.name}
                  className={clsx(
                    "w-full text-start transition-all duration-300 flex items-center  rounded-md p-2",
                    pathname === item.path
                      ? "text-primary-100 bg-support-100"
                      : "text-support-100 hover:bg-support-200 hover:text-primary-100",
                    sidebar === "hide"
                      ? "justify-center"
                      : "justify-start gap-2"
                  )}
                  to={item.path}
                  onClick={() => {
                    toggleSidebar();
                  }}
                >
                  <Icon path={item.icon} size={1} />
                  <p
                    className={clsx(
                      "whitespace-nowrap overflow-hidden ",
                      sidebar === "hide"
                        ? "!w-0 opacity-0"
                        : "w-auto opacity-100"
                    )}
                  >
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </Drawer>
      </div> */}
    </SidebarProvider>
  );
};

export default DashboardLayouts;
