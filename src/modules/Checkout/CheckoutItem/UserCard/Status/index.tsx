// vendors
import React from "react";
import { FormattedMessage } from "react-intl";

// types
import { StatusProps } from "./types";

// styles
import { StyledStatus } from "./styles";

const Status: React.FC<StatusProps> = ({ notification }) => {
  return (
    <div>
      <StyledStatus>
        <span>{notification}</span>
      </StyledStatus>
    </div>
  );
};

export default Status;