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
import PasswordVaultTutorial from "@modules/PasswordVault/components/Tutorial";
import PasswordVault from "@modules/PasswordVault/components";
import HeaderImg from "./images/header.svg";
import { gql, useQuery } from "@apollo/client";
import { RESUME } from "./queries";
import { GET_ENTRIES } from "@modules/PasswordVault/queries";
import type { HomeProps } from "./types";
import useStyles from "./styles";

const Home: FC<HomeProps> = ({ classes, intl }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [passwordVault, setPasswordVault] = useState({});

  const { loading, error, data } = useQuery(GET_ENTRIES);

  return (
    <div className={classes.root}>
      <PasswordVaultTutorial />
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
              id: "home.welcome.text",
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
              <Grid container spacing={3}>
                {!loading && !error
                  ? data?.getPasswordVaultEntries.slice(0, 4).map((r: any) => (
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
                          <div className={classes.recentPasswordCardContent}>
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
                    ))
                  : null}
              </Grid>
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
              <div className={classes.showAll}>
                {intl.formatMessage({
                  id: "home.accounts.see.all",
                })}
                <CaretRightIcon width={21} height={21} />
              </div>
            </div>
            <div className={classes.accounts}>
              <div className={classes.accountsContent}>
                <div className={classes.accountsContentInfo}>
                  <div className={classes.accountsContentInfoIcon}>
                    <ShareIcon width={21} height={21} color="#FFFFFF" />
                  </div>
                  {intl.formatMessage({
                    id: "account.shared",
                  })}
                </div>
                <CaretRightIcon width={21} height={21} />
              </div>
              <div className={classes.accountsContent}>
                <div className={classes.accountsContentInfo}>
                  <div className={classes.accountsContentInfoIcon}>
                    <ShareIcon width={21} height={21} color="#FFFFFF" />
                  </div>
                  {intl.formatMessage({
                    id: "account.application",
                  })}
                </div>
                <CaretRightIcon width={21} height={21} />
              </div>
              <div className={classes.accountsContent}>
                <div className={classes.accountsContentInfo}>
                  <div className={classes.accountsContentInfoIcon}>
                    <ShareIcon width={21} height={21} color="#FFFFFF" />
                  </div>
                  {intl.formatMessage({
                    id: "account.regular",
                  })}
                </div>
                <CaretRightIcon width={21} height={21} />
              </div>
              <div className={classes.accountsContent}>
                <div className={classes.accountsContentInfo}>
                  <div className={classes.accountsContentInfoIcon}>
                    <ShareIcon width={21} height={21} color="#FFFFFF" />
                  </div>
                  {intl.formatMessage({
                    id: "account.administrative",
                  })}
                </div>
                <CaretRightIcon width={21} height={21} />
              </div>
            </div>
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
