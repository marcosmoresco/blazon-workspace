import { createStyles, Theme } from "@material-ui/core/styles";

const useStyles = (theme: Theme) =>
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
      margin: 24,
    },
    accountsContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 24,
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

export default useStyles;
