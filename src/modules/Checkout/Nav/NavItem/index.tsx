// vendors
import React from "react";

// type
import { NavItemProps } from "./type";

// styles
import { NavItemBox, CircleStyle, Item, LineStatusStyle } from "./style";

const NavItem: React.FC<NavItemProps> = ({
  icon,
  itemName,
  lastItem,
  isCurrent,
  isBefore,
}) => {
  return (
    <NavItemBox isCurrent={isCurrent}>
      <Item>
        <CircleStyle>{icon}</CircleStyle>
        {!lastItem && <LineStatusStyle isBefore={isBefore} />}
      </Item>
      {itemName}
    </NavItemBox>
  );
};
export default NavItem;
