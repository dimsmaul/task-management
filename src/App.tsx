import React, { useEffect } from "react";
import Routes from "@/router";
import { BrowserRouter } from "react-router-dom";
import { useThemeStore } from "./features/theme/hooks/useTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="bg-primary-100 text-primary-100 min-h-screen w-screen transition-all duration-300">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
