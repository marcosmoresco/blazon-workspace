import type { LocalesType } from '../locales/types'

//Task
import TaskPt from './Task/locales/pt.json'
import TaskEn from './Task/locales/en.json'

// TasksDetails
import TasksDetailsPt from './TasksDetails/locales/pt.json'
import TasksDetailsEn from './TasksDetails/locales/en.json'

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

//Checkout
import CheckoutPt from "./Checkout/Locales/pt.json";
import CheckoutEn from "./Checkout/Locales/en.json";

//CheckoutEmpty
import CheckoutEmptyPt from "./CheckoutEmpty/Locales/pt.json";
import CheckoutEmptyEn from "./CheckoutEmpty/Locales/en.json";

//CheckoutFinishing
import CheckoutFinishingPt from "./CheckoutFinishing/Locales/pt.json";
import CheckoutFinishingEn from "./CheckoutFinishing/Locales/en.json";

//CheckoutRequested
import CheckoutRequestedPt from "./CheckoutRequested/Locales/pt.json";
import CheckoutRequestedEn from "./CheckoutRequested/Locales/en.json";

export const ModulesLocalesPt: LocalesType = {
  ...TaskPt,
  ...TasksDetailsPt,
  ...PasswordVaultPt,
  ...RequestsPt,
  ...RequestsDatailingPt,
  ...UserPt,
  ...CheckoutPt,
  ...CheckoutEmptyPt,
  ...CheckoutFinishingPt,
  ...CheckoutRequestedPt,
}

export const ModulesLocalesEn: LocalesType = {
  ...TaskEn,
  ...TasksDetailsEn,
  ...PasswordVaultEn,
  ...RequestsEn,
  ...RequestsDatailingEn,
  ...UserEn,
  ...CheckoutEn,
  ...CheckoutEmptyEn,
  ...CheckoutFinishingEn,
  ...CheckoutRequestedEn,
}

const Locales = {
  ModulesLocalesPt,
  ModulesLocalesEn
}

export default Locales
