import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { getTheme, ThemeName } from "../styles/theme";
import { GlobalStyle } from "../styles/global";
import { ThemeContext } from "./ThemeContext";

const DEFAULT_THEME_NAME: ThemeName = "light";

interface Props {
  children: ReactNode;
}

export const InterviewItThemeProvider = ({ children }: Props) => {
  return (
    <ThemeContext.Provider value={{ themeName: DEFAULT_THEME_NAME }}>
      <ThemeProvider theme={getTheme(DEFAULT_THEME_NAME)}>
        <GlobalStyle themeName={DEFAULT_THEME_NAME} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
