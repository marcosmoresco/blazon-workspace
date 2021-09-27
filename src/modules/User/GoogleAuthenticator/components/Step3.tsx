import React, { FC, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { IMaskInput } from "react-imask";
import { TitleHierarchy } from "@components/TitlePage/types";
import { ComponentProps, Payload } from "../types";
import {
  Title,
  Description,
  InfoDivider,
  Info,
  InfoText,
  Code
} from "../styles";

const GoogleAuthenticatorStep3: FC<ComponentProps> = ({ payload, handleChange } : { payload: Payload | undefined, handleChange (payload: Payload, currentStep: number): void}) => {

  const intl = useIntl();

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
        <FormattedMessage id="googleAuthenticator.step3.title" />
      </Title>  
      <Description>
        <FormattedMessage id="googleAuthenticator.step3.subTitle" />
      </Description> 
      <InfoDivider />
      <Info>
        <FormattedMessage id="googleAuthenticator.settingUp.the.app" />
      </Info> 
      <InfoText>
        <FormattedMessage id="googleAuthenticator.enter.six.digit" />
      </InfoText>  
      <Code>
        <IMaskInput
          mask="000000"
          definitions={{
            '#': /[1-9]/,
          }}
          unmask={true} // true|false|'typed'        
          // DO NOT USE onChange TO HANDLE CHANGES!
          // USE onAccept INSTEAD
          onAccept={
            // depending on prop above first argument is
            // `value` if `unmask=false`,
            // `unmaskedValue` if `unmask=true`,
            // `typedValue` if `unmask='typed'`
            (value: any, mask: any) => handleChange({code: value}, 3)
          }
          // ...and more mask props in a guide

          // input props also available
          placeholder={intl.formatMessage({id: "googleAuthenticator.enter.code"})}
        /> 
      </Code>           
    </>
  )
}

export default GoogleAuthenticatorStep3;