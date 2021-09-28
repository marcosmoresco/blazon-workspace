import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

export const BoxRoot = styled.div`
  margin: 42px 0px;
`;

export const RecentPasswordCard = styled.div`
  background: #FFFFFF;
  border: 1px solid rgb(237, 237, 239);
  box-sizing: border-box;
  box-shadow: rgb(27 32 42 / 8%) 0px 4px 16px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
`;

export const RecentPasswordCardContent = styled.div`
  margin: 14px;
`;

export const RecentPasswordCardActions = styled.div`
  position: absolute;
  right: 10px;
  top: 15px;
`;

export const RecentPasswordCardContentHeader = styled.div`
  display: flex;
`;

export const RecentPasswordCardContentHeaderImage = styled.div`
  background: #E9E8EB;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  margin-right: 8px;
`;

export const RecentPasswordCardContentHeaderBox = styled.div`
  max-width: 75%;
`;

export const RecentPasswordCardContentHeaderTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #26213F;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const RecentPasswordCardContentHeaderUsername = styled.div`
  font-weight: normal;
  font-size: 14px;
  color: #BDBCC5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const RecentPasswordCardContentHeaderText = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  color: #676378;
  margin-top: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 25px;
`;

interface BoxRecentPasswordsContentProps {
  isEmpty: boolean;
}

export const BoxRecentPasswordsContent = styled.div<BoxRecentPasswordsContentProps>`
  padding: ${props => props.isEmpty && "0px" || "24px"};
`;

export const ShowAll = styled.div`
  display: flex;
  align-Items: center;
  font-size: 16px;
  color: #1B202A;
  cursor: pointer;
  & svg {
    margin-left: 5px;
  }
`;

export const BoxRecentPasswords = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  min-height: 100%;
`;

export const DefaultTitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #E9E8EB;
`;

export const DefaultTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: #1B202A;
`;

export const BoxHeaderAccessTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #1B202A;
  margin-bottom: 10px;
`;

export const BoxHeader = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  padding: 43px 25px;
  position: relative;
  margin-top: 36px;
  min-height: 160px;
  margin-bottom: 32px;
`;

export const BoxHeaderAccess = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  cursor: pointer;
`;

export const BoxHeaderAccessItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const BoxHeaderAccessItemIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${props => props.color && props.color || "#0E46D7"};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderWelcomeText = styled.div`
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: #26213F;
`;

export const HeaderWelcomeSubText = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  color: #676378;
  width: 345px;
  margin-top: 10px;
`;

export const BoxCard = styled.div`
  cursor: pointer;
  background: #FFFFFF;
  box-shadow: 0px 0px 28px rgba(27, 32, 42, 0.16);
  border-radius: 8px;
  padding: 24px;
  &:hover {
    border: 1px solid #A8A6B2;
  }
`;

export const BoxRequestHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;


export const BoxRequest = styled.div`
  padding: 0px;
`;

export const BoxRequestItem = styled.div`
  padding: 20px;
  border-bottom: 1px solid #EBEAED;
  cursor: pointer;
  &:hover {
    background: #F4F4F5;
  }
`;

export const BoxRequestHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface BoxRequestHeaderIdentifierProps {
  background?: string;
  color?: string;
}

export const BoxRequestHeaderIdentifier = styled.div<BoxRequestHeaderIdentifierProps>`
  background: ${props => props.background && props.background || "#EAF1FE"};
  border-radius: 30px;
  padding: 4px 8px;
  color: ${props => props.color && props.color || "#0E46D7"};
`;

export const BoxRequestHeaderDate = styled.div`
  background: rgba(183, 188, 193, 0.14);
  border-radius: 35px;
  padding: 4px 8px;
  color: #26213F;
`;

export const BoxRequestHeaderTitle = styled.div`
  font-weight: normal;
  font-size: 18px;
  line-height: 100%;
  color: #26213F;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 15px;
  margin-top: 10px;
`;

interface BoxRequestHeaderTypeProps {
  background?: string;
  color?: string;
}

export const BoxRequestHeaderType = styled.div<BoxRequestHeaderTypeProps>`
  background: ${props => props.background && props.background || "rgba(19, 119, 213, 0.14)"}; 
  border-radius: 35px;
  padding: 4px 8px;
  color: ${props => props.color && props.color || "#1377D5"}; 
`;

export const BoxRequestDescription = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: #676378;
  margin-top: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const QuickActions = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  color: #26213F;
  margin-bottom: 32px;
`;

export const StyledMenu = withStyles({
  paper: {
    borderRadius: 8,    
    boxShadow: "0px 4px 74px rgba(0, 0, 0, 0.25)",
    background: "#FFFFFF",
    marginTop: 5,  
    width: 176,
    "& .MuiList-root": {
      paddingTop: 0,
      paddingBottom: 0,      
    },
    "& .MuiListItem-root": {
      padding: "10px 12px 10px 16px",
      display: "flex",
      justifyContent: "space-between"
    }
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