import styled from "styled-components";

export const Box = styled.div`
  margin: 37px; 24px;
`;

export const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BoxHeaderName = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1B202A;
`;

export const BoxHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  color: #7D7A8C;
  gap: 5px;
`;

export const BoxContent = styled.div`
  margin-top: 48px;
`;

export const Label = styled.label`
  font-weight: 600;
  text-transform: uppercase;
  color: #26213F;
`;

export const BoxDescription = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 21px 16px 0px;
  height: 120px;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E9E8EB;
  color: #A8A6B2;
  font-size: 18px;
  overflow-y: auto;
`;

export const BoxCart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  height: 84px;
  border-top: 1px solid #E9E9EA;
  padding-right: 37px;  
  &.Added {
    cursor: pointer;
  }
`;

export const BoxCartItem = styled.div`
  background: #F4F4F5;
  border-radius: 6px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 400;
`;

export const BoxCartItemIcon = styled.div`
  background: #E9E8EB;
  border-radius: 8px;  
  display: flex;
  align-items: center;
  justify-content: center;  
  width: 32px;
  height: 32px;
`;

export const BoxLoading = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export const BoxExternalReference = styled.div`
  margin-top: 24px;    
`;

export const ExternalReference = styled.a`  
  color: ${props => props.color || "#0E46D7"};
  text-decoration-line: underline;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;  
`;

export const NoExternalReference = styled.div`  
  color: #A8A6B2; 
`;