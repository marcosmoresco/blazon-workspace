import styled from "styled-components";
import { styled as styledMui } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export const Box = styled.div`
  margin: 24px;  
`;

export const Label = styled.div`
  color: #1B202A;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
`;

export const EmptyResources = styled.div`     
  > div {
    height: 430px !important;
    padding: 60px;    
  }
`;

export const Resources = styled.div` 
  height: 600px;
  overflow-y: auto;
`;

export const Resource = styled.div`
  background: #FFFFFF;
  border: 1px solid #F2F1F3;
  box-sizing: border-box;
  box-shadow: 0px 4px 16px rgba(27, 32, 42, 0.08);
  border-radius: 8px;
  margin-top: 14px;
  padding: 22px; 18px;
  cursor: pointer;
  color: #000000;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  &.Active, &:hover {
    background: #FBFAFB;
  }
`;

export const Input = styledMui(TextField)({  
  marginTop: 20,
  borderRadius: 8,
  width: "100%",
  background: "#FFFFFF",
  "& input": {
    padding: "14.5px 14.5px 14.5px 0px"
  },
  "& fieldset": {
    borderRadius: 8,
  }
}); 

export const Detail = styled.div`
  background: #F6F6F7;
  border-radius: 8px;
  width: 100%; 
`;

export const EmptyDetail = styled.div`
  background: #F6F6F7;
  height: 600px;  
  > div {
    height: 600px !important;
    padding: 60px;
    > div {
      background: #E9E8EB !important;
    }
  }
`;

export const EmptyEntitlements = styled.div`  
  height: 424px;  
  > div {
    height: 424px !important;
    padding: 60px;    
  }
`;

export const DetailHeader = styled.div`
  padding: 24px 24px 0; 
`;

export const EntitlementsButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
`;

export const EntitlementsDialog = styled.div`
  & .MuiTableCell-stickyHeader {
    background-color: #FFFFFF;
  }
`;

export const Entitlements = styled.div` 
  overflow-y: auto;
  height: 490px; 
`;

export const Entitlement = styled.div` 
  color: #1B202A;
  padding: 24px;
  &.Border {
    border-bottom: 1px solid #BDBCC5;
  }  
`;

export const EntitlementHeader = styled.div`
  height: 42px; 
  background: #E9E8EB;
  padding: 0 24px;
  display: flex;
  align-items: center;
  margin-top: 24px;
`;