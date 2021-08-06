// vendors
import React from "react";
import { FormattedMessage } from "react-intl";

//types
import { JustifyCardProps } from "./types";

// styles
import { Box, BoxCard, TitleCard, BoxJustification } from "./style";

const JustifyCard: React.FC<JustifyCardProps> = ({ task }) => {
  return (
    <>
      <Box>
        <BoxCard>
          <TitleCard>
            <FormattedMessage id="tasks.justification" />
          </TitleCard>
          <BoxJustification>
            {task?.justification || task?.revokeJustification || task?.itemDetails?.justification || " - "}
          </BoxJustification>
        </BoxCard>
      </Box>
    </>
  );
};

export default JustifyCard;
