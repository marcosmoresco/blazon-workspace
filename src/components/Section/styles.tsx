import { createStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";

export const useStyles = (theme: Theme) =>
  createStyles({   
    tag: {
      fontWeight: "normal",
      fontSize: 16,
      height: 40,
      lineHeight: "16px",
      color: "#7D7A8C",
      padding: "0 10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 157,
      cursor: "pointer",
      "&.Active": {
        color: "#FFFFFF",
        background: "#514D65",
        border: "1px solid rgba(163, 183, 235, 0.4)",
        borderRadius: 6,
      },
      "& svg": {
        marginRight: 8,
      },
    },
  });

export const Box = styled.div`
  background: #F6F6F7;
  border-radius: 6px;
  margin-top: 24px;
  padding: 10px;
  display: flex;
  width: fit-content;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
