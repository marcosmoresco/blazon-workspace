import styled from "styled-components";

export const User = styled.span`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: #f4f4f5;
  border-radius: 6px;
  margin-right: 32px;
  gap: 16px;

  span {
    display: block;
  }
`;

export const UserType = styled.span`
  font-size: 16px;
  color: #1b202a;
`;

export const Image = styled.img`
  border-radius: 50%;
  height: 64px;
  width: 64px;
  object-fit: cover;
`;

export const Name = styled.span`
  font-size: 21px;
  color: #1b202a;
`;
