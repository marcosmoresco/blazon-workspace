// vendors
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useTheme, themes } from "@theme/index";

// components
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
                <>
                  <BoxCardIdentifier
                    background="#EDEDEF" 
                    color={currentTheme.palette.primary.main}>
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
                    background="#EDEDEF" 
                    color={currentTheme.palette.primary.main}>                   
                    <FormattedMessage id="category" />: <FormattedMessage id={`task.${type}`} />                 
                  </BoxCardIdentifier>   
                  {type !== "roleRight" && 
                  <BoxCardIdentifier
                    background="#EDEDEF" 
                    color={currentTheme.palette.primary.main}>
                    <FormattedMessage id="type" />                     
                    : {task?.type && intl.formatMessage({id: `task.type.${task?.type}`})}                                         
                  </BoxCardIdentifier>}                 
                </>                              
              </BoxCardHeaderContent>
              <BoxCardHeaderContent>
                <BoxPriority>
                  <FormattedMessage id="task.priority" />
                  {priorityToElement[task?.headers?.priority || "LOW"]}
                </BoxPriority> 
                <InfoText>
                  <InfoTextContainer>
                    <FormattedMessage id="status"/>: {task?.headers?.status}
                  </InfoTextContainer>                    
                </InfoText>                
              </BoxCardHeaderContent>  
            </BoxCardHeader>   
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
            {/*<BoxCardText>
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
              </BoxCardText> */}                                      
            <BoxCardFooter>
              <BoxCardFooterInfo>
                <DetailUser task={task}/>                           
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
            <BoxJustification>
              <TitleJustification>
                <FormattedMessage id="tasks.justification" />
              </TitleJustification>
              <BoxJustificationValue>
                {task?.justification || task?.revokeJustification || task?.itemDetails?.justification || " - "}
              </BoxJustificationValue>
            </BoxJustification>                                              
          </BoxCardContent>
        </BoxCard>       
      </Box>      
    </>
  );
};

export default UserInfo;
