import styled from "styled-components";

export const Box = styled.div`
  margin: 0 64px;
`;
export const RetractBoxCard = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ededed;
  border-radius: 8px;
  padding: 16px 24px;
  border-radius: 8px;
  margin-bottom: 32px;
`;
export const RetractBoxOptions = styled.div`
  width: max-content;
  display: flex;
  background: #e9e8eb;
  border-radius: 8px;
  padding: 8px;
  gap: 12px;
`;
export const BoxOptionsIcon = styled.a`
  justify-content: center;
  align-items: center;
  background: #f4f4f5;
  border: 1px solid #d4d3d9;
  border-radius: 8px;
  padding: 8px 8px 4px;
  cursor: pointer;
`;

export const RetractBoxTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #26213f;
  gap: 22px;

  div {
    cursor: pointer;
  }
`;

export const ExpandBoxCard = styled.div`
  padding: 16px 24px;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 0px 28px rgba(27, 32, 42, 0.16);
  border-radius: 8px;
  margin-bottom: 32px;
`;
export const ExpandBoxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 8px;
  font-size: 22px;
  font-weight: 500;
  color: #26213f;
  margin-bottom: 44px;

  a {
    cursor: pointer;
  }
`;
export const ExpandBoxOptions = styled.div`
  display: flex;
  width: max-content;
  display: flex;
  background: #ffffff;
  border-radius: 8px;
  padding: 0 8px 8px;
  padding-right: 0;
  gap: 12px;
  margin-bottom: 40px;
`;

export const ExpandBoxOptionsIcon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid #d4d3d9;
  border-radius: 8px;
  padding: 8px 12px 8px;
  font-size: 16px;
  font-weight: 500;
  color: #26213f;
  gap: 10px;
  cursor: pointer;
`;

export const ExpandCard = styled.div`
  border: 1px solid #d4d3d9;
  border-radius: 8px;
  margin: 0 0 55px;
  padding: 40px 24px 21px;
`;

export const ExpandCardTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  color: #26213f;
  gap: 10px;
  margin-bottom: 40px;
`;

export const BoxObservation = styled.div`
  width: 100%;
  min-height: 120px;
  background: #ffffff;
  border: 1px solid #bebecb;
  box-sizing: border-box;
  border-radius: 8px;
  color: #676378;
  font-size: 16px;
  font-weight: 400;
  padding: 22px 16px;
  margin-bottom: 16px;
`;

export const TitleBoxObservation = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #514d65;
  padding-bottom: 8px;
`;
export const TitleField = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #514d65;
  margin-bottom: 6px;
  width: 100%;
`;

export const BoxField = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 8px;
  color: #676378;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 16px;
`;

export const DataField = styled.div`
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 400;
  color: #514d65;
  margin-bottom: 6px;
  width: 100%;
`;
export const FieldCard = styled.div`
  width: 100%;
  background: #ffffff;
  border: 1px solid #bebecb;
  border-radius: 8px;
  color: #676378;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 16px;
  min-height: 48px;
  padding: 12px;
`;
export const FieldItem = styled.div`
  width: max-content;
  background: #e9e8eb;
  border-radius: 50px;
  color: #676378;
  font-size: 16px;
  font-weight: 400;
  padding: 3px 12px;
`;
