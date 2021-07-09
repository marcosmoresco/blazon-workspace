import styled from "styled-components";

export const Box = styled.div`
  display: flex; 
  justify-content: space-between;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 32px 64px 24px;
  gap: 16px;
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

export const SubTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 64px;
`;

export const SubTitleText = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  text-align: right;
  color: #1B202A;
`;
