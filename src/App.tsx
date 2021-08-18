import React, { FC } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme, themes } from "./theme";

export type AppProps = {
  children: React.ReactNode;
};

const App: FC<AppProps> = ({ children }) => {
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  return (
    <ThemeProvider theme={currentTheme}>      
      {children}      
    </ThemeProvider>
  );
};

export default App;