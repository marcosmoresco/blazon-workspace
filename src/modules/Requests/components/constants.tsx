// vendors
import React from 'react'
import Image from 'next/image'
import { FormattedMessage } from 'react-intl'
import apolloClient from '@utils/apollo-client'
import { Theme } from '@material-ui/core/styles' 

//queries
import { GET_USER_FULL_TEXT } from '@modules/User/queries'

// types
import type { FilterType } from '@components/Filter/types'
import { Request } from '@modules/Requests/types'

// styles
import { StyledBeneficiary, StyledStatus, StyledNormal } from './styles'

export function Beneficiary({ name, image }: { name: string; image: string }) {
  return (
    <StyledBeneficiary>
      <Image src={image} alt={name} width={32} height={32} />
      <span>{name}</span>
    </StyledBeneficiary>
  )
}

function Status({ status, background, color }: { status: string, background: string, color: string }) {
  return (
    <StyledStatus
      background={background}
      color={color}>
      <span>{status}</span>
    </StyledStatus>
  )
}

function Type({ type }: { type: string }) {
  return (
    <StyledNormal>
      <span>{type}</span>
    </StyledNormal>
  )
}

function EffectiveDate({ effectiveDate }: { effectiveDate: string }) {
  return (
    <StyledNormal>
      <span>{effectiveDate}</span>
    </StyledNormal>
  )
}

export const columns = (theme: Theme) => [
  {
    field: 'identifier',
    headerName: <FormattedMessage id='request.identifier' />,
    sortable: false
  },
  {
    field: 'beneficiary.displayName',
    headerName: <FormattedMessage id='request.beneficiary' />,
    sortable: false,
    // eslint-disable-next-line react/display-name
    renderCell: (row: Request) => {
      return row?.beneficiary ? (
        <Beneficiary
          name={row?.beneficiary.displayName}
          image={row?.beneficiary.links[1].href}
        />
      ) : (
        ' - '
      )
    }
  },
  {
    field: 'type',
    headerName: <FormattedMessage id='request.type' />,
    sortable: true,
    renderCell: (row: Request) => {
      return <Type type={row.type ? row.type : ' - '} />
    }
  },
  {
    field: 'createDate',
    headerName: <FormattedMessage id='request.date' />,
    sortable: true,
    renderCell: (row: Request) => {
      return (
        <EffectiveDate
          effectiveDate={row.createdAt ? row.createdAt : ' - '}
        />
      )
    }
  },
  {
    field: 'status',
    headerName: <FormattedMessage id='request.status' />,
    sortable: true,
    renderCell: (row: Request) => {
      return <Status status={row.status} background={theme.palette.info.main} color={theme.palette.info.contrastText} />
    }
  }
]

export const filters: FilterType[] = [
  {
    orderable: true,
    name: 'identifier',
    label: <FormattedMessage id='request.identifier' />,
    type: 'number'
  },
  {
    orderable: true,
    name: 'type',
    label: <FormattedMessage id='request.type' />,
    type: 'list',
    values: [
      {
        label: <FormattedMessage id='request.type.CREATE_ACCOUNT' />,
        value: 'CREATE_ACCOUNT'
      },
      {
        label: <FormattedMessage id='request.type.UPDATE_ACCOUNT' />,
        value: 'UPDATE_ACCOUNT'
      },
      {
        label: <FormattedMessage id='request.type.ACTIVATE_ACCOUNT' />,
        value: 'ACTIVATE_ACCOUNT'
      },
      {
        label: <FormattedMessage id='request.type.INACTIVATE_ACCOUNT' />,
        value: 'INACTIVATE_ACCOUNT'
      },
      {
        label: <FormattedMessage id='request.type.REVOKE_ACCOUNT' />,
        value: 'REVOKE_ACCOUNT'
      },
      {
        label: <FormattedMessage id='request.type.NEW_USER' />,
        value: 'NEW_USER'
      },
      {
        label: <FormattedMessage id='request.type.UPDATE_USER' />,
        value: 'UPDATE_USER'
      },
      {
        label: <FormattedMessage id='request.type.ACTIVATE_USER' />,
        value: 'ACTIVATE_USER'
      },
      {
        label: <FormattedMessage id='request.type.INACTIVATE_USER' />,
        value: 'INACTIVATE_USER'
      },
      {
        label: <FormattedMessage id='request.type.LOCK_USER' />,
        value: 'LOCK_USER'
      },
      {
        label: <FormattedMessage id='request.type.UNLOCK_USER' />,
        value: 'UNLOCK_USER'
      },
      {
        label: <FormattedMessage id='request.type.REVOKE_USER' />,
        value: 'REVOKE_USER'
      },
      {
        label: <FormattedMessage id='request.type.ASSIGN_ENTITLEMENT' />,
        value: 'ASSIGN_ENTITLEMENT'
      },
      {
        label: <FormattedMessage id='request.type.REVOKE_ENTITLEMENT' />,
        value: 'REVOKE_ENTITLEMENT'
      },
      {
        label: <FormattedMessage id='request.type.ASSIGN_ROLE' />,
        value: 'ASSIGN_ROLE'
      },
      {
        label: <FormattedMessage id='request.type.REVOKE_ROLE' />,
        value: 'REVOKE_ROLE'
      },
      {
        label: (
          <FormattedMessage id='request.type.CHECKIN_ADMIN_ACCOUNT_PASSWORD' />
        ),
        value: 'CHECKIN_ADMIN_ACCOUNT_PASSWORD'
      },
      {
        label: (
          <FormattedMessage id='request.type.CHECKIN_APPLICATION_ACCOUNT_PASSWORD' />
        ),
        value: 'CHECKIN_APPLICATION_ACCOUNT_PASSWORD'
      },
      {
        label: (
          <FormattedMessage id='request.type.CHECKOUT_ADMIN_ACCOUNT_PASSWORD' />
        ),
        value: 'CHECKOUT_ADMIN_ACCOUNT_PASSWORD'
      },
      {
        label: <FormattedMessage id='request.type.RESET_PASSWORD' />,
        value: 'RESET_PASSWORD'
      }
    ],
    bind: 'value',
    view: 'label'
  },
  {
    orderable: true,
    name: 'status',
    label: <FormattedMessage id='request.status' />,
    type: 'list',
    values: [
      {
        label: <FormattedMessage id='request.status.WAITING_APPROVAL' />,
        value: 'WAITING_APPROVAL'
      },
      {
        label: <FormattedMessage id='request.status.WAITING_PROVISIONING' />,
        value: 'WAITING_PROVISIONING'
      },
      {
        label: <FormattedMessage id='request.status.SOD_NOT_ALLOWED' />,
        value: 'SOD_NOT_ALLOWED'
      },
      {
        label: <FormattedMessage id='request.status.DISAPPROVED' />,
        value: 'DISAPPROVED'
      },
      {
        label: <FormattedMessage id='request.status.CANCELED' />,
        value: 'CANCELED'
      },
      {
        label: <FormattedMessage id='request.status.ERROR' />,
        value: 'ERROR'
      },
      {
        label: <FormattedMessage id='request.status.SUCCESS' />,
        value: 'SUCCESS'
      }
    ],
    bind: 'value',
    view: 'label'
  },
  {
    orderable: true,
    name: 'requester',
    label: <FormattedMessage id='request.requester' />,
    type: 'list',
    view: 'displayName',
    async: (dispatch: any, query: string, callback: any) => {
      apolloClient
        .query({
          query: GET_USER_FULL_TEXT,
          variables: {
            size: 10,
            q: query || ''
          }
        })
        .then(({ data }) => {
          callback(
            data?.getUserFullText.map((u) => ({
              ...u
            }))
          )
        })
    }
  },
  {
    orderable: true,
    name: 'beneficiary',
    label: <FormattedMessage id='request.beneficiary' />,
    type: 'list',
    view: 'displayName',
    async: (dispatch: any, query: string, callback: any) => {
      apolloClient
        .query({
          query: GET_USER_FULL_TEXT,
          variables: {
            size: 10,
            q: query || ''
          }
        })
        .then(({ data }) => {
          callback(
            data?.getUserFullText.map((u) => ({
              ...u
            }))
          )
        })
    }
  },
  {
    orderable: true,
    name: 'createdAt',
    label: <FormattedMessage id='createdAt' />,
    type: 'date',
    bind: {
      start: 'initCreatedAt',
      end: 'endCreatedAt'
    }
  },
  {
    orderable: true,
    name: 'finalizedAt',
    label: <FormattedMessage id='finalizedAt' />,
    type: 'date',
    bind: {
      start: 'initFinalizedAt',
      end: 'endFinalizedAt'
    }
  },
  {
    orderable: true,
    name: 'effectiveDate',
    label: <FormattedMessage id='effectivedAt' />,
    type: 'date',
    bind: {
      start: 'initEffectiveAt',
      end: 'endEffectiveAt'
    }
  }
]

export const inProgressStatusList = [
  "NEW", 
  "WAITING_APPROVAL",
  "WAITING_PROVISIONING",
  "WAITING_SOD_VALIDATION",
  "WAITING_EXECUTION",
  "ALREADY_TO_EXECUTION"
]

export const processedStatusList = [
  "SUCCESS",
  "DISAPPROVED", 
  "SOD_NOT_ALLOWED",
  "FINALIZED",
  "CANCELED",
  "ERROR"
]