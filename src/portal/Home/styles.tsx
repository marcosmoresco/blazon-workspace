import { createStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";

export const useStyles = (theme: Theme) =>
  createStyles({
    root: {
      margin: "42px 64px",
    },
    header: {
      background: "linear-gradient(262.19deg, #1B202A 43.97%, #020407 66.35%)",
      borderRadius: 8,
      padding: 42,
      position: "relative",
      marginTop: 36,
      minHeight: 214,
      marginBottom: 48,
    },
    headerWelcomeText: {
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "36px",
      color: "#FFFFFF",
    },
    headerWelcomeSubText: {
      fontWeight: "normal",
      fontSize: 16,
      lineHeight: "24px",
      color: "#F4F4F5",
      marginBottom: 25,
    },
    headerWelcomeImg: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    close: {
      position: "absolute",
      right: 15,
      top: 15,
      cursor: "pointer",
      "& img": {
        filter: "brightness(0) invert(1)",
      },
    },
    recentPasswords: {
      background: "#FFFFFF",
      borderRadius: 8,
      minHeight: "100%",
    },
    defaultTitleContent: {
      display: "flex",
      justifyContent: "space-between",
      padding: 24,
      borderBottom: "1px solid #E9E8EB",
    },
    defaultTitle: {
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "36px",
      color: "#1B202A",
    },
    showAll: {
      display: "flex",
      alignItems: "center",
      fontSize: 16,
      color: "#1B202A",
      cursor: "pointer",
      "& svg": {
        marginLeft: 5,
      },
    },
    recentPasswordsContent: {
      padding: 24,
    },
    recentPasswordCard: {
      background: "#FFFFFF",
      border: "1px solid #D4D3D9",
      boxSizing: "border-box",
      boxShadow: "0px 0px 24px rgba(39, 36, 52, 0.12)",
      borderRadius: 8,
      cursor: "pointer",
    },
    recentPasswordCardContent: {
      margin: 14,
    },
    recentPasswordCardContentHeader: {
      display: "flex",
    },
    recentPasswordCardContentHeaderImage: {
      background: "#E9E8EB",
      borderRadius: 6,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 48,
      height: 48,
      marginRight: 8,
    },
    recentPasswordCardContentHeaderTitle: {
      fontWeight: 600,
      fontSize: 16,
      lineHeight: "24px",
      color: "#26213F",
    },
    recentPasswordCardContentHeaderUsername: {
      fontWeight: "normal",
      fontSize: 14,
      color: "#BDBCC5",
    },
    recentPasswordCardContentHeaderText: {
      fontWeight: "normal",
      fontSize: 14,
      lineHeight: "21px",
      color: "#676378",
      marginTop: 8,
    },
    accounts: {
      marginTop: 24,
    },
    accountsContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      cursor: "pointer",
      padding: "5px 24px",
      "&:hover": {
        background: "#E9E8EB",
        "& .contentInfoIcon": {
          background: "#514D65"
        },
        "& .caretRight-icon": {
          filter: "invert(20%) sepia(94%) saturate(2990%) hue-rotate(222deg) brightness(84%) contrast(101%)"
        }
      }
    },
    accountsContentInfo: {
      display: "flex",
      alignItems: "center",
    },
    accountsContentInfoIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#1A202B",
      borderRadius: 4,
      marginRight: 12,
      width: 32,
      height: 32,      
    },
  });

export const BoxCard = styled.div`
  cursor: pointer;
  background: #FFFFFF;
  box-shadow: 0px 0px 28px rgba(27, 32, 42, 0.16);
  border-radius: 8px;
  padding: 24px;
  &:hover {
    border: 1px solid #A8A6B2;
  }
`;

export const BoxRequest = styled.div`
  padding: 24px;
`;

export const BoxRequestHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BoxRequestHeaderIdentifier = styled.div`
  background: #EAF1FE;
  border-radius: 30px;
  padding: 8px;
  color: #0E46D7;
`;

export const BoxRequestHeaderDate = styled.div`
  background: rgba(183, 188, 193, 0.14);
  border-radius: 35px;
  padding: 8px;
  color: #26213F;
`;

export const BoxRequestHeaderTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  color: #26213F;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 15px;
`;

export const BoxRequestHeaderType = styled.div`
  background: rgba(19, 119, 213, 0.14);
  border-radius: 35px;
  padding: 8px;
  color: #1377D5;
  margin-top: 12px;
`;

export const BoxRequestDescription = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: #676378;
  margin-top: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;