import type { LocalesType } from '../locales/types'

//Task
import TaskPt from './Task/locales/pt.json'
import TaskEn from './Task/locales/en.json'
//PasswordVault
import PasswordVaultPt from './PasswordVault/locales/pt.json'
import PasswordVaultEn from './PasswordVault/locales/en.json'

//Requests
import RequestsPt from './Requests/locales/pt.json'
import RequestsEn from './Requests/locales/en.json'

//RequestsDatailing
import RequestsDatailingPt from './Requests/Detail/locales/pt.json'
import RequestsDatailingEn from './Requests/Detail/locales/en.json'

//RequestsDatailing
import UserPt from './User/locales/pt.json'
import UserEn from './User/locales/en.json'

export const ModulesLocalesPt: LocalesType = {
  ...TaskPt,
  ...PasswordVaultPt,
  ...RequestsPt,
  ...RequestsDatailingPt,
  ...UserPt
}

export const ModulesLocalesEn: LocalesType = {
  ...TaskEn,
  ...PasswordVaultEn,
  ...RequestsEn,
  ...RequestsDatailingEn,
  ...UserEn
}

const Locales = {
  ModulesLocalesPt,
  ModulesLocalesEn
}

export default Locales
