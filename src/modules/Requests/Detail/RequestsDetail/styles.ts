import styled from "styled-components";

export const WorkArea = styled.div`
  max-width: 1312px;
  margin-left: auto;
  margin-right: auto;
`;
export const Grid = styled.div`
  box-shadow: 0px 0px 28px rgba(27, 32, 42, 0.16);
  padding: 22px 0 2px;
  margin: 32px 0;
  border-radius: 6px;
  background: #ffff;
`;
export const MenuDetail = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px 0 0;
  gap: 10px;
  background: #ffff;
  border-radius: 6px 6px 0 0;
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
  height: 1px;
  background: #bdbcc5;
`;

export const DeitalList = styled.div`
  align-items: center;
  padding: 42px 24px 39px;
  background: #fff;
`;

export const DeitalCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px 14px 24px;
  background: #ffff;
  border-radius: 6px;
  border: 1px solid #d4d3d9;
  margin-right: 32px;
  gap: 16px;
  margin-bottom: 24px;

  span {
    display: block;
  }
  div {
    display: flex;
  }
`;
