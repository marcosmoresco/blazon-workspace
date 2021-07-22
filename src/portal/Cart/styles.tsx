import styled from "styled-components";

export const Box = styled.div`
  background: #FFFFFF;
  border: 1px solid #E9E8EB;
  box-sizing: border-box;
  box-shadow: 0px 4px 74px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 15px;
  width: 421px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`; 

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 18px;
  line-height: 130%;
  color: #3174F6;
  gap: 5px;
`;  

export const HeaderCloseIcon = styled.div`
  cursor: pointer;
`;

export const BoxContent = styled.div` 
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconItem = styled.div`
  background: #F4F4F5;
  border-radius: 8px;
  min-width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextItem = styled.div`
  font-weight: normal;
  font-size: 18px;
  line-height: 130%;
  color: #26213F;
`;