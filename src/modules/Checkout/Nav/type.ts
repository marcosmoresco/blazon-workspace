import React from "react";

export type NavItem = {
  icon: React.ReactNode;
  itemName: React.ReactNode;
  id: number;
};
export type NavProps = {
  items: NavItem[];
  currentIndex: number;
};
