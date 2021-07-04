import type { LocalesType } from '../locales/types'

//Task
import TaskPt from './Task/locales/pt.json'
import TaskEn from './Task/locales/en.json'

export const ModulesLocalesPt:LocalesType = {
  ...TaskPt,  
}

export const ModulesLocalesEn:LocalesType = {
  ...TaskEn,
}

const Locales = {
  ModulesLocalesPt,
  ModulesLocalesEn
}

export default Locales