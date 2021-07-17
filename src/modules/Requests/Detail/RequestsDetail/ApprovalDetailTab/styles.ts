import styled from "styled-components";

export const ApprovalDetailTab = styled.div`
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
export const StyledTableResource = styled.div`
  padding: 16px 24px;
  background: #ffff;

  th {
    font-size: 14px;
    line-height: 30px;
    color: #1b202a;
    background: #ffff;
    text-align: left;
    padding: 0 32px 0 0;
  }
  td {
    font-size: 14px;
    color: #60636a;
    background: #ffff;
    text-align: left;
    padding: 0 32px 0 0;
  }
`;

export const UserType = styled.span`
  font-size: 16px;
  color: #1b202a;
`;
export const Image = styled.img`
  border-radius: 50%;
  margin-right: 16px;
  height: 64px;
  width: 64px;
  object-fit: cover;
`;

export const Name = styled.span`
  font-size: 21px;
  color: #1b202a;
`;
