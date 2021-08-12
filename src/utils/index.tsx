import { SelfServiceAttribute } from "@portal/Search/types";
import {  SelfServiceCart } from "@requestCart/types";
import { FormattedMessage } from "react-intl";
import SharedAccountIcon from "@icons/SharedAccount";
import ApplicationAccountIcon from "@icons/ApplicationAccount";
import RegularAccountIcon from "@icons/RegularAccount";
import AdministrativeAccountIcon from "@icons/AdministrativeAccount";
import TemporaryAccountIcon from "@icons/Watch";
import CheckCircleIcon from "@icons/CheckCircle";
import SecurityUserIcon from "@icons/SecurityUser";
import PeopleIcon from "@icons/People";
import SquaresFourIcon from "@icons/SquaresFour";

export const deepCopyFunction = (inObject: any) => {
  let outObject: any, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

export const isDefined = (value: any): boolean =>
  value !== null && value !== undefined;

interface Link {
  rel: string;
  href: string;
}

export const getLink = (rel: string, links: Link[]): string => {
  const searched: Link[] = links.filter((l: Link) => l.rel === rel);  
  return (searched?.length && searched[0].href) || "";
};

export function paginate<T>(array: T[], size: number, page: number): T[] {
  return array.slice(page * size, (page + 1) * size);
}

export const getSelfServiceAttributeValue = (
  name: string,
  values: SelfServiceAttribute[]
): string => {
  const searched: SelfServiceAttribute[] = values.filter(
    (l: SelfServiceAttribute) => l.name === name
  );
  return (searched?.length && searched[0].value) || "";
};

export const iconByType = (color: string, size: number): any =>  ({ 
  RESOURCE: <SquaresFourIcon width={size || 24} height={size || 24} color={color || "black"} />,
  RESOURCESHARED_RESOURCE: <SharedAccountIcon width={size || 24} height={size || 24} color={color || "black"} />,
  RESOURCEAPPLICATION_RESOURCE: <ApplicationAccountIcon width={size || 24} height={size || 24} color={color || "black"} />,
  RESOURCEREGULAR_RESOURCE: <RegularAccountIcon width={size || 24} height={size || 24} color={color || "black"} />,
  RESOURCETEMPORARY_RESOURCE: <TemporaryAccountIcon width={size || 24} height={size || 24} color={color || "black"} />,
  RESOURCEADMIN_RESOURCE: <AdministrativeAccountIcon width={size || 24} height={size || 24} color={color || "black"} />,
  ENTITLEMENT: <CheckCircleIcon width={size || 24} height={size || 24} color={color || "black"} />,
  ROLE: <PeopleIcon width={size || 24} height={size || 24} color={color || "black"} />,
  ADMIN_PASSWORD: <SecurityUserIcon width={size || 24} height={size || 24} color={color || "black"} />,
});

export const translateByType: {[key: string] : any} = { 
  RESOURCE: <FormattedMessage id="resource" />,
  ENTITLEMENT: <FormattedMessage id="entitlement" />,
  ROLE: <FormattedMessage id="role" />,
  ADMIN_PASSWORD: <FormattedMessage id="adminAccount" />,
};

export const isValidCart = (cart: SelfServiceCart | null): boolean => {
  const invalidItems = (cart?.items || []).filter((item) => {             
    
    const invalidInstances = item.instances.filter((instance) => {
      return instance.schemaValidatedError.status || 
      instance.alreadyRequestInProgressError.status ||
      instance.accessAlreadyExistError.status ||
      instance.relatedAccountNotFoundError.status ||
      instance.adminAccountLockedError.status ||
      instance.needExpirationDateError.status ||
      instance.needSelectAccountError.status;
    });

    if (!!invalidInstances && invalidInstances.length > 0) {
      return true;
    } else {
      return false;
    }
  });
  return !invalidItems.length;
}