import styled from "styled-components";

export const Grid = styled.div`
  padding: 0 64px;
`;
export const CheckoutStyle = styled.div`
  box-shadow: 0px 0px 28px rgba(27, 32, 42, 0.16);
  margin: 28px 0 48px;
  padding: 29px 0 32px 0;
  border-radius: 6px;
  background: #fff;
`;
export const ItemStyle = styled.div`
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  max-width: 740px;

  div {
    justify-content: left;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  span {
    font-weight: 600;
    font-size: 18px;
    color: #1b202a;
  }
`;
export const CheckBox = styled.input.attrs({ type: "checkbox" })`
  width: 24px;
  height: 24px;
  border-radius: 4px;
`;
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d1d2d4;
`;
export const TitleItem = styled.div`
  padding: 13px 0 0 32px;
  font-size: 16px;
  color: #514d65;
`;
export const Item = styled.div`
  align-items: top;
  justify-content: space-between;
  display: flex;
  padding: 0 32px 32px 0;
`;

export const Ticket = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  span {
    padding-top: 6px;
    font-size: 16px;
    color: #514d65;
  }
`;

export const AcessRequest = styled.div`
  padding: 32px 24px 25px;
  span {
    font-size: 14px;
    color: #26213f;
    text-transform: uppercase;
    font-weight: 600;
  }
`;

export const AddAUser = styled.div`
  margin-top: 16px;
  padding: 0;
  span {
    font-size: 14px;
    color: #26213f;
    text-transform: uppercase;
    font-weight: 600;
  }
`;
export const Input = styled.input`
  width: 100%;
  height: 38px;
  border: 3px solid #e9e8eb;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 400;
  padding: 8px;
  font-size: 16px;

  :hover {
    border: 2px solid #1b202a;
  }
`;
export const BottomArea = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-end;
  padding: 24px 24px 0;
  
  Button {
    min-width: 156px;
  }
`;
