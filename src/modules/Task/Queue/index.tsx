import React, { FC, useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { FormattedMessage, useIntl } from "react-intl";
import Button from "@components/Button";
import Checkbox from "@components/Checkbox";
import Filter from "@components/Filter";
import Loading from "@components/Loading";
import DownloadSimpleIcon from "@icons/DownloadSimple";
import ListBulletsIcon from "@icons/ListBullets";
import CaretDownIcon from "@icons/CaretDown";
import CaretUpIcon from "@icons/CaretUp";
import EmptyState from "@components/EmptyState";
import EmptyStateSearchIcon from "@icons/EmptyStateSearch";
import { connect } from "react-redux";
import apolloClient from "@utils/apollo-client";
import { filters, queueCategories, queueTypes, generateFilters } from "@modules/Task/constants";
import type { ListProps, Task, TaskFilter, TaskQueue } from "@modules/Task/types";
import type { FilterType } from "@components/Filter/types";
import { download } from "@utils/index";
import { Link } from "@types";
import {
  Box,
  Header,
  HeaderFilters,
  HeaderFiltersContent,
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
import axios from "app/node_modules/axios";

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
  const [currentFilters, setCurrentFilters] = useState<string>("");
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);


  const myCallbacksList = useRef<any[]>([]);

  const setStateWithCallback = (filtersTask: FilterType[], callback: any) => {
    setFiltersTask(filtersTask);
    if(callback) {
      myCallbacksList.current.push(callback);
    }
  }

  const { loading, error, data, refetch } = useQuery<{
    getTaskQueues: { links: Link[], representation: TaskQueue[] };
  }>(GET_TASK_QUEUES, {   
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

  const handleChangeQueue = (val: any) => {    
    setQueueIdentifier(val);
    setQueueCategoryValue("ANY");
    setQueueCategoryName(intl.formatMessage({id: "task.any"}));
    setQueueTypeValue("ANY");
    setQueueTypeName(intl.formatMessage({id: "task.any"}));
    setFiltered({});
    setCheckAll(false);
    getQueueFilters("ANY", "ANY");
    setStateWithCallback([], () => getQueueFilters("ANY", "ANY"));
  };

  const handleChangeCategory = (val: any) => {    
    setQueueCategoryValue(val);
    setQueueTypeValue("ANY");
    setQueueTypeName(intl.formatMessage({id: "task.any"}));
    if(val != "ANY") {
      setFiltered({category: val});
    } else {
      setFiltered({});
    }    
    setCheckAll(false);        
    setStateWithCallback([], () => getQueueFilters(val, "ANY"));
  };

  const handleChangeType = (val: any) => {    
    setQueueTypeValue(val);
    if(val != "ANY") {
      setFiltered({"category": queueCategoryValue, "taskData.type": val});
    } else {
      setFiltered({"category": queueCategoryValue});     
    }     
    setCheckAll(false);
    setStateWithCallback([], () => getQueueFilters(queueCategoryValue, val));
  };

  useEffect(() => {
    
    myCallbacksList.current.forEach((callback) => callback())
    myCallbacksList.current = [];
    
    if(!filtersTask.length) {  
      setCurrentFilters(JSON.stringify(dataFilters?.getFilters));    
      setFiltersTask(generateFilters(intl, dataFilters?.getFilters || []))
    }

    if(currentFilters !== JSON.stringify(dataFilters?.getFilters) && filtersTask.length) {
      setFiltersTask([]);
    }
   
  }, [dataFilters, filtersTask, intl, previousData, currentFilters]);
  
  if(loading || loadingFilters) {
    return (
      <Loading container bgColor="#FFFFFF"/>
    )
  }  

  if((queues || []).length && !queueIdentifier) {
    setQueueName(queues[0].name || "");
    setQueueIdentifier(queues[0].identifier);    
  }

  const handleClickDownload = async () => {
    setLoadingDownload(true);    
    const resp = await axios.get(`api/reportTasks?type=inqueue&id=${queueIdentifier}&ord=createdData:desc&filter=${JSON.stringify(filtered)}`);
    download(resp.data, `tasks-inqueue`);
    setLoadingDownload(false);
  }

  return (
    <Box>
      {queueIdentifier && (
      <Header>
        <Checkbox value={checkAll} onChange={() => setCheckAll(!checkAll)}/>
        <HeaderFiltersContent>
          <HeaderFilters>
            <FilterContent>            
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
            {queueIdentifier && (
              <FilterContent>              
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
            )} 
            {queueCategoryValue !== "ROLE_RIGHT_TASK" && queueIdentifier && (
              <FilterContent>              
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
            )}                                                           
            {queueIdentifier && <Filter filters={filtersTask} onChange={(f: any) => setFiltered({...filtered, ...f})}/>}            
          </HeaderFilters>
          <HeaderFilters>
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
      </Header>)}
      {queueCategoryValue === "ANY" && queueIdentifier && (
        <QueueTasksSearch filtered={filtered} id={queueIdentifier} checkAll={checkAll} setCheckAll={setCheckAll}/>
      )}
      {queueCategoryValue !== "ANY" && queueIdentifier && (
        <QueueTasksSearch filtered={filtered} id={queueIdentifier} type={queueCategoryValue} checkAll={checkAll} setCheckAll={setCheckAll}/>
      )}   
      {!queueIdentifier && (
        <EmptyState icon={<EmptyStateSearchIcon />} title="task.empty" text="task.empty.text" bgColor="#FFFFFF"/>
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
            handleChangeQueue(q.identifier);
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
      {queueCategoryValue !== "ROLE_RIGHT_TASK" && (
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
      )} 
    </Box>       
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(QueueTasks);
