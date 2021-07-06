import React, { FC, createContext, useContext, useState } from "react";
import { light as themeLight, dark as themeDark } from "./themes";
import type { Themes, ThemeState, ThemeContextProps } from './types'; 

const StateContext = createContext<ThemeState>({
  theme: "light" as Themes,
  setTheme: () => {},
});

export const ThemeStateProvider: FC<ThemeContextProps> = ({ children }) => {
  const [theme, setTheme] = useState("light" as Themes);

  return (
    <StateContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useTheme = () => useContext(StateContext);

export const themes: { [key: string]: any } = {
  dark: themeDark,
  light: themeLight,
};

const Theme = {
  ThemeStateProvider,
  useTheme,
  themes,
};

export default Theme;
