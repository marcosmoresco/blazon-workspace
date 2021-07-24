import { createStyles, Theme } from "@material-ui/core/styles";

const useStyles = (theme: Theme) =>
  createStyles({
    actionIcon: {
      backgroundColor: "#F4F4F5",
      borderRadius: 8,
      padding: 8,
      height: 44,
      width: 44,
    },
    dialogIconDetail: {
      marginBottom: 32,
      backgroundColor: "#E9E8EB",
      borderRadius: 8,
      "& .iconBg": {
        backgroundColor: "#D4D3D9",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      "& .iconCell": {
        borderRadius: 8,
        backgroundColor: "#E9E8EB",
        height: 64,
        width: 64,
        padding: 11,
        margin: 23,
      },
      "& .detailContent": {
        padding: 17,
      },
      "& .title": {
        fontWeight: 600,
        fontSize: 18,
        color: "#26213F",
      },
      "& .description": {
        fontWeight: 400,
        fontSize: 14,
        color: "#514D65",
      },
    },
    searchSection: {
      "& .title": {
        fontWeight: 600,
        fontSize: 18,
        color: "#676378",
        paddingBottom: 18,
      },
    },
    divider: {
      marginTop: 32,
      marginBottom: 32,
    },
  });

export default useStyles;
