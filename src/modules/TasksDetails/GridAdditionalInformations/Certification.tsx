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
import { AdditionalInformationsProps } from "./types";

type tabs = "account | resource | undefined";

const GridAdditionalInformationsCertification: React.FC<AdditionalInformationsProps> =
  ({ task }) => {
    const [tab, setTab] = useState<tabs>();
    const { theme } = useTheme();
    const currentTheme = { ...themes[theme] };

    useEffect(() => {     
      if (task) {       
        if (
          ["ACCOUNT", "MEMBERSHIP_ENTITLEMENT"].includes(
            task?.type || ""
          )
        ) {
          setTab("account" as tabs);
        } else if (task?.type === "ASSIGN_ENTITLEMENT") {
          setTab("resource" as tabs);
        }
      }
    }, [task, tab]);
    return (
      <>
        {["ACCOUNT", "MEMBERSHIP_ENTITLEMENT"].includes(
          task?.type || ""
        ) && (
          <WorkArea>
            <MenuDetail>
              <StyleApprovalTab
                color={currentTheme.palette.primary.main}
                selected={tab === ("account" as tabs)}
                onClick={() => setTab("account" as tabs)}
              >
                <FormattedMessage id="tasks.AccountInformations" />
              </StyleApprovalTab>
            </MenuDetail>
            <InsideLine />
            <DeitalList>
              <label>
                <FormattedMessage id="accountIdentifier" />
              </label>
              <DetailValue>
                {task?.certificationItemDetails?.accountIdentifier || " - "}
              </DetailValue>
            </DeitalList>
          </WorkArea>
        )}        
      </>
    );
  };

export default GridAdditionalInformationsCertification;
