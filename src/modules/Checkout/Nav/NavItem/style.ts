import { isBefore } from "date-fns";
import styled from "styled-components";

export const NavItemBox = styled.div`
  align-items: center;
  justify-items: center;
  color: ${({ isCurrent }: { isCurrent: boolean }) =>
    isCurrent ? "#1B202A" : "#7D7A8C"};
`;
export const Item = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 12px;
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
  background: ${({ isBefore }: { isBefore: boolean }) =>
    isBefore ? "#3174F6" : "#e9e8eb"};
`;
