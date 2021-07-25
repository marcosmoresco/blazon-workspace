import type { LocalesType } from "../locales/types";

//Home
import HomePt from "./Home/locales/pt.json";
import HomeEn from "./Home/locales/en.json";
//Search
import SearchPt from "./Search/locales/pt.json";
import SearchEn from "./Search/locales/en.json";
//Cart
import CartPt from "./Cart/locales/pt.json";
import CartEn from "./Cart/locales/en.json";

export const PortalLocalesPt: LocalesType = {
  ...HomePt,
  ...SearchPt,
  ...CartPt,
};

export const PortalLocalesEn: LocalesType = {
  ...HomeEn,
  ...SearchEn,
  ...CartEn,
};

const Locales = {
  PortalLocalesPt,
  PortalLocalesEn,
};

export default Locales;
