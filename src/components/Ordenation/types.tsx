import { IntlShape } from 'react-intl'

export type OrdenationProps = {
  intl: IntlShape;
  list: [any];
  onChange: any;
  composed: string;
  orderBy: string;
}
