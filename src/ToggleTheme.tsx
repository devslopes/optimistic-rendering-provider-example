import { useTheme } from "./providers/ThemeProvider";

export const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      Toggle
    </button>
  );
};
