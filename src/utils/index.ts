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
