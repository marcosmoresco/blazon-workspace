import React, { FC } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useRouter } from "next/router";
import CaretRightIcon from "@icons/CaretRight";
import SharedAccountIcon from "@icons/SharedAccount";
import ApplicationAccountIcon from "@icons/ApplicationAccount";
import RegularAccountIcon from "@icons/RegularAccount";
import AdministrativeAccountIcon from "@icons/AdministrativeAccount";
import Grid from "@material-ui/core/Grid";
import PasswordVaultItem from "@modules/PasswordVaultItem";
import Progress from "@components/Progress";
import Tooltip from "@components/Tooltip";
import EmptyState from "@components/EmptyState";
import EmptyStateRequestsImage from "@images/EmptyStateRequests.svg";
import EmptyStatePasswordVaultmage from "@images/EmptyStatePasswordVault.svg";
import { useQuery } from "@apollo/client";
import { GET_ENTRIES } from "@modules/PasswordVaultItem/queries";
import { GET_REQUESTS, GET_OPEN_STATUS } from "@modules/Requests/queries";
import { Request } from "@modules/Requests/types";
import type { HomeProps } from "./types";
import { useUser } from "@hooks";
import { useTheme, themes } from "@theme/index";
import {
  BoxRequest,
  BoxRequestHeader,
  BoxRequestHeaderIdentifier,
  BoxRequestHeaderDate,
  BoxRequestHeaderTitle,
  BoxRequestHeaderType,
  BoxRequestItem,
  BoxRequestHeaderInfo,
  BoxRoot,
  BoxHeader,
  HeaderWelcomeText,
  HeaderWelcomeSubText,
  BoxHeaderAccessTitle,
  BoxRecentPasswords,
  BoxRecentPasswordsContent,
  BoxHeaderAccess,
  BoxHeaderAccessItem,
  BoxHeaderAccessItemIcon,
  DefaultTitleContent,
  DefaultTitle,
  ShowAll,
  QuickActions,
} from "./styles";

const Home: FC<HomeProps> = ({ classes, intl }) => {
  const router = useRouter();
  const [user] = useUser();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const {
    loading: loadingEntries,
    error: errorEntries,
    data: dataEntries,
  } = useQuery(GET_ENTRIES);

  const { loading: loadingOpenStatus, data: dataOpenStatus } = useQuery<{
    getOpenStatus: string[]
  }>(GET_OPEN_STATUS);

  const {
    loading: loadingRequests,
    error: errorRequests,
    data: dataRequests    
  } = useQuery<{
    getRequests: { requests: Request[]; links: [] };
  }>(GET_REQUESTS, {
    variables: {
      page: 0,
      size: 4,
      filters: JSON.stringify({
        status:  dataOpenStatus?.getOpenStatus || []
      })
    },    
    skip: !dataOpenStatus?.getOpenStatus
  });

  return (
    <BoxRoot>
      <BoxHeader>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <HeaderWelcomeText>
              <div
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(
                    {
                      id: "home.welcome",
                    },
                    {
                      user: `<b>${user?.displayName || " - "}</b>`,
                    }
                  ),
                }}
              />
            </HeaderWelcomeText>
            <HeaderWelcomeSubText>
              {intl.formatMessage({
                id: "home.welcome.text",
              })}
            </HeaderWelcomeSubText>
          </Grid>
          <Grid item xs={6}>
            <BoxHeaderAccessTitle>
              <FormattedMessage id="home.your.access" />
            </BoxHeaderAccessTitle>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <BoxHeaderAccess onClick={() => router.push("/profile/access/shared")}>
                  <BoxHeaderAccessItem>
                    <BoxHeaderAccessItemIcon color={currentTheme.palette.primary.main}>
                      <SharedAccountIcon                       
                        color="#FFFFFF"
                        stroke={1.2}
                      />
                    </BoxHeaderAccessItemIcon>
                    <FormattedMessage id="account.shared" />
                  </BoxHeaderAccessItem>
                  <CaretRightIcon
                    width={25}
                    height={25}
                    stroke={1.3}
                    color="#1B202A"
                  />
                </BoxHeaderAccess>
                <BoxHeaderAccess onClick={() => router.push("/profile/access/application")}>
                  <BoxHeaderAccessItem>
                    <BoxHeaderAccessItemIcon color={currentTheme.palette.primary.main}>
                      <ApplicationAccountIcon                        
                        color="#FFFFFF"
                        stroke={1.2}
                      />
                    </BoxHeaderAccessItemIcon>
                    <FormattedMessage id="account.application" />
                  </BoxHeaderAccessItem>
                  <CaretRightIcon
                    width={25}
                    height={25}
                    stroke={1.3}
                    color="#1B202A"
                  />
                </BoxHeaderAccess>
              </Grid>
              <Grid item xs={6}>
                <BoxHeaderAccess onClick={() => router.push("/profile/access/regular")}>
                  <BoxHeaderAccessItem>
                    <BoxHeaderAccessItemIcon color={currentTheme.palette.primary.main}>
                      <RegularAccountIcon                       
                        color="#FFFFFF"
                        stroke={1.3}
                      />
                    </BoxHeaderAccessItemIcon>
                    <FormattedMessage id="account.regular" />
                  </BoxHeaderAccessItem>
                  <CaretRightIcon
                    width={25}
                    height={25}
                    stroke={1.3}
                    color="#1B202A"
                  />
                </BoxHeaderAccess>
                <BoxHeaderAccess onClick={() => router.push("/profile/access/adminstrative")}>
                  <BoxHeaderAccessItem>
                    <BoxHeaderAccessItemIcon color={currentTheme.palette.primary.main}>
                      <AdministrativeAccountIcon                        
                        color="#FFFFFF"
                        stroke={1.3}
                      />
                    </BoxHeaderAccessItemIcon>
                    <FormattedMessage id="account.administrative" />
                  </BoxHeaderAccessItem>
                  <CaretRightIcon
                    width={25}
                    height={25}
                    stroke={1.3}
                    color="#1B202A"
                  />
                </BoxHeaderAccess>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </BoxHeader>
      <QuickActions>
        <FormattedMessage id="home.quick.actions"/>
      </QuickActions>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <BoxRecentPasswords>
            <DefaultTitleContent>
              <DefaultTitle>
                {intl.formatMessage({
                  id: "home.requests.in.progress",
                })}
              </DefaultTitle>
              <ShowAll onClick={() => router.push("/requests")}>
                {intl.formatMessage({
                  id: "home.recent.passwords.see.all",
                })}
                <CaretRightIcon width={20} height={20} />
              </ShowAll>
            </DefaultTitleContent>
            <BoxRequest>
              {(!loadingRequests && !loadingOpenStatus &&
                ((!errorRequests && 
                  (dataRequests?.getRequests?.requests || []).length && (
                    <>
                      <Grid container spacing={0}>
                        {(dataRequests?.getRequests?.requests || []).map(
                          (request: Request, index: number) => {
                            const itemName =
                              request?.entitlement?.name ||
                              request?.resource?.name ||
                              request?.role?.name ||
                              request?.user?.displayName ||
                              request?.beneficiary?.displayName ||
                              " - ";

                            return (
                              <Grid item xs={12} key={`home-request=${index}`}>
                                <BoxRequestItem
                                  onClick={() =>
                                    router.push(
                                      `/requests/${request.identifier}`
                                    )
                                  }
                                >
                                  <BoxRequestHeader>
                                    <BoxRequestHeaderIdentifier
                                      background={currentTheme.palette.info.main}
                                      color={currentTheme.palette.info.contrastText}>
                                      {request.identifier}
                                    </BoxRequestHeaderIdentifier>
                                    <BoxRequestHeaderInfo>
                                      <BoxRequestHeaderType
                                        background={currentTheme.palette.info.main}
                                        color={currentTheme.palette.info.contrastText}>
                                        {request?.type || " - "}
                                      </BoxRequestHeaderType>
                                      <BoxRequestHeaderDate>
                                        {request.createdAt}
                                      </BoxRequestHeaderDate>
                                    </BoxRequestHeaderInfo>                                    
                                  </BoxRequestHeader>
                                  <BoxRequestHeader>
                                    <Tooltip
                                      title={itemName}
                                      placement="bottom"
                                    >
                                      <BoxRequestHeaderTitle>
                                        {itemName}
                                      </BoxRequestHeaderTitle>
                                    </Tooltip>                                   
                                  </BoxRequestHeader>                                  
                                </BoxRequestItem>
                              </Grid>
                            );
                          }
                        )}
                      </Grid>
                    </>
                  )) || (
                  <EmptyState
                    image={EmptyStateRequestsImage}
                    title="home.no.request"
                    text="home.no.request.text"
                  />
                ))) || <Progress />}
            </BoxRequest>
          </BoxRecentPasswords>
        </Grid>
        <Grid item xs={6}>
          <BoxRecentPasswords>
            <DefaultTitleContent>
              <DefaultTitle>
                {intl.formatMessage({
                  id: "home.recent.passwords",
                })}
              </DefaultTitle>
              <ShowAll onClick={() => router.push("/password-vault")}>
                {intl.formatMessage({
                  id: "home.recent.passwords.see.all",
                })}
                <CaretRightIcon width={20} height={20} />
              </ShowAll>
            </DefaultTitleContent>
            <BoxRecentPasswordsContent isEmpty={!(dataEntries?.getPasswordVaultEntries || []).length}>
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
                          >
                            <PasswordVaultItem r={r} classes={classes} />
                          </Grid>
                        ))}
                    </Grid>
                  )) || (
                  <EmptyState
                    image={EmptyStatePasswordVaultmage}
                    title="passwordVault.emptyState.title"
                    text="passwordVault.emptyState.description.text"
                  />
                ))) || <Progress />}
            </BoxRecentPasswordsContent>
          </BoxRecentPasswords>
        </Grid>
      </Grid>
    </BoxRoot>
  );
};

export default injectIntl(Home);
