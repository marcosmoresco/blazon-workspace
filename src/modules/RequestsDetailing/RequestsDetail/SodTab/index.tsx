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
import { DetailTab, StyledTableResource } from "./styles";

const SodTab: React.FC<CardProps> = ({ sourceSOD, targetSOD, dateSOD }) => {
  const rows = [
    {
      source: sourceSOD,
      target: targetSOD,
      date: dateSOD,
    },
  ];
  return (
    <DetailTab>
      <StyledTableResource>
        <Table>
          <TableHead>
            <TableRow>
              <th>
                <FormattedMessage id="request.source" />
              </th>
              <th>
                <FormattedMessage id="request.target" />
              </th>
              <th>
                <FormattedMessage id="request.date" />
              </th>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.source}>
                <td>{row.source}</td>
                <td>{row.target}</td>
                <td>{row.date}</td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableResource>
    </DetailTab>
  );
};

export default SodTab;
