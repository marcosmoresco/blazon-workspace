import styled from 'styled-components'

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
`

export const BackBox = styled.div`
  cursor: pointer;
`

export const Header = styled.div`
  padding: 32px 64px 24px;
`

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center; 
  gap: 8px;
`
export const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: max-content;  
  gap: 10px; 
`
export const TitleText = styled.span`
  font-weight: 500;
  font-size: 24px;
`
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d1d2d4;
`

export const SubTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 64px;
`

export const SubTitleText = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  text-align: right;
  color: #1b202a;
`
