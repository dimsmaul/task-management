import React, { useEffect } from "react";
import clsx from "clsx";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

interface DrawerProps {
  /**
   * Indicates whether the drawer is open or closed.
   * @default false
   */
  isOpen: boolean;

  /**
   * Function to close the drawer.
   */
  onClose: () => void;

  /**
   * Placement of the drawer.
   * @default "left"
   */
  placement?: "top" | "left" | "bottom" | "right";

  /**
   * Content to be displayed inside the drawer.
   */
  children: React.ReactNode;

  /**
   * Additional class names for styling.
   */
  className?: string;

  /**
   * Duration of the transition in milliseconds.
   * @default 300
   */
  transitionDuration?: number;

  /**
   * Whether to show the overlay.
   * @default true
   */
  showOverlay?: boolean;

  /**
   * Title of the drawer.
   * @default ""
   */
  title?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen = false,
  onClose,
  placement = "left",
  children,
  className,
  transitionDuration = 300,
  showOverlay = true,
  title = "",
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const placementClasses = {
    left: "left-0 top-0 h-full sm:w-96 w-full",
    right: "right-0 top-0 h-full sm:w-96 w-full",
    top: "top-0 left-0 w-full h-64",
    bottom: "bottom-0 left-0 w-full h-64",
  };

  const transformClasses = {
    left: "-translate-x-full",
    right: "translate-x-full",
    top: "-translate-y-full",
    bottom: "translate-y-full",
  };

  const overlayClasses = clsx(
    "fixed inset-0 bg-black/45 bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out",
    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  );

  const drawerClasses = clsx(
    "fixed z-50 bg-primary-100 shadow-xl transition-all ease-in-out p-5",
    placementClasses[placement],
    className,
    isOpen ? "translate-x-0 translate-y-0" : transformClasses[placement]
  );

  const transitionStyle = {
    transitionDuration: `${transitionDuration}ms`,
  };

  return (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div
          className={overlayClasses}
          onClick={onClose}
          aria-hidden="true"
          style={transitionStyle}
        />
      )}

      {/* Drawer */}
      <div
        className={clsx(drawerClasses, "overflow-auto")}
        style={transitionStyle}
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        <div className="flex flex-row justify-between items-center mb-5 z-50">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button onClick={onClose} className="z-50 text-support-100">
            <Icon path={mdiClose} size={1} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default Drawer;
