import React, { FC, createContext, useContext, useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

type Themes = "light" | "dark";

type ThemeState = {
  theme: Themes;
  setTheme(theme: Themes): void;
};

export type ThemeContextProps = {
  children: React.ReactNode;
};

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

// Create a theme instance.
export const themeLight = createMuiTheme({
  overrides: {
    MuiIcon: {
      root: {
        color: "#1B202A",
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#E5E5E5",
        boxShadow: "none",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: 0,
        marginBottom: 16,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "#F4F4F5",
      },
    },
    MuiButtonBase: {
      root: {
        color: "#1B202A",
      },
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#0E46D7",
    },
    secondary: {
      main: "#DC004E",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#F4F4F5",
    },
  },
});

export const themeBlack = createMuiTheme({
  overrides: {
    MuiIcon: {
      root: {
        color: "#FFFFFF",
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#E5E5E5",
        boxShadow: "none",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: 0,
        marginBottom: 16,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "#0F141D",
      },
    },
    MuiButtonBase: {
      root: {
        color: "#FFFFFF",
      },
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: "#0E46D7",
    },
    secondary: {
      main: "#DC004E",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#0F141D",
    },
  },
});

export const themes: { [key: string]: any } = {
  black: themeBlack,
  light: themeLight,
};

const Themes = {
  ThemeStateProvider,
  useTheme,
  themeLight,
  themeBlack,
  themes,
};

export default Themes;
