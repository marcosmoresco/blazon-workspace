// vendors
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useTheme, themes } from "@theme/index";

// styles
import {
  WorkArea,
  MenuDetail,
  StyleApprovalTab,
  InsideLine,
  DeitalList,
  DetailValue,
  GridArea,
} from "./style";

//types
import { 
  AdditionalInformationsProps 
} from "./types";

type tabs = "account | resource | undefined";

const GridAdditionalInformationsProvisioning: React.FC<AdditionalInformationsProps> = ({ task }) => {
  const [tab, setTab] = useState<tabs>();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };
  
  useEffect(() => {
    if(task?.type && !tab) {
      if(["ACCOUNT"].includes(task?.entrySchema || "")) {
        setTab("account" as tabs);
      } else if(["ENTITLEMENT", "MEMBERSHIP_ENTITLEMENT"].includes(task?.entrySchema || "")) {
        if(task?.type === "CREATE_ENTITLEMENT") {
          setTab("entitlement" as tabs);
        } else if(task?.type === "REVOKE_ENTITLEMENT") {
          setTab("account" as tabs);
        } else {
          setTab("resource" as tabs);
        }        
      }
    }
  }, [task, tab]);
  return (
    <>
      {["ACCOUNT"].includes(task?.entrySchema || "") && (
        <WorkArea>
          <MenuDetail>
            <StyleApprovalTab
              color={currentTheme.palette.primary.main}
              selected={tab === "account" as tabs}
              onClick={() => setTab("account" as tabs)}
            >
              <FormattedMessage id="tasks.AccountInformations" />
            </StyleApprovalTab>                  
          </MenuDetail>
          <InsideLine /> 
          <DeitalList>
            <label><FormattedMessage id="accountIdentifier"/></label> 
            <DetailValue>{task?.provisioningItemDetail?.account?.accountIdentifier || " - "}</DetailValue> 
          </DeitalList>        
        </WorkArea>
      )}  
      {["ENTITLEMENT", "MEMBERSHIP_ENTITLEMENT"].includes(task?.entrySchema || "") && (
         <WorkArea>
         <MenuDetail>
          
          {task?.type === "CREATE_ENTITLEMENT" && (
          <StyleApprovalTab
              color={currentTheme.palette.primary.main}
              selected={tab === "entitlement" as tabs}
              onClick={() => setTab("entitlement" as tabs)}
           >
             <FormattedMessage id="tasks.EntitlementInformations" />
           </StyleApprovalTab>)}
           {task?.type !== "REVOKE_ENTITLEMENT" && (
           <StyleApprovalTab
              color={currentTheme.palette.primary.main}
              selected={tab === "resource" as tabs}
              onClick={() => setTab("resource" as tabs)}
           >
             <FormattedMessage id="tasks.ResourceInformations" />
           </StyleApprovalTab>)}   
           {task?.type !== "CREATE_ENTITLEMENT" && (
           <StyleApprovalTab
              color={currentTheme.palette.primary.main}
              selected={tab === "account" as tabs}
              onClick={() => setTab("account" as tabs)}
           >
             <FormattedMessage id="tasks.AccountInformations" />
           </StyleApprovalTab>)}                 
         </MenuDetail>
         <InsideLine /> 
         {tab === "resource" as tabs && (
            <DeitalList>
              <label><FormattedMessage id="identifier"/></label> 
              <DetailValue>{task?.provisioningItemDetail?.resource?.identifier || " - "}</DetailValue> 
              <label><FormattedMessage id="name"/></label> 
              <DetailValue>{task?.provisioningItemDetail?.resource?.name || " - "}</DetailValue> 
              <label><FormattedMessage id="description"/></label> 
              <DetailValue>{task?.provisioningItemDetail?.resource?.description || " - "}</DetailValue> 
            </DeitalList>
          )}  
          {tab === "account" as tabs && (
            <DeitalList>
                <label><FormattedMessage id="accountIdentifier"/></label> 
                <DetailValue>{task?.provisioningItemDetail?.account?.accountIdentifier || " - "}</DetailValue>                
            </DeitalList>
          )}    
          {tab === "entitlement" as tabs && (
            <DeitalList>
              <label><FormattedMessage id="identifier"/></label> 
              <DetailValue>{task?.provisioningItemDetail?.entitlement?.identifier || " - "}</DetailValue>   
              <label><FormattedMessage id="name"/></label> 
              <DetailValue>{task?.provisioningItemDetail?.entitlement?.name || " - "}</DetailValue>     
              <label><FormattedMessage id="description"/></label> 
              <DetailValue>{task?.provisioningItemDetail?.entitlement?.description || " - "}</DetailValue>         
            </DeitalList>
          )}  
       </WorkArea>
      )}        
    </>
  );
};

export default GridAdditionalInformationsProvisioning;
