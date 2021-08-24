import styled from "styled-components";
import { styled as styledMui } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

export const BoxCard = styled.div`
  padding: 32px 24px;
  background: #ffffff;
  box-shadow: 0px 0px 28px rgba(27, 32, 42, 0.16);
  border-radius: 8px;
  margin-bottom: 32px;
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
  max-width: 550px;
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

interface BoxCardIdentifierProps {
  background?: string;
  color?: string;
}

export const BoxCardIdentifier = styled.div<BoxCardIdentifierProps>`
  background: ${props => props.background && props.background || "#eaf1fe"};
  color: ${props => props.color && props.color || "#0e46d7"};
  font-weight: 500;
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
    backgroundColor: "#4EB862",
  },
});

export const BarPriorityMedium = styledMui(LinearProgress)({
  marginLeft: 12,
  backgroundColor: "#E9E8EB",
  width: 150,
  height: 8,
  borderRadius: 80,
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "#FBB13C",
  },
});

export const BarPriorityHigh = styledMui(LinearProgress)({
  marginLeft: 12,
  backgroundColor: "#E9E8EB",
  width: 150,
  height: 8,
  borderRadius: 80,
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "#FF134A",
  },
});

export const BoxCardStatus = styled.div`
  background: #d0ffe0;
  border: 1px solid #08c581;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  color: #0d875b;
  text-transform: uppercase;
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
export const InfoCheck = styled.div`
  border: 1px solid #08c581;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #0d875b;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    margin-right: 8px;
  }
`;
export const InfoBrowsers = styled.div`
  border: 1px solid #d4d3d9;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #92909f;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    margin-right: 8px;
  }
`;
export const Box = styled.div`
  margin: 0 64px;
  max-width: 1312px;
  margin-left: auto;
  margin-right: auto;
`;
