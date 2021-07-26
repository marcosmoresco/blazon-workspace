import React from "react";

export type NavItemProps = {
  icon: React.ReactNode;
  itemName: React.ReactNode;
  lastItem: boolean;
  isCurrent: boolean;
  isBefore: boolean;
};
