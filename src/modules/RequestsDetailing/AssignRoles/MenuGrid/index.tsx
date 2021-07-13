// vendors
import React from "react";
import { FormattedMessage } from "react-intl";

// styles
import { StyleMenuGrid } from "./styles";

// components
import PaperClip from "@icons/PaperClip";

const MenuGrid: React.FC = () => {
  return (
    <StyleMenuGrid>
      <PaperClip height={16} width={15} />
      <span>
        <FormattedMessage id="request.assign.roles" />
      </span>
    </StyleMenuGrid>
  );
};

export default MenuGrid;
