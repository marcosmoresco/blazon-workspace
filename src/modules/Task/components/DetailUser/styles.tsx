import styled from "styled-components";

export const Header = styled.div`
  background: #1B202A;
  border-radius: 8px;
  width: 570px;
  height: 166px;
  display: flex;
  padding-left: 20px;
`;

export const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  & .MuiAvatar-root {
    width: 120px;
    height: 120px;
  }
`;

export const HeaderDisplayName = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  color: #FFFFFF;
`;

export const HeaderUsername = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #FFFFFF;
  margin-top: 5px;
`;

export const InformationsText = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  color: #26213F;
  margin-top: 32px;
`;

export const InformationContent = styled.div`
  background: #FFFFFF;
  border: 1px solid #E9E8EB;
  box-sizing: border-box;
  border-radius: 8px;
  width: 570px;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

export const InformationLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;
  color: #26213F;
  margin-top: 15px;
  margin-bottom: 5px;
`;

export const InformationText = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
  color: #A8A6B2;
`;