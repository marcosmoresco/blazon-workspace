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

type tabs = "user | undefined";

const GridAdditionalInformationsApproval: React.FC<AdditionalInformationsProps> = ({ task }) => {
  const [tab, setTab] = useState<tabs>();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };
  
  useEffect(() => {
    if(task?.type && !tab) {
      if(["USER_CREATION"].includes(task?.type || "")) {
        setTab("user" as tabs);
      }
    }
  }, [task, tab]);
  return (
    <>
      {["USER_CREATION"].includes(task?.type || "") && (
        <WorkArea>
          <MenuDetail>
            <StyleApprovalTab
              color={currentTheme.palette.primary.main}
              selected={tab === "user" as tabs}
              onClick={() => setTab("user" as tabs)}
            >
              <FormattedMessage id="tasks.UserInformations" />
            </StyleApprovalTab>                  
          </MenuDetail>
          <InsideLine /> 
          <DeitalList>
            {task?.itemDetails?.newUserAttributes.map((att) => (
              <>
                <label>{att.key}</label> 
                <DetailValue>{att.value || " - "}</DetailValue> 
              </>
            ))}            
          </DeitalList>        
        </WorkArea>
      )}       
    </>
  );
};

export default GridAdditionalInformationsApproval;
