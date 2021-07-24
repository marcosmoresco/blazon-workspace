// vendors
import React, { useState } from "react";
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
  GridArea,
} from "./style";

const GridRole: React.FC = () => {
  const [tab, setTab] = useState<"resource" | "role">("resource");
  return (
    <>
      <WorkArea>
        <MenuDetail>
          <StyleApprovalTab
            selected={tab === "resource"}
            onClick={() => setTab("resource")}
          >
            <FormattedMessage id="tasks.ResourceInformations" />
          </StyleApprovalTab>
          <StyleApprovalTab
            selected={tab === "role"}
            onClick={() => setTab("role")}
          >
            <FormattedMessage id="tasks.RoleRights" />
          </StyleApprovalTab>
        </MenuDetail>
        <InsideLine />
        <DeitalList>
          {tab === "resource" ? (
            <></>
          ) : tab === "role" ? (
            <GridArea>
              <Roles />
            </GridArea>
          ) : (
            <></>
          )}
        </DeitalList>
      </WorkArea>
    </>
  );
};

export default GridRole;
