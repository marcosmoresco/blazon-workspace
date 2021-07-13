// vendors
import React from "react";
import { FormattedMessage } from "react-intl";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";

// types
import { TableRoleProps } from "./type";

// styles
import { StyledTableRole } from "./styled";

const TableRole: React.FC<TableRoleProps> = ({
  requestName,
  requestDescription,
}) => {
  const rows = [
    {
      name: requestName,
      description: requestDescription,
    },
    {
      name: requestName,
      description: requestDescription,
    },
    {
      name: requestName,
      description: requestDescription,
    },
  ];

  return (
    <StyledTableRole>
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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <td>{row.name}</td>
              <td>{row.description}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableRole>
  );
};

export default TableRole;
