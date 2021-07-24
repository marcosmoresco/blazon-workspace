import styled from "styled-components";

export const WorkArea = styled.div`
  padding: 0 64px;
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
  padding: 42px 24px 39px;
  background: #fff;
`;
export const GridArea = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 28px rgba(27, 32, 42, 0.16);
  border-radius: 8px;
`;
