import {
  styled as styledMui,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import styled from "styled-components";

export const useStyles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
      marginBottom: 20,
    },
    totalItens: {
      fontWeight: "normal",
      fontSize: 18,
      color: "#676378",
    },
    filters: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 8,
      cursor: "pointer",
    },
    filter: {
      background: "#FFFFFF",
      borderRadius: 6,
      height: 48,
      display: "flex",
      alignItems: "center",
      padding: 10,
    },
    filterIcon: {
      background: "#E9E8EB",
      borderRadius: 8,
      padding: "4px",
      marginRight: 8,
    },
    filterCaretRight: {
      marginLeft: 20,
    },
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
    searchCard: {
      background: "#FFFFFF",
      boxShadow: "0px 0px 16px rgba(39, 36, 52, 0.06)",
      borderRadius: 8,
      cursor: "pointer",
    },
    searchCardContent: {
      position: "relative",
    },
    searchCardContentHeader: {
      display: "flex",
      padding: 14,
    },
    searchCardContentHeaderImage: {
      background: "#f4f4f5",
      borderRadius: 6,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 48,
      height: 48,
      marginRight: 8,
    },
    searchCardContentHeaderTitle: {
      fontWeight: "normal",
      fontSize: 18,
      color: "#26213F",
      marginLeft: 14,
      marginRight: 14,
      marginBottom: 16,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    searchCartContent: {
      padding: 16,
      fontWeight: "normal",
      fontSize: 14,
      lineHeight: "14px",
      color: "#26213F",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      "& > div": {
        background: "#F4F4F5",
        borderRadius: 6,
        padding: 12,
        height: 48,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .Icon-content": {
          width: 32,
          height: 32,
          background: "#E9E8EB",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
        },
        "&:hover": {
          color: theme.palette.primary.main || "#3174F6",
          "& .Icon-content": {
            background: theme.palette.primary.main || "#3174F6",
            "& svg": {
              filter:
                "invert(100%) sepia(0%) saturate(0%) hue-rotate(276deg) brightness(103%) contrast(101%)",
            },
          },
        },
      },
    },
  });

export const InputSearchBox = styled.div`
  display: flex;
  justify-content: center;
`;
export const OutlinedInputSearch = styledMui(OutlinedInput)({
  border: "1px solid #BBBDC0",
  borderRadius: 8,
  background: "#FFFFFF",
  width: 800,
  height: 48,
  marginTop: 20,
});

export const DividerSearch = styledMui(Divider)({
  marginTop: 40,
});

export const TotalFiltersBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 27px;
`;
export const OptionListFiltersContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
`;

export const OptionListContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 10px;
`;
export const OptionList = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  &.Active {
    background: #e9e8eb;
    border: 1px solid #d4d3d9;
  }
`;

export const ListItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  background: #ffffff;
  box-shadow: 0px 0px 16px rgba(39, 36, 52, 0.06);
  border-radius: 8px;
  height: 80px;
  padding: 14px;
  cursor: pointer;
`;

export const ListItemContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 90%;
`;

export const ListItemIconContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f4f5;
  border-radius: 8px;
  width: 48px;
  height: 48px;

  &.Selectable:hover {
    cursor: pointer;
    background: ${props => props.color && props.color || "#0E46D7"};
    & svg {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(276deg)
        brightness(103%) contrast(101%);
    }
  }
`;

export const ListItemText = styled.div`
  font-weight: normal;
  font-size: 18px;
  line-height: 100%;
  color: #26213f;
  margin-left: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 15px;
  max-width: 1000px;
`;

export const LoadMoreContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
  margin-bottom: 30px;
`;

export const ItemTitleParent = styled.span`
  font-size: 12px;
  opacity: 0.4;
`;

export const CenterAlign = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
  height: calc(100vh - 180px);
`