import styled from "styled-components";

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d1d2d4;
`;
export const StatusCheckoutStyle = styled.div`
  justify-content: center;
  align-items: center;
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
  gap: 152px;
  padding-bottom: 48px;
`;
export const ItemText = styled.div`
  border: none;
  background: none;
  color: #bdbcc5;
`;
export const FinishingArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: top;
  padding: 56px 175px 52px;
`;
export const ItemArea = styled.div`
  background: #ffff;
  border-radius: 8px;
  box-shadow: 0px 0px 28px 0px #1b202a29;
  width: 100%;
  padding: 42px 24px 32px;

  div {
    display: flex;
  }
  span {
    width: 500px;
    padding-top: 50px;
  }
`;
export const ImageArea = styled.div`
  width: 280px;
  height: 210px;
  padding-left: 40px;
  margin-right: 50px;
`;
export const EffetiveDate = styled.div`
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px;
  width: 100%;
  height: max-content;
  border: 3px solid #e9e8eb;
  border-radius: 4px;
  font-weight: 400;
  padding: 4px 8px;
  font-size: 16px;
  gap: 8px;

  span {
    padding-top: 4px;
    font-size: 16px;
    font-weight: 400;
    color: #26213f;
  }
`;
export const Description = styled.div`
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 48px;
  width: 100%;
  height: max-content;
  border: 3px solid #e9e8eb;
  border-radius: 4px;
  font-weight: 400;
  padding: 4px 8px;
  font-size: 16px;
  gap: 8px;

  span {
    padding: 22px 16px;
    font-size: 16px;
    font-weight: 400;
    color: #26213f;
  }
`;
export const DescriptionTitle = styled.div`
  margin: 24px 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: #26213f;
  text-transform: uppercase;
`;
export const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 32px 24px 0;
  gap: 32px;
`;
export const ButtonBlue = styled.button`
  height: 42px;
  border: none;
  border-radius: 8px;
  background: #0e46d7;
  color: #ffff;
  min-width: 156px;
  padding: 6px 16px;
  min-width: "auto";
  font-size: 16px;
  font-weight: 500;
  padding: "6px 16px";
  cursor: pointer;

  :hover {
    box-shadow: 0px 5px 41px rgba(49, 116, 246, 0.26);
    background: #3174f6;
  }
  :active {
    background: #0f38a1;
  }
`;
export const ButtonTransparent = styled.button`
  height: 42px;
  border: 1px solid #0e46d7;
  border-radius: 8px;
  background: transparent;
  color: #0e46d7;
  min-width: 156px;
  padding: 6px 16px;
  min-width: "auto";
  font-size: 16px;
  font-weight: 500;
  padding: "6px 16px";
  cursor: pointer;
  box-sizing: border-box;

  :hover {
    border: 1px solid #3174f6;
    filter: drop-shadow(0px 0px 20px rgba(49, 116, 246, 0.26));
    text-shadow: 0px 0px 14px rgba(49, 116, 246, 0.6);
  }
  :active {
    background: rgba(15, 56, 161, 0.1);
    border: 1px solid #0f38a1;
    color: #0f38a1;
  }
`;
