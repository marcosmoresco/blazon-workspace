import styled from "styled-components";

export const Status = styled.div``;

export const StatusTitle = styled.span`
  font-size: 14px;
  color: #514d65;
  padding: 8px;
`;

interface StyledStatusProps {
  background?: string;
  color?: string;
}

export const StyledStatus = styled.div<StyledStatusProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.background && props.background || "#1377d524"};
  border-radius: 64px;
  margin: 8px;
  span {
    color: ${props => props.color && props.color || "#1377D5"};
    padding: 8px;
    font-size: 14px;
  }
`;
