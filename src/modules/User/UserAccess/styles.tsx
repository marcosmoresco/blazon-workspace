import { styled as styledMui, createStyles, Theme } from '@material-ui/core/styles';
import styled from "styled-components";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";

export const useStyles = (theme: Theme) =>
  createStyles({
    actionIcon: {
      backgroundColor: '#F4F4F5',
      borderRadius: 8,
      padding: 8,
      height: 44,
      width: 44
    },
    dialogIconDetail: {
      marginBottom: 32,
      backgroundColor: '#E9E8EB',
      borderRadius: 8,
      '& .iconBg': {
        backgroundColor: '#D4D3D9',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
      },
      '& .iconCell': {
        borderRadius: 8,
        backgroundColor: '#E9E8EB',
        height: 64,
        width: 64,
        padding: 11,
        margin: 23
      },
      '& .detailContent': {
        padding: 17
      },
      '& .title': {
        fontWeight: 600,
        fontSize: 18,
        color: '#26213F'
      },
      '& .description': {
        fontWeight: 400,
        fontSize: 14,
        color: '#514D65'
      }
    },
    searchSection: {
      '& .title': {
        fontWeight: 600,
        fontSize: 18,
        color: '#676378',
        paddingBottom: 18
      }
    },
    divider: {
      marginTop: 32,
      marginBottom: 12
    }
  });

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
