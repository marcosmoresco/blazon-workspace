import React, { FC } from "react";
import { Theme, ThemeProvider, makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Header from "./portal/Header";
import Footer from "./portal/Footer";
import { useTheme, themes, themeLight } from "./theme";

export type AppProps = {
  children: React.ReactNode;
};

const App: FC<AppProps> = ({ children }) => {
  const { theme } = useTheme();
  const currentTheme = { ...(themes[theme] || themeLight) };

  return (
    <ThemeProvider theme={currentTheme}>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default App;