import styled from "styled-components";

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d1d2d4;
`;
export const PageInfoStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 56px 64px 52px;

  Button {
    min-width: 156px;
  }
  div {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      font-size: 21px;
      color: #26213f;
    }
  }
`;
export const CheckBox = styled.input.attrs({ type: "checkbox" })`
  width: 24px;
  height: 24px;
  border-radius: 4px;
`;
export const Nav = styled.div`
  justify-content: center;
  align-items: center;
`;

export const SymbolStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 0 8px;
`;

export const TitlesStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 136px;
  padding-bottom: 48px;
`;

export const ItemText = styled.div`
  border: none;
  background: none;
  color: #bdbcc5;
`;

export const CircleStyle = styled.div`
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: #e9e8eb;
  border-radius: 50%;
  width: 64px;
  height: 64px;
`;

export const LineStatusStyle = styled.div`
  width: 160px;
  height: 4px;
  background: #e9e8eb;
`;

export const StatusCheckoutStyle = styled.div`
  justify-content: center;
  align-items: center;
`;

export const ItemsAdded = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  font-size: 21px;
  line-height: 130%;
  color: #26213F;
`;