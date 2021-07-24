import React from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import DataGrid from "@components/DataGrid";
import useMockRequest from "@utils/mockRequest";
import Filter from "@components/Filter";
import useStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox } from "@material-ui/core";
import CardScreen from "./CardScreenUntitle";

const mockData = [
  {
    type: "Resource",
    identifier: "1",
    name: "SOMAR",
    approval: <Checkbox />,
  },
  {
    type: "Resource",
    identifier: "2",
    name: "Algar - Telecom aprovação",
    approval: <Checkbox />,
  },
  {
    type: "Resource",
    identifier: "3",
    name: "Algar - Telecom aprovação",
    approval: <Checkbox />,
  },
  {
    type: "Resource",
    identifier: "4",
    name: "Algar - Telecom aprovação",
    approval: <Checkbox />,
  },
  {
    type: "Resource",
    identifier: "5",
    name: "SOMAR",
    approval: <Checkbox />,
  },
  {
    type: "Resource",
    identifier: "6",
    name: "SOMAR",
    approval: <Checkbox />,
  },
  {
    type: "Resource",
    identifier: "7",
    name: "Algar - Telecom aprovação",
    approval: <Checkbox />,
  },
  {
    type: "Resource",
    identifier: "8",
    name: "SOMAR",
    approval: <Checkbox />,
  },
];

const columns = () => [
  {
    field: "type",
    headerName: "Entry Type",
    sortable: false,
  },
  {
    field: "identifier",
    headerName: "Entry identifier",
    sortable: false,
  },
  {
    field: "name",
    headerName: "Entry Name",
    sortable: false,
  },
  {
    field: "approval",
    headerName: "Approval",
    sortable: false,
  },
];

const filters = [
  {
    name: "name",
    label: <FormattedMessage id="name" />,
    type: "string",
  },
];

const Roles = ({ classes }) => {
  const router = useRouter();
  const { loading, data: gridData } = useMockRequest(mockData, 500);

  const search = (filters?: any) => {
    console.log(filters);
  };

  return (
    <CardScreen
      loading={loading}
      title="profile"
      icon=""
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
          height={600}
          list={gridData}
          links={[]}
          columns={columns({ classes })}
          page={1}
          size={25}
          rowsPerPageList={[25, 50, 75, 100]}
          handleClick={() => {}}
        />
      </div>
    </CardScreen>
  );
};

export default withStyles(useStyles)(Roles);
