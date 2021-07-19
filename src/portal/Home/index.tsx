import React, { FC, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { injectIntl } from "react-intl";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@components/Button";
import CaretRightIcon from "@icons/CaretRight";
import KeyIcon from "@icons/Key";
import ShareIcon from "@icons/Share";
import Grid from "@material-ui/core/Grid";
import PasswordVault from "@modules/PasswordVault/components";
import Progress from "@components/Progress";
import HeaderImg from "./images/header.svg";
import EmptyState from "./components/EmptyState";
import { gql, useQuery } from "@apollo/client";
import { RESUME } from "./queries";
import { GET_ENTRIES } from "@modules/PasswordVault/queries";
import { GET_REQUESTS } from "@modules/Requests/queries";
import { Request } from "@modules/Requests/types";
import type { HomeProps } from "./types";
import {
  useStyles,
  BoxCard,
  BoxRequest,
  BoxRequestHeader,
  BoxRequestHeaderIdentifier,
  BoxRequestHeaderDate,
  BoxRequestHeaderTitle,
  BoxRequestHeaderType,
  BoxRequestDescription,
} from "./styles";

const Home: FC<HomeProps> = ({ classes, intl }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [passwordVault, setPasswordVault] = useState({});

  const { data: dataResume } = useQuery(RESUME);
  const {
    loading: loadingEntries,
    error: errorEntries,
    data: dataEntries,
  } = useQuery(GET_ENTRIES);

  const {
    loading: loadingRequests,
    error: errorRequests,
    data: dataRequests,
  } = useQuery<{
    getRequests: { requests: Request[]; links: [] };
  }>(GET_REQUESTS, {
    variables: {
      page: 0,
      size: 4,
    },
  });

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>
          <div className={classes.headerWelcomeText}>
            {intl.formatMessage(
              {
                id: "home.welcome",
              },
              {
                user: "Mateus",
              }
            )}
          </div>
          <div className={classes.headerWelcomeSubText}>
            {intl.formatMessage({
              id:
                dataResume?.getResume?.totalOpenTasks > 0
                  ? "home.welcome.text.new"
                  : "home.welcome.text",
            })}
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/tasks")}
          >
            {intl.formatMessage({
              id: "home.welcome.open.tasks",
            })}
          </Button>
          <div className={classes.headerWelcomeImg}>
            <Image src={HeaderImg} alt="Header image" />
          </div>
        </div>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div className={classes.recentPasswords}>
            <div className={classes.defaultTitleContent}>
              <div className={classes.defaultTitle}>
                {intl.formatMessage({
                  id: "home.recent.passwords",
                })}
              </div>
              <div className={classes.showAll}>
                {intl.formatMessage({
                  id: "home.recent.passwords.see.all",
                })}
                <CaretRightIcon width={20} height={20} />
              </div>
            </div>
            <div className={classes.recentPasswordsContent}>
              {(!loadingEntries &&
                ((!errorEntries &&
                  (dataEntries?.getPasswordVaultEntries || []).length && (
                    <Grid container spacing={3}>
                      {dataEntries?.getPasswordVaultEntries
                        .slice(0, 4)
                        .map((r: any) => (
                          <Grid
                            item
                            xs={6}
                            key={`recenter-password-${r.identifier}`}
                            onClick={() => {
                              setOpen(true);
                              setPasswordVault(r);
                            }}
                          >
                            <div className={classes.recentPasswordCard}>
                              <div
                                className={classes.recentPasswordCardContent}
                              >
                                <div
                                  className={
                                    classes.recentPasswordCardContentHeader
                                  }
                                >
                                  <div
                                    className={
                                      classes.recentPasswordCardContentHeaderImage
                                    }
                                  >
                                    <KeyIcon
                                      width={30}
                                      height={30}
                                      color="#3174F6"
                                    />
                                  </div>
                                  <div>
                                    <div
                                      className={
                                        classes.recentPasswordCardContentHeaderTitle
                                      }
                                    >
                                      {r.name}
                                    </div>
                                    <div
                                      className={
                                        classes.recentPasswordCardContentHeaderUsername
                                      }
                                    >
                                      {r.username}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    classes.recentPasswordCardContentHeaderText
                                  }
                                >
                                  {r.description}
                                </div>
                              </div>
                            </div>
                          </Grid>
                        ))}
                    </Grid>
                  )) || (
                  <EmptyState
                    title="passwordVault.no.password"
                    text="passwordVault.no.password.text"
                  />
                ))) || <Progress />}
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.recentPasswords}>
            <div className={classes.defaultTitleContent}>
              <div className={classes.defaultTitle}>
                {intl.formatMessage({
                  id: "home.accounts",
                })}
              </div>
              <div className={classes.showAll} onClick={() => router.push("/profile")}>
                {intl.formatMessage({
                  id: "home.accounts.see.all",
                })}              
                <CaretRightIcon width={21} height={21} />
              </div>
            </div>
            <div className={classes.accounts}>
              <div className={classes.accountsContent} onClick={() => router.push("/profile/access/shared")}>
                <div className={classes.accountsContentInfo}>
                  <div className={`${classes.accountsContentInfoIcon} contentInfoIcon`}>
                    <ShareIcon width={21} height={21} color="#FFFFFF" />
                  </div>
                  {intl.formatMessage({
                    id: "account.shared",
                  })}
                </div>
                <div className="caretRight-icon">
                  <CaretRightIcon width={21} height={21} />
                </div>                
              </div>
              <div className={classes.accountsContent} onClick={() => router.push("/profile/access/application")}>
                <div className={classes.accountsContentInfo}>
                  <div className={`${classes.accountsContentInfoIcon} contentInfoIcon`}>
                    <ShareIcon width={21} height={21} color="#FFFFFF" />
                  </div>
                  {intl.formatMessage({
                    id: "account.application",
                  })}
                </div>
                <div className="caretRight-icon">
                  <CaretRightIcon width={21} height={21} />
                </div>                
              </div>
              <div className={classes.accountsContent} onClick={() => router.push("/profile/access/regular")}>
                <div className={classes.accountsContentInfo}>
                  <div className={`${classes.accountsContentInfoIcon} contentInfoIcon`}>
                    <ShareIcon width={21} height={21} color="#FFFFFF" />
                  </div>
                  {intl.formatMessage({
                    id: "account.regular",
                  })}
                </div>
                <div className="caretRight-icon">
                  <CaretRightIcon width={21} height={21} />
                </div>                
              </div>
              <div className={classes.accountsContent} onClick={() => router.push("/profile/access/adminstrative")}>
                <div className={classes.accountsContentInfo}>
                  <div className={`${classes.accountsContentInfoIcon} contentInfoIcon`}>
                    <ShareIcon width={21} height={21} color="#FFFFFF" />
                  </div>
                  {intl.formatMessage({
                    id: "account.administrative",
                  })}
                </div>
                <div className="caretRight-icon">
                  <CaretRightIcon width={21} height={21} />
                </div>                
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.recentPasswords}>
            <div className={classes.defaultTitleContent}>
              <div className={classes.defaultTitle}>
                {intl.formatMessage({
                  id: "home.requests.in.progress",
                })}
              </div>
              <div
                className={classes.showAll}
                onClick={() => router.push("/requests")}
              >
                {intl.formatMessage({
                  id: "home.recent.passwords.see.all",
                })}
                <CaretRightIcon width={20} height={20} />
              </div>
            </div>
            <BoxRequest>
              {(!loadingRequests &&
                ((!errorRequests &&
                  (dataRequests?.getRequests?.requests || []).length && (
                    <>
                      <Grid container spacing={3}>
                        {(dataRequests?.getRequests?.requests || []).map(
                          (request: Request, index: number) => (
                            <Grid item xs={6} key={`home-request=${index}`}>
                              <BoxCard
                                onClick={() =>
                                  router.push(`/requests/${request.identifier}`)
                                }
                              >
                                <BoxRequestHeader>
                                  <BoxRequestHeaderIdentifier>
                                    {request.identifier}
                                  </BoxRequestHeaderIdentifier>
                                  <BoxRequestHeaderDate>
                                    {request.createdAt}
                                  </BoxRequestHeaderDate>
                                </BoxRequestHeader>
                                <BoxRequestHeader>
                                  <BoxRequestHeaderTitle>
                                    {request?.entitlement?.name ||
                                      request?.resource?.name ||
                                      request?.role?.name ||
                                      request?.user?.displayName ||
                                      request?.beneficiary?.displayName ||
                                      " - "}
                                  </BoxRequestHeaderTitle>
                                  <BoxRequestHeaderType>
                                    {request?.type || " - "}
                                  </BoxRequestHeaderType>
                                </BoxRequestHeader>
                                <BoxRequestDescription>
                                  {request?.justification}
                                </BoxRequestDescription>
                              </BoxCard>
                            </Grid>
                          )
                        )}
                      </Grid>
                    </>
                  )) || (
                  <EmptyState
                    title="home.no.request"
                    text="home.no.request.text"
                  />
                ))) || <Progress />}
            </BoxRequest>
          </div>
        </Grid>
      </Grid>
      <PasswordVault
        onClose={() => setOpen(false)}
        open={open || false}
        passwordVault={passwordVault}
      />
    </div>
  );
};

export default withStyles(useStyles)(injectIntl(Home));
