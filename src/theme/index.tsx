import React, { FC, createContext, useContext, useState } from "react";
import axios from "axios";
import { 
  default as themeDefault,
  emerald as themeEmerald,
  eletricIndigo as themeEletricIndigo,
  magentaProcess as themeMagentaProcess,
  saffron as themeSaffron,
  steelTeal as themeSteelTeal,
  tomato as themeTomato,
  darkSalmon as themeDarkSalmon,
  copper as themeCopper,
  dark as themeDark 
} from "./themes";
import type { Themes, ThemeState, ThemeContextProps } from './types'; 

const StateContext = createContext<ThemeState>({
  theme: "default" as Themes,
  setTheme: () => {},
});

export const ThemeStateProvider: FC<ThemeContextProps> = ({ children }) => {
  const [theme, setTheme] = useState("default" as Themes);

  axios.get("/api/colorSchema")
    .then(function(response) {    
      setTheme(response.data.colorSchema);      
    });

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
  default: themeDefault,
  emerald: themeEmerald,
  eletricIndigo: themeEletricIndigo,
  magentaProcess: themeMagentaProcess,
  saffron: themeSaffron,
  steelTeal: themeSteelTeal,
  tomato: themeTomato,
  darkSalmon: themeDarkSalmon,
  copper: themeCopper
};

const Theme = {
  ThemeStateProvider,
  useTheme,
  themes,
};

export default Theme;
