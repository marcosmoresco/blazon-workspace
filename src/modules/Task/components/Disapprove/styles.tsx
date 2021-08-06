import { styled as styledMui } from '@material-ui/core/styles';
import styled from "styled-components";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

export const AutocompleteUsers = styledMui(Autocomplete)({
  border: "1px solid #BBBDC0",
  borderRadius: 8,
  background: "#FFFFFF",
  width: "100%", 
  marginTop: 20,
  "& .MuiAutocomplete-listbox": {
    backgroundColor: "white",
  }
});

export const BoxDivider = styledMui(Divider)({   
  marginTop: 32,
});

export const ActionIcon = styled.div`
  background-color: #F4F4F5;
  border-radius: 8px;
  padding: 8px;
  height: 44px;
  width: 44px;
`;

export const TableUsers = styled.table`
  margin-top: 17px;
  width: 100%;
  border-spacing: 0 15px;
  border-collapse: separate;
`;

export const TableUsersTh = styled.th`
  text-align: left;
  font-size: 18px;
  line-height: 100%;
  font-weight: normal;
  color: #676378;
`;

export const TableUsersTr = styled.tr`
  background: rgb(255, 255, 255);
  border-radius: 8px;
  width: 100%;
  padding: 27px;
  & td:first-child { padding: 18px; }
  &:first-child td:first-child { border-top-left-radius: 8px; }
  &:first-child td:last-child { border-top-right-radius: 8px; }
  &:last-child td:first-child { border-bottom-left-radius: 8px; }
  &:last-child td:last-child { border-bottom-right-radius: 8px; }
`;

export const BoxContentTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  color: #676378;  
`;

export const PasswordVaultHeader = styled.div`
  background: #E9E8EB;
  border-radius: 8px;
  display: flex;
`;
export const PasswordVaultCardHeaderContent = styled.div`
  padding: 17px 0;
  max-width: 77%;
`;

export const PasswordVaultCardHeaderTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #26213F; 
  margin-bottom: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const PasswordVaultCardHeaderSubTitle = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  color: #514D65;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const PasswordVaultCardIconContent = styled.div`
  background: #D4D3D9;  
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

export const PasswordVaultCardIcon = styled.div`
  background: #F4F4F5;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
`;

export const BoxUserThumb = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; 
`;

export const BoxAction = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const BoxAutocompleteOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const BoxAutocomplete = styled(Paper)({
  backgroundColor: "#FFFFFF !important", 
  borderRadius: 8,
  marginTop: 15,  
  "& .MuiAutocomplete-option[data-focus=\"true\"]": {
    "& .Shared-action-icon": {
      background: "#3174f6" 
    },
    "& svg": {
      filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(276deg) brightness(103%) contrast(101%)"
    }
  }
});

export const AutocompletePaper = ({
  children,
}: {
  children: any;
}) => {

  return (
    <BoxAutocomplete>
      {children}
    </BoxAutocomplete>
  );
};
