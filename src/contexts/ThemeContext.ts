import { createContext } from "react";
import { ThemeName } from "../styles/theme";
import { DEFAULT_THEME_NAME } from "../constants/Theme";

export interface ThemeContextState {
  themeName: ThemeName;
}

export const ThemeContext = createContext<ThemeContextState>({
  themeName: DEFAULT_THEME_NAME,
});
