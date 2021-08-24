// vendors
import React, { useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useTheme, themes } from "@theme/index";

// components
import ApprovalTab from "./ApprovalDetailTab";
import SodTab from "./SodTab";
import HistoryTab from "./HistoryTab";

//types
import { SecondTaskProps } from "./types";

// styles
import {
  WorkArea,
  Grid,
  MenuDetail,
  StyleApprovalTab,
  InsideLine,
  DeitalList,
} from "./styles";

const RequestsDetail: React.FC<SecondTaskProps> = ({request}) => {
  const [tab, setTab] = useState<"approval" | "sod" | "history">("approval");
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  return (
    <WorkArea>
      <Grid>
        <MenuDetail>
          <StyleApprovalTab
            color={currentTheme.palette.primary.main}
            selected={tab === "approval"}
            onClick={() => setTab("approval")}
          >
            <FormattedMessage id="request.approvalDetail" />            
          </StyleApprovalTab>
          <StyleApprovalTab
            color={currentTheme.palette.primary.main}
            selected={tab === "sod"}
            onClick={() => setTab("sod")}
          >
            <FormattedMessage id="request.sodDetail" />            
          </StyleApprovalTab>
          <StyleApprovalTab
            color={currentTheme.palette.primary.main}
            selected={tab === "history"}
            onClick={() => setTab("history")}
          >
            <FormattedMessage id="request.historyStates" />            
          </StyleApprovalTab>
        </MenuDetail>

        <InsideLine />

        <DeitalList>
          {tab === "approval" ? (
            <>
              <ApprovalTab
               request={request}
              />
            </>
          ) : tab === "sod" ? (
            <>
              <SodTab
               request={request}
              />
            </>
          ) : (
            <HistoryTab />
          )}
        </DeitalList>
      </Grid>
    </WorkArea>
  );
};

export default injectIntl(RequestsDetail);
