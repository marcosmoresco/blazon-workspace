import styled from "styled-components";

export const BoxRoot = styled.div`
  margin: 42px 64px;
`;

export const BoxAccounts = styled.div`
  margin-top: 24px;
`;

export const AccountsContentInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const AccountsContentInfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1A202B;
  border-radius: 4px;
  margin-right: 12px;
  width: 32px;
  height: 32px;     
`;

export const AccountsContent = styled.div` 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
  padding: 5px 24px;
  &:hover {
    background: #E9E8EB;
    ${AccountsContentInfoIcon} {
      background: #514D65;
    }
    > .caretRight-icon {
      filter: invert(20%) sepia(94%) saturate(2990%) hue-rotate(222deg) brightness(84%) contrast(101%);
    }
  }
`;

export const RecentPasswordCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #D4D3D9;
  box-sizing: border-box;
  box-shadow: 0px 0px 24px rgba(39, 36, 52, 0.12);
  border-radius: 8px;
  cursor: pointer;
`;

export const RecentPasswordCardContent = styled.div`
  margin: 14px;
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
  max-width: 86%;
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
`;

export const BoxRecentPasswordsContent = styled.div`
  padding: 24px;
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

export const BoxHeader = styled.div`
  background: linear-gradient(262.19deg, #1B202A 43.97%, #020407 66.35%);
  border-radius: 8px;
  padding: 42px;
  position: relative;
  margin-top: 36px;
  min-height: 214px;
  margin-bottom: 48px;
`;

export const HeaderWelcomeText = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: #FFFFFF;
`;

export const HeaderWelcomeSubText = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #F4F4F5;
  margin-bottom: 25px;
`;

export const HeaderWelcomeImg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
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

export const BoxRequest = styled.div`
  padding: 24px;
`;

export const BoxRequestHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BoxRequestHeaderIdentifier = styled.div`
  background: #EAF1FE;
  border-radius: 30px;
  padding: 8px;
  color: #0E46D7;
`;

export const BoxRequestHeaderDate = styled.div`
  background: rgba(183, 188, 193, 0.14);
  border-radius: 35px;
  padding: 8px;
  color: #26213F;
`;

export const BoxRequestHeaderTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  color: #26213F;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 15px;
`;

export const BoxRequestHeaderType = styled.div`
  background: rgba(19, 119, 213, 0.14);
  border-radius: 35px;
  padding: 8px;
  color: #1377D5;
  margin-top: 12px;
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