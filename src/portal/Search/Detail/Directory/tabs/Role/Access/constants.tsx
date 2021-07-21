import { FormattedMessage } from "react-intl";
import type { FilterType } from "@components/Filter/types";
import { RoleDirectoryRight } from "@portal/Search/types";
import Button from "@components/Button";
import { EntitlementsButton } from "./styles";

export const columns = (handleOpen: any) => ([
  {
    field: "name",
    headerName: <FormattedMessage id="name" />,
    sortable: true,
    renderCell: (row: RoleDirectoryRight) => row.resource?.name || " - ",
  },
  {
    field: "description",
    headerName: <FormattedMessage id="description" />,
    sortable: false,
    renderCell: (row: RoleDirectoryRight) => row.resource?.description || " - ",
  },
  {
    field: "description",
    headerName: "",
    sortable: false,
    renderCell: (row: RoleDirectoryRight) => (
      <EntitlementsButton>
        <Button variant="contained" color="primary" onClick={() => handleOpen(row)}>
          <FormattedMessage id="entitlements" />
        </Button>
      </EntitlementsButton>     
    ),
  },
]);

export const filters: FilterType[] = [
  {
    name: "identifier",
    label: <FormattedMessage id="identifier" />,
    type: "number",
  },
  {
    name: "name",
    label: <FormattedMessage id="name" />,
    type: "string",
  },
];

export const columnsEntitlements = [
  {
    field: "name",
    headerName: <FormattedMessage id="name" />,
    sortable: true   
  }
];
