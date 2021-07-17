// vendors
import React from "react";
import { FormattedMessage } from "react-intl";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import { getLink } from "@utils/index";
import Progress from "@components/Progress";

// types
import { CardProps } from "./types";
import { ApprovalDetails } from "@modules/Requests/types";

// styles
import {
  ApprovalDetailTab,
  StyledTableResource,
  UserType,
  Image,
  Name,
} from "./styles";
import RequestStatus from "@modules/Requests/Detail/Info/RequestStatus";

const ApprovalTab: React.FC<CardProps> = ({ request }) => {
  return (
    <>
      {(request?.approvalDetails || []).map(
        (approvalDetail: ApprovalDetails, index: number) => (
          <ApprovalDetailTab key={`approval-details-${index}`}>
            <div>
              <Image
                src={getLink("thumb", approvalDetail?.approver?.links || [])}
                alt={approvalDetail?.approver?.displayName || " - "}
              />
              <span>
                <UserType>
                  <FormattedMessage id="request.approver" />
                </UserType>
                <Name>{approvalDetail?.approver?.displayName || " - "}</Name>
              </span>
            </div>
            <StyledTableResource>
              <Table>
                <TableHead>
                  <TableRow>
                    <th>
                      <FormattedMessage id="request.createdAt" />
                    </th>
                    <th>
                      <FormattedMessage id="request.approvedAt" />
                    </th>
                    <th>
                      <FormattedMessage id="request.task" />
                    </th>
                    <th>
                      <FormattedMessage id="request.status" />
                    </th>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <td>{approvalDetail?.creation || " - "}</td>
                    <td>{approvalDetail?.approvalDate || " - "}</td>
                    <td>{approvalDetail?.taskId || " - "}</td>
                    <td>{approvalDetail?.outcome || " - "}</td>
                  </TableRow>
                </TableBody>
              </Table>
            </StyledTableResource>
          </ApprovalDetailTab>
        )
      )}
      {!request && (<Progress />)}
    </>
  );
};

export default ApprovalTab;
