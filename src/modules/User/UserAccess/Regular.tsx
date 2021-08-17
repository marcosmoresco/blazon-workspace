import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import CardScreen from "@components/CardScreen";
import User from "@icons/User";
import DataGrid from "@components/DataGrid";
import Filter from "@components/Filter";
import { useStyles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { GET_USER_ACCOUNTS } from "@modules/User/queries";
import { TitleHierarchy } from "@components/TitlePage/types";
import EmptyStateImage from "@images/EmptyStateRegularAccount.svg";

const columns = () => [
  {
    field: "resourceName",
    headerName: <FormattedMessage id="resource" />,
    sortable: false,
  },
  {
    field: "accountIdentifier",
    headerName: <FormattedMessage id="accountIdentifier" />,
    sortable: false,
  },
  {
    field: "createdAt",
    headerName: <FormattedMessage id="createdAt" />,
    sortable: false,
  },
  {
    field: "status",
    headerName: <FormattedMessage id="status" />,
    sortable: false,
  },
];

const filters = [
  {
    name: "resourceName",
    label: <FormattedMessage id="resource" />,
    type: "text",
  },
  {
    name: "accountIdentifier",
    label: <FormattedMessage id="accountIdentifier" />,
    type: "text",
  },
  {
    name: "status",
    label: <FormattedMessage id="status" />,
    type: "list",
    values: [
      {
        label: <FormattedMessage id="active" />,
        value: "ACTIVE",
      },
      {
        label: <FormattedMessage id="revoked" />,
        value: "REVOKED",
      },
    ],
    bind: "value",
    view: "label",
  }, 
];

const Regular = ({ classes }) => {

  const router = useRouter();
  const [queryFilters, setQueryFilters] = useState({
    page: 0,
    size: 100,
    filters: JSON.stringify({
      resourceType: "REGULAR",
    })
  });

  const search = (filters?: any) => {
    setQueryFilters({
      page: 0,
      size: 100,
      filters: JSON.stringify({
        resourceType: "REGULAR",
        ...filters
      }),
    });
  };

  const hierarchy: TitleHierarchy = {
    name: "profile.header.breadcrumb",
    href: "/profile",
    children: [
      {
        name: "profile.accounts",
      },
    ],
  };

  return (
    <CardScreen
      loading={false}
      title="profile.accounts.regular"         
      onBack={() => router.push("/profile")}
      hierarchy={hierarchy}
    >
      <div className="Default-header-filter">
        <Filter
          filters={filters}
          onChange={(filters: any) => search(filters)}
        />
      </div>
      <div>
        <DataGrid
          emptyState={EmptyStateImage}
          query={GET_USER_ACCOUNTS}
          queryFilters={queryFilters}
          getResponseLinks={(data: any) => data?.getUserAccounts?.links}
          getResponse={(data: any) => data?.getUserAccounts?.accounts}
          height={600}          
          columns={columns({ classes })}
          page={0}
          size={100}
          handleClick={() => {}}
          type="pagination"
        />
      </div>
    </CardScreen>
  );
};

export default withStyles(useStyles)(Regular);
