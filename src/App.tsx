import React, { FC, useState, useEffect, useCallback } from "react";
import { ThemeProvider, Theme } from "@material-ui/core/styles";
import styled from "styled-components";
import { useTheme, themes } from "./theme";
import axios from "axios";
import Loading from "@components/Loading";
import CircularProgress from "@material-ui/core/CircularProgress";

export type AppProps = {
  children: React.ReactNode;
};

export const CenterAlign = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
`

const App: FC<AppProps> = ({ children }) => {
  
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(() => {
    axios
      .get("/api/colorSchema")
      .then((response) => {
        setCurrentTheme(themes[response.data.colorSchema]);
        setTheme(response.data.colorSchema); 
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setTheme]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if(loading || !currentTheme) {
    return (
      <CenterAlign>
        <CircularProgress />
      </CenterAlign>     
    );
  }  

  return (
    <ThemeProvider theme={currentTheme}>      
      {children}      
    </ThemeProvider>
  );
};

export default App;