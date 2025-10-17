import { create } from "zustand";

type ThemeState = {
  sidebar: "full" | "hide";
  toggleSidebar: () => void;
};

export const useSidebarHandler = create<ThemeState>((set) => ({
  sidebar: localStorage.getItem("sidebar") === "full" ? "full" : "hide",
  toggleSidebar: () =>
    set((state) => {
      const newSidebar = state.sidebar === "full" ? "hide" : "full";
      localStorage.setItem("sidebar", newSidebar);
      document.documentElement.setAttribute("data-sidebar", newSidebar);
      return { sidebar: newSidebar };
    }),
}));
