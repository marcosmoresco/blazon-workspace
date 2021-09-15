import styled from "styled-components";

export const Box = styled.div`
  margin: 0 64px;
  max-width: 1312px;
  margin-left: auto;
  margin-right: auto;
`;
export const BoxCard = styled.div`
  padding: 32px 24px;
  background: #ffffff;  
  border-radius: 8px;
  margin-bottom: 18px;
  & .MuiFormHelperText-contained {
    margin-left: 0px;
  }
`;

export const Label = styled.div` 
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;
  color: #26213F;
  margin-bottom: 5px;
  &.Add-top {
    margin-top: 15px;
  }
`;