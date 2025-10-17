import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import React from "react";
import { Outlet } from "react-router-dom";

const NoLayouts: React.FC = () => {
  return (
    <div className="landing-base">
      <div>
        <Outlet />
      </div>
      <div className="absolute bottom-5 right-5">
        <Button variant={"outline"} size={"icon"}>
          <AnimatedThemeToggler />
        </Button>
      </div>
    </div>
  );
};

export default NoLayouts;
