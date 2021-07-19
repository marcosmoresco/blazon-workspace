import { FormattedMessage } from "react-intl";
import type { FilterType } from "@components/Filter/types";
import CheckSquareOffsetIcon from "@icons/CheckSquareOffset";
import UserGearIcon from "@icons/UserGear";

export const filters: FilterType[] = [
  {
    name: "identifier",
    label: <FormattedMessage id="identifier" />,
    type: "number",
  }
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