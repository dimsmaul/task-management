import Loaders from "@/components/loading/loaders";
import NoLayouts from "@/layouts/no-layouts";
import React from "react";
import { Navigate, RouteObject } from "react-router-dom";

const LoginPages = React.lazy(() => import("@/features/auth/pages/login"));
const RegisterPages = React.lazy(
  () => import("@/features/auth/pages/register")
);

export const route_unauth: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={'/login'} replace />,
  },
  {
    path: "/",
    element: <NoLayouts />,
    children: [
      {
        path: "/login",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <LoginPages />
          </React.Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <RegisterPages />
          </React.Suspense>
        ),
      },
    ],
  },
];
