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
import type { ListProps, Request } from "@modules/Requests/types";
import { inProgressStatusList, processedStatusList } from "./constants";


const RequestDetail: FC<ListProps> = ({ request, type, id, checked = [], onCheck, subType = "any", size = 10, filteredString = "{}"}) => {

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
  const [current, setCurrent] = useState<Request>();

  const handleClick = (event: any) => {   
    setCurrent(request);
    setAnchorEl(event.currentTarget);       
  };     

  const handleClose = () => {
    setAnchorEl(null);
  };
    
  return (
    <>        
      <Card key={`task-${request?.identifier}`} 
        boxshadow="0px 4px 16px rgba(27, 32, 42, 0.08)"
        border="1px solid #EDEDEF;"
        margintop={16}
        marginbottom={16}>
        <BoxCard>            
          <BoxCardContent>
            <BoxCardHeader>
              <BoxCardHeaderContent>
                {/*inProgressStatusList.includes(request?.status as string) && (
                  <Checkbox value={checked.includes(request?.identifier || -1)} onChange={() => onCheck && onCheck(request?.identifier)}/>
                )*/}                  
                <BoxCardIdentifier
                  background="#EDEDEF" 
                  color={currentTheme.palette.primary.main}>
                  ID: {request?.identifier}
                </BoxCardIdentifier>                                                                                     
                <BoxCardIdentifier 
                  background="#EDEDEF" 
                  color={currentTheme.palette.primary.main}>
                  <FormattedMessage id="type" />                     
                  : {request?.type}                                                       
                </BoxCardIdentifier> 
              </BoxCardHeaderContent>                  
              <BoxCardHeaderInfo>                                    
                <BoxCardFooterInfo>
                  <InfoText>
                    <InfoTextContainer>
                      <FormattedMessage id="createdAt" />: {request?.createdAt}
                    </InfoTextContainer>                    
                    {processedStatusList.includes(request?.status as string) &&                    
                      <InfoTextContainer>
                        <FormattedMessage id="finalizedAt" />: {request?.finalizedAt}
                      </InfoTextContainer>
                    }
                    {inProgressStatusList.includes(request?.status as string) &&                    
                      <InfoTextContainer>
                        <FormattedMessage id="effectivedAt" />: {request?.effectiveDate}
                      </InfoTextContainer>
                    }                                     
                    <InfoTextContainer>
                      <FormattedMessage id="task.status"/>: {request?.status} 
                    </InfoTextContainer>                    
                  </InfoText>                                                                                                                                          
                </BoxCardFooterInfo>
              </BoxCardHeaderInfo>
            </BoxCardHeader>                      
            <BoxCardTitle>
              {[
                "CREATE_ACCOUNT", 
                "UPDATE_ACCOUNT", 
                "REVOKE_ACCOUNT",
                "INACTIVATE_ACCOUNT",
                "ACTIVATE_ACCOUNT",
                "CHECKIN_ADMIN_ACCOUNT_PASSWORD", 
                "CHECKOUT_ADMIN_ACCOUNT_PASSWORD", 
                "CHECKIN_APPLICATION_ACCOUNT_PASSWORD"
              ].includes(request?.type as string) && (
                request?.resource.name || " - "
              )}              
              {[
                "REVOKE_ENTITLEMENT", 
                "ASSIGN_ENTITLEMENT" 
              ].includes(request?.type as string) && (                                 
                <>
                  <BoxCardTitleResource>
                    {request?.resource?.name}
                  </BoxCardTitleResource> / {request?.entitlement?.name}
                </>  
              )}   
              {[
                "ASSIGN_ROLE", 
                "REVOKE_ROLE" 
              ].includes(request?.type as string) && (
                request?.role?.name || " - "
              )}        
            </BoxCardTitle> 
            {[
              "UPDATE_ACCOUNT", 
              "ACTIVATE_ACCOUNT", 
              "INACTIVATE_ACCOUNT",
              "REVOKE_ACCOUNT", 
              "CHECKIN_ADMIN_ACCOUNT_PASSWORD", 
              "CHECKOUT_ADMIN_ACCOUNT_PASSWORD", 
              "CHECKIN_APPLICATION_ACCOUNT_PASSWORD",
              "REVOKE_ENTITLEMENT", 
              "ASSIGN_ENTITLEMENT"
            ].includes(request?.type as string) && 
            <BoxJustification className="Add-top">
              <TitleJustification>
                <FormattedMessage id="accountIdentifier" />
              </TitleJustification>
              <BoxJustificationValue>
                {request?.resource?.accountIdentifier || " - "}
              </BoxJustificationValue>
            </BoxJustification>}         
            <BoxCardFooter>
              <BoxCardFooterInfo>       
                <DetailUser request={request} user={request?.requester} title="request.requester"/>                          
                {request?.beneficiary && <DetailUser request={request} user={request?.beneficiary} title="request.beneficiary"/>}                               
              </BoxCardFooterInfo> 
              <BoxCardFooterInfo>                                                                                  
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
          router.push(`/requests/${current?.identifier}`)
        }}>
          <MenuItemInfo>
            <MenuItemBox className="Blue">
              <InfoIcon width={21} height={21} color="#FFFFFF"/>
            </MenuItemBox>
            <FormattedMessage id="details" />
          </MenuItemInfo>           
        </MenuItem>                                  
      </Menu>      
    </>  
  );
};

const Requests: FC<ListProps> = ({ list = [], type, id, checked = [], onCheck, subType = "any", size = 10, filteredString = "{}"}) => {

  return (
    <>      
      {list.map((request: Request, index: number) => (
        <RequestDetail 
          key={`request-${request.identifier}-${index}`} 
          type={type}
          id={id}
          checked={checked}
          onCheck={onCheck}
          subType={subType}
          size={size}
          filteredString={filteredString}
          request={request} />       
      ))}      
    </>  
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Requests);
