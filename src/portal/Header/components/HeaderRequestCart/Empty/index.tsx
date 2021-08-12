import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import Image from "next/image";
import type { EmptyStateProps } from './types'
import { Box, BoxContent, Title, Text } from './styles'
import icon from "@images/EmptyStateCart.svg";

const Empty: FC<EmptyStateProps> = () => {

  const intl = useIntl();
  return (
    <Box>
      <BoxContent>
        <Image src={icon} alt="Empty" />
        <div>
          <Title>{intl.formatMessage({ id: "cart.item.no.added" })}</Title>
          <Text>{intl.formatMessage({ id: "cart.item.no.added.text" })}</Text>
        </div>
      </BoxContent>
    </Box>
  )
}

export default Empty;
