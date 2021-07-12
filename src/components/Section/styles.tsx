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
      cursor: "pointer",
      "&.Active": {
        color: "#0E46D7",
        background: "rgba(210, 218, 241, 0.42)",
        border: "1px solid rgba(163, 183, 235, 0.4)",
        borderRadius: 6,
      },
      "& svg": {
        marginRight: 8,
      },
    },
  });

export const Box = styled.div`
  background: #E9EBF3;
  border-radius: 4px;
  margin-top: 24px;
  padding: 10px;
  display: flex;
  width: fit-content;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
