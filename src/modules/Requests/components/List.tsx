import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, injectIntl, useIntl } from "react-intl";
import apolloClient from "@utils/apollo-client";
import { useQuery } from "@apollo/client";
import Button from "@components/Button";
import Checkbox from "@components/Checkbox";
import Loading from "@components/Loading";
import Filter from "@components/Filter";
import EmptyState from "@components/EmptyState";
import EmptyStateImage from "@images/EmptyStateRequests.svg";
import Ordenation from "@components/Ordenation";
import ArrowClockwise from "@icons/ArrowClockwise";
import ArrowsOutSimpleIcon from "@icons/ArrowsOutSimple";
import CaretUpIcon from "@icons/CaretUp";
import DownloadSimpleIcon from "@icons/DownloadSimple";
import Requests from "./index";
import { connect } from "react-redux";
import { getLink } from "@utils/index";
import { types, generateFilters } from "@modules/Task/constants";
import { inProgressStatusList, processedStatusList, filters } from "@modules/Requests/components/constants";
import type { ListProps, Task } from "@modules/Task/types";
import type { Request } from "@modules/Requests/types";
import type { Link } from "@types";
import {
  Box,
  Header,
  HeaderFilters,
  HeaderFiltersContent,
  LoadMoreContent,
  ActionButton,
  FilterContent,
  StyledMenu,
  MenuItemContainer,
  MenuItemInfo,
  MenuItemText,
  SelectBoxContainer,
  SelectBoxInfo,
  SelectBoxInfoIcon
} from "@modules/Requests/styles";

//queries
import { 
  GET_REQUEST_APPROVAL_TASK_FILTERS, 
  GET_CERTIFICATION_APPROVAL_TASK_FILTERS, 
  GET_PROVISIONING_TASK_FILTERS,
  GET_SOD_APPROVAL_TASK_FILTERS,
  GET_ROLE_RIGHT_APPROVAL_TASK_FILTERS,
  RESUME 
} from "@modules/Task/queries";

import { 
  GET_REQUESTS
} from "@modules/Requests/queries";


const RequestList: FC<ListProps> = ({ resolved }) => {

  const intl = useIntl();

  const [type, setType] = useState("ALL");
  const [requestFilters, setRequestFilters] = useState(resolved ? [...(filters.filter((f) => f.name !== "status")), {
    name: "status",
    label: <FormattedMessage id="status" />,
    type: "list",
    values: [
      {
        label: "ERROR",
        value: "ERROR"
      },      
      {
        label: "CANCELED",
        value: "CANCELED"
      },
    ],
    bind: "value",
    view: "label"
  }] : [...(filters.filter((f) => f.name !== "status"))]);
  const [typeValue, setTypeValue] = useState<string>("ANY");
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<{[key: string]: any}>(resolved ? {status: processedStatusList} : {status: inProgressStatusList});
  const [anchorElCategory, setAnchorElCategory] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentCategoryName, setCurrentCategoryName] = useState<string>(intl.formatMessage({id: "task.all"}));  
  const [currentTypeName, setCurrentTypeName] = useState<string>(intl.formatMessage({id: "task.any"}));  
  const [orderBy, setOrderBy] = useState<string>("createdAt:desc");
  const [filteredString, setFilteredString] = useState<string>(JSON.stringify(filtered));
  const [size, setSize] = useState<number>(10);
  const [checked, setChecked] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState(checkAll);

  const { loading, error, data, refetch } = useQuery<{
    getRequests: { links: Link[], requests: Request[] };
  }>(GET_REQUESTS, {
    variables: {
      page: 0,
      size: 10,
      ord: orderBy,
      filters: filteredString
    }, 
    fetchPolicy: "network-only"   
  });
  
  const getTaskFilters = (categoryFilter: string, typeFilter: string | null) => {

    let query = null;
    setRequestFilters([]);

    if(categoryFilter === "APPROVAL" || categoryFilter === "ALL") {
      query = GET_REQUEST_APPROVAL_TASK_FILTERS;
    } else if(categoryFilter === "CERTIFICATION") {
      query = GET_CERTIFICATION_APPROVAL_TASK_FILTERS;
    } else if(categoryFilter === "PROVISIONING") {
      query = GET_PROVISIONING_TASK_FILTERS;
    } else if(categoryFilter === "SOD") {
      query = GET_SOD_APPROVAL_TASK_FILTERS;
    }  else if(categoryFilter === "ROLE_RIGHT") {
      query = GET_ROLE_RIGHT_APPROVAL_TASK_FILTERS;
    }

    if (query) {      

      apolloClient
        .query({
          query,
          variables: {
            type: typeFilter,
            statusList: resolved ? "ERROR,CANCELED" : "WAITING_APPROVAL,WAITING_EXECUTION"
          },
          fetchPolicy: "no-cache"
        })
        .then(({ data }) => {
          if(categoryFilter === "ALL") {
            const _filters = [...filters];
            const filtered = _filters.filter((f) => f.name === "status");
            if(filtered?.length) {
              filtered[0].values = filtered[0].values.filter((f: any) => (resolved ? processedStatusList : inProgressStatusList).includes(f.value));
            }            
            setRequestFilters(_filters);
          } else {
            if(data?.getFilters) { 
              const _filters = generateFilters(intl, data?.getFilters);
              const filtered = _filters.filter((f) => f.name === "status");
              if(filtered?.length) {
                filtered[0].values = filtered[0].values.filter((f: any) => (resolved ? processedStatusList : inProgressStatusList).includes(f.value));
              }           
              setRequestFilters(_filters);
            }
          }                            
        });
    }
  }

  const handleCheck = (t: number) => {
    let newChecked = [];
    if(checked.includes(t)) {
      newChecked = checked.filter((c) => c !== t);      
    } else {
      newChecked = [...checked, t];     
    }          
    setChecked(newChecked);
  };

  const handleChange = (val: any) => {  
    setOrderBy("createdDate:desc");
    setFiltered({status: resolved ? processedStatusList : inProgressStatusList});
    getTaskFilters(val, null);
    setType(val);    
  }; 

  const handleChangeType = (val: any) => {    
    setOrderBy("createdDate:desc");
    setTypeValue(val);
    if(val != "ANY") {
      setFiltered({"taskData.type": val, status: resolved ? processedStatusList : inProgressStatusList})
    } else {
      setFiltered({});      
    }        
    setCheckAll(false);
    getTaskFilters(type, val);     
  };

  const handleChangeFiltered = (f: {[key: string]: any}) => {
    if(!f.status) {      
      f.status = resolved ? processedStatusList : inProgressStatusList;
    }

    setFiltered({...f, ...(typeValue !== "ANY" ? {"taskData.type": typeValue} : {})});
  };  

  const handleOrderBy = (orderBy: any) => {
    setOrderBy(orderBy);
  }

  useEffect(() => {
    if(JSON.stringify(filtered) !== filteredString) {
      setSize(10);
      setFilteredString(JSON.stringify(filtered));
      refetch({
        page: 0,
        size: 10,
        ord: orderBy,
        filters: JSON.stringify(filtered)
      });
    }

    if(checkAll !== checkedAll) {
      setCheckedAll(checkAll);
      let newChecked: number[] = [];
      let statusChecked: string[] = [];
      if(checkAll) {
        (data?.getRequests?.requests || [])          
          .forEach((t) => {
            newChecked.push(t?.identifier);
            statusChecked.push(t?.status);            
          });
      }
            
      setChecked(newChecked);
    }

    /*if(orderBy !== currentOrderBy) {
      setCurrentOrderBy(orderBy);
      refetch({
        page: 0,
        size: 10,
        ord: orderBy,
        filters: JSON.stringify(filtered)
      });
    }*/

  }, [filteredString, filtered, checkAll, checkedAll, checked, data, refetch, orderBy]);

  if(loading) {
    return (
      <Loading container bgColor="#FFFFFF"/>
    )
  }  

  return (
    <Box>
      <Header>
        {!resolved && <Checkbox value={checkAll} onChange={() => setCheckAll(!checkAll)}/>}        
        <HeaderFiltersContent>
          <HeaderFilters>                                      
            <Filter filters={requestFilters} onChange={(f: any) => handleChangeFiltered(f)}/>
          </HeaderFilters> 
          <HeaderFilters>
            <Ordenation list={requestFilters} onChange={handleOrderBy} orderBy={orderBy}/>  
          </HeaderFilters>         
        </HeaderFiltersContent>                           
      </Header>
      <Requests list={data?.getRequests?.requests || []} checked={checked} onCheck={handleCheck} subType="any" size={size} filteredString={filteredString}/>                 
      {(data?.getRequests?.requests || []).length === 0 && (
        <EmptyState image={EmptyStateImage} title="request.empty" text="request.empty.text" bgColor="#FFFFFF"/>
      )}
      {getLink("next", data?.getRequests?.links || []) && (
        <LoadMoreContent>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCheckAll(false);
              setSize(size + 10);
              refetch({
                page: 0,
                size: size + 10,
                ord: orderBy,
                filters: filteredString
              })
            }}
          >
            <FormattedMessage id="loadMore" />
          </Button>
        </LoadMoreContent>
      )}
    </Box>  
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(RequestList);
