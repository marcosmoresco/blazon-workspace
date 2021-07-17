// vendors
import React from "react";
import { StyledTableResource } from "./styled";
import { FormattedMessage } from "react-intl";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";

// types
import { TableAccountProps } from "./type";

const TableAccount: React.FC<TableAccountProps> = ({request}) => {

  return (
    <StyledTableResource>
      <Table>
        <TableHead>
          <TableRow>
            <th>
              <FormattedMessage id="accountIdentifier" />
            </th>                     
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <td>{request?.account?.accountIdentifier || " - "}</td>                     
          </TableRow>
        </TableBody>
      </Table>
    </StyledTableResource>
  );
};

export default TableAccount;
