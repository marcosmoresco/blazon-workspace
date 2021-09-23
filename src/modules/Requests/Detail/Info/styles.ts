import styled from "styled-components";
import { styled as styledMui } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';

export const InsideLine = styled.div`
  width: 100%;
  height: 1px;
  background: #e9e9ea;
  margin: 0 0 34px;
`;

export const WorkArea = styled.div`
  max-width: 1312px;
  margin-left: auto;
  margin-right: auto;
`;
export const Grid = styled.div` 
  padding: 0 0 2px;
  margin: 18px 0;
  border-radius: 6px;
  background: #ffff;
`;

export const UserContent = styled.div`  
padding: 0px 25px 24px 24px;
`;

export const Header = styled.div`  
  padding: 24px 25px 0px 24px;
`;


export const Spacing = styled.div`  
  padding: 0 25px 32px 24px;
  &.Add-top {
    padding-top: 14px;
  }
`;

export const UserGrid = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 0 25px 32px 24px;
  background: #ffff;
  border-radius: 0;
`;

export const StyledCards = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ResourceGrid = styled.div`
  align-content: center;  
  background: #ffff;
  border-radius: 0;

  &.Detail {
    padding: 0 24px 24px 24px;
  }

  &.Box-bottom {
    margin-bottom: 24px;
  }

  span {
    color: #514d65;
  }
`;

export const RequestDetail = styled.div`
  display: flex;
  align-content: center;
  padding: 0 25px 32px 24px;
  background: #ffff;
  gap: 10px;

  span {
    font-size: 16px;
    color: #1b202a;
  }
  div {
    cursor: pointer;
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 32px 0 0 0px;
  gap: 24px;
`;

export const InfoDivider = styledMui(Divider)({ 
  marginBottom: 25,
  marginLeft: 25,
  marginRight: 25
}); 