import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, injectIntl, useIntl } from "react-intl";
import apolloClient from "@utils/apollo-client";
import { useQuery } from "@apollo/client";
import Checkbox from "@components/Checkbox";
import Loading from "@components/Loading";
import Filter from "@components/Filter";
import ListBulletsIcon from "@icons/ListBullets";
import CaretDownIcon from "@icons/CaretDown";
import CaretUpIcon from "@icons/CaretUp";
import { connect } from "react-redux";
import { types, filters, generateFilters, queueTypes } from "@modules/Task/constants";
import type { ListProps, Task } from "@modules/Task/types";
import {
  Box,
  Header,
  HeaderFilters,
  FilterContent,
  StyledMenu,
  MenuItemContainer,
  MenuItemInfo,
  MenuItemText,
  SelectBoxContainer,
  SelectBoxInfo,
  SelectBoxInfoIcon
} from "@modules/Task/styles";
import Tasks from "@modules/Task/components";
import PersonalTasksAll from "./All"; 
import PersonalTasksApproval from "./Approval"; 
import PersonalTasksCertification from "./Certification"; 
import PersonalTasksProvisioning from "./Provisioning"; 
import PersonalTasksRoleRight from "./RoleRight"; 
import PersonalTasksSoD from "./SoD"; 

//queries
import { 
  GET_REQUEST_APPROVAL_TASK_FILTERS, 
  GET_CERTIFICATION_APPROVAL_TASK_FILTERS, 
  GET_PROVISIONING_TASK_FILTERS,
  GET_SOD_APPROVAL_TASK_FILTERS,
  GET_ROLE_RIGHT_APPROVAL_TASK_FILTERS,
  RESUME 
} from "@modules/Task/queries";

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
  }] : [...(filters.filter((f) => f.name !== "status")), {
    name: "status",
    label: <FormattedMessage id="status" />,
    type: "list",
    values: [
      {
        label: "TODO",
        value: "TODO"
      },      
      {
        label: "WAITING_ASSIGN",
        value: "WAITING_ASSIGN"
      },
    ],
    bind: "value",
    view: "label"
  }]);
  const [typeValue, setTypeValue] = useState<string>("ANY");
  const [loading, setLoading] = useState(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<{[key: string]: any}>(resolved ? {status: ["DONE", "CANCELED"]} : {status: ["TODO", "WAITING_ASSIGN"]});
  const [anchorElCategory, setAnchorElCategory] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentCategoryName, setCurrentCategoryName] = useState<string>(intl.formatMessage({id: "task.all"}));  
  const [currentTypeName, setCurrentTypeName] = useState<string>(intl.formatMessage({id: "task.any"}));  

  const { loading: loadingResume, data: dataResume, refetch: refetchResume } = useQuery(RESUME, {
    fetchPolicy: "no-cache"
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
    }  else if(categoryFilter === "ROLE_RIGHT") {
      query = GET_ROLE_RIGHT_APPROVAL_TASK_FILTERS;
    }

    if (query) {      

      apolloClient
        .query({
          query,
          variables: {
            type: typeFilter
          },
          fetchPolicy: "no-cache"
        })
        .then(({ data }) => {
          if(categoryFilter === "ALL") {
            const _filters = [...filters];
            const filtered = _filters.filter((f) => f.name === "status");
            if(filtered?.length) {
              filtered[0].values = filtered[0].values.filter((f: any) => (resolved ? ["DONE", "CANCELED"] : ["TODO", "WAITING_ASSIGN"]).includes(f.value));
            }            
            setTasksFilters(_filters);
          } else {
            if(data?.getFilters) { 
              const _filters = generateFilters(intl, data?.getFilters);
              const filtered = _filters.filter((f) => f.name === "status");
              if(filtered?.length) {
                filtered[0].values = filtered[0].values.filter((f: any) => (resolved ? ["DONE", "CANCELED"] : ["TODO", "WAITING_ASSIGN"]).includes(f.value));
              }           
              setTasksFilters(_filters);
            }
          }                            
        });
    }
  }

  const handleChange = (val: any) => {  
    setFiltered({status: resolved ? ["DONE", "CANCELED"] : ["TODO", "WAITING_ASSIGN"]});
    getTaskFilters(val, null);
    setType(val);
  }; 

  const handleChangeType = (val: any) => {    
    setTypeValue(val);
    if(val != "ANY") {
      setFiltered({"taskData.type": val, status: resolved ? ["DONE", "CANCELED"] : ["TODO", "WAITING_ASSIGN"]})
    } else {
      setFiltered({});      
    }        
    setCheckAll(false);
    getTaskFilters(type, val);  
  };

  const handleChangeFiltered = (f: {[key: string]: any}) => {
    if(!f.status) {      
      f.status = resolved ? ["DONE", "CANCELED"] : ["TODO", "WAITING_ASSIGN"];
    }

    setFiltered({...f, ...(typeValue !== "ANY" ? {"taskData.type": typeValue} : {})});
  };

  return (
    <Box>
      <Header>
        <Checkbox value={checkAll} onChange={() => setCheckAll(!checkAll)}/>
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
          {type !== "ALL" && (
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
      </Header>
      {type === "ALL" && (
        <PersonalTasksAll filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll}/>
      )}
      {type === "APPROVAL" && (
        <PersonalTasksApproval filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll}/>
      )}
      {type === "CERTIFICATION" && (
        <PersonalTasksCertification filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll}/>
      )}
      {type === "PROVISIONING" && (
        <PersonalTasksProvisioning filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll}/>
      )}
      {type === "ROLE_RIGHT" && (
        <PersonalTasksRoleRight filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll}/>
      )}
       {type === "SOD" && (
        <PersonalTasksSoD filtered={filtered} checkAll={checkAll} setCheckAll={setCheckAll}/>
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
               (type.value === "SOD" && dataResume?.getResume?.openSodTasks) || 0}
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
