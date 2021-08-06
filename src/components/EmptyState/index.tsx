import React, { FC } from "react";
import { injectIntl } from "react-intl";
import type { EmptyStateProps } from "./types";
import { Box, BoxContent, Title, Text } from "./styles";

const EmptyState: FC<EmptyStateProps> = ({ intl, title, text, icon, bgColor }) => {
  return (
    <Box>
      <BoxContent style={{background: bgColor}}>
        {icon}
        <div>
          <Title>{intl.formatMessage({ id: title })}</Title>
          <Text>{intl.formatMessage({ id: text })}</Text>
        </div>
      </BoxContent>
    </Box>
  );
};

EmptyState.defaultProps = { bgColor: "#F4F4F5" };

export default injectIntl(EmptyState);
