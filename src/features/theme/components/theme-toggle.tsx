import { useThemeStore } from "../hooks/useTheme";
import { mdiThemeLightDark } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";

export interface ThemeToggleTypes {
  /**
   * This prop is used to determine if the button should be labeled or not.
   * If true, the button will display a label next to the icon.
   * If false, only the icon will be displayed.
   * @default false
   * @type {boolean}
   */
  showLabel?: boolean;

  /**
   * This prop is used to apply additional CSS classes to the button.
   * It allows for customization of the button's appearance.
   * @default ""
   * @type {string}
   */
  className?: string;

  /**
   * This prop is used to set the size of the icon in the button.
   * It allows for customization of the icon's size.
   * @default 1
   * @type {number}
   */
  size?: number;
}

const ThemeToggleButton: React.FC<ThemeToggleTypes> = (props) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={clsx(
        "px-2 py-2 border-[1px] border-support-100/30 transition-all duration-300 text-support-100 rounded-lg flex items-center ",
        props.className
      )}
    >
      <Icon path={mdiThemeLightDark} size={props.size || 1} />
      <span className={clsx(props.showLabel ? "ml-2" : "hidden")}>
        {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </span>
    </button>
  );
};

export default ThemeToggleButton;
