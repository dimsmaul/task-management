import ThemeToggleButton from "@/features/theme/components/theme-toggle";
import React from "react";
import { Outlet } from "react-router-dom";

const NoLayouts: React.FC = () => {
  return (
    <div className="landing-base">
      <div>
        <Outlet />
      </div>
      <div className="absolute bottom-5 right-5">
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default NoLayouts;
