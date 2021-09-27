import React, { FC, useState } from "react";
import { FormattedMessage } from "react-intl";
import Radio from '@components/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { TitleHierarchy } from "@components/TitlePage/types";
import { ComponentProps, Payload } from "../types";
import {
  Title,
  Description,
  InfoDivider,
  Info,
} from "../styles";

const GoogleAuthenticatorStep1: FC<ComponentProps> = ({ payload, handleChange } : { payload: Payload | undefined, handleChange (payload: Payload, currentStep: number): void}) => {

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
        <FormattedMessage id="googleAuthenticator.step1.title" />
      </Title>  
      <Description>
        <FormattedMessage id="googleAuthenticator.step1.subTitle" />
      </Description> 
      <InfoDivider />
      <Info>
        <FormattedMessage id="googleAuthenticator.smartphone.type" />
      </Info> 
      <FormControl component="fieldset">           
        <RadioGroup
          aria-label="gender"          
          name="radio-buttons-group"
          value={phoneType}
          onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) => {
            setPhoneType(value);
            handleChange({phoneType: value}, 1);
          }}
        >
          <FormControlLabel value="android" control={<Radio />} label={<FormattedMessage id="googleAuthenticator.android" />} />
          <FormControlLabel value="iphone" control={<Radio />} label={<FormattedMessage id="googleAuthenticator.iphone" />} />             
        </RadioGroup>
      </FormControl>       
    </>
  )
}

export default GoogleAuthenticatorStep1;