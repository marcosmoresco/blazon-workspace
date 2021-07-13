import { FormattedMessage } from "react-intl";
import type { FilterType } from "@components/Filter/types";
import CheckSquareOffsetIcon from "@icons/CheckSquareOffset";
import UserGearIcon from "@icons/UserGear";

export const filters: FilterType[] = [
  {
    name: "identifier",
    label: <FormattedMessage id="identifier" />,
    type: "number",
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
        label: <FormattedMessage id="inactive" />,
        value: "INACTIVE",
      },
    ],
    bind: "value",
    view: "label",
  },
  {
    name: "date",
    label: <FormattedMessage id="date" />,
    type: "date",
    bind: {
      start: "initDateAt",
      end: "endDateAt",
    },
  },
];

export const types = [
  {
    label: "Approval",
    value: "APPROVAL",
  },
  {
    label: "SOD",
    value: "SOD",
  },
];

export const sections = [
  {
    icon: <CheckSquareOffsetIcon />,
    name: "tasks",
    value: "TASKS",
  },
  {
    icon: <UserGearIcon />,
    name: "tasks.personal",
    value: "TASKS_PERSONAL",
  },
];