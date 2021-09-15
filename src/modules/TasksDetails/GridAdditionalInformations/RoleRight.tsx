// vendors
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useTheme, themes } from "@theme/index";

// components
import Roles from "./Roles";

// styles
import {
  WorkArea,
  MenuDetail,
  StyleApprovalTab,
  InsideLine,
  DeitalList,
  GridArea,
} from "./style";

//types
import { 
  AdditionalInformationsProps 
} from "./types";

type tabs = "role | undefined";

const GridAdditionalInformationsRoleRight: React.FC<AdditionalInformationsProps> = ({ task }) => {
  const [tab, setTab] = useState<tabs>("role" as tabs);
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };
  
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
              color={currentTheme.palette.primary.main}
              selected={tab === "role" as tabs}
              onClick={() => setTab("role" as tabs)}
            >
              <FormattedMessage id="tasks.RoleRights" />
            </StyleApprovalTab>
          </MenuDetail>
          <InsideLine />
          <DeitalList>
            <GridArea style={{boxShadow: "0px 0px 28px rgba(27, 32, 42, 0.06)"}}>
              <Roles task={task}/>
            </GridArea>
          </DeitalList>
        </WorkArea>
     
    </>
  );
};

export default GridAdditionalInformationsRoleRight;
