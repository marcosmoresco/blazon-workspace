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
} from "./style";

//types
import { 
  AdditionalInformationsProps 
} from "./types";

type tabs = "account | resource | undefined";

const GridAdditionalInformationsApproval: React.FC<AdditionalInformationsProps> = ({ task }) => {
  const [tab, setTab] = useState<tabs>();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };
  
  useEffect(() => {
    if(task?.type && !tab) {
      if(["CREATE_ACCOUNT", "CHECKIN_ADMIN_ACCOUNT_PASSWORD"].includes(task?.type || "")) {
        setTab("account" as tabs);
      } else if(task?.type === "ASSIGN_ENTITLEMENT") {
        setTab("account" as tabs);
      }
    }
  }, [task, tab]);
  return (
    <>
      {["CREATE_ACCOUNT", "CHECKIN_ADMIN_ACCOUNT_PASSWORD"].includes(task?.type || "") && (
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
            <DetailValue>{task?.approvalItemDetails?.account?.accountIdentifier || " - "}</DetailValue> 
          </DeitalList>        
        </WorkArea>
      )}  
      {task?.type === "ASSIGN_ENTITLEMENT" && (
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
          {tab === "account" as tabs && (
            <DeitalList>
                <label><FormattedMessage id="accountIdentifier"/></label> 
                <DetailValue>{task?.approvalItemDetails?.account?.accountIdentifier || " - "}</DetailValue>                
            </DeitalList>
          )}     
       </WorkArea>
      )}        
    </>
  );
};

export default GridAdditionalInformationsApproval;
