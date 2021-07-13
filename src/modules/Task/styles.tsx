import styled from "styled-components";
import { styled as styledMui } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';

export const Content = styled.div`
  margin-top: 48px;
`;

export const Box = styled.div`
  margin: 0 24px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
`;

export const Info = styled.div`
  border: 1px solid #d4d3d9;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #26213f;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    margin-right: 8px;
  }
`;

export const Actions = styled.div`
  border: 1px solid #d4d3d9;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #26213f;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HeaderFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const BoxCard = styled.div`
  padding: 15px 24px;
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
  font-size: 22px;
  line-height: 33px;
  color: #26213f;
`;

export const BoxCardIdentifier = styled.div`
  background: #eaf1fe;
  color: #0e46d7;
  border-radius: 30px;
  margin-left: 19px;
  padding: 8px;
`;

export const BoxRequester = styled.div`
  display: flex;
  align-items: center;
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
  height: 48px;
  padding: 12px;
  color: #000000;
  font-weight: 500;
`;

export const BarPriorityLow = styledMui(LinearProgress)({
  marginLeft: 12,
  backgroundColor: "#E9E8EB",
  width: 150,
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

export const FooterType = styled.div`
  background: #F4F4F5;
  border: 1px dashed #92909F;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  color: #3174F6;
`;

export const FooterStatus = styled.div`
  background: #D0FFE0;
  border: 1px solid #08C581;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  color: #0D875B;
`;