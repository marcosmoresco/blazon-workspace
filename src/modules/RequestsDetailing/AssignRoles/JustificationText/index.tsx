// vendors
import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

// types
import { JustificationProps } from "./types";

// styles
import { Justification, JustificationBox } from "./styles";

const JustificationText: React.FC<JustificationProps> = ({
  justificationText,
}) => {
  return (
    <Justification>
      <span>
        <FormattedMessage id="request.justification" />
      </span>
      <JustificationBox>{justificationText}</JustificationBox>
    </Justification>
  );
};

export default JustificationText;
