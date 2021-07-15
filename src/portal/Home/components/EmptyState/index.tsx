import React, { FC } from "react";
import { injectIntl } from "react-intl";
import EmptyStateMailBoxIcon from "@icons/EmptyStateMailBox";
import type { EmptyStateProps } from "./types";
import { 
 Box,
 BoxContent,
 Title,
 Text
} from "./styles";

const EmptyState: FC<EmptyStateProps> = ({ intl, title, text }) => {

  return (
    <Box>
      <BoxContent>
        <EmptyStateMailBoxIcon />
        <div>          
          <Title>{intl.formatMessage({id: title})}</Title>
          <Text>{intl.formatMessage({id: text})}</Text>
        </div>       
      </BoxContent>  
    </Box>
  );
};

export default injectIntl(EmptyState);
