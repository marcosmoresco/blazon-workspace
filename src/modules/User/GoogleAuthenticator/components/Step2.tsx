import React, { FC, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useQuery } from "@apollo/client";
import { TitleHierarchy } from "@components/TitlePage/types";
import Loading from "@components/Loading";
import { ComponentProps, Payload, OtpToken } from "../types";
import {
  Title,
  Description,
  InfoDivider,
  Info,
  DownloadAppOptions,
  Link,
  QrCode,
  Bottom,
  ShowCode
} from "../styles";
import { GENERATE_OTP_TOKEN } from "@modules/User/queries";
import { useTheme, themes } from "@theme/index";

const GoogleAuthenticatorStep2: FC<ComponentProps> = ({ payload, handleChange } : { payload: Payload | undefined, handleChange (payload: Payload, currentStep: number): void}) => {

  const intl = useIntl();
  const [url, setUrl] = useState<string>("");
  const [otpToken, setOtpToken] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const { loading, data } = useQuery<{
    generateOtpToken: OtpToken;
  }>(GENERATE_OTP_TOKEN, {
    variables: {
      fetchPolicy: "no-cache" 
    },
    onCompleted: ({generateOtpToken} : {generateOtpToken: OtpToken}) => {
      setTimeout(() => {       
        setUrl(`/api/otpToken?token=${generateOtpToken.otpKey}`);   
        setOtpToken(generateOtpToken.otpKey);               
      }, 0);       
    }
  });

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
        <FormattedMessage id="googleAuthenticator.step2.title" />
      </Title>  
      <Description>
        <FormattedMessage id="googleAuthenticator.step2.subTitle" />
      </Description> 
      <InfoDivider />
      <Info>
        <FormattedMessage id="googleAuthenticator.downloading.app" />
      </Info> 
      <DownloadAppOptions>
        <li><FormattedMessage id="googleAuthenticator.downloading.app.text" /> {payload?.phoneType === "iphone" && <Link className="Bold" color={currentTheme.palette.primary.main} href="https://apps.apple.com/br/app/google-authenticator/id388497605" target="__blank">App Store</Link> || <Link className="Bold" color={currentTheme.palette.primary.main} href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="__blank">Google Play</Link>}
        </li>
        <li><span dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "googleAuthenticator.configure.account"})}} /></li>
        <li><span dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "googleAuthenticator.read.barcode"})}} /></li>
      </DownloadAppOptions>  
      {(loading || !loaded) && (
        <Loading type="blue"/>
      )}
      {url && !loading && 
      <>
        <QrCode>
          <img 
            id="Qr-code" 
            src={url} 
            alt="Qr-code" 
            onLoad={() => setLoaded(true)}/>
        </QrCode>
        {loaded && 
        <Bottom>
          <Link className="Add-bottom" color={currentTheme.palette.primary.main}>
            <FormattedMessage id="googleAuthenticator.digit.your.app" />
          </Link><ShowCode><b>{otpToken || " - "}</b></ShowCode>
        </Bottom>} 
      </>
      }             
    </>
  )
}

export default GoogleAuthenticatorStep2;