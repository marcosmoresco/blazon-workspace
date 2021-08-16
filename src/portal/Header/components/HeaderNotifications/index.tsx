import React, { FC, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Drawer from "@material-ui/core/Drawer";
import Button from "@components/Button";
import Tooltip from "@components/Tooltip";
import BellSimpleIcon from "@icons/BellSimple";
import XIcon from "@icons/X";
import type { HeaderNotificationsProps } from "./types";
import moment from "moment";
import apolloClient from "@utils/apollo-client";
import {
  Badge,
  NotificationsBox,
  NotificationsHeader,
  Header,
  HeaderTitle,
  HeaderDivider,
  CloseHeader,
  NotificationGroup,
  LoadMoreContent,
} from "./styles";
import EmptyStateMailBoxIcon from "@icons/EmptyStateMailBox";
import EmptyStateNotifications from "@images/EmptyStateNotifications.svg"
import Loading from "@components/Loading";
import EmptyState from "@components/EmptyState";
import NotificationItem from "./NotificationItem";
import { getQueryParam } from "@utils/queryParam";

//types
import { NotificationRepresentation, Notification, Link } from "@types";

//queries
import { GET_NOTIFICATIONS } from "@portal/Header/queries";

const HeaderNotifications: FC<HeaderNotificationsProps> = ({
  intl,
  classes,
  currentTheme,
}) => {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState<{[key: string]: any}>({});
  const [next, setNext] = useState<string>("");
  
  const getNextPage = (links: Link[]): string => {

    if(links) {
      let nextLinks = links.filter((l: any) => l.rel === "next");
      if(nextLinks.length) {
        return nextLinks[0].href;
      }
    }

    return "";
  };

  const find = (page: number) => {
    setLoading(true);   
    apolloClient
      .query({
        query: GET_NOTIFICATIONS,
        variables: {
          page,
          size: 10,
          ord: "id:desc",
        },
        fetchPolicy: "no-cache"
      })
      .then(({ data }) => {
        if (data.getNotifications) {
          const today = moment().startOf("day");
          const tomorrow = moment().add(-1, "day").startOf("day");
          const _newGroups: {[key: string]: any} = page > 0 ? groups : {};
          data?.getNotifications?.notifications.map((notification: Notification) => {
            const ocurrence = moment(notification.date, ["DD/MM/YYYY HH:mm:ss"]);
            let group;
            if (ocurrence.isAfter(today)) {
              group = intl.formatMessage({ id: "dates.today" });
            } else if (ocurrence.isAfter(tomorrow)) {
              group = intl.formatMessage({ id: "dates.tomorrow" });
            } else {
              group = intl.formatDate(ocurrence.toDate(), {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "2-digit",
              });
            }
            if (!_newGroups[group]) {
              _newGroups[group] = [];
            }
            _newGroups[group].push(notification);
          });
          setNext(getNextPage(data?.getNotifications?.links));
          setGroups(_newGroups);
        }
        setLoading(false);
      });
  };

  const handleOpen = () => {
    setOpen(true);
    find(0);
  };

  const handleNext = () => {    
    const _next = next.replace(/{.*?}/g, "");
    const page = Number(getQueryParam("page", _next));
    find(page);
  };

  return (
    <>
      <Tooltip
        title={intl.formatMessage({ id: "notifications" })}
        placement="bottom"
      >
        <Badge
          color="primary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div className={classes.optionImage} onClick={handleOpen}>
            <BellSimpleIcon
              width={21}
              height={21}
              color={currentTheme.overrides.MuiIcon.root.color}
            />
          </div>
        </Badge>
      </Tooltip>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <NotificationsBox>
          <NotificationsHeader>
            <Header>
              <HeaderTitle>
                <FormattedMessage id="notifications" />
              </HeaderTitle>
              <CloseHeader onClick={() => setOpen(false)}>
                <XIcon />
              </CloseHeader>
            </Header>
            <HeaderDivider />
          </NotificationsHeader>
        </NotificationsBox>
        {loading ? (
          <Loading container={true} />
        ) : (
          <div>
            {!Object.keys(groups).length && (
              <EmptyState image={EmptyStateNotifications} title="notifications.empty.title" text="notifications.empty.subTitle"/>
            )}
            {Object.keys(groups).map((key, index) => {
              const group = groups[key];
              return (
                <div key={index}>
                  <NotificationGroup>{key}</NotificationGroup>
                  <div>
                    {group.map((notification: Notification, key: number) => (
                      <NotificationItem notification={notification} key={key} />
                    ))}
                  </div>
                </div>
              );
            })}
            {next && (
              <LoadMoreContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNext()}
                >
                  <FormattedMessage id="loadMore" />
                </Button>
              </LoadMoreContent>
            )}
          </div>
        )}
      </Drawer>
    </>
  );
};

export default injectIntl(HeaderNotifications);
