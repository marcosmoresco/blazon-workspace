// vendors
import React, { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { useQuery } from "@apollo/client";

// types
import type { FilterType } from "@components/Filter/types";
import { Request } from "../types";

// components
import Card from "@components/Card";
import DataGrid from "@components/DataGrid";
import Filter from "@components/Filter";
import ArrowsOutIcon from "@icons/ArrowsOut";
import ArrowClockwiseIcon from "@icons/ArrowClockwise";
import { GET_REQUESTS } from "../queries";
import Tag from "@icons/Tag";
import CaretRight from "@icons/CaretRight";

// styles
import {
  ExpandContentCard,
  StyleMenuGrid,
  StyleResource,
  StyledTableResource,
  StyledTableResourceMenu,
  StyledTableResourceRow,
  ExpandContent,
  StyledBeneficiary,
  StyledStatus,
  StyledNormal,
} from "./styles";

function Beneficiary({ name, image }: { name: string; image: string }) {
  return (
    <StyledBeneficiary>
      <Image src={image} alt={name} width={32} height={32} />
      <span>{name}</span>
    </StyledBeneficiary>
  );
}

function Status({ status }: { status: string }) {
  return (
    <StyledStatus>
      <span>{status}</span>
    </StyledStatus>
  );
}

function Type({ type }: { type: string }) {
  return (
    <StyledNormal>
      <span>{type}</span>
    </StyledNormal>
  );
}

function EffectiveDate({ effectiveDate }: { effectiveDate: string }) {
  return (
    <StyledNormal>
      <span>{effectiveDate}</span>
    </StyledNormal>
  );
}

export const columns = [
  {
    field: "identifier",
    headerName: <FormattedMessage id="request.identifier" />,
    sortable: true,
  },
  {
    field: "beneficiary.displayName",
    headerName: <FormattedMessage id="request.beneficiary" />,
    sortable: false,
    // eslint-disable-next-line react/display-name
    renderCell: (row: Request) => {
      return (
        <Beneficiary
          name={row.beneficiary.displayName}
          image={row.beneficiary.links[1].href}
        />
      );
    },
  },
  {
    field: "type",
    headerName: <FormattedMessage id="request.type" />,
    sortable: false,
    renderCell: (row: Request) => {
      return <Type type={row.type ? row.type : " - "} />;
    },
  },
  {
    field: "effectiveDate",
    headerName: <FormattedMessage id="request.date" />,
    sortable: true,
    renderCell: (row: Request) => {
      return (
        <EffectiveDate
          effectiveDate={row.effectiveDate ? row.effectiveDate : " - "}
        />
      );
    },
  },
  {
    field: "status",
    headerName: <FormattedMessage id="request.status" />,
    sortable: false,
    renderCell: (row: Request) => {
      return <Status status={row.status} />;
    },
  },
];

export const filters: FilterType[] = [
  {
    name: "identifier",
    label: <FormattedMessage id="request.identifier" />,
    type: "number",
  },
  {
    name: "status",
    label: <FormattedMessage id="request.status" />,
    type: "list",
    values: [
      {
        label: <FormattedMessage id="new" />,
        value: "NEW",
      },
      {
        label: <FormattedMessage id="error" />,
        value: "ERROR",
      },
      {
        label: <FormattedMessage id="success" />,
        value: "SUCCESS",
      },
    ],
    bind: "value",
    view: "label",
  },
  {
    name: "date",
    label: <FormattedMessage id="request.date" />,
    type: "date",
    bind: {
      start: "initDateAt",
      end: "endDateAt",
    },
  },
];

const Tasks: FC = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery<{
    getRequests: { requests: Request[], links: [] };
  }>(GET_REQUESTS, {
    variables: {
      page: 0,
      size: 20,
    },
  });

  const requests = data?.getRequests.requests;
  const links = data?.getRequests.links;

  const [isFetching, setIsFetching] = useState(false);
  const [callbackClear, setCallbackClear] = useState({ execute: () => {} });
  const [selecteds, setSelecteds] = useState([]);
  const [expandAll, setExpandAll] = useState(false);

  const search = (filters?: any) => {
    console.log(filters);
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
    }, 4000);
  };

  const handleSelected = (selecteds: any, callbackClear: any) => {
    setCallbackClear(callbackClear);
    setSelecteds(selecteds);
  };

  const handleClickRow = (request: Request) => {
    // dispatch(addMessage(`Click task : ${row.identifier}`));
    router.push(`/requests/${request.identifier}`);
  };

  const expandContent = (item: Request) => {
    return (
      <ExpandContent>
        <ExpandContentCard>
          <StyleMenuGrid>
            <Tag height={16} width={15} />
            <span>
              <FormattedMessage id="request.request.detail" />
            </span>
          </StyleMenuGrid>
          <StyleResource>
            <span>
              <FormattedMessage id="request.resource" />
            </span>
            <Link href={`/requests/${item.identifier}`}>
              <a>
                <FormattedMessage id="request.seeAll" />
                <CaretRight height={15} width={18} />
              </a>
            </Link>
          </StyleResource>
          <StyledTableResource>
            <StyledTableResourceMenu>
              <span>
                <FormattedMessage id="request.name" />
              </span>
              <span>
                <FormattedMessage id="request.description" />
              </span>
            </StyledTableResourceMenu>
            <StyledTableResourceRow>
              <span>EXPENSE MOBI (APP)??</span>
              <span>
                Libera acessa ao sistema ultilizado para realizar reembolso de
                despesas??
              </span>
            </StyledTableResourceRow>
          </StyledTableResource>
        </ExpandContentCard>
      </ExpandContent>
    );
  };

  return (
    <div className="Default-content">
      <Card>
        <div className="Default-header-filter">
          <Filter
            filters={filters}
            onChange={(filters: any) => search(filters)}
          />
          <div className="Card-actions">
            <div className="Action" onClick={() => setExpandAll(!expandAll)}>
              <ArrowsOutIcon width={20} height={20} color="#514D65" />
            </div>
            <div className="Action" onClick={() => search()}>
              <ArrowClockwiseIcon width={20} height={20} color="#514D65" />
            </div>
          </div>
        </div>
        <div>
          <DataGrid
            height={600}
            list={requests}
            links={links || []}
            query={GET_REQUESTS}
            fetching={loading || isFetching}
            columns={columns}
            page={1}
            size={25}
            rowsPerPageList={[25, 50, 75, 100]}            
            handleSelected={handleSelected}
            actions={[]}
            expand={expandContent}
            expandOnClick
            expandAll={expandAll}
            selectable
            type="pagination"
          />
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(injectIntl(Tasks));
