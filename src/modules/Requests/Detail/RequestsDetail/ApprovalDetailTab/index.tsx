// vendors
import React from "react";
import { FormattedMessage } from "react-intl";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import { getLink } from "@utils/index";
import Progress from "@components/Progress";
import EmptyState from "@components/EmptyState";

// types
import { CardProps } from "./types";
import { ApprovalDetails } from "@modules/Requests/types";

// styles
import {
  Image,
  HistoryBox,
  UserBox,
  UserHistory,
  UserName,
  User,
  InfoContent,
  Info,
} from "./styles";

//images
import EmptyStateImage from "@images/EmptyStateApprovalItemDetail.svg";

const ApprovalTab: React.FC<CardProps> = ({ request }) => {
  return (
    <>
      {!(request?.approvalDetails || []).length && (
        <EmptyState image={EmptyStateImage} title="request.approvalDetail.empty" text="request.approvalDetail.empty.text" />
      )}
      {(request?.approvalDetails || []).map(
        (approvalDetail: ApprovalDetails, index: number) => (
          <HistoryBox key={`task-assign-history-${index}`}>
            <UserBox>
              <UserHistory>                
                { approvalDetail?.approver && (
                  <>
                    <Image
                      src={getLink("thumb",  approvalDetail?.approver?.links)}
                      width={32}
                      height={32}
                      alt={ approvalDetail?.approver?.displayName}
                    />
                    <UserName>
                      <FormattedMessage id="request.AssignedFrom" />
                      <User>{ approvalDetail?.approver?.displayName || " - "}</User>
                    </UserName>
                  </>                         
                )}                        
              </UserHistory>              
            </UserBox>
            <UserBox style={{gap: 32}}>
              <InfoContent>
                <FormattedMessage id="request.createdAt" />
                <Info>{approvalDetail?.creation || " - "}</Info>
              </InfoContent>
              <InfoContent>
                <FormattedMessage id="request.resolvedAt" />
                <Info>{approvalDetail?.approvalDate || " - "}</Info>
              </InfoContent>           
              <InfoContent>
                <FormattedMessage id="request.status" />
                <Info>{approvalDetail?.outcome || " - "}</Info>
              </InfoContent>
            </UserBox>
          </HistoryBox>          
        )
      )}
      {!request && (<Progress />)}
    </>
  );
};

export default ApprovalTab;
