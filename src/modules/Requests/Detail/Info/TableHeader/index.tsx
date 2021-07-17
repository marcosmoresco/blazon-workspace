// vendors
import React from "react";
import { StyledTableHeader } from "./styled";
import { FormattedMessage } from "react-intl";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";

// types
import { TableHeaderProps } from "./type";

const TableHeader: React.FC<TableHeaderProps> = ({request}) => {  

  return (
    <StyledTableHeader>
      <Table>
        <TableHead>
          <TableRow>
            <th>
              <FormattedMessage id="request.identifier" />
            </th>
            <th>
              <FormattedMessage id="request.createdAt" />
            </th>
            <th>
              <FormattedMessage id="request.effectivedAt" />
            </th>
            <th>
              <FormattedMessage id="request.finalizedAt" />
            </th>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <td>{request?.identifier}</td>
            <td>{request?.createdAt || " - "}</td>
            <td>{request?.effectiveDate || " - "}</td>
            <td>{request?.finalizedAt || " - "}</td>
          </TableRow>
        </TableBody>
      </Table>
    </StyledTableHeader>
  );
};

export default TableHeader;
