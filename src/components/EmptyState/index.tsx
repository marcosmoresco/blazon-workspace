import React, { FC } from 'react'
import { injectIntl } from 'react-intl'
import type { EmptyStateProps } from './types'
import { Box, BoxContent, Title, Text } from './styles'

const EmptyState: FC<EmptyStateProps> = ({ intl, title, text, icon }) => {
  return (
    <Box>
      <BoxContent>
        {icon}
        <div>
          <Title>{intl.formatMessage({ id: title })}</Title>
          <Text>{intl.formatMessage({ id: text })}</Text>
        </div>
      </BoxContent>
    </Box>
  )
}

export default injectIntl(EmptyState)
