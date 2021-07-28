import { SelfServiceAttribute } from "@portal/Search/types";
import {  SelfServiceCart } from "@requestCart/types";
import { FormattedMessage } from "react-intl";
import PuzzlePieceIcon from "@icons/PuzzlePiece";
import ArticleIcon from "@icons/Article";
import NewspaperClippingIcon from "@icons/NewspaperClipping";
import UserGearIcon from "@icons/UserGear";

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
  RESOURCE: <PuzzlePieceIcon width={size || 32} height={size || 32} color={color || "black"} />,
  ENTITLEMENT: <ArticleIcon width={size || 32} height={size || 32} color={color || "black"} />,
  ROLE: <NewspaperClippingIcon width={size || 32} height={size || 32} color={color || "black"} />,
  ADMIN_PASSWORD: <UserGearIcon width={size || 32} height={size || 32} color={color || "black"} />,
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