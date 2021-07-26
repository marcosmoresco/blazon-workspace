import { createStyles, Theme } from "@material-ui/core/styles";

const useStyles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 24,
    },
    close: {
      display: "flex",
      justifyContent: "flex-end",
      cursor: "pointer",
    },
    passwordVaultCardContent: {
      marginTop: 14,
    },
    passwordVaultCardContentHeader: {
      background: "#E9E8EB",
      borderRadius: 6,
      display: "flex",
      justifyContent: "center",
      padding: 12,
    },
    passwordVaultCardContentHeaderTitle: {
      fontWeight: 600,
      fontSize: 16,
      lineHeight: "24px",
      color: "#4F486A",
      marginTop: 13,
    },
    passwordVaultCardContentHeaderText: {
      fontWeight: "normal",
      fontSize: 14,
      lineHeight: "21px",
      color: "#4F486A",
    },
    form: {
      marginTop: 42,
    },
    divider: {
      marginTop: 74,
      marginLeft: -24,
      marginRight: -24,
    },
  });

export default useStyles;
