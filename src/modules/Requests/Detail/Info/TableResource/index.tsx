// vendors
import React from "react";
import { StyledTableResource } from "./styled";
import { FormattedMessage } from "react-intl";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";

// types
import { TableResourceProps } from "./type";

const TableResource: React.FC<TableResourceProps> = ({request}) => {

  return (
    <StyledTableResource>
      <Table>
        <TableHead>
          <TableRow>
            <th>
              <FormattedMessage id="request.name" />
            </th>
            <th>
              <FormattedMessage id="request.description" />
            </th>           
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <td>{request?.resource?.name || " - "}</td>
            <td>{request?.resource?.description || " - "}</td>           
          </TableRow>
        </TableBody>
      </Table>
    </StyledTableResource>
  );
};

export default TableResource;
