import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useQuery,useMutation } from "@apollo/client";
import Button from "@components/Button";
import Loading from "@components/Loading";
import EmptyState from "@components/EmptyState";
import { connect } from "react-redux";
import { addMessage } from "@actions/index";
import type { ListProps, Task } from "@modules/Task/types";
import type { Link } from "@types";
import { getLink } from "@utils/index";
import { useTheme, themes } from "@theme/index";
import {
  LoadMoreContent
} from "@modules/Task/styles";
import Snackbar from "@components/Snackbar";
import Tasks from "@modules/Task/components";
import ForwardUser from "@modules/Task/components/ForwardUser";
import ForwardQueue from "@modules/Task/components/ForwardQueue";
import EmptyStateTypeahead from "@images/EmptyStateTypeahead.svg";

//constants
import {
  unassign as unassignTask,
  assignToMe as assignToMeTask 
} from "@modules/Task/constants";

//queries
import { 
  GET_TASKS, 
  GET_ASSIGN_ACTIONS,
  GET_TASK_QUEUES
} from "@modules/Task/queries";

//mutations
import { 
  ASSIGN_TO_ME_TASK,
  UNASSIGN_TASK,
  FORWARD_TO_USER_TASK,
  FORWARD_TO_QUEUE_TASK,  
} from "@modules/Task/mutations";

const PersonalTasksAll: FC<ListProps> = ({ dispatch, filtered = {}, checkAll = false, setCheckAll, orderBy = "createdDate:desc" }) => {

  const intl = useIntl();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const [filteredString, setFilteredString] = useState<string>(JSON.stringify(filtered));
  const [currentOrderBy, setCurrentOrderBy] = useState(orderBy);
  const [size, setSize] = useState<number>(10);
  const [checked, setChecked] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState(checkAll);
  const [openForwardUser, setOpenForwardUser] = useState(false);
  const [openForwardQueue, setOpenForwardQueue] = useState(false);
  const [loadingRefetch, setLoadingRefetch] = useState(false);
  
  const { loading, error, data, refetch,  } = useQuery<{
    getTasks: { links: Link[], representation: Task[] };
  }>(GET_TASKS, {
    variables: {
      page: 0,
      size: 10,
      ord: orderBy,
      filters: filteredString
    }, 
    fetchPolicy: "network-only"
  });

  const { loading: loadingAssignActions, data: dataAssignActions, refetch: refetchAssignActions } = useQuery<{
    getAssignActions: string[];
  }>(GET_ASSIGN_ACTIONS, {
    variables: {
      status: `["TODO"]`
    },
  });

  const [assignToMe, {}] = useMutation(ASSIGN_TO_ME_TASK, { 
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: {          
          page: 0,
          size: 10,
          ord: orderBy,
          filters: filteredString
        }
      }, {
        query: GET_TASK_QUEUES
      }
    ],  
    onCompleted: ({ assignToMe }) => {        
      if(assignToMe) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "task.assignToMe.success"})
          )
        );   
        setChecked([]); 
        setCheckAll(false);             
      }     
    },
  });

  const [unassign, {}] = useMutation(UNASSIGN_TASK, { 
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: {          
          page: 0,
          size: 10,
          ord: orderBy,
          filters: filteredString
        }
      }, {
        query: GET_TASK_QUEUES
      }
    ],  
    onCompleted: ({ unassign }) => {        
      if(unassign) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "task.unassigned.success"})
          )
        );  
        setChecked([]); 
        setCheckAll(false);                   
      }     
    },
  });

  const [forwardToUser, {}] = useMutation(FORWARD_TO_USER_TASK, { 
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: {          
          page: 0,
          size: 10,
          ord: orderBy,
          filters: filteredString
        }
      }, {
        query: GET_TASK_QUEUES
      }
    ],  
    onCompleted: ({ forwardToUser }) => {        
      if(forwardToUser) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "task.forward.user.success"})
          )
        );    
        setOpenForwardUser(false);  
        setChecked([]);        
        setCheckAll(false);         
      }     
    },
  });

  const [forwardToQueue, {}] = useMutation(FORWARD_TO_QUEUE_TASK, { 
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: {          
          page: 0,
          size: 10,
          ord: orderBy,
          filters: filteredString
        }
      }, {
        query: GET_TASK_QUEUES
      }
    ],  
    onCompleted: ({ forwardToQueue }) => {
      if(forwardToQueue) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "task.forward.queue.success"})
          )
        ); 
        setOpenForwardQueue(false); 
        setChecked([]); 
        setCheckAll(false);            
      }     
    },
  });

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
        (data?.getTasks?.representation || [])
          .filter((t) => t?.headers?.status !== "DONE")
          .forEach((t) => {
            newChecked.push(t?.identifier);
            statusChecked.push(t?.headers?.status);            
          });
      }    
      
      if(newChecked.length) {
        refetchAssignActions({
          status: JSON.stringify(statusChecked)
        })       
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

  }, [filteredString, filtered, checkAll, checkedAll, checked, data, refetch, refetchAssignActions, orderBy, currentOrderBy])

  if(loading || loadingAssignActions) {
    return (
      <Loading container bgColor="#FFFFFF"/>
    )
  }  

  const checkAssignActions = (newChecked: number[]) => {
    const statusList: string[] = [];
    newChecked.forEach((n) => {
      const ts = (data?.getTasks?.representation || []).filter((t: any) => t.identifier === n);
      if((ts || []).length) {
        statusList.push(ts[0]?.headers?.status);
      }
    });

    if(statusList.length) {
      refetchAssignActions({
        status: JSON.stringify(statusList)
      })
    }      
  };

  const handleCheck = (t: number) => {
    let newChecked = [];
    if(checked.includes(t)) {
      newChecked = checked.filter((c) => c !== t);      
    } else {
      newChecked = [...checked, t];     
    }   
    if(newChecked.length) {
      checkAssignActions(newChecked);
    }     
    setChecked(newChecked);
  };

  const executeForwardToUser = (userId: number): void => {
    
    const payload = checked.map((taskId) => ({
      taskId,
      userId
    }));

    forwardToUser({
      variables: {
        payload: JSON.stringify(payload)
      }
    });
  };

  const executeForwardToQueue = (queueId: number): void => {

    const payload = checked.map((taskId) => ({
      taskId,
      queueId
    }));

    forwardToQueue({
      variables: {
        payload: JSON.stringify(payload)
      }
    });
  };

  const actions = (
    <>       
      {(dataAssignActions?.getAssignActions || []).includes("ASSIGN_TO_ME") && (
        <Button 
          onClick={() => {
            assignToMeTask(undefined, intl, () => {
              const payload = checked.map((taskId) => ({
                taskId,                
              }));
              assignToMe({
                variables: {
                  payload: JSON.stringify(payload)
                }
              });
            }, currentTheme);
          }}    
          color="primary"     
          variant="rounded">
            <FormattedMessage id="tasks.assignToMe" />
        </Button>
      )}
      {(dataAssignActions?.getAssignActions || []).includes("UNASSIGN") && (
        <Button 
          onClick={() => {
            unassignTask(undefined, intl, () => {
              const payload = checked.map((taskId) => ({
                taskId,                
              }));
              unassign({
                variables: {
                  payload: JSON.stringify(payload)
                }
              });
            }, currentTheme);
          }}    
          color="primary"     
          variant="rounded">
            <FormattedMessage id="tasks.unassign" />
        </Button>
      )}      
      <Button 
        onClick={() => setOpenForwardUser(true)}  
        color="primary"      
        variant="rounded">
          <FormattedMessage id="tasks.forwardToUser" />
      </Button>
      <Button 
        onClick={() => setOpenForwardQueue(true)}    
        color="primary"     
        variant="rounded">
          <FormattedMessage id="tasks.forwardToQueue" />
      </Button>      
    </>
  )

  return (
    <>
      {(data?.getTasks?.representation || []).length > 0 && (
      <Tasks list={data?.getTasks.representation || []} checked={checked} onCheck={handleCheck} subType="any" size={size} filteredString={filteredString} refetch={refetch}/>
      )}
      {(data?.getTasks?.representation || []).length === 0 && (
        <EmptyState image={EmptyStateTypeahead} title="task.empty" text="task.empty.text" bgColor="#FFFFFF"/>
      )}
      {getLink("next", data?.getTasks?.links || []) && (
        <LoadMoreContent>
          <Button
            variant="contained"
            color="primary"
            isLoading={loadingRefetch ? 1 : 0}
            onClick={async () => {
              setCheckAll(false);
              setSize(size + 10);
              setLoadingRefetch(true);
              await refetch({
                page: 0,
                size: size + 10,
                ord: orderBy,
                filters: filteredString
              });
              setLoadingRefetch(false);
            }}
          >
            <FormattedMessage id="loadMore" />
          </Button>
        </LoadMoreContent>
      )}
      <ForwardUser 
        modalOpen={openForwardUser}
        setModalOpen={setOpenForwardUser} 
        execute={executeForwardToUser}            
      />
      <ForwardQueue 
        modalOpen={openForwardQueue}
        setModalOpen={setOpenForwardQueue} 
        execute={executeForwardToQueue}            
      /> 
      <Snackbar
        open={checked.length}                       
        total={checked.length}               
        action={
          actions        
        }
      /> 
    </>    
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(PersonalTasksAll);
