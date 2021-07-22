import React, { FC } from "react";
import { ThemeStateProvider } from "./theme";
import { RequestCartStateProvider } from "./requestCart";
import App from "./App";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeStateProvider>
      <RequestCartStateProvider>
        <App>{children}</App>
      </RequestCartStateProvider>      
    </ThemeStateProvider>
  );
};

export default Layout;