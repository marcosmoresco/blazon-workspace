// vendors
import React from "react";
import { StyledTableUser } from "./styled";
import { FormattedMessage } from "react-intl";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";

// types
import { TableUserProps } from "./type";

const TableUser: React.FC<TableUserProps> = ({ request }) => {

  return (
    <StyledTableUser>
      <Table>
        <TableHead>
          <TableRow>
            <th>
              <FormattedMessage id="name" />
            </th>
            <th>
              <FormattedMessage id="middleName" />
            </th>
            <th>
              <FormattedMessage id="lastName" />
            </th>
            <th>
              <FormattedMessage id="email" />
            </th>
            <th>
              <FormattedMessage id="personalEmail" />
            </th>
            <th>
              <FormattedMessage id="displayName" />
            </th>
            <th>
              <FormattedMessage id="mobilePhone" />
            </th>
            <th>
              <FormattedMessage id="phone" />
            </th>
            <th>
              <FormattedMessage id="birthDate" />
            </th>
            <th>
              <FormattedMessage id="username" />
            </th>
          </TableRow>
        </TableHead>
        <TableBody>          
          <TableRow>
            <td>{request?.user?.firstName || " - "}</td>
            <td>{request?.user?.middleName || " - "}</td>
            <td>{request?.user?.lastName || " - "}</td>
            <td>{request?.user?.email || " - "}</td>
            <td>{request?.user?.personalEmail || " - "}</td>
            <td>{request?.user?.displayName || " - "}</td>
            <td>{request?.user?.mobilePhone || " - "}</td>
            <td>{request?.user?.phone || " - "}</td>
            <td>{request?.user?.birthDate || " - "}</td>
            <td>{request?.user?.username || " - "}</td>
          </TableRow>        
        </TableBody>
      </Table>
    </StyledTableUser>
  );
};

export default TableUser;
