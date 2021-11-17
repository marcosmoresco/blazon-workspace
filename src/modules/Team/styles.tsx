import styled from "styled-components";
import {
  styled as styledMui,
  withStyles
} from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Drawer from "@material-ui/core/Drawer";

export const InputSearchBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 42px;
`;

export const OutlinedInputSearch = styledMui(OutlinedInput)({
  border: "1px solid #BBBDC0",
  borderRadius: 8,
  background: "#FFFFFF",
  width: 800,
  height: 48,
  marginTop: 20,
});

export const ItemCard = styled.div`
  background: #FFFFFF;  
  border-radius: 8px;
  display: flex; 
  padding: 14px 14px 14px 0px;
  cursor: pointer;
`;

export const CheckboxContent = styled.div`
  .MuiFormControlLabel-root {
    margin-right: 0;
    margin-left: 5px;
  }
`;

export const Content = styled.div` 
  margin: 0 64px;
  max-width: 1312px;
  margin-left: auto;
  margin-right: auto;
`;

export const UserContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  max-width: 90%;
`;

export const UserContentInfo = styled.div`
  position: relative;
  max-width: 78%;
`;

export const Username = styled.div`
  font-size: 12px;
  color: #000000;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const DisplayName = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #000000;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Actions = styled.div`
  margin: 0,
  height: 90,
  padding-right: 40px;
  background: #E9E8EB;
  box-shadow: 0px 4px 74px rgba(0, 0, 0, 0.25); 
  padding: 20px 40px;
  text-align: center;
  .MuiButton-root {
    padding: 0 62px;
  }
`;

export const DialogContent = withStyles(() => ({
  root: {
    padding: '10px 0px',
    borderBottom: 'none',
    '& .MuiFormControl-root': {
      width: '100%'
    },
    '& .MuiInputBase-formControl': {
      width: '100%'
    },
    '& .Mui-error': {
      marginLeft: 0
    },
    '& input': {
      padding: '11.5px'
    }
  }
}))(MuiDialogContent);

export const InformationsText = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  color: #26213F;
  margin-top: 32px;
  margin-bottom: 88px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const InformationContent = styled.div`
  background: #FFFFFF;
  border: 1px solid #E9E8EB;
  box-sizing: border-box;
  border-radius: 8px;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  overflow-y: auto;  
`;

export const InformationLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;
  color: #26213F;
  margin-top: 15px;
  margin-bottom: 5px;
`;

export const InformationText = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
  color: #A8A6B2;
`;

export const LoadMoreContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
  margin-bottom: 30px;
`;

export const DrawerDetailUser = withStyles({
  paper: {    
    minWidth: 815,       
  },
})((props: any) => (
  <Drawer        
    {...props}
  />
));

export const Header = styled.div`  
  border-radius: 8px; 
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

export const HeaderBox = styled.div`
  position: relative;
`;

export const HeaderDisplayName = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  color: #26213F; 
`;

export const HeaderUsername = styled.div`
  font-size: 16px;
  line-height: 100%;
  color: #26213F;
  margin-bottom: 5px;
`;

export const HeaderClose = styled.div`  
  cursor: pointer;
`;