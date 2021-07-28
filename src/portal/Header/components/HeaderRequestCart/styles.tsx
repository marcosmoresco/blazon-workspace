import {
  styled as styledMui,
} from "@material-ui/core/styles";
import MuiDivider from "@material-ui/core/Divider";
import MuiBadge from "@material-ui/core/Badge";
import MuiButton from "@material-ui/core/Button";
import styled from "styled-components";

export const Badge = styledMui(MuiBadge)({
  "& .MuiBadge-badge": {
    width: 20,
    height: 20,
    fontSize: 12,
    borderRadius: 10,
  }
});

export const BoxRequestCart = styled.div`
  width: 454px;
  margin-bottom: 98px;
`;

export const BoxRequestCartHeader = styled.div`
  padding: 24px 24px 0 24px;
`;

export const HeaderDivider = styledMui(MuiDivider)({  
  margin: "15px 0 24px 0px",
  width: 453,
  position: "relative",
  left: -23
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

export const BoxHeaderButton = styledMui(MuiButton)({
  height: 42,
  background: "rgba(233, 232, 235, 0.1)",
  border: "1px solid #FFFFFF",
  boxSizing: "border-box",
  borderRadius: 8,
  marginTop: 32,
  color: "#FFFFFF",
  textTransform: "initial",
});

export const BoxContainerTitle = styled.div`
  margin: 34px 24px 28px 24px;
  display: flex;
  justify-content: space-between;
`;

export const BoxContainerTitleText = styled.div`
  font-weight: 500;
  font-size: 21px;
  line-height: 130%;
  color: #26213F;
`;

export const BoxContainerTitleTagContent = styled.div`
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  height: 48px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
`;

export const BoxContainerTitleTag = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
  color: #26213F;
  margin-right: 22px;
`;

export const ItemsDivider = styledMui(MuiDivider)({
  margin: "0px 24px 24px 24px",
});

export const BoxRequestCartItem = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 16px rgba(39, 36, 52, 0.06);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 0 24px 12px 24px;
`;

export const BoxRequestCartItemInfo = styled.div`  
  display: flex;
  align-items: center;  
  gap: 16px; 
`;

export const BoxRequestCartItemType = styled.div`
  background: #F4F4F5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
`;

export const BoxRequestCartItemText = styled.div`
  font-weight: normal;
  font-size: 18px;
  line-height: 130%;
  color: #26213F;
`;

export const BoxRequestCartItemTrash = styled.div`
  background: #F4F4F5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  height: 52px;
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
