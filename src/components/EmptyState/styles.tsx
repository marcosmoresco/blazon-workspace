
import styled from "styled-components";

export const Box = styled.div` 
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BoxContent = styled.div` 
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 122px;  
  border-radius: 6px;
  padding: 24px;
  gap: 24px;
`;

export const Title = styled.div` 
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: #26213F;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 8px 0px;
`;

export const Text = styled.div` 
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #4F486A;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 8px 0px;
`;