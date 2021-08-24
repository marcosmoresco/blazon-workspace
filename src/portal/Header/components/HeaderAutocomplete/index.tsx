import React, { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { injectIntl } from "react-intl";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SELF_SERVICE } from "@portal/Search/queries";
import { SelfService } from "@portal/Search/types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@icons/Search";
import SharedAccountIcon from "@icons/SharedAccount";
import ApplicationAccountIcon from "@icons/ApplicationAccount";
import RegularAccountIcon from "@icons/RegularAccount";
import AdministrativeAccountIcon from "@icons/AdministrativeAccount";
import TemporaryAccountIcon from "@icons/Watch";
import CheckCircleIcon from "@icons/CheckCircle";
import SecurityUserIcon from "@icons/SecurityUser";
import PeopleIcon from "@icons/People";
import ShoppingCart from "@icons/ShoppingCart";
import Loading from "@components/Loading";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useCart } from "@requestCart/index";
import { getSelfServiceAttributeValue } from "@utils/index";
import type { HeaderAutocompleteProps } from "./types";
import { addCartItemMessage } from "@actions/index";
import {
  ADD_SELF_SERVICE_CART_ITEM,
} from "@requestCart/mutations";
import {
  GET_SELF_SERVICE_CART
} from "@requestCart/queries";
import {
  AutocompletePaper,
  BoxAutocomplete,
  BoxAutocompleteContent,
  BoxAutocompleteContentInfo,
  BoxAutocompleteContentCart,
  BoxAutocompleteTitle,
  BoxAutocompleteTitleParent,
  BoxAutocompleteText,
} from "./styles";

const HeaderAutocomplete: FC<HeaderAutocompleteProps> = ({ classes, intl, theme }) => {
  const { cart } = useCart();
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);  
  const [filter, setFilter] = React.useState("");
  const [addedItems, setAddedItems] = useState<string[]>([]); 
  const [loadingItems, setLoadingItems] = useState<string[]>([]); 

  useEffect(() => {   
    if(cart && (cart.items || []).length) {
      const cartItems: string[] = [];
      cart.items.map((item) => cartItems.push(item.catalogItemId));
      if(JSON.stringify(cartItems) !== JSON.stringify(addedItems)) {
        setAddedItems(cartItems);
      }     
    } else if((addedItems || []).length) {
      setAddedItems([]);
    }
  }, [    
    cart,
    addedItems,
    setAddedItems  
  ]);

  const [
    addSelfServiceCartItem, {loading: loadingAddSelfServiceCartItem},
  ] = useMutation(ADD_SELF_SERVICE_CART_ITEM, {
    refetchQueries: [
      {
        query: GET_SELF_SERVICE_CART,
      },
    ],
    onCompleted: (data: any) => {  
      setLoadingItems(loadingItems.filter((i) => i !== data?.addSelfServiceCartItem.catalogItemId)); 
      setAddedItems([...addedItems, data?.addSelfServiceCartItem.catalogItemId]);
      dispatch(addCartItemMessage({...data?.addSelfServiceCartItem, messageType: "add"}));      
    }
  });  

  const { loading, error, data, refetch } = useQuery<{
    getSelfService: SelfService[];
  }>(GET_SELF_SERVICE, {
    variables: {
      size: 5,
    },
  });
  
  const goToSearch = () => {
    setOpen(false);
    router.push(`/search?q=${filter}`);
  };

  const list = data?.getSelfService || [];

  AutocompletePaper.defaultProps = { refetch, filter, open, setOpen, setFilter, goToSearch, list };

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
            <BoxAutocomplete color={theme.palette.primary.main}>
              {option?.type === "RESOURCE" && getSelfServiceAttributeValue("resourceType", option.attributes) === "SHARED_RESOURCE" && (
                <SharedAccountIcon width={17} height={17} color="black"/>
              )}
              {option?.type === "RESOURCE" && getSelfServiceAttributeValue("resourceType", option.attributes) === "REGULAR_RESOURCE" && (
                <RegularAccountIcon width={17} height={17} color="black"/>
              )}
              {option?.type === "RESOURCE" && getSelfServiceAttributeValue("resourceType", option.attributes) === "APPLICATION_RESOURCE" && (
                <ApplicationAccountIcon width={17} height={17} color="black"/>
              )}
              {option?.type === "RESOURCE" && getSelfServiceAttributeValue("resourceType", option.attributes) === "ADMIN_RESOURCE" && (
                <AdministrativeAccountIcon width={17} height={17} color="black"/>
              )}
              {option?.type === "RESOURCE" && getSelfServiceAttributeValue("resourceType", option.attributes) === "TEMPORARY_RESOURCE" && (
                <TemporaryAccountIcon width={17} height={17} color="black"/>
              )}
              {option?.type === "ROLE" && (
                <PeopleIcon width={17} height={17} color="black"/>
              )}
              {option?.type === "ENTITLEMENT" && (
                <CheckCircleIcon width={17} height={17} color="black"/>
              )}
              {option?.type === "ADMIN_PASSWORD" && (
                <SecurityUserIcon width={17} height={17} color="black"/>
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
                {addedItems.indexOf(option.identifier as string) === -1 && (
                  <>
                    {loadingItems.includes(option.identifier as string) && (
                      <BoxAutocompleteContentCart className="Disabled-action">
                        <Loading type="blue"/>
                      </BoxAutocompleteContentCart>
                    )} 
                    {!loadingItems.includes(option.identifier as string) && (
                      <BoxAutocompleteContentCart                         
                        className="Autocomplete-cart" 
                        onClick={(event) => {
                          event.stopPropagation();
                          event.nativeEvent.stopImmediatePropagation();                         
                          setLoadingItems([...loadingItems, option.identifier as string]);
                          addSelfServiceCartItem({
                            variables: {
                              id: option.identifier                                  
                            },                      
                          });
                        }}>
                        <ShoppingCart width={21} />
                      </BoxAutocompleteContentCart>
                    )}                
                  </>                   
                )}
                {addedItems.indexOf(option.identifier as string) > -1 && (
                  <BoxAutocompleteContentCart 
                    className="Autocomplete-cart"
                    onClick={(event) => {
                      event.stopPropagation();
                      event.nativeEvent.stopImmediatePropagation();                      
                    }}>
                    <CheckCircleIcon width={21} />
                  </BoxAutocompleteContentCart>
                )}                                              
              </BoxAutocompleteContent>
            </BoxAutocomplete>
          </>
        )}
        renderInput={(params: any) => (
          <TextField
            key="blazon-workspace-input-search"
            {...params}
            label=""
            value={filter || ""}
            variant="outlined"            
            placeholder={intl.formatMessage({id: "search.found.message"})}
            onKeyDown={(event: any) => {
              if(event.key === 'Enter') {
                goToSearch();
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
                  <SearchIcon width={25} height={25} color={theme.palette.header.contrastText} />
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
