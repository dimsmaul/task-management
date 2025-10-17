import Loaders from "@/components/loading/loaders";
import DashboardLayouts from "@/layouts/dashboard";
import React from "react";
import { Navigate, RouteObject } from "react-router-dom";

const TaskManagementPages = React.lazy(
  () => import("@/features/task-management/pages/task-management")
);

const StatusPages = React.lazy(() => import("@/features/status/pages/index"));

export const route_auth: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={"/task-management"} replace />,
  },
  {
    path: "",
    element: <DashboardLayouts />,
    children: [
      {
        path: "/task-management",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <TaskManagementPages />
          </React.Suspense>
        ),
      },
      {
        path: "/status",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <StatusPages />
          </React.Suspense>
        ),
      },
    ],
  },
];
