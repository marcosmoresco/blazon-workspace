// vendors
import React from "react";
import { FormattedMessage } from "react-intl";
import { useTheme, themes } from "@theme/index";

// types
import { StatusProps } from "./types";

// styles
import { Status, StatusTitle, StyledStatus } from "./styles";

const RequestStatus: React.FC<StatusProps> = ({ notification }) => {

  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  return (
    <Status>
      <StatusTitle>
        <FormattedMessage id="request.status" />
      </StatusTitle>
      <StyledStatus
        background={currentTheme.palette.info.main} 
        color={currentTheme.palette.info.contrastText} >
        <span>{notification}</span>
      </StyledStatus>
    </Status>
  );
};

export default RequestStatus;
