import React, { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { withStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/client";
import { FormattedMessage, injectIntl } from "react-intl";
import { Form, Formik, withFormik, useFormikContext } from "formik";
import { IMaskInput } from 'react-imask';
import { get } from "lodash";
import apolloClient from "@utils/apollo-client";
import * as Yup from "yup";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import Autocomplete from "@components/Autocomplete";
import Button from "@components/Button";
import EmptyState from "@components/EmptyState";
import TextField from "@components/TextField";
import Tooltip from "@components/Tooltip";
import Loading from "@components/Loading";
import Ordenation from "@components/Ordenation";
import DatePicker from "@components/DatePicker";
import Switch from "@components/Switch";
import UserThumb from "@components/UserThumb";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
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
import FiltersIcon from "@icons/Filters";
import CaretRightIcon from "@icons/CaretRight";
import ArrowLeft from "@icons/ArrowLeft";
import CloseIcon from "@icons/Close";
import InfoIcon from "@icons/Info/index";
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
import { GET_SEARCH_TEMPLATES, GET_PROCESSED_SEARCH, SEARCH_ITEMS } from "@portal/Search/queries";
import { debounce, getSelfServiceAttributeValue, getLink, deepCopyFunction } from "@utils/index";
import type { SearchProps, SelfServiceRepresentation, SelfService, SearchTemplate } from "./types";
import { 
  FORM_RENDER, 
  GENERATE_USERNAMES,  
} from "@modules/Checkout/queries";
import {
  useStyles,
  DividerSearch,
  OptionListFiltersContent,
  OptionListContent,
  OptionList,
  InputSearchBox,
  OutlinedInputSearch,
  OutlinedInputSearchFilters,
  TotalFiltersBox,
  ListItemBox,
  ListItemContent,
  ListItemIconContent,
  ListItemText,
  LoadMoreContent,
  ItemTitleParent,
  CenterAlign,
  ListItemTextDescription,
  MenuItemContainer,
  MenuItemContainerScroll,
  MenuItemInputContainer,
  MenuItemText,
  MenuItemTextValue,
  MenuItemTextValueType,
  OrdenationContent,
  FilterItem,
  FilterItemContent,
  FilterItemName,
  FilterItemDescription,
  FilterSelectedContent,
  FilterSelectedArrowLeft,
  FilterSelectedDivider,
  UserBottomArea,
} from "./styles";
import {    
  BoxButton,
  ButtonFilter,
  ButtonFilterIcon,
  ButtonFilterIconCaretRight,  
} from "@portal/Search/components/Filters/styles";
import { GET_SELF_SERVICE, GET_SELF_SERVICE_ADVANCED } from "./queries";
import type { FilterType } from "@components/Filter/types";
import { useTheme, themes } from "@theme/index";
import WatchIcon from "@icons/Watch";
import { Link } from "@types";
import {
  Line,
  AddDados,  
  Category,
  DateType,
  Help,
  CheckboxContent
} from "@modules/Checkout/CheckoutItem/UserCard/styles";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { mask, onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask}            
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
        unmask={true}
      />
    );
  },
);

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
  const [selectedFilter, setSelectedFilter] = useState<SearchTemplate | null>(null);
  const [filteredText, setFilteredText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | Element | null>(null);

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

  const { loading: loadingTemplates, error: errorTemplates, data: dataTemplates } = useQuery<{
    getSearchTemplates: [SearchTemplate];
  }>(GET_SEARCH_TEMPLATES, {    
    fetchPolicy: "network-only"
  });

  let _filteredValue = filteredValue || {};

  if(orderBy) {
    _filteredValue.ord = orderBy;
  }

  const { loading: loadingProcessedSearch, data: dataProcessedSearch, refetch: refetchProcessedSearch } = useQuery<{
    getProcessedSearch: SelfServiceRepresentation;
  }>(GET_PROCESSED_SEARCH, {
    variables: {      
      size: 20,    
      page: 0, 
      filters: JSON.stringify(_filteredValue)
    },
    fetchPolicy: "network-only"
  });


  const { loading, error, data, refetch } = useQuery<{
    getSelfServiceAdvanced: SelfServiceRepresentation;
  }>(GET_SELF_SERVICE_ADVANCED, {
    variables: {
      q: filter || "",
      size: 20,    
      page: 0, 
      filters: filtered,
      fullTextAttrib: currentText,
      ord: orderBy,
      type: active
    },
    fetchPolicy: "network-only"
  });

  const list = dataProcessedSearch?.getProcessedSearch?.representation || [];

  if(list.length && !items.length && !loadingProcessedSearch) {
    setItems(list);
    setLinks(dataProcessedSearch?.getProcessedSearch?.links || []);
  } else if(loadingProcessedSearch && items.length) {
    setItems([]);
  } 

  const save = async (filteredMapReference: any, total: number) => {    
    setTotalFiltered(total);    
    const _filters: any[] = [];
    Object.keys(filteredMapReference).forEach((f: any) => {
      _filters.push(filteredMapReference[f]);
    });
    setFiltered(JSON.stringify(_filters));    
    setPage(0);
    setItems([]);    
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
  

  let initialValues: {[key: string]: any} = {
    instance: (filteredValue?.values && filteredValue?.values) || {}
  };

  const [formik, setFormik] = useState({  
    render: false,  
    validationSchema: {},
    initialValues,
    enableReinitialize: true,
    isInitialValid: true,
    onSubmit: (values: any) => {   

      const submit = () => {        
        const payload = {...values?.instance};
        delete payload.expireAt;
        delete payload.accountId;         
               
        setPage(0);
        setTotal(20);                              
        setItems([]);        
        setFilteredValue({
          templateName: values?.templateName,
          formId: values?.formId,
          values: payload
        })
        setOpen(false);
      };

      submit();                   
    },
  });

  const [ formCategoryHelp, setFormCategoryHelp ] = useState<{[key: string]: any}>({});
  const [formDatas, setFormDatas] = useState<{[key: string]: any}>();

  const asyncUsernames = (formId: number, amountSuggestions: number, usernamePolicyId: number, payload: string, callback: any) => {
    
    apolloClient
    .query({
      query: GENERATE_USERNAMES,
      variables: { 
        formId,
        amountSuggestions,
        usernamePolicyId,
        payload                      
      },
      fetchPolicy: "network-only"
    })
    .then(async ({ data }) => {
      callback((data?.generateUsernames || []).map((u: string) => ({label: u, title: intl.formatMessage({id: "checkout.usernameSuggestions"})}))) 
    });   
  }

  const async = (type: string, query: string, callback: any, orgType: string | null) => {   

    if(type === "RESOURCE") {

      apolloClient
        .query({
          query: GET_SELF_SERVICE_ADVANCED,
          variables: {                      
            q: query || "",
            fullTextAttrib: "name",
            size: 10,
            type: "RESOURCE",
            ord: "name:asc"      
          },
        })
        .then(async ({ data }) => {
          callback(data.getSelfServiceAdvanced.representation.map((item: SelfService) => ({
            identifier: item.referenceTo.referenceToIdentifier,
            name: item.name,            
          })));
        });

    } else {

      apolloClient
        .query({
          query: SEARCH_ITEMS,
          variables: { 
            payload: orgType && JSON.stringify([
              {
                "name": "organizationType",
                "values": [
                  {
                    "value": orgType
                  }	
                ]
              }	
            ]) || "[]",         
            q: query || "",
            size: 10,
            type      
          },
        })
        .then(async ({ data }) => {
          if(type === "USER") {
            callback(data.searchItems.representation.map((item: SelfService) => ({
              identifier: item.referenceTo.referenceToIdentifier,
              displayName: getSelfServiceAttributeValue("displayName", item.attributes),
              username: getSelfServiceAttributeValue("username", item.attributes),
              image: `/api/images?url=${getSelfServiceAttributeValue("thumbImageLink", item.attributes)}`        
            })));
          } else {
            callback(data.searchItems.representation.map((item: SelfService) => ({
              identifier: item.referenceTo.referenceToIdentifier,
              name: item.name,
              type: getSelfServiceAttributeValue("organizationType", item.attributes),
            })));
          }         
        });   
    }        
  }

  return (
    <>
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
      <div className="Default-content">
        <div className={classes.root}>
          <InputSearchBox>
            <div id="search-input-filter">
              <OutlinedInputSearch   
                value={filter}                  
                disabled={!!filteredValue?.templateName }            
                placeholder={(!filteredValue?.templateName && intl.formatMessage({id: "search.found.message"})) || ""}                                    
                onClick={(event: any) => setOpenText(true)}
                onChange={async (e: any) => {
                  setPage(0);
                  setTotal(20);                    
                  setItems([]); 
                  setFilter(e.target.value);
                  debounce(() => {
                    setFilteredValue({
                      query: e.target.value
                    }); 
                  }, 500);                                                         
                }}            
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />{filteredValue?.templateName && 
                    <div className="pointer" onClick={() => {
                      setOpen(true);
                      setAnchorEl(document.querySelector('#search-input-filter'));
                      setFilter("");
                      formik.initialValues = {
                        instance: (filteredValue?.values && filteredValue?.values) || {}
                      };                                               
                      setFormik(formik);
                    }}>
                      <span style={{color: "#7D7A8C", marginLeft: 10}}><FormattedMessage id="search.for" />:</span>
                      <span  style={{marginLeft: 10}}>{filteredValue?.templateName}</span>
                    </div>
                    } 
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    {filteredValue?.templateName && <span style={{marginRight: 10, cursor: "pointer", marginTop: 3}} onClick={() => {
                      setFilteredValue({});
                      setSelectedFilter(null);
                      setOrderBy("");
                      formik.render = false;
                      setFormik(formik);
                    }}><CloseIcon /></span>}
                    <div className="pointer-important" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      setOpen(true);
                      setAnchorEl(document.querySelector('#search-input-filter'));
                      setFilter("");
                      formik.initialValues = {
                        instance: (filteredValue?.values && filteredValue?.values) || {}
                      };                                               
                      setFormik(formik);
                    }}><FiltersIcon /></div>
                  </InputAdornment>
                }
                labelWidth={0}
              />
            </div>            
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={() => setOpen(false)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}              
            >
              <div>                
                {openText && (
                <MenuItemContainer>
                  {!selectedFilter && (
                  <MenuItemInputContainer>
                    <OutlinedInputSearchFilters
                      value={filteredText}
                      placeholder={intl.formatMessage({id: "search.predefined.filter"})}
                      onClick={(event: any) => setOpenText(true)}
                      onChange={async (e: any) => {                        
                        setFilteredText(e?.target?.value);                                                               
                      }}            
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }                   
                      labelWidth={0}
                    />
                  </MenuItemInputContainer>) || (
                    <>
                      <FilterSelectedContent>
                        <FilterSelectedArrowLeft onClick={() => {
                          setSelectedFilter(null);
                          formik.render = false;
                          formik.initialValues = {};                                 
                          setFormik(formik);
                          setFormDatas({});
                        }}><ArrowLeft /></FilterSelectedArrowLeft> {selectedFilter?.name}
                      </FilterSelectedContent>
                      <FilterSelectedDivider />  
                    </>  
                  )} 
                  <MenuItemContainerScroll>
                    {!formik.render && (dataTemplates?.getSearchTemplates || [])
                      .filter((template) => !filteredText || template.name.toLocaleLowerCase().indexOf(filteredText) > -1)
                      .map((template) => (
                      <FilterItem key={`search-template-${template.identifier}`} 
                        onClick={() => {
                          
                          apolloClient
                            .query({
                              query: FORM_RENDER,
                              variables: {          
                                formId: Number(template.formId)      
                              },
                            })
                            .then(async ({ data }) => {                            
                              const result = JSON.parse(data?.formFieldRender);
                              if(!result.needRendering) {
                                setPage(0);
                                setTotal(20);                              
                                setItems([]);
                                setFilteredValue({
                                  templateName: template.name,
                                  formId: template.formId,
                                  values: {}
                                })
                                formik.initialValues = {
                                  instance: {}
                                };                                               
                                setFormik(formik);
                              } else {                                                           

                                setSelectedFilter(template);
                                const formFields = JSON.parse(data?.formFieldRender);              
                                const schema: {[key: string]: any} = {}; 
                                const extraFormDatas: {[key: string]: any} = {formId: template.formId, templateName: template.name};
                                const _formCategoryHelp: {[key: string]: any} = {};

                                if(formFields) {                       
                                  Object.keys(formFields?.attributes).map(async (category: any, index: number) => {
                                    _formCategoryHelp[category] = formFields?.attributes[category].help;
                                    formFields?.attributes[category].fields.forEach(async (attribute: any) => {  
                                      if(!extraFormDatas[category]) {
                                        extraFormDatas[category] = [];
                                      }                             
                                      if(["STRING", "TEXTAREA", "DATE"].includes(attribute.type)) {                  
                                        if(attribute.required) {
                                          const yupObject = Yup
                                            .string()
                                            .required(
                                              intl.formatMessage({
                                                id: "isRequired"                      
                                              }, {
                                                field: attribute.label
                                              })
                                            ); 
                                          schema[attribute.name] = yupObject;                       
                                        } else {
                                          const yupObject = Yup
                                            .string()
                                            .nullable();                     
                                          schema[attribute.name] = yupObject;
                                        }
                                        
                                        let TextMaskCustomItem = deepCopyFunction(TextMaskCustom);
                                        if(attribute.mask) {
                                          TextMaskCustomItem.defaultProps = {mask: attribute.mask};
                                        }                                   

                                        extraFormDatas[category].push({
                                          displayType: attribute.type,
                                          name: attribute.name,
                                          label: attribute.label,  
                                          writable: !attribute.disabled,
                                          required: attribute.required,
                                          identifier: attribute.identifier,
                                          mask: (attribute.mask && TextMaskCustomItem) || null,    
                                          help: attribute.help,              
                                          defaultValue: attribute.defaultValue,
                                          options: attribute.listValues || []
                                        });                                                               
                                      } else if (attribute.type === "NUMBER") {                 

                                        if(attribute.required) {
                                          const yupObject = Yup
                                          .number()
                                          .required(
                                            intl.formatMessage({
                                              id: "isRequired"                      
                                            }, {
                                              field: attribute.label
                                            })
                                          ); 
                                          schema[attribute.name] = yupObject;
                                        } else {
                                          const yupObject = Yup
                                            .number()
                                            .nullable();                     
                                          schema[attribute.name] = yupObject;
                                        }  
                                        extraFormDatas[category].push({
                                          displayType: attribute.type,
                                          name: attribute.name,
                                          label: attribute.label,       
                                          writable: !attribute.disabled,  
                                          required: attribute.required,  
                                          identifier: attribute.identifier,
                                          mask: attribute.mask,    
                                          help: attribute.help,    
                                          defaultValue: attribute.defaultValue,  
                                          options: attribute.listValues || []
                                        });                
                                      } else if (attribute.type === "CHECKBOX") {
                                        const yupObject = Yup
                                        .bool();                     
                                        schema[attribute.name] = yupObject;
                                        extraFormDatas[category].push({
                                          displayType: attribute.type,
                                          name: attribute.name,
                                          label: attribute.label,       
                                          writable: !attribute.disabled,
                                          required: attribute.required,
                                          identifier: attribute.identifier,
                                          help: attribute.help,       
                                          defaultValue: new Boolean(attribute.defaultValue),                            
                                        }); 
                                      } else if (["USER", "ORGANIZATION", "RESOURCE", "LIST", "USERNAME", "CATEGORY", "CLASSIFICATION", "ENVIRONMENT"].includes(attribute.type)) {
                                        if(attribute.required) {
                                          const yupObject = Yup
                                            .object()
                                            .nullable()
                                            .required(
                                              intl.formatMessage({
                                                id: "isRequired"                      
                                              }, {
                                                field: attribute?.label
                                              })
                                            ); 
                                          schema[attribute.name] = yupObject;
                                        } else {
                                          const yupObject = Yup
                                          .object()
                                          .nullable();                    
                                          schema[attribute.name] = yupObject;
                                        }                                                  
                                        extraFormDatas[category].push({
                                          displayType: attribute.type,
                                          name: attribute.name,
                                          label: attribute.label,                    
                                          options: attribute.listValues || [],
                                          identifier: attribute.identifier,
                                          help: attribute.help,
                                          orgType: attribute.orgType,   
                                          amountSuggestions: attribute.amountSuggestions,
                                          usernamePolicyId: attribute.usernamePolicyId,
                                          allowUserInput: attribute.allowUserInput,                 
                                          multiSelect: attribute.multiSelect,
                                          required: attribute.required                   
                                        });
                                      }                               
                                    });
                                  });                                        
                                }

                                const validationSchema = Yup.object({
                                  instance: Yup.object({
                                    ...schema
                                  })    
                                });

                                formik.initialValues = {};
                                formik.validationSchema = validationSchema;           
                                formik.render = true;         
                                    
                                setFormik(formik);
                                setFormDatas({...extraFormDatas});
                                setFormCategoryHelp(_formCategoryHelp);
                              }                           
                            })
                        }}>
                        <FilterItemContent>
                          <div>
                            <FilterItemName>
                              {template.name}
                            </FilterItemName>
                            <FilterItemDescription>
                              {template.description || " - "}
                            </FilterItemDescription>
                          </div>
                          <CaretRightIcon stroke={1.2} color={filteredValue?.templateName === template.name && "#0E46D7" || "black"}/>                      
                        </FilterItemContent>                   
                      </FilterItem> 
                    ))}                
                    {formDatas && !!Object.keys(formDatas).length && formik.render && (
                      <Formik
                        {...formik}
                        render={(form) => {
                        return (
                          <Form>
                            {Object.keys(formDatas)
                            .filter((category: any) => {               
                              if(category === "formId" || category === "templateName") {
                                const fieldValue = get(form.values, category); 
                                if(!fieldValue) {
                                  form.setFieldValue(category, formDatas[category]);
                                }                  
                              }
                              return "formId" !== category && "templateName" !== category;
                            }) 
                            .map((category: any, index: number) => (
                              <>
                                <Help className="Help-category">
                                  <Category>{category}</Category>
                                  {formCategoryHelp[category] && <Tooltip title={formCategoryHelp[category]} placement="bottom"><div><InfoIcon width={18} height={18} stroke={2}/></div></Tooltip>}
                                </Help>

                                {formDatas[category].map((attribute: any, key: number) => {                 
                                  
                                  const fieldValue = get(form.values.instance, attribute.name);                                                      
                                  let currentError: any = form.submitCount > 0 && (!form?.values?.instance || !form?.values?.instance[attribute.name]) && form?.errors?.instance && form?.errors?.instance[attribute.name];
                                                          
                                  return (
                                  <div key={`form-datas-attribute-${index}-${key}`}>
                                    <AddDados>                                     
                                      {["STRING", "TEXTAREA", "NUMBER"].includes(attribute.displayType) && (
                                      <>
                                        <Help>
                                          <label>{attribute.label}{attribute.required && "*"}</label>
                                          {attribute.help && <Tooltip title={attribute.help} placement="bottom"><div><InfoIcon width={18} height={18} stroke={2}/></div></Tooltip>}
                                        </Help>                          
                                        <TextField
                                          className="Add-dados-textField"
                                          form={form}
                                          hideLabel={true}
                                          type={attribute.displayType === "NUMBER" ? "number" : "text"}
                                          name={"instance." + attribute.name}
                                          required={attribute.required}
                                          disabled={!attribute.writable}
                                          error={Boolean(currentError)} 
                                          helperText={currentError}
                                          defaultValue={!fieldValue && attribute.defaultValue ? attribute.defaultValue : fieldValue}
                                          value={fieldValue}
                                          key={index}  
                                          multiline={"TEXTAREA" === attribute.displayType} 
                                          rows={"TEXTAREA" === attribute.displayType ? 3 : 0} 
                                          inputComponent={attribute.mask && attribute.mask as any || undefined}  
                                          onBlur={async (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                            //handleValidateFormField(attribute, event.target.value, form);                            
                                          }}                                    
                                        />
                                      </>  
                                      )}
                                      {["LIST", "CATEGORY", "CLASSIFICATION", "ENVIRONMENT"].includes(attribute.displayType) && (
                                      <div>
                                        <Help>
                                          <label>{attribute.label}{attribute.required && "*"}</label>
                                          {attribute.help && <Tooltip title={attribute.help} placement="bottom"><div><InfoIcon width={18} height={18} stroke={2}/></div></Tooltip>}
                                        </Help>                           
                                        <Autocomplete
                                          multiple={attribute?.multiSelect}
                                          filterSelectedOptions
                                          options={attribute?.options}
                                          label="label"                         
                                          name={"instance." + attribute.name}                         
                                          value={fieldValue}
                                          required={attribute.required}                           
                                          helperText={currentError}
                                          error={Boolean(currentError)}                                                       
                                          onChange={(event: any, value: string) => form.setFieldValue("instance." + attribute.name, value, false)}
                                          key={index}                                          
                                        />
                                      </div>)}   
                                      {["USERNAME"].includes(attribute.displayType) && (
                                      <div>
                                        <Help>
                                          <label>{attribute.label}{attribute.required && "*"}</label>
                                          {attribute.help && <Tooltip title={attribute.help} placement="bottom"><div><InfoIcon width={18} height={18} stroke={2}/></div></Tooltip>}
                                        </Help>                           
                                        <Autocomplete
                                          freeSolo
                                          groupBy={(option: any) => option.title}
                                          disableInput={!attribute.allowUserInput}
                                          filterSelectedOptions
                                          loading={attribute.loading}                            
                                          label="label"    
                                          name={"instance." + attribute.name}                                                                                                                                                    
                                          value={fieldValue}                          
                                          required={attribute.required}                           
                                          helperText={currentError}
                                          error={Boolean(currentError)}                                                       
                                          onChange={(event: any, value: string) => form.setFieldValue("instance." + attribute.name, value, false)}
                                          key={index}  
                                          async={(query: string, callback: any) => 
                                            asyncUsernames(Number(formDatas.formId), Number(attribute.amountSuggestions), Number(attribute.usernamePolicyId), JSON.stringify(form?.values?.instance || {}), callback)}                                                        
                                        />  
                                      </div>)}                                                          
                                      {["DATE", "DATETIME"].includes(attribute.displayType) && (
                                        <>
                                          <Help className={`${attribute.help && "Add"}`}>
                                            <label>{attribute.label}{attribute.required && "*"}</label>
                                            {attribute.help && <Tooltip title={attribute.help} placement="bottom"><div><InfoIcon width={18} height={18} stroke={2}/></div></Tooltip>}
                                          </Help>
                                          <DateType>                            
                                            <DatePicker       
                                              isTime={"DATETIME" === attribute.displayType}                    
                                              label=""
                                              key={index}
                                              helperText={currentError}
                                              error={Boolean(currentError)}
                                              name={"instance." + attribute.name}                            
                                              value={fieldValue}
                                              onChange={(date: string) => form.setFieldValue("instance." + attribute.name, date, false)}
                                            />
                                          </DateType>                        
                                        </>
                                      )}
                                      {["CHECKBOX"].includes(attribute.displayType) && (
                                        <CheckboxContent>                                                       
                                          <Switch                             
                                            label=""    
                                            defaultValue={!fieldValue && attribute.defaultValue ? attribute.defaultValue : fieldValue}                         
                                            value={fieldValue}                              
                                            onChange={(val: any) => form.setFieldValue("instance." + attribute.name, val, false)}
                                            name={"instance." + attribute.name}
                                            lab="true"
                                            color="primary"
                                          />
                                          <Help>
                                            <label>{attribute.label}{attribute.required && "*"}</label>
                                            {attribute.help && <Tooltip title={attribute.help} placement="bottom"><div><InfoIcon width={18} height={18} stroke={2}/></div></Tooltip>}
                                          </Help> 
                                        </CheckboxContent>                                              
                                      )}
                                      {["RADIOBUTTON"].includes(attribute.displayType) && (
                                        <RadioGroup  
                                          name={"instance." + attribute.name} 
                                          value={fieldValue} 
                                          onChange={(e: any) => {
                                            form.setFieldValue("instance." + attribute.name, e?.target?.value, false)
                                          }}>
                                          {(attribute?.options || []).map((opt: any) => (
                                            <FormControlLabel 
                                              key={`option.${index}.option.${opt[attribute?.bind["value"]]}`} 
                                              value={String(opt[attribute?.bind["value"]])} 
                                              control={<Radio color="primary"/>} 
                                              label={opt[attribute?.bind["label"]] || " - "}/>
                                          ))}    
                                          <FormHelperText error>{currentError}</FormHelperText>                        
                                        </RadioGroup>
                                      )}
                                      {["ORGANIZATION"].includes(attribute.displayType) && (
                                      <div>
                                        <Help>
                                          <label>{attribute.label}{attribute.required && "*"}</label>
                                          {attribute.help && <Tooltip title={attribute.help} placement="bottom"><div><InfoIcon width={18} height={18} stroke={2}/></div></Tooltip>}
                                        </Help>                          
                                        <Autocomplete
                                          async={(query: string, callback: any) => async("ORGANIZATION_UNIT", query, callback, attribute.orgType)}
                                          filterSelectedOptions                            
                                          label="name"                         
                                          name={"instance." + attribute.name}                         
                                          value={fieldValue}
                                          helperText={currentError}
                                          error={Boolean(currentError)} 
                                          renderOption={(option: any) => (
                                            <div>
                                              <div><b><FormattedMessage id={`organization.${option.type}`}/></b></div>
                                              <div>{option.name}</div>
                                            </div>
                                          )} 
                                          onChange={(event: any, value: string) => form.setFieldValue("instance." + attribute.name, value, false)}
                                          key={index}                                          
                                        />
                                      </div>)}
                                      {["RESOURCE"].includes(attribute.displayType) && (
                                      <div>
                                        <Help>
                                          <label>{attribute.label}{attribute.required && "*"}</label>
                                          {attribute.help && <Tooltip title={attribute.help} placement="bottom"><div><InfoIcon width={18} height={18} stroke={2}/></div></Tooltip>}
                                        </Help>                          
                                        <Autocomplete
                                          async={(query: string, callback: any) => async("RESOURCE", query, callback, attribute.orgType)}
                                          filterSelectedOptions                            
                                          label="name"                         
                                          name={"instance." + attribute.name}                         
                                          value={fieldValue}
                                          helperText={currentError}
                                          error={Boolean(currentError)} 
                                          renderOption={(option: any) => (
                                            <div>                                            
                                              <div>{option.name}</div>
                                            </div>
                                          )} 
                                          onChange={(event: any, value: string) => form.setFieldValue("instance." + attribute.name, value, false)}
                                          key={index}                                          
                                        />
                                      </div>)} 
                                      {["USER"].includes(attribute.displayType) && (
                                      <div>
                                        <Help>
                                          <label>{attribute.label}{attribute.required && "*"}</label>
                                          {attribute.help && <Tooltip title={attribute.help} placement="bottom"><div><InfoIcon width={18} height={18} stroke={2}/></div></Tooltip>}
                                        </Help>
                                        <Autocomplete
                                          async={(query: string, callback: any) => async("USER", query, callback, null)}
                                          filterSelectedOptions                           
                                          label="displayName"                         
                                          name={"instance." + attribute.name}                         
                                          value={fieldValue}
                                          helperText={currentError}
                                          error={Boolean(currentError)} 
                                          renderOption={(option: any) => (
                                            <React.Fragment>
                                              <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                                                <div>
                                                  <UserThumb user={option} image={option.image} />
                                                </div>
                                                <div>
                                                  <div><b>{option.username}</b></div>
                                                  <div>{option.displayName}</div>
                                                </div>                                   
                                              </div>
                                            </React.Fragment>
                                          )}          
                                          inputprops={{
                                            startAdornment: (
                                              fieldValue && 
                                              <div style={{marginRight: 10}}>
                                                <UserThumb user={fieldValue} image={fieldValue?.image} notShowDisplayName isSmall/>   
                                              </div>                         
                                            )
                                          }}
                                          onChange={(event: any, value: string) => form.setFieldValue("instance." + attribute.name, value, false)}
                                          key={index}                                          
                                        />
                                      </div>)}                                    
                                    </AddDados>
                                  </div>              
                                )})} 
                              </>
                            ))}                          
                            <Line className="Add-top"/>                          
                            <UserBottomArea>
                              <Button
                                variant="contained"
                                color="default-primary"
                                onClick={() => {
                                  setSelectedFilter(null);
                                  formik.render = false;
                                  formik.initialValues = {};                                 
                                  setFormik(formik);
                                  setFormDatas({});                                 
                                }}>
                                <FormattedMessage id="search.new" />
                              </Button>
                              <Button                    
                                variant="contained"
                                color="primary"
                                onClick={async () => {                                      
                                  form.submitForm();                                   
                                }}
                              >
                                <FormattedMessage id="search" />
                              </Button>
                            </UserBottomArea>
                          </Form>)          
                      }} />                     
                    )} 
                  </MenuItemContainerScroll>                  
                  {/*<MenuItemText onClick={() => {
                    setCurrentText("name");                                             
                  }}>
                    {filter} 
                    <MenuItemTextValue> <FormattedMessage id="search.in"/> 
                      <MenuItemTextValueType className={currentText === "name" && "Selected" || ""}>{`'${intl.formatMessage({id: "search.in.name"})}'`}</MenuItemTextValueType>
                    </MenuItemTextValue>
                  </MenuItemText>  
                  <MenuItemText onClick={() => {
                    setCurrentText("description");                                               
                  }}>
                    {filter} 
                    <MenuItemTextValue> <FormattedMessage id="search.in"/> 
                      <MenuItemTextValueType className={currentText === "description" && "Selected" || ""}>{`'${intl.formatMessage({id: "search.in.description"})}'`}</MenuItemTextValueType>
                    </MenuItemTextValue>
                  </MenuItemText> 
                  <MenuItemText onClick={() => {
                    setCurrentText("tags");                                               
                  }}>
                    {filter} 
                    <MenuItemTextValue> <FormattedMessage id="search.in"/> 
                      <MenuItemTextValueType className={currentText === "tags" && "Selected" || ""}>{`'${intl.formatMessage({id: "search.in.tags"})}'`}</MenuItemTextValueType>
                    </MenuItemTextValue>
                  </MenuItemText>   
                  <MenuItemText onClick={() => {
                    setCurrentText("all");                                               
                  }}>
                    {filter} 
                    <MenuItemTextValue> <FormattedMessage id="search.in"/> 
                      <MenuItemTextValueType className={currentText === "all" && "Selected" || ""}>{`'${intl.formatMessage({id: "search.in.all"})}'`}</MenuItemTextValueType>
                    </MenuItemTextValue>
                </MenuItemText> */}               
                </MenuItemContainer>)}
              </div>  
            </Popover>                     
          </InputSearchBox>         
          {/*<Section
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
          />*/}
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
                {/*<Badge
                  badgeContent={filteredValue?.total}
                  color="primary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <BoxButton>
                    <ButtonFilter onClick={() => setOpenFilters(true)}>
                      <ButtonFilterIcon>
                        <FilterIcon width={20} height={20} />
                      </ButtonFilterIcon>
                      <FormattedMessage id="filters"/>
                      <ButtonFilterIconCaretRight>
                        <CaretRightIcon width={20} height={20} />
                      </ButtonFilterIconCaretRight>
                    </ButtonFilter>
                  </BoxButton>               
                </Badge>*/}
                <OrdenationContent>
                  <Ordenation list={ordenationList} onChange={handleOrderBy} orderBy={orderBy}/>
                </OrdenationContent>  
              </OptionListFiltersContent>
              </TotalFiltersBox>
              {loading && (
                <CenterAlign>
                  <Loading container/>
                </CenterAlign> 
              ) || (
                <>
                  {type === "GRID" && (
                    <>       
                      {loadingAdvancedChanged && <Loading />}         
                      <div>
                        <Grid container spacing={3}>
                          {items.map((item, index) => (
                            <Grid item xs={3} key={`search-card-item-${index}`}>
                              <div
                                className={classes.searchCard}
                                onClick={() => {
                                  if(item.type === "USER") {
                                    return;
                                  }
                                  router.push(
                                    `/search/selfService/${item.type
                                      .replaceAll("_", "")
                                      .toLocaleLowerCase()}/${item.identifier}`
                                  )
                                }}
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
                          onClick={() => {
                            if(item.type === "USER") {
                              return;
                            }
                            router.push(
                              `/search/selfService/${item.type
                                .replaceAll("_", "")
                                .toLocaleLowerCase()}/${item.identifier}`
                            )
                          }}
                          key={`search-list-item-${index}`}
                        >
                          <ListItemContent>
                            <ListItemIconContent color={currentTheme.palette.primary.main}>
                              {iconByType[`${item.type}${(item.type === "RESOURCE" && getSelfServiceAttributeValue("resourceType", item.attributes)) || ""}`]}
                            </ListItemIconContent>
                            <div>
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
                              <Tooltip title={item?.description || " - "} placement="bottom">
                                <ListItemTextDescription>{item?.description}</ListItemTextDescription>
                              </Tooltip>  
                            </div>                    
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
              )}              
            </>                             
        </div>
      </div>      
    </>    
  );
};

export default withStyles(useStyles)(injectIntl(Search));
