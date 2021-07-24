// vendors
import React from "react";
import { FormattedMessage } from "react-intl";

// styles
import { Box, BoxCard, TitleCard, BoxJustification } from "./style";

const JustifyCard: React.FC = () => {
  return (
    <>
      <Box>
        <BoxCard>
          <TitleCard>
            <FormattedMessage id="tasks.justification" />
          </TitleCard>
          <BoxJustification>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </BoxJustification>
        </BoxCard>
      </Box>
    </>
  );
};

export default JustifyCard;
