import React, { FC, useState } from 'react'
import { injectIntl } from 'react-intl'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Button from '@components/Button'
import CaretRightIcon from '@icons/CaretRight'
import KeyIcon from '@icons/Key'
import ShareIcon from '@icons/Share'
import Grid from '@material-ui/core/Grid'
import PasswordVault from '@modules/PasswordVaultItem/components'
import Progress from '@components/Progress'
import Tooltip from '@components/Tooltip'
import HeaderImg from './images/header.svg'
import EmptyState from './components/EmptyState'
import { useQuery } from '@apollo/client'
import { RESUME } from './queries'
import { GET_ENTRIES } from '@modules/PasswordVaultItem/queries'
import { GET_REQUESTS } from '@modules/Requests/queries'
import { Request } from '@modules/Requests/types'
import type { HomeProps } from './types'
import {
  BoxCard,
  BoxRequest,
  BoxRequestHeader,
  BoxRequestHeaderIdentifier,
  BoxRequestHeaderDate,
  BoxRequestHeaderTitle,
  BoxRequestHeaderType,
  BoxRequestDescription,
  BoxRoot,
  BoxHeader,
  HeaderWelcomeText,
  HeaderWelcomeSubText,
  HeaderWelcomeImg,
  BoxRecentPasswords,
  BoxRecentPasswordsContent,
  DefaultTitleContent,
  DefaultTitle,
  ShowAll,
  RecentPasswordCard,
  RecentPasswordCardContent,
  RecentPasswordCardContentHeader,
  RecentPasswordCardContentHeaderImage,
  RecentPasswordCardContentHeaderTitle,
  RecentPasswordCardContentHeaderUsername,
  RecentPasswordCardContentHeaderText,
  RecentPasswordCardContentHeaderBox,
  BoxAccounts,
  AccountsContent,
  AccountsContentInfo,
  AccountsContentInfoIcon,
} from './styles'

const Home: FC<HomeProps> = ({ classes, intl }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [passwordVault, setPasswordVault] = useState({})

  const { data: dataResume } = useQuery(RESUME)
  const {
    loading: loadingEntries,
    error: errorEntries,
    data: dataEntries
  } = useQuery(GET_ENTRIES)

  const {
    loading: loadingRequests,
    error: errorRequests,
    data: dataRequests
  } = useQuery<{
    getRequests: { requests: Request[]; links: [] }
  }>(GET_REQUESTS, {
    variables: {
      page: 0,
      size: 4
    }
  })

  return (
    <BoxRoot>
      <BoxHeader>
        <div>
          <HeaderWelcomeText>
            {intl.formatMessage(
              {
                id: 'home.welcome'
              },
              {
                user: 'Mateus'
              }
            )}
          </HeaderWelcomeText>
          <HeaderWelcomeSubText>
            {intl.formatMessage({
              id:
                dataResume?.getResume?.totalOpenTasks > 0
                  ? 'home.welcome.text.new'
                  : 'home.welcome.text'
            })}
          </HeaderWelcomeSubText>
          <Button
            variant='contained'
            color='primary'
            onClick={() => router.push('/tasks')}
          >
            {intl.formatMessage({
              id: 'home.welcome.open.tasks'
            })}
          </Button>
          <HeaderWelcomeImg>
            <Image src={HeaderImg} alt='Header image' />
          </HeaderWelcomeImg>
        </div>
      </BoxHeader>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <BoxRecentPasswords>
            <DefaultTitleContent>
              <DefaultTitle>
                {intl.formatMessage({
                  id: 'home.recent.passwords'
                })}
              </DefaultTitle>
              <ShowAll
                onClick={() => router.push('/password-vault')}
              >
                {intl.formatMessage({
                  id: 'home.recent.passwords.see.all'
                })}
                <CaretRightIcon width={20} height={20} />
              </ShowAll>
            </DefaultTitleContent>
            <BoxRecentPasswordsContent>
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
                              setOpen(true)
                              setPasswordVault(r)
                            }}
                          >
                            <RecentPasswordCard>
                              <RecentPasswordCardContent>
                                <RecentPasswordCardContentHeader>
                                  <RecentPasswordCardContentHeaderImage>
                                    <KeyIcon
                                      width={30}
                                      height={30}
                                      color='#3174F6'
                                    />
                                  </RecentPasswordCardContentHeaderImage>
                                  <RecentPasswordCardContentHeaderBox>
                                    <Tooltip title={r.name} placement="bottom">
                                      <RecentPasswordCardContentHeaderTitle>
                                        {r.name}
                                      </RecentPasswordCardContentHeaderTitle>
                                    </Tooltip>  
                                    <Tooltip title={r.username} placement="bottom">
                                      <RecentPasswordCardContentHeaderUsername>
                                        {r.username}
                                      </RecentPasswordCardContentHeaderUsername>
                                    </Tooltip>                                                                    
                                  </RecentPasswordCardContentHeaderBox>
                                </RecentPasswordCardContentHeader>
                                <Tooltip title={r.description} placement="bottom">
                                  <RecentPasswordCardContentHeaderText>
                                    {r.description}
                                  </RecentPasswordCardContentHeaderText>
                                </Tooltip>                                
                              </RecentPasswordCardContent>
                            </RecentPasswordCard>
                          </Grid>
                        ))}
                    </Grid>
                  )) || (
                  <EmptyState
                    title='passwordVault.no.password'
                    text='passwordVault.no.password.text'
                  />
                ))) || <Progress />}
            </BoxRecentPasswordsContent>
          </BoxRecentPasswords>
        </Grid>
        <Grid item xs={6}>
          <BoxRecentPasswords>
            <DefaultTitleContent>
              <DefaultTitle>
                {intl.formatMessage({
                  id: 'home.accounts'
                })}
              </DefaultTitle>
              <ShowAll
                onClick={() => router.push('/profile')}
              >
                {intl.formatMessage({
                  id: 'home.accounts.see.all'
                })}
                <CaretRightIcon width={21} height={21} />
              </ShowAll>
            </DefaultTitleContent>
            <BoxAccounts>
              <AccountsContent
                onClick={() => router.push('/profile/access/shared')}
              >
                <AccountsContentInfo>
                  <AccountsContentInfoIcon>
                    <ShareIcon width={21} height={21} color='#FFFFFF' />
                  </AccountsContentInfoIcon>
                  {intl.formatMessage({
                    id: 'account.shared'
                  })}
                </AccountsContentInfo>
                <div className='caretRight-icon'>
                  <CaretRightIcon width={21} height={21} />
                </div>
              </AccountsContent>
              <AccountsContent
                onClick={() => router.push('/profile/access/application')}
              >
                <AccountsContentInfo>
                  <AccountsContentInfoIcon>
                    <ShareIcon width={21} height={21} color='#FFFFFF' />
                  </AccountsContentInfoIcon>
                  {intl.formatMessage({
                    id: 'account.application'
                  })}
                </AccountsContentInfo>
                <div className='caretRight-icon'>
                  <CaretRightIcon width={21} height={21} />
                </div>
              </AccountsContent>
              <AccountsContent
                onClick={() => router.push('/profile/access/regular')}
              >
                <AccountsContentInfo>
                  <AccountsContentInfoIcon>
                    <ShareIcon width={21} height={21} color='#FFFFFF' />
                  </AccountsContentInfoIcon>
                  {intl.formatMessage({
                    id: 'account.regular'
                  })}
                </AccountsContentInfo>
                <div className='caretRight-icon'>
                  <CaretRightIcon width={21} height={21} />
                </div>
              </AccountsContent>
              <AccountsContent
                onClick={() => router.push('/profile/access/adminstrative')}
              >
                <AccountsContentInfo>
                  <AccountsContentInfoIcon>
                    <ShareIcon width={21} height={21} color='#FFFFFF' />
                  </AccountsContentInfoIcon>
                  {intl.formatMessage({
                    id: 'account.administrative'
                  })}
                </AccountsContentInfo>
                <div className='caretRight-icon'>
                  <CaretRightIcon width={21} height={21} />
                </div>
              </AccountsContent>
            </BoxAccounts>
          </BoxRecentPasswords>
        </Grid>
        <Grid item xs={12}>
          <BoxRecentPasswords>
            <DefaultTitleContent>
              <DefaultTitle>
                {intl.formatMessage({
                  id: 'home.requests.in.progress'
                })}
              </DefaultTitle>
              <ShowAll
                onClick={() => router.push('/requests')}
              >
                {intl.formatMessage({
                  id: 'home.recent.passwords.see.all'
                })}
                <CaretRightIcon width={20} height={20} />
              </ShowAll>
            </DefaultTitleContent>
            <BoxRequest>
              {(!loadingRequests &&
                ((!errorRequests &&
                  (dataRequests?.getRequests?.requests || []).length && (
                    <>
                      <Grid container spacing={3}>
                        {(dataRequests?.getRequests?.requests || []).map(
                          (request: Request, index: number) => {
                            const itemName =
                              request?.entitlement?.name ||
                              request?.resource?.name ||
                              request?.role?.name ||
                              request?.user?.displayName ||
                              request?.beneficiary?.displayName ||
                              ' - '

                            return (
                              <Grid item xs={6} key={`home-request=${index}`}>
                                <BoxCard
                                  onClick={() =>
                                    router.push(
                                      `/requests/${request.identifier}`
                                    )
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
                                    <Tooltip
                                      title={itemName}
                                      placement='bottom'
                                    >
                                      <BoxRequestHeaderTitle>
                                        {itemName}
                                      </BoxRequestHeaderTitle>
                                    </Tooltip>
                                    <BoxRequestHeaderType>
                                      {request?.type || ' - '}
                                    </BoxRequestHeaderType>
                                  </BoxRequestHeader>
                                  <Tooltip
                                    title={request?.justification}
                                    placement='bottom'
                                  >
                                    <BoxRequestDescription>
                                      {request?.justification}
                                    </BoxRequestDescription>
                                  </Tooltip>
                                </BoxCard>
                              </Grid>
                            )
                          }
                        )}
                      </Grid>
                    </>
                  )) || (
                  <EmptyState
                    title='home.no.request'
                    text='home.no.request.text'
                  />
                ))) || <Progress />}
            </BoxRequest>
          </BoxRecentPasswords>
        </Grid>
      </Grid>     
    </BoxRoot>
  )
}

export default injectIntl(Home);
