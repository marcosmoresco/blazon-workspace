
import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

export const Box = styled.div` 
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  border-radius: 6px;
  height: 48px;
  padding: 8px;
  gap: 10px;
  cursor: pointer;
`;

export const OrdenationIcon = styled.div` 
  background: #E9E8EB;
  border-radius: 8px;
  height: 32px;
`;

export const BoxContent = styled.div` 
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 122px;  
  border-radius: 6px;
  padding: 24px;
  gap: 24px;
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