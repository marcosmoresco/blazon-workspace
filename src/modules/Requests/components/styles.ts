import styled from "styled-components";

export const StyledBeneficiary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f0f0f1;
  padding: 4px 8px 4px 4px;
  border-radius: 64px;

  span {
    padding: 0 8px;
    color: #1b202a;
    font-size: 14px;
  }
`;
export const StyledStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1377d524;
  border-radius: 64px;

  span {
    color: #1377d5;
    padding: 8px;
    font-size: 14px;
  }
`;

export const StyledNormal = styled.div`
  span {
    padding: 8px;
    font-size: 14px;
  }
`;

export const ExpandContent = styled.div`
  background: #f4f4f5;
  width: 100%;
  height: 100%;
  padding: 24px;
  cursor: default;
`;

export const ExpandContentCard = styled.div`
  display: block;
  align-content: center;
  background: #ffff;
  border: none;
  padding: 24px;
  border-radius: 8px;
`;

export const StyleMenuGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;  
  margin-bottom: 24px;

  span {
    color: #1b202a;
    font-size: 16px;
  }

  a {
    cursor: pointer;
    font-size: 18px;
    color: #1b202a;
  }
`;

export const StyleMenuGridTitle = styled.div`
  display: flex;
  align-items: center;  
  gap: 10px;
  background: #ffff;
  border-radius: 6px 6px 0 0;  
`;

export const StyleResource = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  justify-content: space-between;

  span {
    font-size: 15px;
    color: #514d65;
  }

  a {
    cursor: pointer;
    font-size: 18px;
    color: #1b202a;
  }
`;

export const StyledTableResource = styled.div`
  border: 1px solid #d4d3d9;
  align-content: center;
  padding: 24px;
  background: #f4f4f5;
  border-radius: 6px;
  width: 100%;
`;

export const StyledTableResourceMenu = styled.div`
  display: flex;
  align-items: left;
  padding-bottom: 16px;
  color: #1b202a;

  span {
    min-width: 286px;
  }
`;
export const StyledTableResourceRow = styled.div`
  display: flex;
  align-items: left;
  color: #60636a;

  span {
    min-width: 286px;
  }
`;
