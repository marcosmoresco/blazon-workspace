import React, { FC, useState } from "react";
import { FormattedMessage } from "react-intl";
import { TitleHierarchy } from "@components/TitlePage/types";
import { ComponentProps, Payload } from "../types";
import CircleSuccessIcon from "@icons/CircleSuccess";
import CircleErrorIcon from "@icons/CircleError";

import {
  Title,
  Description,
  InfoDivider,
  StatusMessage
} from "../styles";

const GoogleAuthenticatorStep4: FC<ComponentProps> = ({ payload, handleChange } : { payload: Payload | undefined, handleChange (payload: Payload, currentStep: number): void}) => {

  const [phoneType, setPhoneType] = useState<string>("");

  const hierarchy: TitleHierarchy = {
    name: "profile",
    href: "/profile",
    children: [
      {
        name: "profile.googleauthenticator"
      },
    ],
  };  

  return (
    <>     
      <Title>
        <FormattedMessage id="googleAuthenticator.step4.title" />
      </Title>  
      <Description>
        <FormattedMessage id="googleAuthenticator.step3.subTitle" />
      </Description> 
      <InfoDivider /> 
      <StatusMessage>
        {payload?.executed && <CircleSuccessIcon /> || <CircleErrorIcon />}         
      </StatusMessage>      
      <Title>
        {payload?.executed && <FormattedMessage id="googleAuthenticator.step4.success" />|| <FormattedMessage id="googleAuthenticator.code.invalid" />}
      </Title>                  
    </>
  )
}

export default GoogleAuthenticatorStep4;