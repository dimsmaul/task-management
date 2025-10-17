import React from "react";
import { Link, Outlet } from "react-router-dom";

const LandingLayouts: React.FC = () => {
  return (
    <div>
      <div>
        <Link to="/login" className="btn-primary">
          Login
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default LandingLayouts;
