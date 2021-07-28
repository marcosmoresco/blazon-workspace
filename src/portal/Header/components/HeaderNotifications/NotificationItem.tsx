import { Avatar, Grid } from "@material-ui/core";
import React, { FC } from "react";
import { useIntl } from "react-intl";
import moment from "moment";
import "moment/locale/pt";
import "moment/locale/en-in";
import { getLink } from "@utils/index";
import {
  ReadNotification,
  UnreadNotification,
  NotificationDate,
  NotificationContent,
} from "./styles";
import { NotificationItemProps } from "./types";

const fixDate = (date: string) => date.replace(/min.+/g, "min");

const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
  const intl = useIntl();
  const { from, content, date, status } = notification;
  const Notification = status == "READ" ? ReadNotification : UnreadNotification;

  return (
    <Notification>
      <Grid container>
        <Grid item xs={1}>
          <Avatar alt={from?.displayName} src={getLink("thumb", from?.links || [])}>{from.displayName}</Avatar>
        </Grid>
        <Grid item xs={9}>
          <NotificationContent dangerouslySetInnerHTML={{ __html: content }} />
        </Grid>
        <Grid item xs={2}>
          <NotificationDate>
            {fixDate(moment(date, ["DD/MM/YYYY HH:mm:ss"]).locale(intl.locale).fromNow(true))}
          </NotificationDate>
        </Grid>
      </Grid>
    </Notification>
  );
};

export default NotificationItem;
