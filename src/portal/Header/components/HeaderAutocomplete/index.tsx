import React, { FC, useState } from "react";
import { injectIntl } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_SELF_SERVICE } from "@portal/Search/queries";
import { SelfService } from "@portal/Search/types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@icons/Search";
import PuzzlePieceIcon from "@icons/PuzzlePiece";
import ArticleIcon from "@icons/Article";
import UserGearIcon from "@icons/UserGear";
import NewspaperClippingIcon from "@icons/NewspaperClipping";
import CaretRightIcon from "@icons/CaretRight";
import InputAdornment from "@material-ui/core/InputAdornment";
import { getSelfServiceAttributeValue } from "@utils/index";
import type { HeaderAutocompleteProps } from "./types";
import {
  AutocompletePaper,
  BoxAutocomplete,
  BoxAutocompleteContent,
  BoxAutocompleteContentInfo,
  BoxAutocompleteTitle,
  BoxAutocompleteTitleParent,
  BoxAutocompleteText,
} from "./styles";

const HeaderAutocomplete: FC<HeaderAutocompleteProps> = ({ classes, intl }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);  
  const [filter, setFilter] = React.useState("");

  const { loading, error, data, refetch } = useQuery<{
    getSelfService: SelfService[];
  }>(GET_SELF_SERVICE, {
    variables: {
      size: 5,
    },
  });

  const list = data?.getSelfService || [];

  AutocompletePaper.defaultProps = { refetch, filter, open, setOpen, setFilter };

  return (
    <>
      <Autocomplete
        id="blazon-workspace-header-search"
        className={classes.searchInput}
        open={open}
        onOpen={() => {  
          const variables = {
            size: 5,
            q: filter || "",
            type: undefined
          };          
          refetch(variables);                  
          setOpen(true);
        }}                     
        freeSolo={true}    
        filterOptions={x => x}  
        PaperComponent={AutocompletePaper}
        getOptionSelected={(option: any, value: any) =>
          option.identifier === value.identifier
        }
        getOptionLabel={(option: any) => option.name}
        options={list}
        loading={loading}
        onChange={(event: any, value: any) => {
          if(value?.type) {
            setOpen(false);
            router.push(
              `/search/selfService/${value.type
                .replaceAll("_", "")
                .toLocaleLowerCase()}/${
                value.identifier
              }`
            );
          }          
        }}
        renderOption={(option: any) => (
          <>
            <BoxAutocomplete>
              {option?.type === "RESOURCE" && (
                <PuzzlePieceIcon width={17} height={17} />
              )}
              {option?.type === "ROLE" && (
                <NewspaperClippingIcon width={17} height={17} />
              )}
              {option?.type === "ENTITLEMENT" && (
                <ArticleIcon width={17} height={17} />
              )}
              {option?.type === "ADMIN_PASSWORD" && (
                <UserGearIcon width={17} height={17} />
              )}
              <BoxAutocompleteContent>
                <BoxAutocompleteContentInfo>
                  <BoxAutocompleteTitle>
                    {option?.type === "ENTITLEMENT" && (
                      <BoxAutocompleteTitleParent>{getSelfServiceAttributeValue("resourceName", option.attributes) || " - "} / </BoxAutocompleteTitleParent>
                    )}
                    {option?.type === "ADMIN_PASSWORD" && (
                      <BoxAutocompleteTitleParent>{getSelfServiceAttributeValue("resourceName", option.attributes) || " - "} / </BoxAutocompleteTitleParent>
                    )}
                    {option.name}
                  </BoxAutocompleteTitle>
                  <BoxAutocompleteText>
                    {option.description || " - "}
                  </BoxAutocompleteText>
                </BoxAutocompleteContentInfo>                
                <CaretRightIcon width={21} />
              </BoxAutocompleteContent>
            </BoxAutocomplete>
          </>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label=""
            value={filter}
            variant="outlined"
            onKeyDown={(event: any) => {
              if(event.key === 'Enter') {
                setOpen(false);
                router.push(`/search?q=${filter}`);
              }              
            }}
            onChange={(event: any) => {
              const value = event?.target?.value;
              const variables = {
                size: 5,
                q: "",
              };

              if (value) {
                variables.q = value;
              }

              setFilter(value);

              refetch(variables);
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon width={25} height={25} color="#60636A" />
                </InputAdornment>
              ),
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </>
  );
};

export default injectIntl(HeaderAutocomplete);
