// vendors
import React, { useState, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { getLink } from "@utils/index";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";

// components
import ArticleIcon from "@icons/Article";
import Button from "@components/Button";
import Select from "@components/Select";
import UserThumb from "@components/UserThumb";
import UserCard from "./UserCard";
import MagnifyingGlassIcon from "@icons/MagnifyingGlass";
import XCircleIcon from "@icons/XCircle";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { confirm } from "@components/Dialog/actions";
import { iconByType, translateByType } from "@utils/index";

// styles
import {
  Grid,
  CheckoutStyle,
  Item,
  ItemStyle,
  Line,
  TitleItem,
  Ticket,
  AcessRequest,
  AddAUser,
  BottomArea,
  BoxUserThumb,
  AutocompleteUsers,
  AutocompletePaper,
  BoxAutocompleteOption,
} from "./styles";

//types
import { CheckouitemProps } from "./types";
import { SelfServiceCartItemInstance } from "@requestCart/types";
import { User } from "@types";

//queries
import { GET_USER_FULL_TEXT } from "@modules/User/queries";
import { GET_SELF_SERVICE_CART } from "@requestCart/queries";

//mutations
import {
  UPDATE_SELF_SERVICE_CART_ITEM,
  ADD_SELF_SERVICE_CART_ITEM_INSTANCE,
  DELETE_SELF_SERVICE_CART_ITEM_INSTANCE,
} from "@modules/Checkout/mutations";
import { 
  ADD_SELF_SERVICE_CART_ITEM,
  DELETE_SELF_SERVICE_CART_ITEM,
} from "@requestCart/mutations";

const CheckoutItem: React.FC<CheckouitemProps> = ({ item, allowedAssignTypes = [] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const intl = useIntl();
  const typeMap: {[key: string]: any} = {
    "TO_ME": "Only me",
    "TO_ME_AND_TO": "Me and someone else",
    "TO": "Another person"
  };  
  const types = allowedAssignTypes.map((a) => ({ name: typeMap[a], value: a }));
  
  const [sel, setSel] = useState(item.assignType);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(item.assignType !== sel) {
      setSel(item.assignType);
    }
  }, [item, sel, setSel]);

  const { loading, error, data, refetch } = useQuery<{
    getUserFullText: User[];
  }>(GET_USER_FULL_TEXT, {
    variables: {
      q: "",
      size: 10,
    },
  });

  const users = data?.getUserFullText || [];

  const [addSelfServiceCartItemInstance, {}] = useMutation(ADD_SELF_SERVICE_CART_ITEM_INSTANCE, { 
    refetchQueries: [
      {
        query: GET_SELF_SERVICE_CART,
      },
    ],  
    onCompleted: ({addSelfServiceCartItemInstance}) => {   
      if(addSelfServiceCartItemInstance) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "checkout.item.instance.add.success"})
          )
        );         
      }        
    },
  });
  
  const [deleteSelfServiceCartItemInstance, {loading: loadingDeleteItemInstance}] = useMutation(DELETE_SELF_SERVICE_CART_ITEM_INSTANCE, {   
    refetchQueries: [
      {
        query: GET_SELF_SERVICE_CART,
      },
    ],
    onCompleted: ({deleteSelfServiceCartItemInstance}) => {   
      if(deleteSelfServiceCartItemInstance) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "checkout.item.instance.delete.success"})
          )
        );       
      }
    },
  });

  const [updateSelfServiceCartItem, {}] = useMutation(UPDATE_SELF_SERVICE_CART_ITEM, {   
    refetchQueries: [
      {
        query: GET_SELF_SERVICE_CART,
      },
    ],
    onCompleted: ({updateSelfServiceCartItem}) => {   
      if(updateSelfServiceCartItem) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "checkout.item.update.success"})
          )
        );       
      }
    },
  });

  const [deleteSelfServiceCartItem, {loading: loadingDeleteItem}] = useMutation(
    DELETE_SELF_SERVICE_CART_ITEM,
    {
      refetchQueries: [
        {
          query: GET_SELF_SERVICE_CART,
        },
      ],
      onCompleted: (deleteSelfServiceCartItem) => {
        if(deleteSelfServiceCartItem) {
          dispatch(
            addMessage(           
              intl.formatMessage({id: "checkout.item.delete.success"})
            )
          );
        }       
      },
    }
  );

  const [addSelfServiceCartItem, {}] = useMutation(
    ADD_SELF_SERVICE_CART_ITEM,
    {
      refetchQueries: [
        {
          query: GET_SELF_SERVICE_CART,
        },
      ],
      onCompleted: (addSelfServiceCartItem) => {
        if(addSelfServiceCartItem) {
          dispatch(
            addMessage(           
              intl.formatMessage({id: "checkout.item.added.success"})
            )
          );
        }       
      },
    }
  );

  return (
    <Grid>
      <CheckoutStyle>
        <Item>
          <ItemStyle>
            <div>              
              <span>{item?.name || " - "}</span>
            </div>
            <TitleItem>{item?.description || " - "}</TitleItem>
          </ItemStyle>
          <Ticket>
            {iconByType("#7D7A8C", 32)[(item.catalogItemType === "RESOURCE" && `RESOURCE${item.resourceType}`) || item.catalogItemType]}
            <span>
              {translateByType[item.catalogItemType]}
            </span>
          </Ticket>
        </Item>

        <Line />

        <AcessRequest>
          <span>
            <FormattedMessage id="checkout.AccessRequest" />
          </span>
          <Select
            onChange={(e: any) => {
              updateSelfServiceCartItem({
                variables: {
                  identifier: item.identifier,
                  assignType: e?.target.value
                }
              })
            }}
            options={types}
            view="name"
            bind="value"
            value={item.assignType}
          />
          {sel === "TO_ME" ? (
            <></>
          ) : (
            <>
              <AddAUser>
                <span>
                  <FormattedMessage id="checkout.AddAUser" />
                </span>
                <AutocompleteUsers               
                  loading={loading}
                  open={open}
                  onOpen={() => {
                    setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}                  
                  PaperComponent={AutocompletePaper}
                  getOptionSelected={(option: any, value: any) =>
                    option.identifier === value.identifier
                  }
                  getOptionLabel={(option: any) => option.displayName}
                  options={users}
                  renderOption={(option: any) => (
                    <BoxAutocompleteOption onClick={() => {
                      if(!option?.identifier) {
                        return;
                      }
                      const search = item.instances.filter((u) => u.userId.toString() === option.identifier.toString());            
                      if (!!search && search.length > 0) {
                        dispatch(addMessage(intl.formatMessage({
                          id: "checkout.item.instance.already.added"
                        }, {
                          user: option.displayName,
                          object: item.name
                        }), "warning"));
                        return;                     
                      } 
  
                      addSelfServiceCartItemInstance({
                        variables: {
                          itemId: item.identifier,
                          userId: Number(option.identifier)
                        }
                      });
                    }}>
                      <BoxUserThumb>
                        <UserThumb
                          image={getLink("thumb", option?.links || [])}
                        />
                        <div>{option?.displayName || " - "}</div>
                      </BoxUserThumb>
                    </BoxAutocompleteOption>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      variant="outlined"
                      onChange={(event: any) => {
                        const value = event?.target?.value;
                        const variables = {
                          size: 10,
                          q: "",
                        };

                        if (value) {
                          variables.q = value;
                        }

                        refetch(variables);
                      }}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <MagnifyingGlassIcon />
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
              </AddAUser>
            </>
          )}
        </AcessRequest>

        {item?.instances.map(
          (instance: SelfServiceCartItemInstance, index: number) => (
            <UserCard
              key={`checkout-item-instance-${item.identifier}`}
              instance={instance}
              index={index + 1}
              item={item}
              loadingDeleteItemInstance={loadingDeleteItemInstance}
              onAddItem={(identifier: string, userId: number, isLoggedUser: boolean) => {                
                addSelfServiceCartItem({
                  variables: {
                    id: identifier,
                    userId,
                    assignType: isLoggedUser ? "TO_ME" : "TO"
                  }
                });
              }}
              onDeleteItem={() => {                           
                deleteSelfServiceCartItem({
                  variables: {
                    identifier: item.identifier,
                    name: item.name,
                    targetType: item.targetType,
                  }
                });
              }}
              onUpdateItem={(identifier: number, assignType: string) => {
                updateSelfServiceCartItem({
                  variables: {
                    identifier,
                    assignType
                  }
                })
              }}
              onAdd={(identifier: number, userId: string) => {               
                addSelfServiceCartItemInstance({
                  variables: {
                    itemId: identifier,
                    userId: Number(userId)
                  }
                });
              }}
              onDelete={async (addConfirm: boolean) => {
                const result = await addConfirm || confirm(intl.formatMessage({
                  id: "checkout.item.instance.delete"
                }), intl.formatMessage({
                  id: "checkout.item.instance.delete.message"
                }), 
                <XCircleIcon width={48} height={48} color="#FF134A" />);
                if(result) {
                  deleteSelfServiceCartItemInstance({
                    variables: {
                      itemId: item.identifier,
                      userId: Number(instance.userId)
                    }
                  });
                }
              }}
            />
          )
        )}

        <Line />

        <BottomArea>
          <Button
            variant="contained"
            color="default-primary"
            isLoading={loadingDeleteItem ? 1 : 0}
            onClick={async () => {
              const result = await confirm(intl.formatMessage({
                id: "checkout.item.delete"
              }), intl.formatMessage({
                id: "checkout.item.delete.message"
              }), 
              <XCircleIcon width={48} height={48} color="#FF134A" />);
              if(result) {
                deleteSelfServiceCartItem({
                  variables: {
                    identifier: item.identifier,
                    name: item.name,
                    targetType: item.targetType,
                  },
                });             
              }
            }}
          >
            <FormattedMessage id="checkout.DeleteItem" />
          </Button>
        </BottomArea>
      </CheckoutStyle>
    </Grid>
  );
};

export default CheckoutItem;
