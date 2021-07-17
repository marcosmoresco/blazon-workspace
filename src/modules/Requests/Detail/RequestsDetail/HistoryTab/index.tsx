// vendors
import React from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import Progress from "@components/Progress";

// types
import { CardProps } from "./types";
import { TransitionStates } from "@modules/Requests/types";

// styles
import { DetailTab, StyledTableResource } from "./styles";

// graphql
import { GET_REQUEST_TRANSITION_STATES } from "../../queries";

const HistoryTab: React.FC<CardProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery<{
    getRequestTransitionStates: TransitionStates[];
  }>(GET_REQUEST_TRANSITION_STATES, {
    variables: {
      id: Number(id),
    },
  });

  const transitionStates = data?.getRequestTransitionStates;

  return (
    <>
      {(transitionStates || []).map((row: TransitionStates, index: number) => (
        <DetailTab key={`transition-state-${index}`}>
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
                <TableRow>
                  <td style={{width: "40%"}}>{row.sourceState || " - "}</td>
                  <td style={{width: "40%"}}>{row.targetState || " - "}</td>
                  <td style={{width: "20%"}}>{row.date || " - "}</td>
                </TableRow>
              </TableBody>
            </Table>
          </StyledTableResource>
        </DetailTab>
      ))}
      {loading && (<Progress />)}
    </>
  );
};

export default HistoryTab;
