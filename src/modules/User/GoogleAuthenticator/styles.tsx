import styled from "styled-components";
import { styled as styledMui } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';

export const Box = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  margin-top: 32px;
  display: inline-block;
`;

export const Content = styled.div`
  margin: 140px 112px 0 120px; 
  min-height: 350px;
  .MuiRadio-root {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

export const HeaderBackground = styled.div`
  background: ${props => props.color || "#6F90E7"};
  border-radius: 8px 8px 0px 0px;
  height: 125px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderGoogleAuthenticator = styled.div`
  background: #FBFAFB;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 198px;
  height: 198px;
  margin-top: 120px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 12px;
  text-align: center;  
`;

export const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: #514D65;
`;

export const Info = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 12px; 
`;

export const InfoText = styled.div`
  font-size: 16px;
  font-weight: 400; 
  color: #514D65;
`;

export const InfoDivider = styledMui(Divider)({
  marginTop: 32,
  marginBottom: 32
}); 

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  padding: 20px;
  border-top: 1px solid #E9E9EA;
`;

export const DownloadAppOptions = styled.ul`
  color: #514D65;  
  font-size: 16px;
  margin-top: 0;
  padding-inline-start: 27px;
  line-height: 25px;
`;

export const Link = styled.a`  
  color: ${props => props.color || "#0E46D7"};
  text-decoration-line: underline;
  &.Bold {
    font-weight: 600;
  }  
`;

export const Bottom = styled.div`
  margin-bottom: 30px;
`;

export const ShowCode = styled.span`
  margin-left: 5px;
`;

export const QrCode = styled.div`   
  display: flex; 
`;

export const Code = styled.div`
  input {
    background: #FFFFFF;
    border: 1px solid #F2F1F3;
    box-sizing: border-box;
    border-radius: 6px;
    width: 643px;
    height: 48px;
    padding: 12px;
    margin-top: 24px;
    font-size: 16px;
    ::placeholder {
      font-size: 16px;
      color: #A8A6B2;
    }
  } 
`;

export const StatusMessage = styled.div`
  text-align: center;
`;