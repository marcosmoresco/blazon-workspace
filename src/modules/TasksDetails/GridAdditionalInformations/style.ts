import styled from "styled-components";

export const WorkArea = styled.div`  
  max-width: 1312px;
  margin-left: auto;
  margin-right: auto;
`;
export const MenuDetail = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px 0 0;
  gap: 10px;
  background: #ffff;
  border-radius: 6px 6px 0 0;
  padding-top: 16px;
`;
export const StyleApprovalTab = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 24px 18px;
  background: #fff;
  border-radius: 0px;
  border-bottom: none;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-bottom: 4px solid
    ${({ selected, color }: { selected: boolean, color?: string; }) =>
      selected ? color && color || "#0e46d7" : "transparent"};
`;
export const InsideLine = styled.div`
  width: 100%;
  height: 2px;
  background: #bdbcc5;
`;
export const DeitalList = styled.div`
  align-items: center;
  padding: 22px 24px 22px;
  background: #fff;
  & label {
    font-size: 14px;
    color: #514D65;
    padding-bottom: 8px;
  }
`;

export const DetailValue = styled.div`
  width: 100%;
  background: #FBFAFB;
  border: 1px solid #A8A6B2;
  box-sizing: border-box;
  border-radius: 8px;
  color: #514D65;
  font-size: 16px;
  font-weight: 400;
  padding: 10px 16px;
  margin-bottom: 5px;
`;

export const GridArea = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 28px rgba(27, 32, 42, 0.16);
  border-radius: 8px;
`;
