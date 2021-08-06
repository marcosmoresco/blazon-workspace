import React, { FC, useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { FormattedMessage, useIntl } from "react-intl";
import Checkbox from "@components/Checkbox";
import Filter from "@components/Filter";
import Loading from "@components/Loading";
import Select from "@components/Select";
import ListBulletsIcon from "@icons/ListBullets";
import CaretDownIcon from "@icons/CaretDown";
import CaretUpIcon from "@icons/CaretUp";
import { connect } from "react-redux";
import apolloClient from "@utils/apollo-client";
import { filters, queueCategories, queueTypes, generateFilters } from "@modules/Task/constants";
import type { ListProps, Task, TaskFilter, TaskQueue } from "@modules/Task/types";
import type { FilterType } from "@components/Filter/types";
import { Link } from "@types";
import {
  Box,
  Header,
  HeaderFilters,
  FilterContent,
  StyledMenu,
  MenuItemContainer,
  MenuItemText,
  MenuItemInfo,
  SelectBoxContainer,
  SelectBoxInfo,
  SelectBoxInfoIcon
} from "@modules/Task/styles";
import QueueTasksSearch from "./Search";

//queries
import {
  GET_TASK_QUEUES,
  GET_TASK_QUEUES_FILTERS,
} from "@modules/Task/queries";

const QueueTasks: FC<ListProps> = ({ dispatch }) => {
  
  const intl = useIntl();

  const [queueName, setQueueName] = useState<string>("");
  const [queueIdentifier, setQueueIdentifier] = useState<number>();
  const [queueCategoryValue, setQueueCategoryValue] = useState<string>("ANY");
  const [queueCategoryName, setQueueCategoryName] = useState<string>(intl.formatMessage({id: "task.any"}));
  const [queueTypeValue, setQueueTypeValue] = useState<string>("ANY");
  const [queueTypeName, setQueueTypeName] = useState<string>(intl.formatMessage({id: "task.any"}));
  const [filtered, setFiltered] = useState<{[key: string]: any}>({});
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [filtersTask, setFiltersTask] = useState<FilterType[]>([]);
  const [anchorEl, setAnchorEl] = useState(null); 
  const [anchorElCategory, setAnchorElCategory] = useState(null);
  const [anchorElType, setAnchorElType] = useState(null);

  const myCallbacksList = useRef<any[]>([]);

  const setStateWithCallback = (filtersTask: FilterType[], callback: any) => {
    setFiltersTask(filtersTask);
    if(callback) {
      myCallbacksList.current.push(callback);
    }
  }

  const { loading, error, data, refetch } = useQuery<{
    getTaskQueues: { links: Link[], representation: Task[] };
  }>(GET_TASK_QUEUES, {
    fetchPolicy: "no-cache"
  });

  const queues = data?.getTaskQueues?.representation || []; 

  const { loading: loadingFilters, data: dataFilters, previousData, refetch: refetchFilters } = useQuery<{
    getFilters: TaskFilter[];
  }>(GET_TASK_QUEUES_FILTERS, {
    variables: {
      category: "ANY",
      type: "ANY"
    },
    fetchPolicy: "no-cache"    
  }); 


  const getQueueFilters = async (category: string, type: string) => {       
    refetchFilters({
      category,
      type
    });
  }

  const handleChangeQueue = (e: any, val: any) => {    
    setQueueIdentifier(val.props.value);
    setQueueCategoryValue("ANY");
    setQueueTypeValue("ANY");
    const _filtered = {...filtered};
    delete _filtered.category;
    delete _filtered["taskData.type"];
    setFiltered(_filtered);
    setCheckAll(false);   
    getQueueFilters("ANY", "ANY");
    setStateWithCallback([], () => getQueueFilters("ANY", "ANY"));
  };

  const handleChangeCategory = (val: any) => {    
    setQueueCategoryValue(val);
    setQueueTypeValue("ANY");
    if(val != "ANY") {
      setFiltered({...filtered, category: val});
    } else {
      const _filtered = {...filtered};
      delete _filtered.category;
      setFiltered(_filtered);
    }    
    setCheckAll(false);        
    setStateWithCallback([], () => getQueueFilters(val, queueTypeValue));
  };

  const handleChangeType = (val: any) => {    
    setQueueTypeValue(val);
    if(val != "ANY") {
      setFiltered({...filtered, "taskData.type": val})
    } else {
      const _filtered = {...filtered};
      delete _filtered["taskData.type"];
      setFiltered(_filtered);
    }     
    setCheckAll(false);
    setStateWithCallback([], () => getQueueFilters(queueCategoryValue, val));
  };

  useEffect(() => {
    
    myCallbacksList.current.forEach((callback) => callback())
    myCallbacksList.current = [];
    
    if(!filtersTask.length) {      
      setFiltersTask(generateFilters(intl, dataFilters?.getFilters || []))
    }
   
  }, [dataFilters, filtersTask, intl, previousData]);
  
  if(loading || loadingFilters) {
    return (
      <Loading />
    )
  }

  if((queues || []).length && !queueIdentifier) {
    setQueueName(queues[0].name || "");
    setQueueIdentifier(queues[0].identifier);
  }

  return (
    <Box>
      <Header>
        <Checkbox value={checkAll} onChange={() => setCheckAll(!checkAll)}/>
        <HeaderFilters>
          <FilterContent>
            <label onClick={(event: any) => setAnchorEl(event.currentTarget)}>
              <FormattedMessage id="queue" />
            </label>
            <SelectBoxContainer onClick={(event: any) => setAnchorEl(event.currentTarget)}>
              <SelectBoxInfo>
                <SelectBoxInfoIcon>
                  <ListBulletsIcon width={21} height={21}/>
                </SelectBoxInfoIcon>
                {queueName}
              </SelectBoxInfo>  
              {(anchorEl === null && <CaretDownIcon width={21} height={21}/>) || <CaretUpIcon width={21} height={21}/>}             
            </SelectBoxContainer>
          </FilterContent> 
          <FilterContent>
            <label onClick={(event: any) => setAnchorElCategory(event.currentTarget)}>
              <FormattedMessage id="category" />
            </label>
            <SelectBoxContainer onClick={(event: any) => setAnchorElCategory(event.currentTarget)}>
              <SelectBoxInfo>
                <SelectBoxInfoIcon>
                  <ListBulletsIcon width={21} height={21}/>
                </SelectBoxInfoIcon>
                {queueCategoryName}
              </SelectBoxInfo>  
              {(anchorElCategory === null && <CaretDownIcon width={21} height={21}/>) || <CaretUpIcon width={21} height={21}/>}             
            </SelectBoxContainer>
          </FilterContent> 
          <FilterContent>
            <label onClick={(event: any) => setAnchorElType(event.currentTarget)}>
              <FormattedMessage id="type" />
            </label>
            <SelectBoxContainer onClick={(event: any) => setAnchorElType(event.currentTarget)}>
              <SelectBoxInfo>
                <SelectBoxInfoIcon>
                  <ListBulletsIcon width={21} height={21}/>
                </SelectBoxInfoIcon>
                {queueTypeName}
              </SelectBoxInfo>  
              {(anchorElType === null && <CaretDownIcon width={21} height={21}/>) || <CaretUpIcon width={21} height={21}/>}             
            </SelectBoxContainer>
          </FilterContent>                                                            
          <Filter filters={filtersTask} onChange={(f: any) => setFiltered(f)}/>
        </HeaderFilters>
      </Header>
      {queueCategoryValue === "ANY" && queueIdentifier && (
        <QueueTasksSearch filtered={filtered} id={queueIdentifier} checkAll={checkAll}/>
      )}
      {queueCategoryValue !== "ANY" && queueIdentifier && (
        <QueueTasksSearch filtered={filtered} id={queueIdentifier} type={queueCategoryValue} checkAll={checkAll}/>
      )}   
      <StyledMenu        
        anchorEl={anchorEl}
        keepMounted
        disableAutoFocusItem
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {queues.map((q: any) => (
          <MenuItemContainer key={`task-queue-${q.identifier}`} onClick={() => {
            setQueueName(q.name);
            setQueueIdentifier(q.identifier);
            setAnchorEl(null)
          }}>
           <MenuItemText>
            {q.name}
           </MenuItemText>
           <MenuItemInfo>{q.amountTasks || 0}</MenuItemInfo>          
         </MenuItemContainer>
        ))}       
      </StyledMenu>  
      <StyledMenu        
        anchorEl={anchorElCategory}
        keepMounted
        disableAutoFocusItem
        open={Boolean(anchorElCategory)}
        onClose={() => setAnchorElCategory(null)}
      >
        {queueCategories.map((category: any) => (
          <MenuItemContainer key={`task-category-${category.value}`} onClick={() => {
            setQueueCategoryName(category.label);            
            handleChangeCategory(category.value);
            setAnchorElCategory(null)
          }}>
           <MenuItemText>
            {category.label}
           </MenuItemText>                     
         </MenuItemContainer>
        ))}       
      </StyledMenu>       
      <StyledMenu        
        anchorEl={anchorElType}
        keepMounted
        disableAutoFocusItem
        open={Boolean(anchorElType)}
        onClose={() => setAnchorElType(null)}
      >
        {queueTypes[queueCategoryValue].map((type: any) => (
          <MenuItemContainer key={`task-category-${type.value}`} onClick={() => {
            setQueueTypeName(type.label);            
            handleChangeType(type.value);
            setAnchorElType(null)
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

export default connect(mapStateToProps)(QueueTasks);
