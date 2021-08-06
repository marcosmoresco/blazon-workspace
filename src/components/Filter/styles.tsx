import { createStyles, Theme } from "@material-ui/core/styles";
import { styled as styledMui } from "@material-ui/core/styles";
import MuiTextField from "@material-ui/core/TextField";
import MuiBadge from "@material-ui/core/Badge";

export const useStyles = (theme: Theme) =>
  createStyles({
    inputFilter: {
      padding: "0 !important",
      height: 24,
    },
    inputFilterIcon: {
      display: "flex",
      alignItems: "center",
    },
    input: {
      "& input": {
        padding: "11.5px 7px 11.5px 0",
        width: 300,
      },
    },
    content: {
      padding: 10,
      outline: 0,
      background: "#FFFFFF",
      border: "1px solid #BEBECB",
      boxSizing: "border-box",
      boxShadow: "0px 24px 71px 5px rgba(0, 0, 0, 0.25)",
      borderRadius: 8,
      marginTop: 15,
      width: 498,
      position: "absolute",
      zIndex: 10,
      "& .Filters-list": {
        marginTop: 15,
      },
    },
    title: {
      fontSize: 15,
      lineHeight: "24px",
      color: "#777779",
    },
    chipsContent: {
      display: "flex",
      marginTop: 7,
      flexWrap: "wrap",
      "& .Default-filter": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        background: "#F1F1FE",
        border: "1px solid #777779",
        padding: "6px 16px",
        margin: "0 10px 10px 0",
        borderRadius: 100,
        "& label": {
          fontSize: 14,
          lineHeight: "24px",
          color: "#777779",
        },
        "&.active": {
          background: "#C1E2F5",
          border: "1px solid #5EC2FF",
          "& label": {
            color: "#0992CC",
          },
        },
      },
    },
    filterContainer: {
      marginBottom: 30,
      display: "flex",
      alignItems: "center",
      position: "relative",
      "& .Filter-component": {
        width: "93%",
      },
      "& .Add-icon": {
        position: "absolute",
        right: 8,
        top: 35,
        cursor: "pointer",
      },
      "& .Date-filter": {
        display: "flex",
        "& > div:first-child": {
          marginRight: 15,
        },
      },
    },
    addedFilter: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "6px 16px",
      background: "#F1F1FE",
      border: "1px solid #0992CC",
      boxSizing: "border-box",
      borderRadius: 20,
      margin: "0 10px 10px 0",
      cursor: "pointer",
      "& img": {
        marginRight: 8,
      },
      "& .MuiAvatar-root": {
        marginRight: 8,
        "& img": {
          marginRight: 0,
        },
      },
      "& .Filter-title": {
        fontSize: 10,
        lineHeight: "12px",
        color: "#4B4B4D",
      },
      "& .Filter-value": {
        fontSize: 14,
        lineHeight: "12px",
        color: "#0992CC",
        marginTop: 3,
      },
    },
  });

export const TextField = styledMui(MuiTextField)({  
  width: "100%",
  ".MuiOutlinedInput-input": {
    padding: "11.5px 14px"
  }
}); 

export const TextFieldFilter = styledMui(MuiTextField)({  
  height: 48,
  width: "100%",
  "& .MuiOutlinedInput-input": {
    padding: "11.5px 14px",
  }  
}); 

export const Badge = styledMui(MuiBadge)({
  "& .MuiBadge-badge": {
    width: 20,
    height: 20,
    fontSize: 12,
    borderRadius: 10,
  }
});