import React, { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { withStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/client";
import { FormattedMessage, injectIntl } from "react-intl";
import apolloClient from "@utils/apollo-client";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Button from "@components/Button";
import EmptyState from "@components/EmptyState";
import Section from "@components/Section";
import Tooltip from "@components/Tooltip";
import Loading from "@components/Loading";
import TableIcon from "@icons/Table";
import PuzzlePieceIcon from "@icons/PuzzlePiece";
import ArticleIcon from "@icons/Article";
import UserGearIcon from "@icons/UserGear";
import NewspaperClippingIcon from "@icons/NewspaperClipping";
import SharedAccountIcon from "@icons/SharedAccount";
import ApplicationAccountIcon from "@icons/ApplicationAccount";
import RegularAccountIcon from "@icons/RegularAccount";
import AdministrativeAccountIcon from "@icons/AdministrativeAccount";
import TemporaryAccountIcon from "@icons/Watch";
import MagnifyingGlassPlusIcon from "@icons/MagnifyingGlassPlus";
import SecurityUserIcon from "@icons/SecurityUser";
import PeopleIcon from "@icons/People";
import ShoppingCartIcon from "@icons/ShoppingCart";
import SearchIcon from "@icons/Search";
import SquaresFourIcon from "@icons/SquaresFour";
import ListBulletsIcon from "@icons/ListBullets";
import EmptyStateSearchIcon from "@icons/EmptyStateSearch";
import CheckCircleIcon from "@icons/CheckCircle";
import Filters from "./components/Filters";
import { useCart } from "@requestCart/index";
import { addCartItemMessage } from "@actions/index";
import {
  ADD_SELF_SERVICE_CART_ITEM,
} from "@requestCart/mutations";
import {
  GET_SELF_SERVICE_CART
} from "@requestCart/queries";
import { paginate, getSelfServiceAttributeValue } from "@utils/index";
import type { SearchProps, SelfService } from "./types";
import {
  useStyles,
  DividerSearch,
  OptionListFiltersContent,
  OptionListContent,
  OptionList,
  InputSearchBox,
  OutlinedInputSearch,
  TotalFiltersBox,
  ListItemBox,
  ListItemContent,
  ListItemIconContent,
  ListItemText,
  LoadMoreContent,
  ItemTitleParent,
} from "./styles";
import { GET_SELF_SERVICE, GET_SELF_SERVICE_ADVANCED } from "./queries";
import WatchIcon from "@icons/Watch";
import { stubFalse } from "lodash";
import { disapprove } from "@modules/Task/constants";

const Search: FC<SearchProps> = ({ intl, classes }) => {
  const { cart } = useCart();
  const router = useRouter();
  const dispatch = useDispatch();
  const [active, setActive] = useState("ALL");
  const [filter, setFilter] = useState(router.query.q || "");
  const [filtered, setFiltered] = useState("[]");
  const [type, setType] = useState("LIST");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(10);
  const [loadingAdvanced, setLoadingAdvanced] = useState<boolean>(false);
  const [filteredTotal, setTotalFiltered] = useState(0);
  const [listAdvanced, setListAdvanced] = useState(null);
  const [addedItems, setAddedItems] = useState<string[]>([]); 

  useEffect(() => {
    if(cart && (cart.items || []).length) {
      const cartItems: string[] = [];
      cart.items.map((item) => cartItems.push(item.catalogItemId));
      if(JSON.stringify(cartItems) !== JSON.stringify(addedItems)) {
        setAddedItems(cartItems);
      }     
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
    onCompleted: (data) => {   
      setAddedItems([...addedItems, data?.addSelfServiceCartItem.catalogItemId]);
      dispatch(addCartItemMessage({...data?.addSelfServiceCartItem, messageType: "add"}));      
    }
  });  

  const { loading, error, data, refetch } = useQuery<{
    getSelfService: SelfService[];
  }>(GET_SELF_SERVICE, {
    variables: {
      q: router.query.q || "",
    },
  });

  const list = data?.getSelfService || [];

  if(loading) {
    return (
      <Loading container/>
    )
  }

  const save = (filteredMapReference: any, total: number) => {    
    setTotalFiltered(total);    
    const _filters: any[] = [];
    Object.keys(filteredMapReference).forEach((f: any) => {
      _filters.push(filteredMapReference[f]);
    });

    setLoadingAdvanced(true);
    apolloClient
      .query({
        query: GET_SELF_SERVICE_ADVANCED,
        variables: {
          q: filter,
          type: active,
          filters: JSON.stringify(_filters),
        },
        fetchPolicy: "network-only"
      })
      .then(({ data }) => {
        setFiltered(JSON.stringify(_filters));
        setListAdvanced(data?.getSelfServiceAdvanced);
        setLoadingAdvanced(false);
      });
  };

  const iconByType: { [key: string]: any } = {
    RESOURCESHARED_RESOURCE: <SharedAccountIcon width={24} height={24} color="#3174F6" />,
    RESOURCEAPPLICATION_RESOURCE: <ApplicationAccountIcon width={24} height={24} color="#3174F6" />,
    RESOURCEREGULAR_RESOURCE: <RegularAccountIcon width={24} height={24} color="#3174F6" />,
    RESOURCETEMPORARY_RESOURCE: <WatchIcon width={24} height={24} color="#3174F6" />,
    RESOURCEADMIN_RESOURCE: <AdministrativeAccountIcon width={24} height={24} color="#3174F6" />,
    ENTITLEMENT: <CheckCircleIcon width={24} height={24} color="#3174F6" />,
    ROLE: <PeopleIcon width={24} height={24} color="#3174F6" />,
    ADMIN_PASSWORD: <SecurityUserIcon width={24} height={24} color="#3174F6" />,
  };

  const sections = [
    {
      icon: <MagnifyingGlassPlusIcon />,
      name: "all",
      value: "ALL",
    },
    {
      icon: <SquaresFourIcon />,
      name: "resources",
      value: "RESOURCE",
    },
    {
      icon: <CheckCircleIcon />,
      name: "entitlements",
      value: "ENTITLEMENT",
    },
    {
      icon: <SecurityUserIcon />,
      name: "adminAccounts",
      value: "ADMIN_PASSWORD",
    },
    {
      icon: <PeopleIcon />,
      name: "roles",
      value: "ROLE",
    },
  ];

  return (
    <div className="Default-content">
      <div className={classes.root}>
        <InputSearchBox>
          <OutlinedInputSearch
            value={filter}
            placeholder={intl.formatMessage({id: "search.found.message"})}
            onChange={(e: any) => {
              setFilter(e?.target?.value);
              setPage(0);
              setTotal(10);
              apolloClient
                .query({
                  query: GET_SELF_SERVICE_ADVANCED,
                  variables: {
                    q: e?.target?.value || "",
                    type: active,
                    filters: filtered,
                  },
                })
                .then(({ data }) => {
                  setListAdvanced(data?.getSelfServiceAdvanced);
                });
            }}            
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            labelWidth={0}
          />
        </InputSearchBox>
        <Section
          list={sections}
          defaultValue="ALL"
          onSelect={(section) => {
            setActive(section.value);
            setPage(0);
            setTotal(10);
            setLoadingAdvanced(true);
            apolloClient
              .query({
                query: GET_SELF_SERVICE_ADVANCED,
                variables: {
                  q: filter,
                  type: section.value,
                  filters: filtered,
                },
              })
              .then(({ data }) => {
                setListAdvanced(data?.getSelfServiceAdvanced);
                setLoadingAdvanced(false);
              });
          }}
        />
        <DividerSearch />          
          <>
            <TotalFiltersBox>
            <div className={classes.totalItens}>
              {(listAdvanced || list)?.length || 0} Itens found
            </div>
            <OptionListFiltersContent>
              <OptionListContent>
                <OptionList
                  onClick={() => setType("GRID")}
                  className={`${(type === "GRID" && "Active") || ""}`}
                >
                  <SquaresFourIcon width={21} />
                </OptionList>
                <OptionList
                  onClick={() => setType("LIST")}
                  className={`${(type === "LIST" && "Active") || ""}`}
                >
                  <ListBulletsIcon width={21} />
                </OptionList>
              </OptionListContent>
              <Badge
                badgeContent={filteredTotal}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Filters onSave={save} activeType={active} />
              </Badge>
            </OptionListFiltersContent>
            </TotalFiltersBox>
            {type === "GRID" && (
              <>
                {loadingAdvanced && (
                  <Loading container/>
                )}
                <div>
                  <Grid container spacing={3}>
                    {paginate(listAdvanced || list, total, 0).map((item, index) => (
                      <Grid item xs={3} key={`search-card-item-${index}`}>
                        <div
                          className={classes.searchCard}
                          onClick={() =>
                            router.push(
                              `/search/selfService/${item.type
                                .replaceAll("_", "")
                                .toLocaleLowerCase()}/${item.identifier}`
                            )
                          }
                        >
                          <div className={classes.searchCardContent}>
                            <div className={classes.searchCardContentHeader}>
                              <div className={classes.searchCardContentHeaderImage}>
                                {iconByType[`${item.type}${(item.type === "RESOURCE" && getSelfServiceAttributeValue("resourceType", item.attributes)) || ""}`]}
                              </div>
                            </div>
                            <Tooltip title={item.name || " - "} placement="bottom">
                              <div className={classes.searchCardContentHeaderTitle}>
                                {item?.type === "ENTITLEMENT" && (
                                  <ItemTitleParent>
                                    {getSelfServiceAttributeValue(
                                      "resourceName",
                                      item.attributes
                                    ) || " - "}{" "}
                                    /{" "}
                                  </ItemTitleParent>
                                )}
                                {item?.type === "ADMIN_PASSWORD" && (
                                  <ItemTitleParent>
                                    {getSelfServiceAttributeValue(
                                      "resourceName",
                                      item.attributes
                                    ) || " - "}{" "}
                                    /{" "}
                                  </ItemTitleParent>
                                )}
                                {item.name}
                              </div>
                            </Tooltip>
                            <Divider />
                            <div className={classes.searchCartContent}>
                              {addedItems.indexOf(item.identifier) === -1 && (
                                <>
                                  {loadingAddSelfServiceCartItem && (
                                    <div className="Disabled-action">
                                      <Loading type="blue"/>
                                    </div>
                                  )}
                                  {!loadingAddSelfServiceCartItem && (
                                    <div
                                      onClick={(e) => {
                                      e.stopPropagation();
                                      e.nativeEvent.stopImmediatePropagation();                                                     
                                      addSelfServiceCartItem({
                                        variables: {
                                          id: item.identifier                                  
                                        },
                                      });
                                    }}
                                    >
                                      <div className="Icon-content">
                                        <ShoppingCartIcon width={25} height={25} />
                                      </div>
                                      {intl.formatMessage({id: "cart.add"})}
                                    </div>
                                    )}
                                </>                              
                              )}   
                              {addedItems.indexOf(item.identifier) > -1 && (
                                <div>
                                  <div className="Icon-content">
                                    <CheckCircleIcon width={25} height={25} color="#26213F"/>
                                  </div>
                                  {intl.formatMessage({id: "search.selfService.added"})}
                                </div>
                              )}                        
                            </div>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </>                
            )}
            {type === "LIST" && (
              <>
                {loadingAdvanced && (
                  <Loading container/>
                )} 
                {!loadingAdvanced && paginate(listAdvanced || list, total, 0).map((item, index) => (
                  <ListItemBox
                    onClick={() =>
                      router.push(
                        `/search/selfService/${item.type
                          .replaceAll("_", "")
                          .toLocaleLowerCase()}/${item.identifier}`
                      )
                    }
                    key={`search-list-item-${index}`}
                  >
                    <ListItemContent>
                      <ListItemIconContent>
                        {iconByType[`${item.type}${(item.type === "RESOURCE" && getSelfServiceAttributeValue("resourceType", item.attributes)) || ""}`]}
                      </ListItemIconContent>
                      <Tooltip title={item.name || " - "} placement="bottom">
                        <ListItemText>
                          {item?.type === "ENTITLEMENT" && (
                            <ItemTitleParent>
                              {getSelfServiceAttributeValue(
                                "resourceName",
                                item.attributes
                              ) || " - "}{" "}
                              /{" "}
                            </ItemTitleParent>
                          )}
                          {item?.type === "ADMIN_PASSWORD" && (
                            <ItemTitleParent>
                              {getSelfServiceAttributeValue(
                                "resourceName",
                                item.attributes
                              ) || " - "}{" "}
                              /{" "}
                            </ItemTitleParent>
                          )}
                          {item.name}
                        </ListItemText>
                      </Tooltip>
                    </ListItemContent>
                    {addedItems.indexOf(item.identifier) === -1 && (
                      <>
                        {loadingAddSelfServiceCartItem && (
                          <ListItemIconContent className="Disabled-action">
                            <Loading type="blue"/>
                          </ListItemIconContent>
                        )} 
                        {!loadingAddSelfServiceCartItem && (
                          <ListItemIconContent
                            className="Selectable"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              addSelfServiceCartItem({
                                variables: { id: item.identifier },
                              });
                            }}
                          >
                            <ShoppingCartIcon width={21} />
                          </ListItemIconContent>
                        )}
                      </>
                    )}
                    {addedItems.indexOf(item.identifier) > -1 && (
                    <ListItemIconContent>
                      <CheckCircleIcon width={21} color="#26213F"/>
                    </ListItemIconContent>)}
                  </ListItemBox>
                ))}
              </>
            )}
            {!loadingAdvanced && paginate(listAdvanced || list, 10, page + 1).length > 0 && (
              <LoadMoreContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setPage(page + 1);
                    setTotal(total + 10);
                  }}
                >
                  <FormattedMessage id="loadMore" />
                </Button>
              </LoadMoreContent>
            )}
            {!loadingAdvanced && !paginate(listAdvanced || list, total, 0).length && (
              <EmptyState
                icon={<EmptyStateSearchIcon />}
                title="no.result"
                text="search.no.result"
              />
            )}
          </>                             
      </div>
    </div>
  );
};

export default withStyles(useStyles)(injectIntl(Search));
