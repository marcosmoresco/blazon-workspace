// vendors
import React from "react";
import { FormattedMessage } from "react-intl";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";

// types
import { CardProps } from "./types";

// styles
import {
  ApprovalDetailTab,
  StyledTableResource,
  UserType,
  Image,
  Name,
} from "./styles";
import RequestStatus from "@modules/RequestsDetailing/AssignRoles/RequestStatus";

const ApprovalTab: React.FC<CardProps> = ({
  approverImage,
  approverName,
  requestCreatedAt,
  requestApprovelAt,
  requestTask,
  RequestStatus,
}) => {
  const rows = [
    {
      created_at: requestCreatedAt,
      approvel_at: requestApprovelAt,
      task: requestTask,
      status: RequestStatus,
    },
  ];
  return (
    <ApprovalDetailTab>
      <div>
        <Image src={approverImage} alt={approverName} />
        <span>
          <UserType>
            <FormattedMessage id="request.approver" />
          </UserType>
          <Name>{approverName}</Name>
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
                <FormattedMessage id="request.approvelAt" />
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
            {rows.map((row) => (
              <TableRow key={row.created_at}>
                <td>{row.created_at}</td>
                <td>{row.approvel_at}</td>
                <td>{row.task}</td>
                <td>{row.status}</td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableResource>
    </ApprovalDetailTab>
  );
};

export default ApprovalTab;
