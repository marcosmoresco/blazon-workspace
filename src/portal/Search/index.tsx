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
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@components/Button";
import EmptyState from "@components/EmptyState";
import Section from "@components/Section";
import Tooltip from "@components/Tooltip";
import Loading from "@components/Loading";
import Ordenation from "@components/Ordenation";
import SharedAccountIcon from "@icons/SharedAccount";
import ApplicationAccountIcon from "@icons/ApplicationAccount";
import RegularAccountIcon from "@icons/RegularAccount";
import AdministrativeAccountIcon from "@icons/AdministrativeAccount";
import MagnifyingGlassPlusIcon from "@icons/MagnifyingGlassPlus";
import SecurityUserIcon from "@icons/SecurityUser";
import PeopleIcon from "@icons/People";
import ShoppingCartIcon from "@icons/ShoppingCart";
import SearchIcon from "@icons/Search";
import SquaresFourIcon from "@icons/SquaresFour";
import ListBulletsIcon from "@icons/ListBullets";
import CheckCircleIcon from "@icons/CheckCircle";
import UserIcon from "@icons/UserAdd";
import EmptyStateTypeahead from "@images/EmptyStateTypeahead.svg";
import Filters from "./components/Filters";
import { useCart } from "@requestCart/index";
import { addCartItemMessage } from "@actions/index";
import {
  ADD_SELF_SERVICE_CART_ITEM,
} from "@requestCart/mutations";
import {
  GET_SELF_SERVICE_CART,
} from "@requestCart/queries";
import { GET_SELF_SERVICE_FILTERS } from "@portal/Search/queries";
import { debounce, getSelfServiceAttributeValue, getLink, deepCopyFunction } from "@utils/index";
import type { SearchProps, SelfServiceRepresentation, SelfService } from "./types";
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
  CenterAlign,
  StyledMenu,
  MenuItemContainer,
  MenuItemText,
  MenuItemTextValue,
  MenuItemTextValueType,
  OrdenationContent,
} from "./styles";
import { GET_SELF_SERVICE, GET_SELF_SERVICE_ADVANCED } from "./queries";
import type { FilterType } from "@components/Filter/types";
import { useTheme, themes } from "@theme/index";
import WatchIcon from "@icons/Watch";
import { Link } from "@types";

const Search: FC<SearchProps> = ({ intl, classes }) => {
  const { cart } = useCart();
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };
  const [active, setActive] = useState("ALL");
  const [filter, setFilter] = useState(router.query.q || "");
  const [filtered, setFiltered] = useState("[]");
  const [filteredValue, setFilteredValue] = useState<{[key: string]: any}>({});
  const [filterMapReference, setFilterMapReference] = useState<{[key: string]: any}>({});
  const [type, setType] = useState("LIST");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(20);
  const [loadingAdvancedChanged, setLoadingAdvancedChanged] = useState<boolean>(false);
  const [loadingAdvanced, setLoadingAdvanced] = useState<boolean>(false);
  const [filteredTotal, setTotalFiltered] = useState(0);
  const [listAdvanced, setListAdvanced] = useState(null);
  const [addedItems, setAddedItems] = useState<string[]>([]); 
  const [loadingItems, setLoadingItems] = useState<string[]>([]);
  const [items, setItems] = useState<SelfService[]>([])
  const [links, setLinks] = useState<Link[]>([])
  const [orderBy, setOrderBy] = useState<string>("");
  const [openText, setOpenText] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState("name");
  const [filterList, setFilterList] = useState();
  const [openFilters, setOpenFilters] = useState(false);

  const ordenationList: FilterType[] = [{
    orderable: true,
    name: "name",
    label: <FormattedMessage id="name" />,
    type: "string"      
  }, {
    orderable: true,
    name: "score",
    label: <FormattedMessage id="score" />,
    type: "number"       
  }]

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
      setLoadingItems(loadingItems.filter((i) => i !== data?.addSelfServiceCartItem.catalogItemId));
      setAddedItems([...addedItems, data?.addSelfServiceCartItem.catalogItemId]);
      dispatch(addCartItemMessage({...data?.addSelfServiceCartItem, messageType: "add"}));      
    }
  });  

  const { loading, error, data, refetch } = useQuery<{
    getSelfServiceAdvanced: SelfServiceRepresentation;
  }>(GET_SELF_SERVICE_ADVANCED, {
    variables: {
      q: router.query.q || "",
      size: 20,    
      page: 0, 
      filters: filtered,
      fullTextAttrib: currentText,
      ord: orderBy,
      type: active
    },
    fetchPolicy: "network-only"
  });

  const list = data?.getSelfServiceAdvanced?.representation || [];

  if(list.length && !items.length && !loading) {
    setItems(list);
    setLinks(data?.getSelfServiceAdvanced?.links || []);
  } else if(loading && items.length) {
    setItems([]);
  }

  if(loading) {
    return (
      <CenterAlign>
        <Loading container/>
      </CenterAlign>      
    )
  }

  const save = async (filteredMapReference: any, total: number, noChangeOpen?: boolean) => {    
    setTotalFiltered(total);    
    const _filters: any[] = [];
    Object.keys(filteredMapReference).forEach((f: any) => {
      _filters.push(filteredMapReference[f]);
    });
    setFiltered(JSON.stringify(_filters));    
    setPage(0);
    setItems([]);   
    if(!noChangeOpen) {
      setOpenFilters(false);
    } 
  };

  const iconByType: { [key: string]: any } = {
    RESOURCESHARED_RESOURCE: <SharedAccountIcon width={24} height={24} color={currentTheme.palette.primary.main} />,
    RESOURCEAPPLICATION_RESOURCE: <ApplicationAccountIcon width={24} height={24} color={currentTheme.palette.primary.main} />,
    RESOURCEREGULAR_RESOURCE: <RegularAccountIcon width={24} height={24} color={currentTheme.palette.primary.main} />,
    RESOURCETEMPORARY_RESOURCE: <WatchIcon width={24} height={24} color={currentTheme.palette.primary.main} />,
    RESOURCEADMIN_RESOURCE: <AdministrativeAccountIcon width={24} height={24} color={currentTheme.palette.primary.main} />,
    ENTITLEMENT: <CheckCircleIcon width={24} height={24} color={currentTheme.palette.primary.main} />,
    ROLE: <PeopleIcon width={24} height={24} color={currentTheme.palette.primary.main} />,
    ADMIN_PASSWORD: <SecurityUserIcon width={24} height={24} color={currentTheme.palette.primary.main} />,
    USER: <UserIcon width={24} height={24} color={currentTheme.palette.primary.main} />,
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
      icon: <PeopleIcon />,
      name: "roles",
      value: "ROLE",
    },
    {
      icon: <SecurityUserIcon />,
      name: "adminAccounts",
      value: "ADMIN_PASSWORD",
    },
    {
      icon: <UserIcon />,
      name: "users",
      value: "USER",
    },    
  ];

  const handleOrderBy = async (orderBy: any) => {
    setOrderBy(orderBy);    
    setPage(0);
    setItems([]);    
  };

  const initFilters = (filters: any, filterMapReference: any) => {
    const _filteredItems: { [key: string]: any } = {};
    filters.forEach((f:FilterType) => {
      _filteredItems[f.name] = {};
      const ref = {
        name: f.name,
        type: f.type,
        values: []
      };
  
      filterMapReference[f.name] = ref  
    });
    setFilterMapReference(filterMapReference);
    return _filteredItems;
  };

  return (
    <div className="Default-content">
      <div className={classes.root}>
        <InputSearchBox>
          <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={() => setOpenText(false)}
          >
            <div>
              <OutlinedInputSearch
                value={filter}
                placeholder={intl.formatMessage({id: "search.found.message"})}
                onClick={(event: any) => setOpenText(true)}
                onChange={async (e: any) => {
                  setFilter(e?.target?.value);
                  debounce(async () => {                    
                    setPage(0);
                    setTotal(20);              
                    setLoadingAdvancedChanged(true);
                    const result = await refetch({
                      q: e?.target?.value || "",
                      type: active,
                      filters: filtered,
                      size: 20,
                      page: 0
                    });              
                    setLoadingAdvancedChanged(false);
                    setItems(result.data?.getSelfServiceAdvanced?.representation);
                    setLinks(result.data?.getSelfServiceAdvanced?.links || []);
                  }, 1000);                   
                }}            
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                labelWidth={0}
              />
              {openText && (
              <MenuItemContainer>
                <MenuItemText onClick={() => {
                  setCurrentText("name");                                             
                }}>
                  {filter} 
                  <MenuItemTextValue> - buscar em 
                    <MenuItemTextValueType className={currentText === "name" && "Selected" || ""}>{"'nome'"}</MenuItemTextValueType>
                  </MenuItemTextValue>
                </MenuItemText>  
                <MenuItemText onClick={() => {
                  setCurrentText("description");                                               
                }}>
                  {filter} 
                  <MenuItemTextValue> - buscar em 
                    <MenuItemTextValueType className={currentText === "description" && "Selected" || ""}>{"'descrição'"}</MenuItemTextValueType>
                  </MenuItemTextValue>
                </MenuItemText> 
                <MenuItemText onClick={() => {
                  setCurrentText("tags");                                               
                }}>
                  {filter} 
                  <MenuItemTextValue> - buscar em 
                    <MenuItemTextValueType className={currentText === "tags" && "Selected" || ""}>{"'tags'"}</MenuItemTextValueType>
                  </MenuItemTextValue>
                </MenuItemText>   
                <MenuItemText onClick={() => {
                  setCurrentText("all");                                               
                }}>
                  {filter} 
                  <MenuItemTextValue> - buscar em 
                    <MenuItemTextValueType className={currentText === "all" && "Selected" || ""}>{"'todos os campos'"}</MenuItemTextValueType>
                  </MenuItemTextValue>
                </MenuItemText>               
              </MenuItemContainer>)}
            </div>  
          </ClickAwayListener>                     
        </InputSearchBox>         
        <Section
          list={sections}
          defaultValue={active}
          onSelect={async (section) => {
            setItems([]);
            setActive(section.value);
            setPage(0);
            setTotal(20);  
            setFilterMapReference({});
            setFiltered("[]");
            apolloClient
              .query({
                query: GET_SELF_SERVICE_FILTERS,
                variables: {
                  type: section.value
                },
              })
              .then(({ data }) => {       
                setFilterList(deepCopyFunction(data.getSelfServiceFilters));                  
                setFilteredValue({
                  total: 0,   
                  ...initFilters(data.getSelfServiceFilters, {})   
                });                                
              });                                        
          }}
        />
        <DividerSearch />          
          <>
            <TotalFiltersBox>
            <div className={classes.totalItens}>
              {((listAdvanced || list)?.length > 20 || getLink("next", data?.getSelfServiceAdvanced?.links || [])) && "20+" || (listAdvanced || list)?.length} <FormattedMessage id="search.items.found" />
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
                badgeContent={filteredValue?.total}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Filters 
                  onSave={save} 
                  activeType={active} 
                  filterMapReference={filterMapReference}
                  setFilterMapReference={setFilterMapReference}
                  setFilteredValue={setFilteredValue} 
                  filteredValue={filteredValue} 
                  setTotalFiltered={setTotalFiltered} 
                  filterList={filterList}
                  initFilters={initFilters}
                  open={openFilters}
                  setOpen={setOpenFilters}
                />
              </Badge>
              <OrdenationContent>
                <Ordenation list={ordenationList} onChange={handleOrderBy} orderBy={orderBy}/>
              </OrdenationContent>  
            </OptionListFiltersContent>
            </TotalFiltersBox>
            {type === "GRID" && (
              <>       
                {loadingAdvancedChanged && <Loading />}         
                <div>
                  <Grid container spacing={3}>
                    {items.map((item, index) => (
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
                                  {loadingItems.includes(item.identifier) && (
                                    <div className="Disabled-action">
                                      <Loading type="blue"/>
                                    </div>
                                  )}
                                  {!loadingItems.includes(item.identifier) && (
                                    <div
                                      onClick={(e) => {
                                      e.stopPropagation();
                                      e.nativeEvent.stopImmediatePropagation();   
                                      setLoadingItems([...loadingItems, item.identifier as string]);                                                  
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
                {loadingAdvancedChanged && <Loading />}        
                {items.map((item, index) => (
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
                      <ListItemIconContent color={currentTheme.palette.primary.main}>
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
                        {loadingItems.includes(item.identifier) && (
                          <ListItemIconContent className="Disabled-action">
                            <Loading type="blue"/>
                          </ListItemIconContent>
                        )} 
                        {!loadingItems.includes(item.identifier) && (
                          <ListItemIconContent
                            className="Selectable"
                            color={currentTheme.palette.primary.main}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              setLoadingItems([...loadingItems, item.identifier as string]); 
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
            {getLink("next", links || []) && (
              <LoadMoreContent>
                <Button
                  variant="contained"
                  color="primary"
                  isLoading={loadingAdvanced ? 1 : 0}
                  onClick={async () => {  
                    setLoadingAdvanced(true);                    
                    const result = await refetch({
                      q: filter,
                      type: active,
                      filters: filtered,
                      size: 20,
                      page: page + 1
                    });
                    setPage(page + 1);
                    setLoadingAdvanced(false);
                    setItems([
                      ...items,
                      ...result?.data?.getSelfServiceAdvanced?.representation
                    ])                     
                    setLinks(result.data?.getSelfServiceAdvanced?.links || []);                                  
                  }}
                >
                  <FormattedMessage id="loadMore" />
                </Button>
              </LoadMoreContent>
            )}
            {!loadingAdvanced && !items.length && (
              <EmptyState
                image={EmptyStateTypeahead}
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
