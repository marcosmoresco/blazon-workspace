import type { LocalesType } from "../locales/types";

//Home
import HomePt from "./Home/locales/pt.json";
import HomeEn from "./Home/locales/en.json";
//Search
import SearchPt from "./Search/locales/pt.json";
import SearchEn from "./Search/locales/en.json";

export const PortalLocalesPt: LocalesType = {
  ...HomePt,
  ...SearchPt,
};

export const PortalLocalesEn: LocalesType = {
  ...HomeEn,
  ...SearchEn,
};

const Locales = {
  PortalLocalesPt,
  PortalLocalesEn,
};

export default Locales;
