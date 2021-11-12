import { IntlShape } from "react-intl";
import { Link, User } from "@types";

export type TeamProps = {
  intl: IntlShape;
  onBack?: () => void;
};

export type TeamDetailProps = {
  intl: IntlShape;
  user: User | undefined;
};

export type ResponsibleTeam = {
  identifier: number;
  user: User;
}

export type ResponsibleTeamRepresentation = {
  links: [Link];
  representation: [ResponsibleTeam];
}

export type UserDetail = {
  name: String;
  label: String;
  value: string | number | undefined;
}

export type ResponsibleTeamUserDetailRepresentation = {
  links: [Link];
  fields: [UserDetail];
}