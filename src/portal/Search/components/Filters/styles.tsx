import {
  styled as styledMui,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import styled from "styled-components";
import MuiDivider from "@material-ui/core/Divider";
import MuiOutlinedInput from "@material-ui/core/OutlinedInput";

export const useStyles = (theme: Theme) =>
  createStyles({
    expandedFilter: {
      backgroundColor: "#E9E9EA",
    },
  });

export const BoxButton = styled.div`
  cursor: pointer;
  display: flex;
  margin-bottom: 8px;
  justify-content: flex-end;
`;

export const ButtonFilter = styled.div`
  height: 48px;
  display: flex;
  padding: 10px;
  background: #ffffff;
  align-items: center;
  border-radius: 6px;
`;

export const ButtonFilterIcon = styled.div`
  padding: 4px;
  background: #e9e8eb;
  margin-right: 8px;
  border-radius: 8px;
`;

export const ButtonFilterIconCaretRight = styled.div`
  margin-left: 20px;
`;

export const BoxFilters = styled.div`
  width: 454px;
  margin-bottom: 98px;
`;

export const BoxFiltersHeader = styled.div`
  padding: 24px 24px 0 24px;
`;

export const HeaderDivider = styledMui(MuiDivider)({
  margin: "15px -26px 24px -26px",
});

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.div`
  color: #1b202a;
  font-size: 21px;
  font-weight: 500;
  line-height: 21px;
`;

export const CloseHeader = styled.div`
  cursor: pointer;
`;

export const BoxHeader = styled.div`
  padding: 24px 16px;
  background: #1b202a;
  border-radius: 8px;
`;

export const BoxHeaderTitle = styled.div`
  color: #ffffff;
  font-size: 21px;
  font-weight: 500;
  line-height: 27px;
`;

export const BoxHeaderInputSearch = styledMui(MuiOutlinedInput)({
  height: 48,
  marginTop: 16,
  backgroundColor: "#161A21",
  border: "1px solid #272D38",
  borderRadius: 8,
  width: "100%",
  color: "#7D7A8C",
});

export const BoxContainerTitle = styled.div`
  margin: 34px 20px 28px 24px;
  display: flex;
  justify-content: space-between;
`;

export const BoxContainerTitleText = styled.div`
  font-weight: normal;
  font-size: 24px;
  line-height: 36px;
  color: #1b202a;
`;

export const BoxContainerTitleTagContent = styled.div`
  display: flex;
  align-items: center;
  margin-right: 14px;
`;

export const BoxContainerTitleTag = styled.div`
  background: #d4d3d9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 6px;
  color: #676378;
  font-size: 14px;
  margin-right: 5px;
`;

export const BoxFilter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 24px;
  padding: 8px 0;
  align-items: center;
  font-size: 15px;
`;

export const BoxFilterIcon = styled.div`
  cursor: pointer;
  margin-right: 45px;
`;

export const BoxFilterContent = styled.div`
  margin-left: 32px;
`;

export const BoxFilterClearContent = styled.div`
  padding: 18px 24px 18px 24px;
  margin-bottom: 24px;
`;

export const BoxFilterClear = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
  border: 1px dashed #494d55;
  box-sizing: border-box;
  border-radius: 35px;
  width: max-content;
  padding: 10px;
  cursor: pointer;
`;

export const BoxFooter = styled.div`
  background: #E9E8EB;
  box-shadow: 0px -1px 30px rgba(18, 22, 32, 0.16);
  height: 98px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: fixed;
  bottom: 0;
  width: 454px;
  justify-content: center;
  & button {
    min-width: 192px;
    &.Default-contained-blue {
      background-color: #D1D2D4;
    }
  }
`;

export const BoxFilterDivider = styledMui(MuiDivider)({
  position: "relative",
}); 

export const BoxHeaderInputFilter = styledMui(MuiOutlinedInput)({
  height: 48,  
  marginLeft: 20,
  marginBottom: 10,
  backgroundColor: "#FFFFFF",  
  borderRadius: 8,
  width: 390,
  color: "#000000",
});
