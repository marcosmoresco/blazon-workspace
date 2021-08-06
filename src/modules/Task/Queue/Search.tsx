import React, { FC, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Snackbar from "@components/Snackbar";
import Loading from "@components/Loading";
import EmptyState from "@components/EmptyState";
import Button from "@components/Button";
import EmptyStateSearchIcon from "@icons/EmptyStateSearch";
import { connect } from "react-redux";
import type { ListProps, Task } from "@modules/Task/types";
import type { Link } from "@types";
import Tasks from "@modules/Task/components";
import { addMessage } from "@actions/index";
import { useIntl, FormattedMessage } from "react-intl";
import ForwardUser from "@modules/Task/components/ForwardUser";
import ForwardQueue from "@modules/Task/components/ForwardQueue";

//constants
import {
  getQueryByType,
  getActionsByType
} from "@modules/Task/constants";

//queries
import { 
  GET_TASK_QUEUE_TASKS, 
  GET_ASSIGN_ACTIONS,   
} from "@modules/Task/queries";

//mutations
import { 
  ASSIGN_TO_ME_TASK,
  UNASSIGN_TASK,
  FORWARD_TO_USER_TASK,
  FORWARD_TO_QUEUE_TASK,  
} from "@modules/Task/mutations";

const QueueTasksSearch: FC<ListProps> = ({ dispatch, filtered = {}, id, type, checkAll = false, setCheckAll }) => {

  const intl = useIntl();
  const [filteredString, setFilteredString] = useState<string>("{}");
  const [checked, setChecked] = useState<number[]>([]);
  const [queueId, setQueueId] = useState<number>();
  const [openForwardUser, setOpenForwardUser] = useState(false);
  const [openForwardQueue, setOpenForwardQueue] = useState(false);
  const [checkedAll, setCheckedAll] = useState(checkAll);

  const { loading, error, data, refetch } = useQuery<{
    getTaskQueueTasks: { links: Link[], representation: Task[] };
  }>(GET_TASK_QUEUE_TASKS, {
    variables: {
      id,
      page: 0,
      size: 10,
      ord: "createdDate:desc",
      filters: filteredString
    },
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
        query: GET_TASK_QUEUE_TASKS,
        variables: {
          id,
          page: 0,
          size: 10,
          ord: "createdDate:desc",
          filters: filteredString
        }
      },
    ],  
    onCompleted: ({ assignToMe }) => {        
      if(assignToMe) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "task.assignToMe.success"})
          )
        );               
      }     
    },
  });

  const [unassign, {}] = useMutation(UNASSIGN_TASK, { 
    refetchQueries: [
      {
        query: GET_TASK_QUEUE_TASKS,
        variables: {
          id,
          page: 0,
          size: 10,
          ord: "createdDate:desc",
          filters: filteredString
        }
      },
    ],  
    onCompleted: ({ unassign }) => {        
      if(unassign) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "task.unassigned.success"})
          )
        );                     
      }     
    },
  });

  const [forwardToUser, {}] = useMutation(FORWARD_TO_USER_TASK, { 
    refetchQueries: [
      {
        query: GET_TASK_QUEUE_TASKS,
        variables: {
          id,
          page: 0,
          size: 10,
          ord: "createdDate:desc",
          filters: filteredString
        }
      },
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
      }     
    },
  });

  const [forwardToQueue, {}] = useMutation(FORWARD_TO_QUEUE_TASK, { 
    refetchQueries: [
      {
        query: GET_TASK_QUEUE_TASKS,
        variables: {
          id,
          page: 0,
          size: 10,
          ord: "createdDate:desc",
          filters: filteredString
        }
      },
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
      }     
    },
  });


  useEffect(() => {
    if(JSON.stringify(filtered) !== filteredString || queueId !== id) {
      setFilteredString(JSON.stringify(filtered));
      setChecked([]);
      refetch({
        id,
        page: 0,
        size: 10,
        ord: "createdDate:desc",
        filters: JSON.stringify(filtered)
      });
    }
    if(queueId !== id) {
      setChecked([]);
      setQueueId(id);
    }
    if(checkAll !== checkedAll) {
      setCheckedAll(checkAll);
      let newChecked: number[] = [];
      if(checkAll) {
        (data?.getTaskQueueTasks?.representation || []).forEach((t) => {
          newChecked.push(t.identifier);            
        });
      }    
      
      if(newChecked.length) {
        refetch({
          status: JSON.stringify(newChecked)
        })       
      } 
      
      setChecked(newChecked);
    }
  }, [filteredString, filtered, id, queueId, checkAll, checkedAll, checked, data, refetch])

  if(loading || loadingAssignActions) {
    return (
      <Loading container bgColor="#FFFFFF"/>
    )
  }

  const checkAssignActions = (newChecked: number[]) => {
    const statusList: string[] = [];
    newChecked.forEach((n) => {
      const ts = (data?.getTaskQueueTasks?.representation || []).filter((t: any) => t.identifier === n);
      if((ts || []).length && !statusList.includes(ts[0]?.headers?.status)) {
        statusList.push(ts[0]?.headers?.status);
      }
    });

    if(statusList.length) {
      refetchAssignActions({
        status: JSON.stringify(statusList)
      })
    }      
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

  const actions = (
    <>       
      {(dataAssignActions?.getAssignActions || []).includes("ASSIGN_TO_ME") && (
        <Button 
          onClick={() => setOpenForwardQueue(true)}    
          color="primary"     
          variant="rounded">
            <FormattedMessage id="ttasks.assignToMe" />
        </Button>
      )}
      {(dataAssignActions?.getAssignActions || []).includes("UNASSIGN") && (
        <Button 
          onClick={() => setOpenForwardQueue(true)}    
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
      {(data?.getTaskQueueTasks?.representation || []).length > 0 && (
        <Tasks list={data?.getTaskQueueTasks.representation || []} type={type} isQueue={true} checked={checked} onCheck={handleCheck}/>
      )}
      {(data?.getTaskQueueTasks?.representation || []).length === 0 && (
        <EmptyState icon={<EmptyStateSearchIcon />} title="task.empty" text="task.empty.text" bgColor="#FFFFFF"/>
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

export default connect(mapStateToProps)(QueueTasksSearch);
