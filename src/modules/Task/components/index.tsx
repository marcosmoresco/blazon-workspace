import React, { FC, useState, useEffect, useRef } from "react";
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
import CaretDownIcon from "@icons/CaretDown";
import CaretUpIcon from "@icons/CaretUp";
import ArrowRightIcon from "@icons/ArrowRight";
import CalendarIcon from "@icons/CalendarBlank";
import CheckIcon from "@icons/Check";
import CirclesFourIcon from "@icons/CirclesFour";
import DotsThreeIcon from "@icons/DotsThree";
import InfoIcon from "@icons/Info";
import DividerIcon from "@icons/Divider";
import Divider from '@material-ui/core/Divider';
import { connect } from "react-redux";
//import { all, save, remove } from './actions'
import { addMessage } from "@actions/index";
import { 
  unassign as unassignTask,
  assignToMe as assignToMeTask,
  resolve as resolveTask,
  notAllowed,
  approve,
  certify,
  provision,
  getActionsByType,
  getQueryListByType 
} from "@modules/Task/constants";
import {
  getAvailableActionsByType,
} from "@modules/TasksDetails/Header/constants";
import { useTheme, themes } from "@theme/index";

// components
import UserIcon from "@icons/User";
import UsersIcon from "@icons/Users";
import ListNumbersIcon from "@icons/ListNumbers";
import CaretRightIcon from "@icons/CaretRight";
import XIcon from "@icons/X";
import ForwardUser from "@modules/Task/components/ForwardUser";
import ForwardQueue from "@modules/Task/components/ForwardQueue";
import Disapprove from "@modules/Task/components/Disapprove";
import DetailUser from "@components/DetailUser";

import {  
  BoxCard,
  BoxCardContent,
  BoxCardText,
  BoxCardHeader,
  BoxCardHeaderContent,
  BoxCardHeaderInfo,
  BoxCardTitle,
  BoxCardTitleResource,
  BoxCardIdentifier,
  Info,
  InfoText,
  InfoTextContainer,
  InfoDivider,
  BoxCardFooter,
  BoxCardFooterInfo,
  BoxPriority,
  BarPriorityLow,
  BarPriorityMedium,
  BarPriorityHigh,
  FooterType,
  FooterStatus,
  Actions,
  ButtonsArea,
  TitleJustification,
  BoxJustification,
  BoxJustificationValue
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

const TaskDetail: FC<ListProps> = ({ task, type, id, checked = [], onCheck, subType = "any", size = 10, filteredString = "{}"}) => {

  const router = useRouter();
  const intl = useIntl();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

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
  const [expanded, setExpanded] = useState<number[]>([]);
  const [result, setResult] = useState("DISAPPROVED");  
  const [actions, setActions] = useState<string[]>([]);

  let _type = getType(current, type);

  const handleClick = (event: any) => {   
    setCurrent(task);
    setAnchorEl(event.currentTarget);       
  };  

  const caller = useRef(false);

  useEffect(() => {
    
    if(!actions.length && task && !caller.current) {

      let t = getType(task, type);         
      
      caller.current = true;
      apolloClient
        .query({
          query: getAvailableActionsByType(t || "approval"),
          variables: {
            status: `["${task?.headers?.status || "TODO"}"]`
          },
          fetchPolicy: "network-only"
        })
        .then(({ data }) => { 
          setActions(data.getActions || []);
        });

    }         
  }, [actions, type, task]);  

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const { loading, error, data, refetch } = useQuery<{
    getAssignActions: string[];
  }>(GET_ASSIGN_ACTIONS, {
    variables: {
      status: `["${task?.headers?.status}"]`
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
      <Card key={`task-${task?.identifier}`} 
        boxshadow="0px 4px 16px rgba(27, 32, 42, 0.08)"
        border="1px solid #EDEDEF;"
        margintop={16}
        marginbottom={16}>
        <BoxCard>            
          <BoxCardContent>
            <BoxCardHeader>
              <BoxCardHeaderContent>
                {task?.headers?.status !== "DONE" && (
                  <Checkbox value={checked.includes(task?.identifier || -1)} onChange={() => onCheck && onCheck(task?.identifier)}/>
                )}                  
                <BoxCardIdentifier
                  background="#EDEDEF" 
                  color={currentTheme.palette.primary.main}>
                  ID: {task?.identifier}
                </BoxCardIdentifier>                                  
                <BoxCardIdentifier
                  background="#EDEDEF" 
                  color={currentTheme.palette.primary.main}>                   
                  <FormattedMessage id="category" />: {(task?.headers?.category || type) && intl.formatMessage({id: `task.category.${task?.headers?.category || type}`}) || " - "}                    
                </BoxCardIdentifier>                   
                {(task?.headers?.category !== "ROLE_RIGHT_TASK" && type !== "ROLE_RIGHT_TASK") && 
                <BoxCardIdentifier 
                  background="#EDEDEF" 
                  color={currentTheme.palette.primary.main}>
                  <FormattedMessage id="type" />                     
                  : {task?.type && intl.formatMessage({id: `task.type.${task?.type}`})}                                                       
                </BoxCardIdentifier>}  
              </BoxCardHeaderContent>                  
              <BoxCardHeaderInfo>                                    
                <BoxCardFooterInfo>
                  <InfoText>
                    <InfoTextContainer>
                      <FormattedMessage id="createdAt" />: {task?.dates?.createdDate}
                    </InfoTextContainer>
                    {task?.headers?.status === "TODO" &&                    
                      <InfoTextContainer>
                        <FormattedMessage id="deadline" />: {task?.dates?.deadline}
                      </InfoTextContainer>
                    }
                    {task?.headers?.status === "DONE" &&                    
                      <InfoTextContainer>
                        <FormattedMessage id="resolvedAt" />: {task?.dates?.resolvedDate}
                      </InfoTextContainer>
                    }
                    {task?.headers?.status === "CANCELED" &&                    
                      <InfoTextContainer>
                        <FormattedMessage id="task.status"/>: {task?.headers?.status} 
                      </InfoTextContainer>
                    }
                  </InfoText>                                                                       
                  {task?.headers?.status !== "CANCELED" && task?.headers?.result && 
                  <InfoText>
                    <InfoTextContainer>
                      <FormattedMessage id="result"/>: {task?.headers.result} 
                    </InfoTextContainer>                    
                  </InfoText>}                                                 
                </BoxCardFooterInfo>
              </BoxCardHeaderInfo>
            </BoxCardHeader>
            <BoxCardTitle>
              {(["APPROVAL_TASK", "SOD_TASK"].includes(task?.headers?.category || "") || ["APPROVAL_TASK", "SOD_TASK"].includes(type as string)) && (
                task?.approvalItemDetails?.entitlementName && (
                  <>
                    <BoxCardTitleResource>
                      {task?.approvalItemDetails?.resourceName}
                    </BoxCardTitleResource> / {task?.approvalItemDetails?.entitlementName}
                  </>  
                ) || 
                task?.approvalItemDetails?.roleName || 
                task?.approvalItemDetails?.resourceName || " - "
              ) || ""}
              {(task?.headers?.category === "CERTIFICATION_TASK" || type === "CERTIFICATION_TASK") && (
                task?.certificationItemDetails?.entitlementName && (
                  <>
                    <BoxCardTitleResource>
                      {task?.certificationItemDetails?.resourceName}
                    </BoxCardTitleResource> / {task?.certificationItemDetails?.entitlementName}
                  </>  
                ) || 
                task?.certificationItemDetails?.resourceName || 
                task?.certificationItemDetails?.roleName || " - "
              ) || ""}
              {(task?.headers?.category === "PROVISIONING_TASK" || type === "PROVISIONING_TASK") && (
                task?.provisioningItemDetail?.entitlement?.name && (
                  <>
                    <BoxCardTitleResource>
                      {task?.provisioningItemDetail?.resource?.name}
                    </BoxCardTitleResource> / {task?.provisioningItemDetail?.entitlement?.name}
                  </>  
                ) || 
                task?.provisioningItemDetail?.resource?.name || " - "
              ) || ""}
              {(task?.headers?.category === "ROLE_RIGHT_TASK" || type === "ROLE_RIGHT_TASK") && (
                task?.itemDetails?.roleName || " - "
              ) || ""}
            </BoxCardTitle>
            {!["PROVISIONING_TASK", "CERTIFICATION_TASK"].includes(task?.headers?.category || "") && !["PROVISIONING_TASK", "CERTIFICATION_TASK"].includes(type || "") && 
            <BoxJustification>
              <TitleJustification>
                <FormattedMessage id="tasks.justification" />
              </TitleJustification>
              <BoxJustificationValue>
                {task?.justification || task?.revokeJustification || task?.itemDetails?.justification || " - "}
              </BoxJustificationValue>
            </BoxJustification>}  
            {(["PROVISIONING_TASK"].includes(task?.headers?.category || "") || ["PROVISIONING_TASK"].includes(type || "")) &&
             (["UPDATE_ACCOUNT", "ACTIVATE_ACCOUNT", "INACTIVATE_ACCOUNT", "REVOKE_ACCOUNT", "CHANGE_PASSWORD", "GRANT_ENTITLEMENT", 
               "REVOKE_ENTITLEMENT"]).includes(task?.type) && 
            <BoxJustification>
              <TitleJustification>
                <FormattedMessage id="accountIdentifier" />
              </TitleJustification>
              <BoxJustificationValue>
                {task?.provisioningItemDetail?.account?.accountIdentifier || " - "}
              </BoxJustificationValue>
            </BoxJustification>}                  
            {expanded.includes(task?.identifier || -1) && (
            <BoxCardText>
              {(["APPROVAL_TASK", "SOD_TASK"].includes(task?.headers?.category || "") || ["APPROVAL_TASK", "SOD_TASK"].includes(type || "")) && (
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
            </BoxCardText>)}
            <BoxCardFooter>
              <BoxCardFooterInfo>
                <DetailUser task={task}/>                    
                <DetailUser task={task} user={task?.headers?.recipient} title="task.recipient"/>                               
              </BoxCardFooterInfo> 
              <BoxCardFooterInfo>
                <ButtonsArea>
                  {(actions || []).includes("APPROVED") && (
                    <Button variant="contained" color="default-primary" onClick={() => {
                      if(task) {
                        approve(task, intl, () => {
                          resolve({
                            variables: {
                              payload: JSON.stringify([{
                                taskId: task?.identifier,
                                result: "APPROVED"
                              }])
                            }
                          });
                        }, currentTheme);
                      }
                    }}>
                      <FormattedMessage id="tasks.approve" />
                    </Button>
                  )}
                  {(actions || []).includes("DISAPPROVED") && (
                    <Button variant="contained" color="secondary" onClick={() => {
                      setCurrent(task);
                      setResult("DISAPPROVED");
                      setOpenDisapprove(true);
                    }}>
                    <FormattedMessage id="tasks.disapprove" />
                    </Button>
                  )} 
                  {(actions || []).includes("CERTIFIED") && (
                    <Button variant="contained" color="default-primary" onClick={() => {
                      if(task) {
                        certify(task, intl, () => {
                          resolve({
                            variables: {
                              payload: JSON.stringify([{
                                taskId: task?.identifier,
                                result: "CERTIFIED"
                              }])
                            }
                          });
                        }, currentTheme);
                      }
                    }}>
                      <FormattedMessage id="tasks.certify" />
                    </Button>
                  )}
                  {(actions || []).includes("REVOKED") && (
                    <Button variant="contained" color="secondary" onClick={() => {
                      setCurrent(task);
                      setResult("REVOKED");
                      setOpenDisapprove(true);
                    }}>
                    <FormattedMessage id="tasks.revoke" />
                    </Button>
                  )}              
                  {(actions || []).includes("ALLOWED") && (
                    <Button variant="contained" color="default-primary" onClick={() => {
                      setCurrent(task);
                      setResult("ALLOWED");
                      setOpenDisapprove(true);
                    }}>
                    <FormattedMessage id="tasks.allow" />
                    </Button>
                  )} 
                  {(actions || []).includes("NOT_ALLOWED") && (
                    <Button variant="contained" color="secondary" onClick={() => {                     
                      if(task) {
                        notAllowed(task, intl, () => {
                          resolve({
                            variables: {
                              payload: JSON.stringify([{
                                taskId: task?.identifier,
                                result: "NOT_ALLOWED"
                              }])
                            }
                          });
                        }, currentTheme);
                      }
                    }}>
                    <FormattedMessage id="tasks.deny" />
                    </Button>
                  )}   
                  {(actions || []).includes("PROVISIONED") && 
                    (!["CREATE_ACCOUNT", "CHANGE_PASSWORD"].includes(task?.type || "") || "WAITING_ASSING" === task?.headers?.status) && (
                    <Button variant="contained" color="default-primary" onClick={() => {
                      if(task) {
                        provision(task, intl, () => {
                          resolve({
                            variables: {
                              payload: JSON.stringify([{
                                taskId: task?.identifier,
                                result: "PROVISIONED"
                              }])
                            }
                          });
                        }, currentTheme);
                      }
                    }}>
                      <FormattedMessage id="tasks.provisioned" />
                    </Button>
                  )}
                  {(actions || []).includes("NOT_PROVISIONED") && (
                    <Button variant="contained" color="secondary" onClick={() => {
                      setCurrent(task);
                      setResult("NOT_PROVISIONED");
                      setOpenDisapprove(true);
                    }}>
                    <FormattedMessage id="tasks.notProvisioned" />
                    </Button>
                  )}                  
                  {/*(actions || []).includes("RESOLVE") && (
                    <Button variant="contained" color="default-primary" onClick={() => {
                      if(task) {
                        resolveTask(task, intl, () => {
                          resolve({
                            variables: {
                              payload: JSON.stringify([{
                                taskId: task?.identifier,                       
                              }])
                            }
                          });
                        });
                      }
                    }}>
                      <FormattedMessage id="tasks.resolve" />
                    </Button>
                  )*/}                            
                </ButtonsArea>                                                                  
                <Actions onClick={(e: any) => handleClick(e)}>
                  <DotsThreeIcon color="#26213F" stroke={2}/>
                </Actions>
                {/*<Info className="Selectable" onClick={() => expanded.includes(task?.identifier) ? setExpanded(expanded.filter((id) => id !== task?.identifier)) : setExpanded([...expanded, task?.identifier])}>
                  <FormattedMessage id="viewMore"/>
                  {expanded.includes(task?.identifier) ? (
                    <CaretUpIcon width={20} color="#26213F" stroke={2}/>
                  ) : (
                    <CaretDownIcon width={20} color="#26213F" stroke={2}/> 
                  )}                                    
                  </Info>*/}
              </BoxCardFooterInfo>                                                                    
            </BoxCardFooter> 
            {expanded.includes(task?.identifier || -1) && (
            <>
              <InfoDivider />    
              <BoxCardFooter>
                <BoxCardFooterInfo>
                  <InfoText>
                    <InfoTextContainer>
                      <FormattedMessage id="createdAt" />: {task?.dates?.createdDate}
                    </InfoTextContainer>
                  </InfoText> 
                  {task?.headers?.status === "DONE" && 
                  <InfoText>
                    <InfoTextContainer>
                      <FormattedMessage id="resolvedAt" />: {task.dates?.resolvedDate}
                    </InfoTextContainer>
                  </InfoText>}
                  <InfoText>
                    <InfoTextContainer>
                      <FormattedMessage id="deadline" />: {task?.dates?.deadline}
                    </InfoTextContainer>
                  </InfoText>                          
                </BoxCardFooterInfo>  
                <BoxCardFooterInfo>                                   
                  <InfoText>
                    <InfoTextContainer>
                      <FormattedMessage id="type" />                     
                      : {task?.type && intl.formatMessage({id: `task.type.${task?.type}`})}
                      {task?.headers?.category === "ROLE_RIGHT_TASK" && (
                        <FormattedMessage id="role" />
                      )}
                    </InfoTextContainer>                    
                  </InfoText>                                                    
                </BoxCardFooterInfo>                                     
              </BoxCardFooter>
            </>)}              
          </BoxCardContent>                              
        </BoxCard>
      </Card>
      
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
        {/*(data?.getAssignActions || []).includes("UNASSIGN") && (
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
        )*/}
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
              }, currentTheme);
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
        {(data?.getAssignActions.includes("FORWARD_TO_USER")  || data?.getAssignActions.includes("FORWARD_TO_QUEUE")) 
        && <DividerMenu/>}
        {data?.getAssignActions.includes("FORWARD_TO_USER") && 
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
        }      
        {data?.getAssignActions.includes("FORWARD_TO_QUEUE") && 
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
      }     
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

const Tasks: FC<ListProps> = ({ list = [], type, id, checked = [], onCheck, subType = "any", size = 10, filteredString = "{}"}) => {

  return (
    <>      
      {list.map((task: Task, index: number) => (
        <TaskDetail 
          key={`task-${task.identifier}-${index}`} 
          type={type}
          id={id}
          checked={checked}
          onCheck={onCheck}
          subType={subType}
          size={size}
          filteredString={filteredString}
          task={task} />       
      ))}      
    </>  
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Tasks);
