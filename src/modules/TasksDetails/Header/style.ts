import styled from "styled-components";

export const HeaderPage = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 64px;
`;
export const InfoHeaderPage = styled.div`
  display: flex;
  padding: 8px;
  background: #d4d3d9;
  border-radius: 8px;
  gap: 16px;
`;
export const TypeStyle = styled.div`
  background: #f4f4f5;
  border: 1px dashed #92909f;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  color: #3174f6;
`;
export const MembershipStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px 8px 8px;
  background: #ffffff;
  border-radius: 8px;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #26213f;
`;
export const ButtonsArea = styled.div`
  display: flex;
  gap: 12px;

  Button {
    min-width: 105px;
  }
`;
export const Actions = styled.div`
  border: 1px solid #d4d3d9;
  border-radius: 8px;
  padding: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #26213f;
  align-items: center;
  height: 42px;
  cursor: pointer;
  background: #ffffff;
  box-sizing: border-box;
`;
