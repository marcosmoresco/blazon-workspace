// vendors
import React, { useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

// components
import Question from "../../../icons/Question";
import ApprovalTab from "../RequestsDetail/ApprovalDetailTab";
import SodTab from "../RequestsDetail/SodTab";
import HistoryTab from "../RequestsDetail/HistoryTab";

// styles
import {
  WorkArea,
  Grid,
  MenuDetail,
  StyleApprovalTab,
  InsideLine,
  DeitalList,
} from "./styles";

const RequestsDetail: React.FC = ({}) => {
  const [tab, setTab] = useState<"approval" | "sod" | "history">("approval");

  return (
    <WorkArea>
      <Grid>
        <MenuDetail>
          <StyleApprovalTab
            selected={tab === "approval"}
            onClick={() => setTab("approval")}
          >
            <FormattedMessage id="request.approvalDetail" />
            <Question />
          </StyleApprovalTab>
          <StyleApprovalTab
            selected={tab === "sod"}
            onClick={() => setTab("sod")}
          >
            <FormattedMessage id="request.sodDetail" />
            <Question />
          </StyleApprovalTab>
          <StyleApprovalTab
            selected={tab === "history"}
            onClick={() => setTab("history")}
          >
            <FormattedMessage id="request.historyStates" />
            <Question />
          </StyleApprovalTab>
        </MenuDetail>

        <InsideLine />

        <DeitalList>
          {tab === "approval" ? (
            <>
              <ApprovalTab
                approverImage="https://i.ibb.co/nwV8d4s/Avatar.png"
                approverName="Phillipe Ferreira Amaral"
                requestCreatedAt="13/05/2021  10:30:24"
                requestApprovelAt="-"
                requestTask="308453"
                RequestStatus="-"
              />
            </>
          ) : tab === "sod" ? (
            <>
              <SodTab
                sourceSOD="Lorem_ipsum_dolor_sit_amet_consectetur_adipiscing"
                targetSOD="IN_VALIDATION"
                dateSOD="19/05/2021 08:47:02"
              />
            </>
          ) : (
            <HistoryTab
              sourceHistory="Lorem_ipsum_dolor_sit_amet_consectetur_adipiscing"
              targetHistory="IN_VALIDATION"
              dateHistory="10/06/2021 10:02:27"
            />
          )}
        </DeitalList>
      </Grid>
    </WorkArea>
  );
};

export default injectIntl(RequestsDetail);
