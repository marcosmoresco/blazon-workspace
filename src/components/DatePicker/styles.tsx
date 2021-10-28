import styled from "styled-components";

export const Box = styled.div`
  & .MuiFormControl-marginNormal {
    margin-top: 8px;
    margin-bottom: 0;
    width: 100%;
    & input {
      padding: 11.5px 11.5px 11.5px 0;
    },
    & .MuiOutlinedInput-adornedStart {
      padding-left: 0;
    }
  },
  & label {
    font-size: 14px;
    font-style: normal;
    line-height: 14px;    
  }  
  & .MuiFormHelperText-root {
    text-transform: initial;
    margin-left: 0;
  }
`;