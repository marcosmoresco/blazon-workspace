import { FormattedMessage } from "react-intl";
import type { FilterType } from "@components/Filter/types";

export const columns = [
  {
    field: "name",
    headerName: <FormattedMessage id="name" />,
    sortable: true,
  },
  {
    field: "description",
    headerName: <FormattedMessage id="description" />,
    sortable: false,
  },
];

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
