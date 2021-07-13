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

const TableResource: React.FC<TableResourceProps> = ({
  requestIdentifier,
  requestCreated_at,
  requestEffectived_at,
  requestFinalized_at,
}) => {
  const rows = [
    {
      identifier: requestIdentifier,
      created_at: requestCreated_at,
      effectived_at: requestEffectived_at,
      finalized_at: requestFinalized_at,
    },
    {
      identifier: requestIdentifier,
      created_at: requestCreated_at,
      effectived_at: requestEffectived_at,
      finalized_at: requestFinalized_at,
    },
  ];

  return (
    <StyledTableResource>
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
          {rows.map((row) => (
            <TableRow key={row.identifier}>
              <td>{row.identifier}</td>
              <td>{row.created_at}</td>
              <td>{row.effectived_at}</td>
              <td>{row.finalized_at}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableResource>
  );
};

export default TableResource;
