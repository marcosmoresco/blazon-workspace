import React, { FC } from "react";
import { ThemeStateProvider } from "./theme";
import App from "./App";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeStateProvider>
      <App>{children}</App>
    </ThemeStateProvider>
  );
};

export default Layout;