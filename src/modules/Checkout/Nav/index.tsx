// vendors
import React from "react";

// components
import NavItem from "./NavItem";

// types
import { NavProps } from "./type";

// styles
import { NavStyle, Line } from "./style";

const Nav: React.FC<NavProps> = ({ items, currentIndex }) => {
  return (
    <>
      <NavStyle>
        {items.map((item, index) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            itemName={item.itemName}
            lastItem={index === items.length - 1}
            isCurrent={index === currentIndex}
            isBefore={index < currentIndex}
          />
        ))}
      </NavStyle>
      <Line />
    </>
  );
};

export default Nav;
