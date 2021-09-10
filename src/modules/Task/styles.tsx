import styled from "styled-components";
import { styled as styledMui } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';

export const Content = styled.div`
  margin-top: 48px;
`;

export const Box = styled.div`
  margin: 0 24px;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 50px;
`;

export const InfoText = styled.div`
  height: 46px; 
  background: #FBFAFB;
  border-radius: 6px;
  padding: 8px;
`;

export const InfoTextContainer = styled.div`
  background: #F2F1F3;
  border-radius: 6px;
  height: 30px;
  color: #514D65;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
`;

export const Info = styled.div`
  &.Selectable {
    cursor:pointer;
    padding: 12px;
    border: 1px solid #7D7A8C;
    & svg {
      margin-right: 0px;
      margin-left: 6px;
    }
  }
  border: 1px solid #d4d3d9;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #26213f;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    margin-right: 8px;
  },  
`;

export const Actions = styled.div`
  border: 1px solid #7D7A8C;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #26213f;
  height: 42px;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HeaderFilters = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 15px;
`;

export const BoxCard = styled.div`
  padding: 24px;
  display: flex;
`;

export const BoxCardContent = styled.div`
  width: 100%;
`;

export const BoxCardText = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #676378;
  margin-top: 16px;
`;

export const BoxCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const BoxCardHeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

export const BoxCardHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

export const BoxCardTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 33px;
  color: #26213f;
`;

interface BoxCardIdentifierProps {
  background?: string;
  color?: string;
}

export const BoxCardIdentifier = styled.div<BoxCardIdentifierProps>`
  background: ${props => props.background && props.background || "#eaf1fe"}; 
  color: ${props => props.color && props.color || "#0e46d7"}; 
  border-radius: 6px;
  margin-left: 19px;
  padding: 2px 5px;
  font-weight: 500;
  &.No-background {
    background: transparent;
  }
`;

export const BoxRequester = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const BoxRequesterContent = styled.div`
  margin-left: 10px;
`;

export const BoxRequesterTitle = styled.div`
  font-weight: normal;
  font-size: 12px;
  color: #1b202a;
`;

export const BoxRequesterDisplayName = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #1b202a;
`;

export const BoxRequesterAvatar = styled.div`  
  & img {
    width: 32px;
    height: 32px;
    border-radius: 20px;
  }
`;

export const BoxCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  gap: 15px;
`;

export const BoxCardFooterInfo = styled.div`
  display: flex;
  align-items: center;  
  gap: 15px;
`;

export const BoxPriority = styled.div`
  display: flex;
  align-items: center;
  background: #f4f4f5;
  border-radius: 8px;
  height: 42px;
  padding: 12px;
  color: #000000;
  font-weight: 500;
`;

export const BarPriorityLow = styledMui(LinearProgress)({
  marginLeft: 12,
  backgroundColor: "#E9E8EB",
  width: 80,
  height: 8,
  borderRadius: 80,
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "#4EB862"
  }
}); 

export const BarPriorityMedium = styledMui(LinearProgress)({
  marginLeft: 12,
  backgroundColor: "#E9E8EB",
  width: 150,
  height: 8,
  borderRadius: 80,
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "#FBB13C"
  }
}); 

export const BarPriorityHigh = styledMui(LinearProgress)({
  marginLeft: 12,
  backgroundColor: "#E9E8EB",
  width: 150,
  height: 8,
  borderRadius: 80,
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "#FF134A"
  }
}); 

interface FooterTypeProps {
  color?: string;
}

export const FooterType = styled.div<FooterTypeProps>`
  background: #F4F4F5;
  border: 1px dashed #92909F;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  color: ${props => props.color && props.color || "#3174F6"}; 
  text-transform: uppercase;
`;

export const FooterStatus = styled.div`
  background: #D0FFE0;
  border: 1px solid #08C581;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  color: #0D875B;
  text-transform: uppercase;
`;


export const FilterContent = styled.div`
  display: block;
`;

export const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  cursor: pointer;
  height: 40px;
  &:hover {
    background: #E9E8EB;
    border-radius: 8px;
  }
`;

export const MenuItemText = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #000000;
`;

export const MenuItemInfo = styled.div`
  padding: 5px;  
  background: #FF134A;
  border-radius: 110px;
  color: #FFFFFF;
`;

export const SelectBoxContainer = styled.div`
  min-width: 233px;
  height: 42px;
  background: #FFFFFF;
  border: 1px solid #D4D3D9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  cursor: pointer;
  padding-right: 8px;
`;

export const SelectBoxInfo = styled.div`  
  display: flex;
  align-items: center;
  font-weight: normal;
  gap: 10px;
  font-size: 16px;
  line-height: 16px;
  color: #26213F;
`;

export const SelectBoxInfoIcon = styled.div` 
  width: 30px;
  height: 30px; 
  background: #E9E8EB;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
`;

export const LoadMoreContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
  margin-bottom: 30px;
`;

export const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    boxShadow: "0px 4px 74px rgba(0, 0, 0, 0.25)",
    background: "#F4F4F5",
    marginTop: 10,  
    width: 233,
    padding: 10   
  },
})((props) => (
  <Menu    
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export const InfoDivider = styledMui(Divider)({
  marginTop: 20,
  marginBottom: -5,
  marginLeft: -24,
  marginRight: -24
}); 