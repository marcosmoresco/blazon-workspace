import type { LocalesType } from '../locales/types'

//Home
import HomePt from './Home/locales/pt.json'
import HomeEn from './Home/locales/en.json'

export const PortalLocalesPt:LocalesType = {
  ...HomePt,  
}

export const PortalLocalesEn:LocalesType = {
  ...HomeEn,
}

const Locales = {
  PortalLocalesPt,
  PortalLocalesEn
}

export default Locales