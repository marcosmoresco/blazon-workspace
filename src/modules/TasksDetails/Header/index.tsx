// vendors
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import apolloClient from "@utils/apollo-client";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme, themes } from "@theme/index";

// components
import CirclesFour from "@icons/CirclesFour";
import Button from "@components/Button";
import DotsThreeIcon from "@icons/DotsThree";
import UserIcon from "@icons/User";
import UsersIcon from "@icons/Users";
import ListNumbersIcon from "@icons/ListNumbers";
import CaretRightIcon from "@icons/CaretRight";
import XIcon from "@icons/X";
import ForwardUser from "@modules/Task/components/ForwardUser";
import ForwardQueue from "@modules/Task/components/ForwardQueue";
import Disapprove from "@modules/Task/components/Disapprove";

//constants
import {
  getAvailableActionsByType,
} from "./constants";
import { 
  unassign as unassignTask,
  assignToMe as assignToMeTask,
  resolve as resolveTask,
  approve,
  certify,
  provision,
  getActionsByType,
  getQueryByType 
} from "@modules/Task/constants";

//types
import { HeaderProps } from "./types";

//queries
import { 
  GET_ASSIGN_ACTIONS,
  GET_DIRECTORY_RESOURCE
} from "@modules/Task/queries";

//mutations
import {
  DEFINE_ACCOUNT_IDENTIFIER_PROVISIONING_TASK,
  DEFINE_USERNAME_PASSWORD_PROVISIONING_TASK,
  CHANGE_PASSWORD_PROVISIONING_TASK
} from "@modules/Task/mutations";

// styles
import {
  HeaderPage,
  InfoHeaderPage,
  TypeStyle,
  MembershipStyle,
  ButtonsArea,
  Actions,
  StyledMenu,
  DividerMenu,
  MenuItemInfo,
  MenuItemBox,
  MenuItemContainer
} from "./style";

const Header: React.FC<HeaderProps> = ({ task, payload, setPayload, stage, setStage }) => {
  console.log(stage);
  const dispatch = useDispatch();
  const router = useRouter();
  const intl = useIntl();
  const { id, type } = router.query;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openForwardUser, setOpenForwardUser] = useState(false);
  const [openForwardQueue, setOpenForwardQueue] = useState(false);
  const [openDisapprove, setOpenDisapprove] = useState(false);
  const [result, setResult] = useState("DISAPPROVED");
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };
  
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { loading, error, data, refetch } = useQuery<{
    getAssignActions: string[];
  }>(GET_ASSIGN_ACTIONS, {
    variables: {
      status: `["${task?.headers?.status || "TODO"}"]`
    },
  });

  const { loading: loadingActions, data: dataActions } = useQuery<{
    getActions: string[]
  }>(getAvailableActionsByType(type || "approval"), {
    variables: {
      status: `["${task?.headers?.status || "TODO"}"]`
    },  
  });

  const [assignToMe, {}] = useMutation(getActionsByType(type || "approval").assignToMe, { 
    refetchQueries: [
      {
        query: getQueryByType(type || "approval"),
        variables: {
          id: Number(id)
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
        setAnchorEl(null);        
      }     
    },
  });

  const [unassign, {}] = useMutation(getActionsByType(type || "approval").unassign, { 
    refetchQueries: [
      {
        query: getQueryByType(type || "approval"),
        variables: {
          id: Number(id)
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
        setAnchorEl(null);        
      }     
    },
  });

  const [forwardToUser, {}] = useMutation(getActionsByType(type || "approval").forwardToUser, { 
    refetchQueries: [
      {
        query: getQueryByType(type || "approval"),
        variables: {
          id: Number(id)
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
        setAnchorEl(null);        
      }     
    },
  });

  const [forwardToQueue, {}] = useMutation(getActionsByType(type || "approval").forwardToQueue, { 
    refetchQueries: [
      {
        query: getQueryByType(type || "approval"),
        variables: {
          id: Number(id)
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
        setAnchorEl(null);        
      }     
    },
  });

  const [resolve, {}] = useMutation(getActionsByType(type || "approval").resolve, { 
    refetchQueries: [
      {
        query: getQueryByType(type || "approval"),
        variables: {
          id: Number(id)
        }
      },
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
  

  const [changePasswordProvisioningTask, {}] = useMutation(CHANGE_PASSWORD_PROVISIONING_TASK, {   
    onCompleted: ({ changePasswordProvisioningTask }) => {
      if(changePasswordProvisioningTask) {          
        setAnchorEl(null);      
        resolve({
          variables: {
            payload: JSON.stringify([{
              taskId: Number(id),
              result: "PROVISIONED"                    
            }])
          }
        });
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

  const [defineUsernamePasswordProvisioningTask, {}] = useMutation(DEFINE_USERNAME_PASSWORD_PROVISIONING_TASK, {    
    onCompleted: ({ defineUsernamePasswordProvisioningTask }) => {
      if(defineUsernamePasswordProvisioningTask) {          
        setAnchorEl(null);      
        resolve({
          variables: {
            payload: JSON.stringify([{
              taskId: Number(id),
              result: "PROVISIONED"                    
            }])
          }
        });
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

  const [defineAccountIdentifierProvisioningTask, {}] = useMutation(DEFINE_ACCOUNT_IDENTIFIER_PROVISIONING_TASK, {   
    onCompleted: ({ defineAccountIdentifierProvisioningTask }) => {
      if(defineAccountIdentifierProvisioningTask) {          
        setAnchorEl(null);      
        apolloClient
          .query({
            query: GET_DIRECTORY_RESOURCE,
            variables: {
              id: task?.provisioningItemDetail?.resource?.identifier
            },
            fetchPolicy: "network-only"
          })
          .then(({ data }) => {
            if(data?.getDirectoryResource?.passwordVaultEnabled) {
              setPayload(undefined);
              setStage("SET_USERNAME_PASSWORD");
            } else {
              resolve({
                variables: {
                  payload: JSON.stringify([{
                    taskId: Number(id),
                    result: "PROVISIONED"                    
                  }])
                }
              });
            }                        
          });
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
          taskId: Number(id),
          userId
        }])
      }
    });
  };

  const executeForwardToQueue = (queueId: number): void => {
    forwardToQueue({
      variables: {
        payload: JSON.stringify([{
          taskId: Number(id),
          queueId
        }])
      }
    });
  };

  const executeDissaproved = (justification: string): void => {
    resolve({
      variables: {
        payload: JSON.stringify([{
          taskId: Number(id),
          result,
          justification
        }])
      }
    });
  };

  return (
    <>
      <HeaderPage>
        <div></div>
        <ButtonsArea>
          {(dataActions?.getActions || []).includes("APPROVED") && (
            <Button variant="contained" color="default-primary" onClick={() => {
              if(task) {
                approve(task, intl, () => {
                  resolve({
                    variables: {
                      payload: JSON.stringify([{
                        taskId: Number(id),
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
          {(dataActions?.getActions || []).includes("DISAPPROVED") && (
            <Button variant="contained" color="secondary" onClick={() => {
              setResult("DISAPPROVED");
              setOpenDisapprove(true);
            }}>
             <FormattedMessage id="tasks.disapprove" />
            </Button>
          )} 
          {(dataActions?.getActions || []).includes("CERTIFIED") && (
            <Button variant="contained" color="default-primary" onClick={() => {
              if(task) {
                certify(task, intl, () => {
                  resolve({
                    variables: {
                      payload: JSON.stringify([{
                        taskId: Number(id),
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
          {(dataActions?.getActions || []).includes("REVOKED") && (
            <Button variant="contained" color="secondary" onClick={() => {
              setResult("REVOKED");
              setOpenDisapprove(true);
            }}>
             <FormattedMessage id="tasks.revoke" />
            </Button>
          )}              
          {(dataActions?.getActions || []).includes("ALLOWED") && (
            <Button variant="contained" color="default-primary" onClick={() => {
              setResult("ALLOWED");
              setOpenDisapprove(true);
            }}>
             <FormattedMessage id="tasks.allow" />
            </Button>
          )} 
          {(dataActions?.getActions || []).includes("NOT_ALLOWED") && (
            <Button variant="contained" color="secondary" onClick={() => {
              setResult("NOT_ALLOWED");
              setOpenDisapprove(true);
            }}>
             <FormattedMessage id="tasks.deny" />
            </Button>
          )}   
          {(dataActions?.getActions || []).includes("PROVISIONED") && 
            (!["CREATE_ACCOUNT", "CHANGE_PASSWORD"].includes(task?.type || "") || "WAITING_ASSING" === task?.headers?.status) && (
            <Button variant="contained" color="default-primary" onClick={() => {
              if(task) {
                provision(task, intl, () => {
                  resolve({
                    variables: {
                      payload: JSON.stringify([{
                        taskId: Number(id),
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
          {(dataActions?.getActions || []).includes("NOT_PROVISIONED") && !stage && (
            <Button variant="contained" color="secondary" onClick={() => {
              setResult("NOT_PROVISIONED");
              setOpenDisapprove(true);
            }}>
             <FormattedMessage id="tasks.notProvisioned" />
            </Button>
          )}
          {(dataActions?.getActions || []).includes("PROVISIONED") && ["CREATE_ACCOUNT", "CHANGE_PASSWORD"].includes(task?.type || "") && (
            <>
              {"CREATE_ACCOUNT" === task?.type && !stage && (
                <Button 
                  variant="contained" 
                  color="primary"                  
                  onClick={() => {             
                    setStage("SET_ACCOUNT_IDENTIFIER");
                  }}>
                  <FormattedMessage id="continue" />
                </Button>
              )}
              {"CREATE_ACCOUNT" === task?.type && stage === "SET_ACCOUNT_IDENTIFIER" && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  disabled={!payload?.accountIdentifier}
                  onClick={() => {             
                    defineAccountIdentifierProvisioningTask({
                      variables: {
                        id: Number(id),
                        accountIdentifier: payload?.accountIdentifier
                      }                  
                    });
                  }}>
                  <FormattedMessage id="continue" />
                </Button>
              )}
              {"CREATE_ACCOUNT" === task?.type && stage === "SET_USERNAME_PASSWORD" && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  disabled={!payload?.username || !payload?.password}
                  onClick={() => {             
                    defineUsernamePasswordProvisioningTask({
                      variables: {
                        id: Number(id),
                        username: payload?.username,
                        password: payload?.password
                      }                  
                    });
                  }}>
                  <FormattedMessage id="conclude" />
                </Button>
              )}
              {"CHANGE_PASSWORD" === task?.type && !stage && (
                <Button 
                  variant="contained" 
                  color="primary"                 
                  onClick={() => {             
                    setStage("SET_PASSWORD");
                  }}>
                  <FormattedMessage id="continue" />
                </Button>
              )}
              {"CHANGE_PASSWORD" === task?.type && stage === "SET_PASSWORD" && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  disabled={!payload?.password}
                  onClick={() => {             
                    changePasswordProvisioningTask({
                      variables: {
                        id: Number(id),                        
                        password: payload?.password
                      }                
                    });
                  }}>
                  <FormattedMessage id="continue" />
                </Button>
              )}
            </>            
          )}
          {(dataActions?.getActions || []).includes("RESOLVE") && (
            <Button variant="contained" color="default-primary" onClick={() => {
              if(task) {
                resolveTask(task, intl, () => {
                  resolve({
                    variables: {
                      payload: JSON.stringify([{
                        taskId: Number(id),                       
                      }])
                    }
                  });
                }, currentTheme);
              }
            }}>
              <FormattedMessage id="tasks.resolve" />
            </Button>
          )}
          {task?.headers?.status !== "DONE" && (type !== "provisioning" || !stage) && (
            <Actions onClick={handleClick}>
             <DotsThreeIcon height={24} width={24}/>
            </Actions>
          )}            
        </ButtonsArea>
      </HeaderPage>     
      <StyledMenu        
        anchorEl={anchorEl}
        keepMounted
        disableAutoFocusItem
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/*(data?.getAssignActions || []).includes("UNASSIGN") && (
          <MenuItem onClick={() => {
            if(task) {
              unassignTask(task, intl, () => {
                unassign({
                  variables: {
                    payload: JSON.stringify([{
                      taskId: Number(id),                    
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
            if(task) {
              assignToMeTask(task, intl, () => {
                assignToMe({
                  variables: {
                    payload: JSON.stringify([{
                      taskId: Number(id),                    
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
      </StyledMenu>  
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
        task={task}     
      />  
    </>
  );
};
export default Header;
