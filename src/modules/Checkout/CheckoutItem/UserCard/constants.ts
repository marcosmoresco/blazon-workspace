export const findItemByCatalogItemId = (id: string, cart: any) => {
  let item = null;
  const items = cart.items.filter((item: any) => item.catalogItemId === id);
  if (items.length) {
    item = items[0];
  }

  return item;
};
