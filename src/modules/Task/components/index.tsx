import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { getLink } from "@utils/index";
import { useDispatch } from "react-redux";
import apolloClient from "@utils/apollo-client";
import { useQuery, useMutation } from "@apollo/client";
import Avatar from "@material-ui/core/Avatar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@components/Button";
import Card from "@components/Card";
import Checkbox from "@components/Checkbox";
import Loading from "@components/Loading";
import Filter from "@components/Filter";
import Section from "@components/Section";
import Select from "@components/Select";
import Tutorial from "@components/Tutorial";
import { confirm } from "@components/Dialog/actions";
import ArrowsOutIcon from "@icons/ArrowsOut";
import ArrowClockwiseIcon from "@icons/ArrowClockwise";
import CalendarIcon from "@icons/Calendar";
import CheckIcon from "@icons/Check";
import CirclesFourIcon from "@icons/CirclesFour";
import DotsThreeIcon from "@icons/DotsThree";
import InfoIcon from "@icons/Info";
import { connect } from "react-redux";
//import { all, save, remove } from './actions'
import { addMessage } from "@actions/index";
import { 
  unassign as unassignTask,
  assignToMe as assignToMeTask,
  resolve as resolveTask,
  approve,
  certify,
  provision,
  getActionsByType,
  getQueryListByType 
} from "@modules/Task/constants";
import {
  getAvailableActionsByType,
} from "@modules/TasksDetails/Header/constants";

// components
import UserIcon from "@icons/User";
import UsersIcon from "@icons/Users";
import ListNumbersIcon from "@icons/ListNumbers";
import CaretRightIcon from "@icons/CaretRight";
import XIcon from "@icons/X";
import ForwardUser from "@modules/Task/components/ForwardUser";
import ForwardQueue from "@modules/Task/components/ForwardQueue";
import Disapprove from "@modules/Task/components/Disapprove";
import DetailUser from "@modules/Task/components/DetailUser";

import {  
  BoxCard,
  BoxCardContent,
  BoxCardText,
  BoxCardHeader,
  BoxCardHeaderContent,
  BoxCardHeaderInfo,
  BoxCardTitle,
  BoxCardIdentifier,
  Info,
  BoxCardFooter,
  BoxCardFooterInfo,
  BoxPriority,
  BarPriorityLow,
  BarPriorityMedium,
  BarPriorityHigh,
  FooterType,
  FooterStatus,
  Actions
} from "@modules/Task/styles";

// styles
import {
  DividerMenu,
  MenuItemInfo,
  MenuItemBox,
  MenuItemContainer
} from "@modules/TasksDetails/Header/style";

//types
import type { ListProps, Task } from "@modules/Task/types";

//queries
import { GET_ASSIGN_ACTIONS, GET_TASK_QUEUES } from "@modules/Task/queries";

const getType = (task?: Task, type?: string): string => {
  let _type = "approval";
  if(task?.headers?.category === "APPROVAL_TASK" || type === "APPROVAL_TASK") {
    _type = "approval";
  } else if(task?.headers?.category === "CERTIFICATION_TASK" || type === "CERTIFICATION_TASK") {
    _type = "certification";
  } else if(task?.headers?.category === "PROVISIONING_TASK" || type === "PROVISIONING_TASK") {
    _type = "provisioning";
  } else if(task?.headers?.category === "SOD_TASK" || type === "SOD_TASK") {
    _type = "sod";
  } else if(task?.headers?.category === "ROLE_RIGHT_TASK" || type === "ROLE_RIGHT_TASK") {
    _type = "roleRight";
  }
  return _type;
};

const Tasks: FC<ListProps> = ({ list = [], type, id, checked = [], onCheck, subType = "any", size = 10, filteredString = "{}"}) => {

  const router = useRouter();
  const intl = useIntl();
  const dispatch = useDispatch();

  const priorityToElement: { [key: string]: any } = {
    "LOW": <BarPriorityLow variant="determinate" value={30} />,
    "MEDIUM": <BarPriorityMedium variant="determinate" value={50} />,
    "HIGH": <BarPriorityHigh variant="determinate" value={100} />
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [current, setCurrent] = useState<Task>();
  const [openForwardUser, setOpenForwardUser] = useState(false);
  const [openForwardQueue, setOpenForwardQueue] = useState(false);
  const [openDisapprove, setOpenDisapprove] = useState(false);
  const [result, setResult] = useState("DISAPPROVED");
  const [actions, setActions] = useState<string[]>([]);

  let _type = getType(current, type);

  const handleClick = (event: any, task: Task) => {   
    setCurrent(task);
    setAnchorEl(event.currentTarget);
      
    let t = getType(task, type);

    apolloClient
      .query({
        query: getAvailableActionsByType(t || "approval"),
        variables: {
          status: `["${task?.headers?.status || "TODO"}"]`
        },
        fetchPolicy: "network-only"
      })
      .then(({ data }) => {        
        setActions(data.getActions);       
      });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { loading, error, data, refetch } = useQuery<{
    getAssignActions: string[];
  }>(GET_ASSIGN_ACTIONS, {
    variables: {
      status: `["${current?.headers?.status || "TODO"}"]`
    },
    fetchPolicy: "network-only"
  });  

  const [assignToMe, {}] = useMutation(getActionsByType(_type).assignToMe, { 
    refetchQueries: [
      {
        query: getQueryListByType(subType || "any"),
        variables: {
          id,
          page: 0,
          size: size,
          ord: "createdDate:desc",
          filters: filteredString          
        },
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
        setAnchorEl(null);        
      }     
    },
  });

  const [unassign, {}] = useMutation(getActionsByType(_type).unassign, { 
    refetchQueries: [
      {
        query: getQueryListByType(subType || "any"),
        variables: {
          id,
          page: 0,
          size: size,
          ord: "createdDate:desc",
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
        setAnchorEl(null);        
      }     
    },
  });

  const [forwardToUser, {}] = useMutation(getActionsByType(_type).forwardToUser, { 
    refetchQueries: [
      {
        query: getQueryListByType(subType || "any"),
        variables: {
          id,
          page: 0,
          size: size,
          ord: "createdDate:desc",
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
        setAnchorEl(null);        
      }     
    },
  });

  const [forwardToQueue, {}] = useMutation(getActionsByType(_type).forwardToQueue, { 
    refetchQueries: [
      {
        query: getQueryListByType(subType || "any"),
        variables: {
          id,
          page: 0,
          size: size,
          ord: "createdDate:desc",
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
        setAnchorEl(null);           
      }     
    },
  });

  const [resolve, {}] = useMutation(getActionsByType(_type).resolve, { 
    refetchQueries: [
      {
        query: getQueryListByType(subType || "any"),
        variables: {
          id,
          page: 0,
          size: size,
          ord: "createdDate:desc",
          filters: filteredString          
        }
      }, {
        query: GET_TASK_QUEUES
      }
    ],
    onCompleted: ({ resolve }) => {
      if(resolve) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "task.resolved.success"})
          )
        );
        setOpenDisapprove(false);
        setAnchorEl(null);      
      }     
    },
    onError: () => {
      dispatch(
        addMessage(
          intl.formatMessage({id: "task.resolved.error"}),
          "error"
        )
      );
      setAnchorEl(null); 
    }
  });

  const executeForwardToUser = (userId: number): void => {
    forwardToUser({
      variables: {
        payload: JSON.stringify([{          
          taskId: Number(current?.identifier),
          userId
        }])
      }
    });
  };

  const executeForwardToQueue = (queueId: number): void => {
    forwardToQueue({
      variables: {
        payload: JSON.stringify([{
          taskId: Number(current?.identifier),
          queueId
        }])
      }
    });
  };

  const executeDissaproved = (justification: string): void => {
    resolve({
      variables: {
        payload: JSON.stringify([{
          taskId: Number(current?.identifier),
          result,
          justification
        }])
      }
    });
  };

  return (
    <>      
      {list.map((task: Task) => (
        <Card key={`task-${task.identifier}`}>
          <BoxCard>
            {task?.headers?.status !== "DONE" && (
              <Checkbox value={checked.includes(task.identifier)} onChange={() => onCheck && onCheck(task.identifier)}/>
            )}
            <BoxCardContent>
              <BoxCardHeader>
                <BoxCardHeaderContent>
                  <BoxCardTitle>
                    {(["APPROVAL_TASK", "SOD_TASK"].includes(task?.headers?.category) || ["APPROVAL_TASK", "SOD_TASK"].includes(type as string)) && (
                     task?.approvalItemDetails?.entitlementName || 
                     task?.approvalItemDetails?.roleName || 
                     task?.approvalItemDetails?.resourceName || " - "
                    ) || ""}
                    {(task?.headers?.category === "CERTIFICATION_TASK" || type === "CERTIFICATION_TASK") && (
                     task?.certificationItemDetails?.resourceName || 
                     task?.certificationItemDetails?.roleName || 
                     task?.certificationItemDetails?.entitlementName || " - "
                    ) || ""}
                    {(task?.headers?.category === "PROVISIONING_TASK" || type === "PROVISIONING_TASK") && (
                     task?.provisioningItemDetail?.resource?.name || " - "
                    ) || ""}
                    {(task?.headers?.category === "ROLE_RIGHT_TASK" || type === "ROLE_RIGHT_TASK") && (
                     task?.itemDetails?.roleName || " - "
                    ) || ""}
                  </BoxCardTitle>
                  <BoxCardIdentifier>{task.identifier}</BoxCardIdentifier>
                </BoxCardHeaderContent>                  
                <BoxCardHeaderInfo>
                  <Info>
                    <CirclesFourIcon />
                    {task?.type && intl.formatMessage({id: `task.type.${task?.type}`})}
                    {task?.headers?.category === "ROLE_RIGHT_TASK" && (
                      <FormattedMessage id="role" />
                    )}
                  </Info>
                  <Info>
                    <CalendarIcon />
                    {task.dates?.createdDate}
                  </Info>
                  <Actions onClick={(e: any) => handleClick(e, task)}>
                    <DotsThreeIcon />
                  </Actions>
                </BoxCardHeaderInfo>
              </BoxCardHeader>
              <BoxCardText>
                {(["APPROVAL_TASK", "SOD_TASK"].includes(task?.headers?.category) || ["APPROVAL_TASK", "SOD_TASK"].includes(type || "")) && (
                  task?.approvalItemDetails?.entitlementDescription || 
                  task?.approvalItemDetails?.roleDescription || 
                  task?.approvalItemDetails?.resourceDescription || " - "
                )}
                {(task?.headers?.category === "CERTIFICATION_TASK" || type === "CERTIFICATION_TASK") && (
                  task?.certificationItemDetails?.entitlementDescription || 
                  task?.certificationItemDetails?.roleDescription || 
                  task?.certificationItemDetails?.resourceDescription || " - "
                )}
                {(task?.headers?.category === "PROVISIONING_TASK" || type === "PROVISIONING_TASK") && (
                  task?.provisioningItemDetail?.resource?.description || " - "                 
                )}           
                {(task?.headers?.category === "ROLE_RIGHT_TASK" || type === "ROLE_RIGHT_TASK") && (
                  task?.itemDetails?.roleDescription || " - "
                )}
              </BoxCardText>
              <BoxCardFooter>
                <BoxCardFooterInfo>
                  <DetailUser task={task}/>                  
                  <BoxPriority>
                    <FormattedMessage id="task.priority"/>
                    {priorityToElement[task.headers?.priority || "LOW"]}                      
                  </BoxPriority>
                </BoxCardFooterInfo>  
                <BoxCardFooterInfo>
                  <FooterType>
                    {(task?.headers?.category || type) && intl.formatMessage({id: `task.category.${task?.headers?.category || type}`}) || " - "}
                  </FooterType>
                  <FooterStatus>
                    <FormattedMessage id="task.status"/>: {task?.headers?.status}
                  </FooterStatus>
                </BoxCardFooterInfo>                                     
              </BoxCardFooter>                  
            </BoxCardContent>                              
          </BoxCard>
        </Card>
      ))}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          let _type = "";
          if(current?.headers.category === "APPROVAL_TASK" || type === "APPROVAL_TASK") {
            _type = "approval";
          } else if(current?.headers.category === "CERTIFICATION_TASK" || type === "CERTIFICATION_TASK") {
            _type = "certification";
          } else if(current?.headers.category === "PROVISIONING_TASK" || type === "PROVISIONING_TASK") {
            _type = "provisioning";
          } else if(current?.headers.category === "SOD_TASK" || type === "SOD_TASK") {
            _type = "sod";
          } else if(current?.headers.category === "ROLE_RIGHT_TASK" || type === "ROLE_RIGHT_TASK") {
            _type = "roleRight";
          }
          router.push(`/tasks/${_type}/${current?.identifier}`)
        }}>
          <MenuItemInfo>
            <MenuItemBox className="Blue">
              <InfoIcon width={21} height={21} color="#FFFFFF"/>
            </MenuItemBox>
            <FormattedMessage id="details" />
          </MenuItemInfo>           
        </MenuItem>  
        {(actions || []).includes("APPROVED") && (
          <MenuItem onClick={() => {
            if(current) {
              approve(current, intl, () => {
                resolve({
                  variables: {
                    payload: JSON.stringify([{
                      taskId: Number(current?.identifier), 
                      result: "APPROVED"                   
                    }])
                  }
                })
              });
            }          
          }}>
            <MenuItemInfo>
              <MenuItemBox className="Green">
                <CheckIcon width={21} height={21} color="#FFFFFF"/>
              </MenuItemBox>
              <FormattedMessage id="tasks.approve" />
            </MenuItemInfo>             
          </MenuItem>           
        )}
        {(actions || []).includes("DISAPPROVED") && (
          <MenuItem onClick={() => {
            setResult("DISAPPROVED");
            setOpenDisapprove(true);        
          }}>
            <MenuItemInfo>
              <MenuItemBox className="Red">
                <XIcon width={21} height={21} color="#FFFFFF"/>
              </MenuItemBox>
              <FormattedMessage id="tasks.disapprove" />
            </MenuItemInfo>             
          </MenuItem>           
        )}         
        {(actions || []).includes("CERTIFIED") && (
          <MenuItem onClick={() => {
            if(current) {
              certify(current, intl, () => {
                resolve({
                  variables: {
                    payload: JSON.stringify([{
                      taskId: Number(current?.identifier), 
                      result: "CERTIFIED"                   
                    }])
                  }
                })
              });
            }          
          }}>
            <MenuItemInfo>
              <MenuItemBox className="Blue">
                <UserIcon width={21} height={21} color="#FFFFFF"/>
              </MenuItemBox>
              <FormattedMessage id="tasks.certify" />
            </MenuItemInfo>             
          </MenuItem>         
        )}
        {(actions || []).includes("REVOKED") && (
          <MenuItem onClick={() => {
            setResult("REVOKED");
            setOpenDisapprove(true);        
          }}>
            <MenuItemInfo>
              <MenuItemBox className="Blue">
                <XIcon width={21} height={21} color="#FFFFFF"/>
              </MenuItemBox>
              <FormattedMessage id="tasks.revoke" />
            </MenuItemInfo>             
          </MenuItem>           
        )}    
        {(actions || []).includes("ALLOWED") && (
          <MenuItem onClick={() => {
            setResult("ALLOWED");
            setOpenDisapprove(true);          
          }}>
            <MenuItemInfo>
              <MenuItemBox className="Blue">
                <UserIcon width={21} height={21} color="#FFFFFF"/>
              </MenuItemBox>
              <FormattedMessage id="tasks.allow" />
            </MenuItemInfo>             
          </MenuItem>         
        )}    
        {(actions || []).includes("NOT_ALLOWED") && (
          <MenuItem onClick={() => {
            setResult("NOT_ALLOWED");
            setOpenDisapprove(true);          
          }}>
            <MenuItemInfo>
              <MenuItemBox className="Red">
                <XIcon width={21} height={21} color="#FFFFFF"/>
              </MenuItemBox>
              <FormattedMessage id="tasks.deny" />
            </MenuItemInfo>             
          </MenuItem>         
        )}  
        {(actions || []).includes("PROVISIONED") && (
          <MenuItem onClick={() => {
            if(current) {
              provision(current, intl, () => {
                resolve({
                  variables: {
                    payload: JSON.stringify([{
                      taskId: Number(current?.identifier), 
                      result: "PROVISIONED"                   
                    }])
                  }
                })
              });
            }          
          }}>
            <MenuItemInfo>
              <MenuItemBox className="Blue">
                <UserIcon width={21} height={21} color="#FFFFFF"/>
              </MenuItemBox>
              <FormattedMessage id="tasks.provisioned" />
            </MenuItemInfo>             
          </MenuItem>         
        )} 
        {(actions || []).includes("NOT_PROVISIONED") && (
          <MenuItem onClick={() => {
            setResult("NOT_PROVISIONED");
            setOpenDisapprove(true);          
          }}>
            <MenuItemInfo>
              <MenuItemBox className="Red">
                <XIcon width={21} height={21} color="#FFFFFF"/>
              </MenuItemBox>
              <FormattedMessage id="tasks.notProvisioned" />
            </MenuItemInfo>             
          </MenuItem>         
        )}         
        {(actions || []).includes("RESOLVE") && (
          <MenuItem onClick={() => {
            if(current) {
              resolveTask(current, intl, () => {
                resolve({
                  variables: {
                    payload: JSON.stringify([{
                      taskId: Number(current?.identifier),                                       
                    }])
                  }
                })
              });
            }          
          }}>
            <MenuItemInfo>
              <MenuItemBox className="Blue">
                <UserIcon width={21} height={21} color="#FFFFFF"/>
              </MenuItemBox>
              <FormattedMessage id="tasks.resolve" />
            </MenuItemInfo>             
          </MenuItem>         
        )}         
        {(data?.getAssignActions || []).includes("UNASSIGN") && (
          <MenuItem onClick={() => {
            if(current) {
              unassignTask(current, intl, () => {
                unassign({
                  variables: {
                    payload: JSON.stringify([{
                      taskId: Number(current?.identifier),                    
                    }])
                  }
                })
              });
            }          
          }}>
            <MenuItemInfo>
              <MenuItemBox className="Red">
                <XIcon width={21} height={21} color="#FFFFFF"/>
              </MenuItemBox>
              <FormattedMessage id="tasks.unassign" />
            </MenuItemInfo>           
          </MenuItem>
        )}
        {(data?.getAssignActions || []).includes("ASSIGN_TO_ME") && (
          <MenuItem onClick={() => {
            if(current) {
              assignToMeTask(current, intl, () => {
                assignToMe({
                  variables: {
                    payload: JSON.stringify([{
                      taskId: Number(current?.identifier),                    
                    }])
                  }
                })
              });
            }          
          }}>
            <MenuItemInfo>
              <MenuItemBox className="Blue">
                <UserIcon width={21} height={21} color="#FFFFFF"/>
              </MenuItemBox>
              <FormattedMessage id="tasks.assignToMe" />
            </MenuItemInfo>             
          </MenuItem>
        )}
        <DividerMenu/>
        <MenuItem onClick={() => setOpenForwardUser(true)}>
          <MenuItemInfo>
            <MenuItemBox className="Blue">
              <UsersIcon width={21} height={21} color="#FFFFFF"/>
            </MenuItemBox>
            <MenuItemContainer>
              <FormattedMessage id="tasks.forwardToUser" />
              <CaretRightIcon width={21} height={21} />
            </MenuItemContainer>            
          </MenuItemInfo>          
        </MenuItem>
        <MenuItem onClick={() => setOpenForwardQueue(true)}>
          <MenuItemInfo>
            <MenuItemBox className="Green">
              <ListNumbersIcon width={21} height={21} color="#FFFFFF"/>
            </MenuItemBox>
            <MenuItemContainer>
              <FormattedMessage id="tasks.forwardToQueue" />
              <CaretRightIcon width={21} height={21} />
            </MenuItemContainer>            
          </MenuItemInfo>          
        </MenuItem>     
      </Menu>
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
      <Disapprove
        modalOpen={openDisapprove}
        setModalOpen={setOpenDisapprove} 
        execute={executeDissaproved}
        task={current}     
      />  
    </>  
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Tasks);
