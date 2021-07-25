import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import CardScreen from "@components/CardScreen";
import User from "@icons/User";
import DataGrid from "@components/DataGrid";
import Filter from "@components/Filter";
import { useStyles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { EntitlementDirectory } from "@portal/Search/types";
import { GET_USER_ENTITLEMENTS } from "@modules/User/queries";

const columns = () => [
  {
    field: "resource",
    headerName: <FormattedMessage id="resource" />,
    sortable: false,
    renderCell: (row: EntitlementDirectory) => row.resource?.name || " - ",
  },
  {
    field: "name",
    headerName: <FormattedMessage id="entitlement" />,
    sortable: false,
  },
  {
    field: "accountIdentifier",
    headerName: <FormattedMessage id="accountIdentifier" />,
    sortable: false,
    renderCell: (row: EntitlementDirectory) => row.account?.accountIdentifier || " - ",
  },
];

const filters = [
  {
    name: "entitlementName",
    label: <FormattedMessage id="entitlement" />,
    type: "text",
  },
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
];

const Entitlement = ({ classes }) => {

  const router = useRouter();
  const [queryFilters, setQueryFilters] = useState({
    page: 0,
    size: 100,      
    filters: ""
  });

  const search = (filters?: any) => {
    setQueryFilters({
      page: 0,
      size: 100,
      filters: JSON.stringify({        
        ...filters
      }),
    });
  };

  return (
    <CardScreen
      loading={false}
      title="profile"
      subTitle="entitlements"
      icon={<User height={24} width={24} />}
      onBack={() => router.push("/profile")}
    >
      <div className="Default-header-filter">
        <Filter
          filters={filters}
          onChange={(filters: any) => search(filters)}
        />        
      </div>
      <div>
        <DataGrid
          query={GET_USER_ENTITLEMENTS}
          queryFilters={queryFilters}
          height={600}          
          columns={columns({ classes })}
          page={1}
          size={100}
          rowsPerPageList={[25, 50, 75, 100]}
          handleClick={() => {}}
          type="pagination"
        />
      </div>
    </CardScreen>
  );
};

export default withStyles(useStyles)(Entitlement);
