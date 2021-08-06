import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, injectIntl, useIntl } from "react-intl";
import apolloClient from "@utils/apollo-client";
import { useQuery } from "@apollo/client";
import Avatar from "@material-ui/core/Avatar";
import Button from "@components/Button";
import Card from "@components/Card";
import Checkbox from "@components/Checkbox";
import Loading from "@components/Loading";
import Filter from "@components/Filter";
import Section from "@components/Section";
import Select from "@components/Select";
import ListBulletsIcon from "@icons/ListBullets";
import CaretDownIcon from "@icons/CaretDown";
import CaretUpIcon from "@icons/CaretUp";
import Tutorial from "@components/Tutorial";
import { confirm } from "@components/Dialog/actions";
import ArrowsOutIcon from "@icons/ArrowsOut";
import ArrowClockwiseIcon from "@icons/ArrowClockwise";
import CalendarIcon from "@icons/Calendar";
import CheckSquareOffsetIcon from "@icons/CheckSquareOffset";
import CirclesFourIcon from "@icons/CirclesFour";
import DotsThreeIcon from "@icons/DotsThree";
import UserGearIcon from "@icons/UserGear";
import { connect } from "react-redux";
//import { all, save, remove } from './actions'
import { addMessage } from "@actions/index";
import { sections, types, filters, generateFilters, queueTypes, queueCategories } from "@modules/Task/constants";
import type { ListProps, Task } from "@modules/Task/types";
import type { Link } from "@types";
import {
  Box,
  BoxCard,
  BoxCardContent,
  BoxCardText,
  BoxCardHeader,
  BoxCardHeaderContent,
  BoxCardHeaderInfo,
  BoxCardTitle,
  BoxCardIdentifier,
  Header,
  Content,
  HeaderFilters,
  Info,
  Actions,
  BoxRequester,
  BoxRequesterContent,
  BoxRequesterTitle,
  BoxRequesterDisplayName,
  BoxRequesterAvatar,
  BoxCardFooter,
  BoxCardFooterInfo,
  BoxPriority,
  BarPriorityLow,
  BarPriorityMedium,
  BarPriorityHigh,
  FooterType,
  FooterStatus,
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

const PersonalTasks: FC<ListProps> = ({ dispatch }) => {

  const intl = useIntl();

  const [type, setType] = useState("ALL");
  const [tasksFilters, setTasksFilters] = useState(filters);
  const [typeValue, setTypeValue] = useState<string>("ANY");
  const [loading, setLoading] = useState(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<{[key: string]: any}>({});
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

  const handleChange = (val: any) => {  
    
    let query = null;
    setTasksFilters([]);

    if(val === "APPROVAL") {
      query = GET_REQUEST_APPROVAL_TASK_FILTERS;
    } else if(val === "CERTIFICATION") {
      query = GET_CERTIFICATION_APPROVAL_TASK_FILTERS;
    } else if(val === "PROVISIONING") {
      query = GET_PROVISIONING_TASK_FILTERS;
    } else if(val === "SOD") {
      query = GET_SOD_APPROVAL_TASK_FILTERS;
    }  else if(val === "ROLE_RIGHT") {
      query = GET_ROLE_RIGHT_APPROVAL_TASK_FILTERS;
    }

    if (query) {      

      apolloClient
        .query({
          query,
          variables: {
            ...filters
          },
        })
        .then(({ data }) => {          
          if(data?.getFilters) {            
            setTasksFilters(generateFilters(intl, data?.getFilters));
          }          
        });
    } else {
      setTasksFilters(filters);
    }
    setType(val);
  };

  const handleChangeType = (val: any) => {    
    setTypeValue(val);
    if(val != "ANY") {
      setFiltered({...filtered, "taskData.type": val})
    } else {
      const _filtered = {...filtered};
      delete _filtered["taskData.type"];
      setFiltered(_filtered);
    }     
    setCheckAll(false);    
  };

  return (
    <Box>
      <Header>
        <Checkbox value={checkAll} onChange={() => setCheckAll(!checkAll)}/>
        <HeaderFilters>
          <FilterContent>
            <label onClick={(event: any) => setAnchorElCategory(event.currentTarget)}>
              <FormattedMessage id="category" />
            </label>
            <SelectBoxContainer onClick={(event: any) => setAnchorElCategory(event.currentTarget)}>
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
              <label onClick={(event: any) => setAnchorEl(event.currentTarget)}>
                <FormattedMessage id="type" />
              </label>
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
          <Filter filters={tasksFilters} onChange={(f: any) => setFiltered(f)}/>
        </HeaderFilters>
      </Header>
      {type === "ALL" && (
        <PersonalTasksAll filtered={filtered} checkAll={checkAll}/>
      )}
      {type === "APPROVAL" && (
        <PersonalTasksApproval filtered={filtered} checkAll={checkAll}/>
      )}
      {type === "CERTIFICATION" && (
        <PersonalTasksCertification checkAll={checkAll}/>
      )}
      {type === "PROVISIONING" && (
        <PersonalTasksProvisioning checkAll={checkAll}/>
      )}
      {type === "ROLE_RIGHT" && (
        <PersonalTasksRoleRight checkAll={checkAll}/>
      )}
       {type === "SOD" && (
        <PersonalTasksSoD checkAll={checkAll}/>
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
            setAnchorElCategory(null)
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
