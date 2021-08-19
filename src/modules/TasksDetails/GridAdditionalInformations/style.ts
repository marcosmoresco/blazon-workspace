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
    ${({ selected }: { selected: boolean }) =>
      selected ? "#0e46d7" : "transparent"};
`;
export const InsideLine = styled.div`
  width: 100%;
  height: 2px;
  background: #bdbcc5;
`;
export const DeitalList = styled.div`
  align-items: center;
  padding: 22px 24px 39px;
  background: #fff;
  & label {
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    text-transform: uppercase;
    color: #26213F;
    margin-top: 15px;
    margin-bottom: 5px;
  }
`;

export const DetailValue = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #676378;
`;

export const GridArea = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 28px rgba(27, 32, 42, 0.16);
  border-radius: 8px;
`;
