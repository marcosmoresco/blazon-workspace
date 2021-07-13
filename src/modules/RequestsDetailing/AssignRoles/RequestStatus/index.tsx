// vendors
import React from "react";
import { FormattedMessage } from "react-intl";

// types
import { StatusProps } from "./types";

// styles
import { Status, StatusTitle, StyledStatus } from "./styles";

const RequestStatus: React.FC<StatusProps> = ({ notification }) => {
  return (
    <Status>
      <StatusTitle>
        <FormattedMessage id="request.status" />
      </StatusTitle>
      <StyledStatus>
        <span>{notification}</span>
      </StyledStatus>
    </Status>
  );
};

export default RequestStatus;
