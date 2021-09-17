import styled from "styled-components";

export const WorkArea = styled.div`  
  max-width: 1312px;
  margin-left: auto;
  margin-right: auto;
`;
export const Grid = styled.div`  
  padding: 0 0 2px;
  margin: 18px 0;
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
    ${({ selected, color }: { selected: boolean, color: string }) =>
      selected ?  color && color || "#0e46d7" : "transparent"};
`;
export const InsideLine = styled.div`
  width: 100%;
  height: 2px;
  background: #bdbcc5;
`;

export const DeitalList = styled.div`
  align-items: center;
  padding: 33px 24px 7px 24px;
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

export const CommentsTab = styled.div`
  padding: 0 0 32px;
  border-radius: 8px;
`;
export const IsertComments = styled.div`
  align-items: center;
  display: flex;  
  box-sizing: border-box;
  border-radius: 6px;
  gap: 16px;
`;
export const Text = styled.input`
  width: 100%;
  padding: 12px;
  background: #FBFAFB;
  border: 1px solid #bebecb;
  box-sizing: border-box;
  border-radius: 8px;

  ::placeholder {
    color: #676378;
    font-weight: 400;
    font-size: 16px;
  }
`;

export const PaperPlaneBox = styled.a`
  padding: 8px 8px 2px;
  background: ${({ color }: { color: string }) =>
  color && color || "#0e46d7"};
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
`;

export const CommentsRegister = styled.div`
  display: flex;
  padding: 16px 16px 0px 16px;
  border: 1px solid #F2F1F3;
  background: #FBFAFB;
  border-radius: 6px;
  gap: 16px;
  margin-bottom: 16px;

  div {
    margin-bottom: 8px;
  }
`;

export const TitleComments = styled.div`
  font-size: 21px;
  font-weight: 400;
  color: #1b202a;
  margin-bottom: 16px;
`;
export const UserNameComments = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #1b202a;
`;
export const DataComment = styled.div`
  font-size: 16px;
  font-weight: 300;
  color: #7d7a8c;
`;
export const UserComments = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
export const Comment = styled.div`
  padding: 12px;
  font-size: 16px;
  font-weight: 400;
  gap: 16px;
  color: #676378;
  border: 1px solid #d4d3d9;
  border-radius: 6px;
  width: 100%;
`;

export const BoxComment = styled.div`
  width: 100%;
`;

export const Image = styled.img`
  border-radius: 50%;
`;

export const HistoryBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-radius: 6px;
  gap: 16px;
  margin-bottom: 16px;
  background: #FBFAFB;
`;

export const HistorySystem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F4F4F5;
  border-radius: 56px;
  width: 32px;
  height: 32px;
`;

export const UserHistory = styled.div`
  display: flex;
  gap: 16px;
  background: #FFFFFF;
  border: 1px solid #D4D3D9;
  padding: 8px;
  border-radius: 6px;
`;
export const UserName = styled.div`
  font-size: 12px;
  font-weight: 400;  
  color: #26213F;
  line-height: 17px;

`;
export const User = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #26213F;
`;

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;
export const DataHistory = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #60636a;
`;
export const DataHistories = styled.div`
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #1b202a;
`;
