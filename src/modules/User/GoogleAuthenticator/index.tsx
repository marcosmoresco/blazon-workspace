import React, { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import { useIntl, FormattedMessage } from "react-intl";
import Button from '@components/Button';
import TitlePage from "@components/TitlePage";
import GoogleAuthenticatorImage from "./images/GoogleAuthenticator.svg";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import { TitleHierarchy } from "@components/TitlePage/types";
import { Payload, OtpTokenValidate } from "./types";
import apolloClient from "@utils/apollo-client";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import {
  Box,
  Content,
  HeaderBackground,
  HeaderGoogleAuthenticator,
  Actions
} from "./styles";
import { VALIDATE_OTP_TOKEN } from "@modules/User/queries";
import { useTheme, themes } from "@theme/index";

const GoogleAuthenticator = () => {

  const [step, setStep] = useState<number>(1);
  const [validSteps, setValidSteps] = useState<number[]>([2]);
  const [payload, setPayload] = useState<Payload>(); 
  const intl = useIntl();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const hierarchy: TitleHierarchy = {
    name: "profile",
    href: "/profile",
    children: [
      {
        name: "profile.googleauthenticator"
      },
    ],
  };

  const handleChangePayload = (p: Payload, currentStep: number) => {       
    if(currentStep === 1) {
      if(p?.phoneType) {     
        setValidSteps([...validSteps, 1]);
      }
    }   
    if(currentStep === 3) {
      if(p?.code && ("" + p?.code).length === 6) {
        setValidSteps([...validSteps, 3]);
      } else {
        setValidSteps(validSteps.filter((s) => s !== 3));
      }  
    }
     
    setPayload({...p});
  };

  const validate = async () => {  
    
    apolloClient
      .query({
        query: VALIDATE_OTP_TOKEN,
        variables: {
          code: payload?.code
        },
        fetchPolicy: "no-cache"
      })
      .then(({ data }) => {
        if(!data?.validateOtpToken?.result) {
          dispatch(
            addMessage(
              intl.formatMessage({id: "googleAuthenticator.code.invalid"}),
              "error"
            )
          );  
        } else {
          setPayload({
            ...payload,
            executed: true
          });
          setStep(step + 1);         
        }       
      });       
  };

  return (
    <>
      <TitlePage
       title="profile.googleauthenticator"        
        hierarchy={hierarchy}
      />
      <Box>        
        <HeaderBackground color={currentTheme.palette.primary.main}>
          <HeaderGoogleAuthenticator>
            <Image src={GoogleAuthenticatorImage} alt="Google Authenticator Image"/>
          </HeaderGoogleAuthenticator>          
        </HeaderBackground>  
        <Content>
          {step === 1 && <Step1 payload={payload} handleChange={handleChangePayload}/>}
          {step === 2 && <Step2 payload={payload} handleChange={handleChangePayload}/>}
          {step === 3 && <Step3 payload={payload} handleChange={handleChangePayload}/>}
          {step === 4 && <Step4 payload={payload} handleChange={handleChangePayload}/>}
        </Content>  
        <Actions>
          <Button
            variant="contained"
            color="default-primary"
            onClick={() => {
              Router.reload();
            }}
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          {![3,4].includes(step) && 
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep(step + 1)}
            disabled={!validSteps.includes(step)}
          >
            <FormattedMessage id="nextPage" />
          </Button>}
          {step === 3 && 
          <Button
            variant="contained"
            color="primary"
            onClick={() => validate()}
            disabled={!validSteps.includes(step)}
          >
            <FormattedMessage id="confirm" />
          </Button>}
        </Actions>               
      </Box>
    </>
  )
}

export default GoogleAuthenticator;