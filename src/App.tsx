import React, { FC } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Header from "./portal/Header";
import Footer from "./portal/Footer";
import { useTheme, themes } from "./theme";

export type AppProps = {
  children: React.ReactNode;
};

const App: FC<AppProps> = ({ children }) => {
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  return (
    <ThemeProvider theme={currentTheme}>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default App;