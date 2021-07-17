// vendors
import React from "react";
import { FormattedMessage } from "react-intl";

//types
import { MenuGridProps } from "./types";

// styles
import { StyleMenuGrid } from "./styles";

// components
import PaperClip from "@icons/PaperClip";

const MenuGrid: React.FC<MenuGridProps> = ({type}) => {
  return (
    <StyleMenuGrid>
      <PaperClip height={16} width={15} />
      <span>
        <FormattedMessage id={`request.type.${type}`} />
      </span>
    </StyleMenuGrid>
  );
};

export default MenuGrid;
