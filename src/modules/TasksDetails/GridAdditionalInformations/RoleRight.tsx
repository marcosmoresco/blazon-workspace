// vendors
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";

// components
import Roles from "./Roles";

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

type tabs = "role | undefined";

const GridAdditionalInformationsRoleRight: React.FC<AdditionalInformationsProps> = ({ task }) => {
  const [tab, setTab] = useState<tabs>("role" as tabs);
  
  useEffect(() => {
    if(task?.type && !tab) {
      if(["ACCOUNT"].includes(task?.entrySchema || "")) {
        setTab("account" as tabs);
      } else if(["ENTITLEMENT", "MEMBERSHIP_ENTITLEMENT"].includes(task?.entrySchema || "")) {
        setTab("resource" as tabs);
      }
    }
  }, [task, tab]);
  return (
    <>
      <WorkArea>
          <MenuDetail>           
            <StyleApprovalTab
              selected={tab === "role" as tabs}
              onClick={() => setTab("role" as tabs)}
            >
              <FormattedMessage id="tasks.RoleRights" />
            </StyleApprovalTab>
          </MenuDetail>
          <InsideLine />
          <DeitalList>
            <GridArea>
              <Roles task={task}/>
            </GridArea>
          </DeitalList>
        </WorkArea>
     
    </>
  );
};

export default GridAdditionalInformationsRoleRight;
