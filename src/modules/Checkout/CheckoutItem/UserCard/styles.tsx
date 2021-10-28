import styled from "styled-components";

export const UserCardStyle = styled.div`
  margin: 0 24px;
  background: #f4f4f5;
  border-radius: 8px;
  margin-bottom: 36px;
`;
export const UserCardTitle = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 24px;
`;

export const UserId = styled.div`
  display: flex;
  gap: 8px;

  div {
    font-size: 14px;
    font-weight: 300;
  }
`;
export const UserPosition = styled.span`
  font-size: 18px;
  font-weight: 400;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d1d2d4;  
  &.Add-top {
    margin-top: 48px;
  }
`;
export const IconSpace = styled.button`
  align-items: center;
  justify-content: center;
  background: transparent;
  height: 28px;
  width: min-content;
  padding: 2px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  :hover {
    background: #ff134a;
  }
`;
export const ObservationArea = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 24px;
`;

export const Observation = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  background: #e9e8eb;
  border-radius: 8px;
  justify-content: space-between;
  padding: 16px 16px 24px;
`;

export const TextArea = styled.div`
  span {
    font-size: 16px;
    font-weight: 400;
    color: #323740;
  }

  div {
    font-size: 14px;
    font-weight: 400;
    color: #514d65;
    padding-top: 16px;
  }
`;
export const AddDados = styled.div`
  margin-top: 16px;
  padding: 0 24px;
  > span {
    font-size: 14px;
    color: #26213f;
    text-transform: uppercase;
    font-weight: 600;
  }
  input {
    background-color: #FFFFFF;
    padding: 11.5px 8px;
  }
  .MuiInputBase-root {
    background: #fff;
  }
`;
export const Text = styled.div`
  width: 100%;
  height: 38px;
  border: 1px solid #e9e8eb;
  border-radius: 8px;
  background: #ffff;
  padding: 8px;
  font-size: 16px;
  font-weight: 400;
  color: #26213f;
`;
export const TextDescription = styled.div`
  width: 100%;
  height: 88px;
  border: 1px solid #e9e8eb;
  border-radius: 8px;
  background: #ffff;
  padding: 8px;
  font-size: 16px;
  font-weight: 400;
  color: #26213f;
  margin-bottom: 48px;
`;
export const UserBottomArea = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-end;
  padding: 24px;  

  Button {
    min-width: 156px;
  }
`;

export const Category = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  color: #1B202A;
  margin-left: 24px;
  margin-top: 24px;
`;

export const DateType = styled.div`
  width: 300px;
`;

export const Help = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
