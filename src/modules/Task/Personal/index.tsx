import React, { FC, useState } from "react";
import { FormattedMessage, injectIntl, useIntl } from "react-intl";
import apolloClient from "@utils/apollo-client";
import { useQuery } from "@apollo/client";
import Button from "@components/Button";
import Checkbox from "@components/Checkbox";
import Loading from "@components/Loading";
import Filter from "@components/Filter";
import Ordenation from "@components/Ordenation";
import ListBulletsIcon from "@icons/ListBullets";
import CaretDownIcon from "@icons/CaretDown";
import CaretUpIcon from "@icons/CaretUp";
import DownloadSimpleIcon from "@icons/DownloadSimple";
import { connect } from "react-redux";
import { types, filters, generateFilters, queueTypes } from "@modules/Task/constants";
import type { ListProps, Task } from "@modules/Task/types";
import { download } from "@utils/index";
import {
  Box,
  Header,
  HeaderFilters,
  HeaderFiltersContent,
  FilterContent,
  StyledMenu,
  MenuItemContainer,
  MenuItemInfo,
  MenuItemText,
  SelectBoxContainer,
  SelectBoxInfo,
  SelectBoxInfoIcon
} from "@modules/Task/styles";
import PersonalTasksAll from "./All"; 
import PersonalTasksApproval from "./Approval"; 
import PersonalTasksCertification from "./Certification"; 
import PersonalTasksProvisioning from "./Provisioning"; 
import PersonalTasksRoleRight from "./RoleRight"; 
import PersonalTasksSoD from "./SoD"; 
import PersonalTaskUser from "./User";

//queries
import { 
  GET_REQUEST_APPROVAL_TASK_FILTERS, 
  GET_CERTIFICATION_APPROVAL_TASK_FILTERS, 
  GET_PROVISIONING_TASK_FILTERS,
  GET_SOD_APPROVAL_TASK_FILTERS,
  GET_ROLE_RIGHT_APPROVAL_TASK_FILTERS,
  GET_USER_TASK_FILTERS,
  RESUME 
} from "@modules/Task/queries";
import axios from "axios";

const PersonalTasks: FC<ListProps> = ({ resolved }) => {

  const intl = useIntl();

  const [type, setType] = useState("ALL");
  const [tasksFilters, setTasksFilters] = useState(resolved ? [...(filters.filter((f) => f.name !== "status")), {
    name: "status",
    label: <FormattedMessage id="status" />,
    type: "list",
    values: [
      {
        label: "DONE",
        value: "DONE"
      },      
      {
        label: "CANCELED",
        value: "CANCELED"
      },
    ],
    bind: "value",
    view: "label"
  }] : [...(filters.filter((f) => f.name !== "status" && f.name !== "resolvedAt")), {
    orderable: true,
    name: "deadline",
    label: <FormattedMessage id="deadline" />,    
    type: "date",
    bind: {
      start: "initDeadline",
      end: "endDeadline"
    }
  }]);
  const [typeValue, setTypeValue] = useState<string>("ANY");
  const [loading, setLoading] = useState(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<{[key: string]: any}>(resolved ? {status: ["DONE", "CANCELED"]} : {status: ["TODO"]});
  const [anchorElCategory, setAnchorElCategory] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentCategoryName, setCurrentCategoryName] = useState<string>(intl.formatMessage({id: "task.all"}));  
  const [currentTypeName, setCurrentTypeName] = useState<string>(intl.formatMessage({id: "task.any"}));  
  const [orderBy, setOrderBy] = useState<string>("createdAt:desc");
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);

  const { loading: loadingResume, data: dataResume, refetch: refetchResume } = useQuery(RESUME, {
    fetchPolicy: "no-cache",
    variables: {
      listStatus: resolved ? `DONE,CANCELED` : `TODO`
    }
  });

  if(loading) {
    return (
      <Loading />
    )
  }
  
  const getTaskFilters = (categoryFilter: string, typeFilter: string | null) => {

    let query = null;
    setTasksFilters([]);

    if(categoryFilter === "APPROVAL" || categoryFilter === "ALL") {
      query = GET_REQUEST_APPROVAL_TASK_FILTERS;
    } else if(categoryFilter === "CERTIFICATION") {
      query = GET_CERTIFICATION_APPROVAL_TASK_FILTERS;
    } else if(categoryFilter === "PROVISIONING") {
      query = GET_PROVISIONING_TASK_FILTERS;
    } else if(categoryFilter === "SOD") {
      query = GET_SOD_APPROVAL_TASK_FILTERS;
    } else if(categoryFilter === "ROLE_RIGHT") {
      query = GET_ROLE_RIGHT_APPROVAL_TASK_FILTERS;
    } else if(categoryFilter === "USER") {
      query = GET_USER_TASK_FILTERS;
    }

    if (query) {      

      apolloClient
        .query({
          query,
          variables: {
            type: typeFilter,
            statusList: resolved ? "DONE,CANCELED" : "TODO"
          },
          fetchPolicy: "no-cache"
        })
        .then(({ data }) => {
          if(categoryFilter === "ALL") {
            const _filters = [...filters];
            const filtered = _filters.filter((f) => f.name === "status");
            if(filtered?.length) {
              filtered[0].values = filtered[0].values.filter((f: any) => (resolved ? ["DONE", "CANCELED"] : ["TODO"]).includes(f.value));
            }            
            setTasksFilters(_filters);
          } else {
            if(data?.getFilters) { 
              const _filters = generateFilters(intl, data?.getFilters);
              const filtered = _filters.filter((f) => f.name === "status");
              if(filtered?.length) {
                filtered[0].values = filtered[0].values.filter((f: any) => (resolved ? ["DONE", "CANCELED"] : ["TODO"]).includes(f.value));
              }           
              setTasksFilters(_filters);
            }
          }                            
        });
    }
  }

  const handleChange = (val: any) => {  
    setOrderBy("createdAt:desc");
    setFiltered({status: resolved ? ["DONE", "CANCELED"] : ["TODO"]});
    getTaskFilters(val, null);
    setType(val);    
  }; 

  const handleChangeType = (val: any) => {    
    setOrderBy("createdAt:desc");
    setTypeValue(val);
    if(val != "ANY") {
      setFiltered({"taskData.type": val, status: resolved ? ["DONE", "CANCELED"] : ["TODO"]})
    } else {
      setFiltered({status: resolved ? ["DONE", "CANCELED"] : ["TODO"]});      
    }        
    setCheckAll(false);
    getTaskFilters(type, val);     
  };

  const handleChangeFiltered = (f: {[key: string]: any}) => {
    if(!f.status) {      
      f.status = resolved ? ["DONE", "CANCELED"] : ["TODO"];
    }

    setFiltered({...f, ...(typeValue !== "ANY" ? {"taskData.type": typeValue} : {})});
  };  

  const handleOrderBy = (orderBy: any) => {
    setOrderBy(orderBy);
  };

  const handleClickDownload = async () => {
    setLoadingDownload(true);    
    const resp = await axios.get(`/api/reportTasks?type=${type.toLocaleLowerCase().replace("_", "")}&ord=${orderBy}&filter=${encodeURIComponent(JSON.stringify(filtered))}`);
    download(resp.data, `tasks-${type.toLocaleLowerCase().replace("_", "")}`);
    setLoadingDownload(false);
  }

  return (
    <Box>
      <Header>
        {!resolved && <Checkbox value={checkAll} onChange={() => setCheckAll(!checkAll)}/> }       
        <HeaderFiltersContent>
          <HeaderFilters>
            <FilterContent>            
              <SelectBoxContainer onClick={(event: any) => {
                setAnchorElCategory(event.currentTarget);                            
              }}>
                <SelectBoxInfo>
                  <SelectBoxInfoIcon>
                    <ListBulletsIcon width={21} height={21}/>
                  </SelectBoxInfoIcon>
                  {currentCategoryName}
                </SelectBoxInfo>  
                {(anchorElCategory === null && <CaretDownIcon width={21} height={21}/>) || <CaretUpIcon width={21} height={21}/>}             
              </SelectBoxContainer>
            </FilterContent> 
            {type !== "ALL" && !["ROLE_RIGHT"].includes(type) && (
              <FilterContent>             
                <SelectBoxContainer onClick={(event: any) => setAnchorEl(event.currentTarget)}>
                  <SelectBoxInfo>
                    <SelectBoxInfoIcon>
                      <ListBulletsIcon width={21} height={21}/>
                    </SelectBoxInfoIcon>
                    {currentTypeName}
                  </SelectBoxInfo>  
                  {(anchorEl === null && <CaretDownIcon width={21} height={21}/>) || <CaretUpIcon width={21} height={21}/>}             
                </SelectBoxContainer>
              </FilterContent>
            )}                            
            <Filter filters={tasksFilters} onChange={(f: any) => handleChangeFiltered(f)}/>
          </HeaderFilters>
          <HeaderFilters>
            <Ordenation list={tasksFilters} onChange={handleOrderBy} composed={type+typeValue} orderBy={orderBy}/>
            <Button 
              color="primary" 
              variant="contained" 
              endIcon={<DownloadSimpleIcon width={21} 
              color="#FFFFFF" 
              stroke={1.5}/>}
              onClick={handleClickDownload}
              isLoading={loadingDownload ? 1 : 0}>
              <FormattedMessage id="downloadCSV" />
            </Button>
          </HeaderFilters>
        </HeaderFiltersContent>                           
      </Header>
      {type === "ALL" && (
        <PersonalTasksAll filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll} orderBy={orderBy}/>
      )}
      {type === "APPROVAL" && (
        <PersonalTasksApproval filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll} orderBy={orderBy}/>
      )}
      {type === "CERTIFICATION" && (
        <PersonalTasksCertification filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll} orderBy={orderBy}/>
      )}
      {type === "PROVISIONING" && (
        <PersonalTasksProvisioning filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll} orderBy={orderBy}/>
      )}
      {type === "ROLE_RIGHT" && (
        <PersonalTasksRoleRight filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll} orderBy={orderBy}/>
      )}
      {type === "SOD" && (
        <PersonalTasksSoD filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll} orderBy={orderBy}/>
      )}
      {type === "USER" && (
        <PersonalTaskUser filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll} orderBy={orderBy}/>
      )}      
      <StyledMenu        
        anchorEl={anchorElCategory}
        keepMounted
        disableAutoFocusItem
        open={Boolean(anchorElCategory)}
        onClose={() => setAnchorElCategory(null)}
      >
        {types.map((type: any) => (
          <MenuItemContainer key={`task-category-${type.value}`} onClick={() => {
            setCurrentCategoryName(type.label);            
            handleChange(type.value);
            setCurrentTypeName(intl.formatMessage({id: "task.any"}));
            setAnchorElCategory(null);
          }}>
            <MenuItemText>
              {type.label}
            </MenuItemText>  
            <MenuItemInfo>
              {(type.value === "ALL" && dataResume?.getResume?.totalOpenTasks) ||
               (type.value === "APPROVAL" && dataResume?.getResume?.openApprovalTasks) ||
               (type.value === "CERTIFICATION" && dataResume?.getResume?.openCertificationTasks) ||
               (type.value === "PROVISIONING" && dataResume?.getResume?.openProvisioningTasks) ||
               (type.value === "ROLE_RIGHT" && dataResume?.getResume?.openRoleRightsTasks) || 
               (type.value === "SOD" && dataResume?.getResume?.openSodTasks) || 
               (type.value === "USER" && dataResume?.getResume?.openUserTasks) || 0}               
            </MenuItemInfo>                  
          </MenuItemContainer>
        ))}       
      </StyledMenu> 
      <StyledMenu        
        anchorEl={anchorEl}
        keepMounted
        disableAutoFocusItem
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {(queueTypes[`${type}_TASK`] || []).map((type: any) => (
          <MenuItemContainer key={`task-type-${type.value}`} onClick={() => {
            setCurrentTypeName(type.label);            
            handleChangeType(type.value);
            setAnchorEl(null)
          }}>
           <MenuItemText>
            {type.label}
           </MenuItemText>                   
         </MenuItemContainer>
        ))}       
      </StyledMenu> 
    </Box>  
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(PersonalTasks);
