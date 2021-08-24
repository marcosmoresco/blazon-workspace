// vendors
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useTheme, themes } from "@theme/index";

// components
import Avatar from "@material-ui/core/Avatar";
import Check from "@icons/Check";
import CalendarIcon from "@icons/Calendar";
import BrowsersIcon from "@icons/BrowsersIcon";
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
  BoxRequester,
  BoxRequesterContent,
  BoxRequesterTitle,
  BoxRequesterDisplayName,
  BoxRequesterAvatar,
  BoxCardFooter,
  BoxCardFooterInfo,
  BoxPriority,
  BarPriorityLow,
  BarPriorityMedium,
  BarPriorityHigh,
  BoxCardStatus,
  InfoCheck,
  InfoBrowsers,
} from "./style";

const UserInfo: React.FC<UserInfoProps> = ({ task }) => { 

  const router = useRouter();  
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
                  <BoxCardIdentifier
                    background={currentTheme.palette.info.main} 
                    color={currentTheme.palette.info.contrastText}>
                    {["approval", "sod"].includes(type as string) && (
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
                )}                
              </BoxCardHeaderContent>
              <BoxCardStatus><FormattedMessage id="task.status"/>: {task?.headers?.status || " - "}</BoxCardStatus>
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
                <BoxPriority>
                  <FormattedMessage id="task.priority" />
                  {priorityToElement[task?.headers?.priority || "LOW"]}
                </BoxPriority>
              </BoxCardFooterInfo>
              <BoxCardFooterInfo>
                <BoxCardHeaderInfo>
                  <Info>
                    <CalendarIcon />
                    {task?.dates?.createdDate || " - "}
                  </Info>
                  <InfoCheck>
                    <Check color="#0d875b" />
                    {task?.dates?.createdDate || " - "}
                  </InfoCheck>
                  <InfoBrowsers>
                    <BrowsersIcon color="#92909F" />
                    {task?.dates?.deadline || " - "}
                  </InfoBrowsers>
                </BoxCardHeaderInfo>
              </BoxCardFooterInfo>
            </BoxCardFooter>
          </BoxCardContent>
        </BoxCard>       
      </Box>      
    </>
  );
};

export default UserInfo;
