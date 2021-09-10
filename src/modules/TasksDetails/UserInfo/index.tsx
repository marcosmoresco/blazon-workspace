// vendors
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useTheme, themes } from "@theme/index";

// components
import Avatar from "@material-ui/core/Avatar";
import Check from "@icons/Check";
import CalendarIcon from "@icons/Calendar";
import BrowsersIcon from "@icons/BrowsersIcon";
import ArrowRightIcon from "@icons/ArrowRight";
import DetailUser from "@modules/Task/components/DetailUser";

//types
import { UserInfoProps } from "./types";

// styles
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
  Box,  
  BoxCardFooter,
  BoxCardFooterInfo,
  BoxPriority,
  BarPriorityLow,
  BarPriorityMedium,
  BarPriorityHigh,
  BoxCardStatus,
  InfoCheck,
  InfoBrowsers,
  TitleJustification,
  BoxJustification,
  BoxJustificationValue,
  JustificationDivider,
  InfoText,
  InfoTextContainer
} from "./style";

const UserInfo: React.FC<UserInfoProps> = ({ task }) => { 

  const router = useRouter();  
  const intl = useIntl();
  const { type } = router.query;
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const priorityToElement: { [key: string]: any } = {
    LOW: <BarPriorityLow variant="determinate" value={30} />,
    MEDIUM: <BarPriorityMedium variant="determinate" value={50} />,
    HIGH: <BarPriorityHigh variant="determinate" value={100} />,
  };

  return (
    <>
      <Box>        
        <BoxCard key={`task-${task?.identifier}`}>
          <BoxCardContent>
            <BoxCardHeader>
              <BoxCardHeaderContent>
                <BoxCardTitle>
                  {["approval", "sod"].includes(type as string) && (
                    task?.approvalItemDetails?.entitlementName || 
                    task?.approvalItemDetails?.roleName || 
                    task?.approvalItemDetails?.resourceName || " - "
                  )}
                  {type === "certification" && (
                    task?.certificationItemDetails?.resourceName || 
                    task?.certificationItemDetails?.roleName || 
                    task?.certificationItemDetails?.entitlementName || " - "
                  )}
                  {type === "provisioning" && (
                    task?.provisioningItemDetail?.resource?.name || " - "
                  )}
                  {type === "roleRight" && (
                    task?.itemDetails?.roleName || " - "
                  )}
                </BoxCardTitle>
                {type !== "roleRight" && (
                  <>
                    <BoxCardIdentifier
                      background={currentTheme.palette.info.main} 
                      color={currentTheme.palette.info.contrastText}>
                      ID: {["approval", "sod"].includes(type as string) && (
                        task?.approvalItemDetails?.entitlementIdentifier || 
                        task?.approvalItemDetails?.roleIdentifier || 
                        task?.approvalItemDetails?.resourceIdentifier || " - "
                      )}
                      {type === "certification" && (
                        task?.certificationItemDetails?.resourceIdentifier || 
                        task?.certificationItemDetails?.roleIdentifier || 
                        task?.certificationItemDetails?.entitlementIdentifier || " - "
                      )}
                      {type === "provisioning" && (
                        task?.provisioningItemDetail?.resource?.identifier || " - "
                      )}                  
                    </BoxCardIdentifier>
                    <BoxCardIdentifier
                      background={currentTheme.palette.info.main} 
                      color={currentTheme.palette.info.contrastText}>                   
                      <FormattedMessage id="category" />: <FormattedMessage id={`task.${type}`} />                 
                    </BoxCardIdentifier>   
                    <BoxCardIdentifier
                      background={currentTheme.palette.info.main} 
                      color={currentTheme.palette.info.contrastText}>
                      <FormattedMessage id="status"/>: {task?.headers?.status}
                    </BoxCardIdentifier>                 
                  </>
                )}                
              </BoxCardHeaderContent>
              <BoxCardHeaderContent>
                <BoxPriority>
                  <FormattedMessage id="task.priority" />
                  {priorityToElement[task?.headers?.priority || "LOW"]}
                </BoxPriority> 
                <InfoText>
                  <InfoTextContainer>
                    <FormattedMessage id="type" />                     
                    : {task?.type && intl.formatMessage({id: `task.type.${task?.type}`})}                    
                      {type === "roleRight" && intl.formatMessage({id: `task.newRoleRight`})}
                  </InfoTextContainer>                    
                </InfoText>                
              </BoxCardHeaderContent>  
            </BoxCardHeader>            
            <BoxCardText>
              {["approval", "sod"].includes(type as string) && (
                task?.approvalItemDetails?.entitlementDescription || 
                task?.approvalItemDetails?.roleDescription || 
                task?.approvalItemDetails?.resourceDescription || " - "
              )}
              {type === "certification" && (
                task?.certificationItemDetails?.resourceDescription || 
                task?.certificationItemDetails?.roleDescription || 
                task?.certificationItemDetails?.entitlementDescription || " - "
              )}
              {type === "provisioning" && (
                task?.provisioningItemDetail?.resource?.description || " - "
              )}
              {type === "roleRight" && (
                task?.itemDetails?.roleDescription || " - "
              )}
            </BoxCardText>                                      
            <BoxCardFooter>
              <BoxCardFooterInfo>
                <DetailUser task={task}/>        
                <ArrowRightIcon width={18} height={18}/>   
                <DetailUser task={task} user={task?.headers?.recipient} title="task.recipient"/>                         
              </BoxCardFooterInfo>
              <BoxCardFooterInfo>
                <BoxCardHeaderInfo>
                  <InfoText>
                    <InfoTextContainer>
                      <FormattedMessage id="createdAt" />: {task?.dates?.createdDate}
                    </InfoTextContainer>
                  </InfoText> 
                  {task?.headers?.status === "DONE" && (
                    <InfoText>
                      <InfoTextContainer>
                        <FormattedMessage id="resolvedAt" />: {task?.dates?.resolvedDate}
                      </InfoTextContainer>
                    </InfoText>
                  )}                                                     
                  <InfoText>
                    <InfoTextContainer>
                      <FormattedMessage id="deadline" />: {task?.dates?.deadline}
                    </InfoTextContainer>
                  </InfoText>
                </BoxCardHeaderInfo>
              </BoxCardFooterInfo>
            </BoxCardFooter>
            <JustificationDivider />            
            <TitleJustification>
              <FormattedMessage id="tasks.justification" />
            </TitleJustification>
            <BoxJustificationValue>
              {task?.justification || task?.revokeJustification || task?.itemDetails?.justification || " - "}
            </BoxJustificationValue>                       
          </BoxCardContent>
        </BoxCard>       
      </Box>      
    </>
  );
};

export default UserInfo;
