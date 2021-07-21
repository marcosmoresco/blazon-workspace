import React, { FC } from 'react'
import Roles from './Roles'
import Entitlement from './Entitlement'
import Shared from './Shared'
import Temporary from './Temporary'
import Application from './Application'
import Regular from './Regular'
import Administrative from './Adminstrative'

type UserAccessScreenProps = {
  type: string
}

const mapping: any = {
  roles: Roles,
  entitlements: Entitlement,
  shared: Shared,
  temporary: Temporary,
  application: Application,
  regular: Regular,
  adminstrative: Administrative
}

const UserAccess: FC<UserAccessScreenProps> = ({ type }) => {
  const TargetElement = mapping[type]
  return <TargetElement />
}

export default UserAccess
