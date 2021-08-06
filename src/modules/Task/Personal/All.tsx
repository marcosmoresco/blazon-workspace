import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import apolloClient from "@utils/apollo-client";
import { useQuery,useMutation } from "@apollo/client";
import Avatar from "@material-ui/core/Avatar";
import Button from "@components/Button";
import Card from "@components/Card";
import Checkbox from "@components/Checkbox";
import Loading from "@components/Loading";
import Filter from "@components/Filter";
import Section from "@components/Section";
import Select from "@components/Select";
import Snackbar from "@components/Snackbar";
import EmptyState from "@components/EmptyState";
import EmptyStateSearchIcon from "@icons/EmptyStateSearch";
import ArrowsOutIcon from "@icons/ArrowsOut";
import ArrowClockwiseIcon from "@icons/ArrowClockwise";
import CalendarIcon from "@icons/Calendar";
import CheckSquareOffsetIcon from "@icons/CheckSquareOffset";
import CirclesFourIcon from "@icons/CirclesFour";
import DotsThreeIcon from "@icons/DotsThree";
import UserGearIcon from "@icons/UserGear";
import { connect } from "react-redux";
import { addMessage } from "@actions/index";
import { sections, types, filters } from "@modules/Task/constants";
import type { ListProps, Task } from "@modules/Task/types";
import type { Link } from "@types";
import { getLink } from "@utils/index";
import {
  LoadMoreContent
} from "@modules/Task/styles";
import Tasks from "@modules/Task/components";
import ForwardUser from "@modules/Task/components/ForwardUser";
import ForwardQueue from "@modules/Task/components/ForwardQueue";

//queries
import { 
  GET_TASKS, 
  GET_ASSIGN_ACTIONS,
} from "@modules/Task/queries";

//mutations
import { 
  ASSIGN_TO_ME_TASK,
  UNASSIGN_TASK,
  FORWARD_TO_USER_TASK,
  FORWARD_TO_QUEUE_TASK,  
} from "@modules/Task/mutations";

const PersonalTasksAll: FC<ListProps> = ({ dispatch, filtered = {}, checkAll = false }) => {

  const intl = useIntl();

  const [filteredString, setFilteredString] = useState<string>("{}");
  const [size, setSize] = useState<number>(10);
  const [checked, setChecked] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState(checkAll);
  const [openForwardUser, setOpenForwardUser] = useState(false);
  const [openForwardQueue, setOpenForwardQueue] = useState(false);
  
  const { loading, error, data, refetch } = useQuery<{
    getTasks: { links: Link[], representation: Task[] };
  }>(GET_TASKS, {
    variables: {
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
        query: GET_TASKS,
        variables: {          
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
        query: GET_TASKS,
        variables: {          
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
        query: GET_TASKS,
        variables: {          
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
        query: GET_TASKS,
        variables: {          
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
    if(JSON.stringify(filtered) !== filteredString) {
      setSize(10);
      setFilteredString(JSON.stringify(filtered));
      refetch({
        page: 0,
        size: 10,
        ord: "createdDate:desc",
        filters: JSON.stringify(filtered)
      });
    }

    if(checkAll !== checkedAll) {
      setCheckedAll(checkAll);
      let newChecked: number[] = [];
      if(checkAll) {
        (data?.getTasks?.representation || [])
          .filter((t) => t?.headers?.status !== "DONE")
          .forEach((t) => {
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
  }, [filteredString, filtered, checkAll, checkedAll, checked, data, refetch])

  if(loading || loadingAssignActions) {
    return (
      <Loading container bgColor="#FFFFFF"/>
    )
  }  

  const checkAssignActions = (newChecked: number[]) => {
    const statusList: string[] = [];
    newChecked.forEach((n) => {
      const ts = (data?.getTasks?.representation || []).filter((t: any) => t.identifier === n);
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
      {(data?.getTasks?.representation || []).length > 0 && (
      <Tasks list={data?.getTasks.representation || []} checked={checked} onCheck={handleCheck} subType="any" size={size} filteredString={filteredString} refetch={refetch}/>
      )}
      {(data?.getTasks?.representation || []).length === 0 && (
        <EmptyState icon={<EmptyStateSearchIcon />} title="task.empty" text="task.empty.text" bgColor="#FFFFFF"/>
      )}
      {getLink("next", data?.getTasks?.links || []) && (
        <LoadMoreContent>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSize(size + 10);
              refetch({
                page: 0,
                size: size + 10,
                ord: "createdDate:desc",
                filters: filteredString
              })
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
