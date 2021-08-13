import React, { FC } from "react";
import Image from "next/image";
import { injectIntl } from "react-intl";
import type { EmptyStateProps } from "./types";
import { Box, BoxContent, Title, Text } from "./styles";

const EmptyState: FC<EmptyStateProps> = ({ intl, title, text, icon, image, height, bgColor }) => {
  return (
    <Box style={{height}}>
      <BoxContent style={{background: bgColor}}>
        {icon && icon || null}
        {image && <Image src={image} alt="EmptyState"/> || null}
        <div>
          <Title>{intl.formatMessage({ id: title })}</Title>
          <Text>{intl.formatMessage({ id: text })}</Text>
        </div>
      </BoxContent>
    </Box>
  );
};

EmptyState.defaultProps = { bgColor: "#F4F4F5", height: 316};

export default injectIntl(EmptyState);
