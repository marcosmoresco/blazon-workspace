// vendors
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useTheme, themes } from "@theme/index";

// components
import DetailUser from "@components/DetailUser";

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

import {
  BoxCardTitleResource
} from "@modules/Task/styles";

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
                    {task?.identifier || " - "}                                      
                  </BoxCardIdentifier>                                  
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
                {task?.headers?.result && 
                  <InfoText>
                    <InfoTextContainer>
                      {task?.headers.result} 
                    </InfoTextContainer>                    
                  </InfoText>}                
              </BoxCardHeaderContent>  
            </BoxCardHeader>   
            <BoxCardTitle>
              {["approval", "sod"].includes(type as string) && (
                 task?.approvalItemDetails?.entitlementName && (
                  <>
                    <BoxCardTitleResource>
                      {task?.approvalItemDetails?.resourceName}
                    </BoxCardTitleResource> / {task?.approvalItemDetails?.entitlementName}
                  </>  
                ) || 
                task?.approvalItemDetails?.roleName || 
                task?.approvalItemDetails?.resourceName || " - "
              )}
              {type === "certification" && (
                 task?.certificationItemDetails?.entitlementName && (
                  <>
                    <BoxCardTitleResource>
                      {task?.certificationItemDetails?.resourceName}
                    </BoxCardTitleResource> / {task?.certificationItemDetails?.entitlementName}
                  </>  
                ) || 
                task?.certificationItemDetails?.roleName || 
                task?.certificationItemDetails?.resourceName || " - "
              )}
              {type === "provisioning" && (
                task?.provisioningItemDetail?.entitlement && (
                  <>
                    <BoxCardTitleResource>
                      {task?.provisioningItemDetail?.resource?.name}
                    </BoxCardTitleResource> / {task?.provisioningItemDetail?.entitlement?.name}
                  </>
                ) || (
                  task?.provisioningItemDetail?.resource?.name || " - "
                )
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
                {task?.headers?.recipient && <DetailUser task={task} user={task?.headers?.recipient} title="task.recipient"/>}                         
              </BoxCardFooterInfo>
              <BoxCardFooterInfo>
                <BoxCardHeaderInfo>
                  <InfoText>
                    <InfoTextContainer>
                      <FormattedMessage id="createdAt" />: {task?.dates?.createdDate}
                    </InfoTextContainer>
                    {task?.headers?.status === "DONE" && (                   
                      <InfoTextContainer>
                        <FormattedMessage id="resolvedAt" />: {task?.dates?.resolvedDate}
                      </InfoTextContainer>                    
                    )} 
                    <InfoTextContainer>
                      <FormattedMessage id="deadline" />: {task?.dates?.deadline}
                    </InfoTextContainer> 
                  </InfoText>                  
                </BoxCardHeaderInfo>
              </BoxCardFooterInfo>
            </BoxCardFooter>            
            {(!["provisioning", "certification", "sod", "user"].includes(type as string) || 
              type === "user" && task?.type !== "USER_REVALIDATION") && (
              <>
                <JustificationDivider /> 
                <BoxJustification>
                  <TitleJustification>
                    <FormattedMessage id="tasks.justification" />
                  </TitleJustification>
                  <BoxJustificationValue>
                    {task?.justification || task?.itemDetails?.justification || " - "}
                  </BoxJustificationValue>
                </BoxJustification>
              </>              
            )}                                                                              
          </BoxCardContent>
        </BoxCard>
        {task?.disapprovalJustification && (
          <BoxCard>
            <BoxCardContent>
              <BoxCardTitle className="Light">
                <FormattedMessage id="tasks.accessDenied" />
              </BoxCardTitle> 
              <BoxJustification className="Add-top">
                <TitleJustification>
                  <FormattedMessage id={type === "approval" ? "tasks.disapprovalJustification": "tasks.notProvisionedJustification"} />
                </TitleJustification>
                <BoxJustificationValue>
                  {task?.disapprovalJustification || " - "}
                </BoxJustificationValue>
              </BoxJustification>
            </BoxCardContent>
          </BoxCard>
        )}  
        {task?.revokeJustification && (
          <BoxCard>
            <BoxCardContent>
              <BoxCardTitle className="Light">
                <FormattedMessage id="tasks.accessDenied" />
              </BoxCardTitle>
              <BoxJustification className="Add-top">
                <TitleJustification>
                  <FormattedMessage id="tasks.revokeJustification" />
                </TitleJustification>
                <BoxJustificationValue>
                  {task?.revokeJustification || " - "}
                </BoxJustificationValue>
              </BoxJustification>
            </BoxCardContent>
          </BoxCard>  
        )}     
        {task?.allowedJustification && (
          <BoxCard>
            <BoxCardContent>
              <BoxCardTitle className="Light">
                <FormattedMessage id="tasks.accessDenied" />
              </BoxCardTitle>
              <BoxJustification className="Add-top">
                <TitleJustification>
                  <FormattedMessage id="tasks.allowedJustification" />
                </TitleJustification>
                <BoxJustificationValue>
                  {task?.allowedJustification || " - "}
                </BoxJustificationValue>
              </BoxJustification>
            </BoxCardContent>
          </BoxCard>  
        )} 
        {["userRevalidation"].includes(type as string) && task?.itemDetails?.justification && (
          <BoxCard>
            <BoxCardContent>
              <BoxCardTitle className="Light">
                <FormattedMessage id={`tasks.access.${task?.headers.result}`} />
              </BoxCardTitle>
              <BoxJustification className="Add-top">
                <TitleJustification>
                  <FormattedMessage id="tasks.resolveJustification" />
                </TitleJustification>
                <BoxJustificationValue>
                  {task?.itemDetails?.justification || " - "}
                </BoxJustificationValue>
              </BoxJustification>
            </BoxCardContent>
          </BoxCard>  
        )}               
      </Box>      
    </>
  );
};

export default UserInfo;
