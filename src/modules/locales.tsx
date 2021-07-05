import type { LocalesType } from '../locales/types'

//Task
import TaskPt from './Task/locales/pt.json'
import TaskEn from './Task/locales/en.json'
//PasswordVault
import PasswordVaultPt from './PasswordVault/locales/pt.json'
import PasswordVaultEn from './PasswordVault/locales/en.json'

export const ModulesLocalesPt: LocalesType = {
  ...TaskPt,
  ...PasswordVaultPt  
}

export const ModulesLocalesEn: LocalesType = {
  ...TaskEn,
  ...PasswordVaultEn
}

const Locales = {
  ModulesLocalesPt,
  ModulesLocalesEn
}

export default Locales