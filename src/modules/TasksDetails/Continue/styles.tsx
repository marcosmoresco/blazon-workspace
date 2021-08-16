import styled from "styled-components";

export const Box = styled.div`
  margin: 0 64px;
`;
export const BoxCard = styled.div`
  padding: 32px 24px;
  background: #ffffff;
  box-shadow: 0px 0px 28px rgba(27, 32, 42, 0.16);
  border-radius: 8px;
  margin-bottom: 32px;
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