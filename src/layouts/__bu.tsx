import { useDashboardRouter } from "@/features/users/hooks/useDashboardRouter";
import { useSidebarHandler } from "@/features/users/hooks/useSidebarHandler";
import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import React from "react";
import { Outlet } from "react-router-dom";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, LogOut } from "lucide-react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayouts: React.FC = () => {
  const { generateBreadcrumbs } = useDashboardRouter();
  const { sidebar, toggleSidebar } = useSidebarHandler();
  const { logout } = useLogout();
  // const { pathname } = window.location;

  return (
    <SidebarProvider>
      <div className="flex flex-row h-screen w-screen bg-primary-100 transition-all duration-300">
        {/* Sidebar */}
        <AppSidebar />
        {/* <div
          className={clsx(
            "h-screen transition-all duration-300 border-r border-support-200/30 md:block hidden",
            sidebar === "hide" ? "w-[6vw]" : "w-[20vw]"
          )}
        >
          <div className="flex flex-col gap-5 p-5">
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
        </div> */}

        {/* Main Content */}
        <div
          className={clsx(
            "h-screen transition-all duration-300",
            sidebar === "hide" ? "md:w-[94vw] w-screen" : "md:w-[80vw] w-screen"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between h-[8vh] p-3 border-b border-support-200/30 bg-primary-100 text-support-100 transition-all duration-300">
            <div className="flex items-center gap-2">
              <button className="btn-icon-outline" onClick={toggleSidebar}>
                <ChevronRightIcon />
                {/* <Icon
                  path={mdiChevronRight}
                  size={1}
                  className={clsx(
                    "transition-transform duration-300",
                    sidebar === "hide" ? "rotate-0" : "rotate-180"
                  )}
                /> */}
              </button>
              <h1 className="text-xl flex items-center gap-1">
                {generateBreadcrumbs().map((item, index) => (
                  <span key={index} className="flex items-center gap-1">
                    {item.name}
                    {index !== generateBreadcrumbs().length - 1 && (
                      <Icon path={mdiChevronRight} size={1} />
                    )}
                  </span>
                ))}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={"outline"} size={"icon"}>
                <AnimatedThemeToggler />
              </Button>
              <Button variant={"outline"} size={"icon"} onClick={logout}>
                <LogOut />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto h-[92vh] p-3 text-support-100">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        {/* <Drawer
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
        </Drawer> */}
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayouts;
