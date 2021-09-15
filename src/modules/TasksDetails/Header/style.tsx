import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';

export const HeaderPage = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 0px;
  max-width: 1312px;
  margin-left: auto;
  margin-right: auto;
`;
export const InfoHeaderPage = styled.div`
  display: flex;
  padding: 8px;
  background: #d4d3d9;
  border-radius: 8px;
  gap: 16px;
`;

interface TypeStyleProps {
  color?: string;
}

export const TypeStyle = styled.div<TypeStyleProps>`
  background: #f4f4f5;
  border: 1px dashed #92909f;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  color: ${props => props.color && props.color || "#3174F6"};
  text-transform: uppercase;
`;
export const MembershipStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px 8px 8px;
  background: #ffffff;
  border-radius: 8px;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #26213f;
`;
export const ButtonsArea = styled.div`
  display: flex;
  gap: 12px;

  Button {
    min-width: 105px;
  }
`;
export const Actions = styled.div`
  border: 1px solid #d4d3d9;
  border-radius: 8px;
  padding: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #26213f;
  align-items: center;
  height: 42px;
  cursor: pointer;
  background: #ffffff;
  box-sizing: border-box;
`;

export const MenuItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 280px;
`;

export const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 264px;
`;

export const MenuItemBox = styled.div`
  border-radius: 4px;
  width: 32px;
  height: 32px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;

  &.Red {
    background: #FF134A;
  }
  &.Blue {
    background: #3174F6;
  }
  &.Green {
    background: #4EB862;
  }
`;

export const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    boxShadow: "0px 4px 74px rgba(0, 0, 0, 0.25)",
    background: "#F4F4F5",
    marginTop: 10,  
    width: 335   
  },
})((props) => (
  <Menu    
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

export const DividerMenu = withStyles({
  root: {
    margin: "10px 0",
    minWidth: 335
  }
})((props) => (
  <Divider
    {...props}
  />
));