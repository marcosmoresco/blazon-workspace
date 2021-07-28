import { IntlShape } from "react-intl";
import { Notification } from "@types";

export type HeaderNotificationsProps = {
  intl: IntlShape;
  currentTheme: any;
  classes: {
    optionImage: any;
  };
};
export type NotificationItemProps = {
  notification: Notification;
};
