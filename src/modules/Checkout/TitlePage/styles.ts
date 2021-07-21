import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 64px 24px;

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
export const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: max-content;
  padding: 12px;
  gap: 10px;
  background: #e9e8eb;
`;
export const TitleText = styled.span`
  font-weight: 500;
  font-size: 16px;
`;
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d1d2d4;
`;

export const InfoText = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #0f141d;
`;
