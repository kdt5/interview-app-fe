import { createContext } from "react";
import { ThemeName } from "../styles/theme";

const DEFAULT_THEME_NAME: ThemeName = "light";

export interface ThemeContextState {
  themeName: ThemeName;
  toggleTheme?: () => void;
}

export const ThemeContext = createContext<ThemeContextState>({
  themeName: DEFAULT_THEME_NAME,
});
