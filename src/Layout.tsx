import React, { FC } from "react";
import { ThemeStateProvider } from "./theme";
import { RequestCartStateProvider } from "./requestCart";
import App from "./App";
import Header from "./portal/Header";
import Footer from "./portal/Footer";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeStateProvider>
      <RequestCartStateProvider>
        <App>
          <Header />
          {children}
          <Footer />  
        </App>
      </RequestCartStateProvider>      
    </ThemeStateProvider>
  );
};

export default Layout;