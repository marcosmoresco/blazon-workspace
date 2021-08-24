import styled, {css} from "styled-components";

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
  padding: 56px 0px 52px;
  max-width: 1312px;
  margin-left: auto;
  margin-right: auto;
`;
export const ItemArea = styled.div`
  background: #ffff;
  border-radius: 8px;
  box-shadow: 0px 0px 28px 0px #1b202a29;
  width: 100%;
  padding: 42px 24px 32px;

  /* div {
    display: flex;
  } */
  /* span {
    width: 500px;
    padding-top: 50px;
  } */
`;
export const ImageArea = styled.div`
  width: 280px;
  height: 210px;
  padding-left: 40px;
  margin-right: 50px;
`;
export const TextArea = styled.div`
  display: flex;
  
`;
export const Span = styled.span`
  margin: 36px 56px 0 0;
  flex: 1 ;
  font-size: 14px;
  font-weight: 400;
  color: #0F141D;

`;
export const EffetiveDate = styled.span`
display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px;
  width: 100%;
  border: 1px solid #E9E8EB;
  border-radius: 8px;
  padding: 12px 12px 10px;
  gap: 8px;

  span {
    font-size: 16px;
    font-weight: 400;
    color: #26213f;
  }
`;
export const Description = styled.div`
  margin-bottom: 48px;  
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

  Button {
    min-width: 156px;
  }
`;
