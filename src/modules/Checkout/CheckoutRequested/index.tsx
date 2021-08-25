// vendors
import React from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTheme, themes } from "@theme/index";

// components
import CheckCircle from "./essets/CheckCircle.svg";
import Button from "@components/Button";
import TitlePage from "@components/TitlePage";
import InfoIcon from "@icons/Info/index";
import FilePlusIcon from "@icons/FilePlus";
import CheckCircleIcon from "@icons/CheckCircle";

// types
import { ItemProps } from "./type";

// styles
import {
  Line,
  FinishingArea,
  ItemArea,
  ImageArea,
  ButtonArea,
  TextArea,
} from "./styles";

import {  
  StatusCheckoutStyle,
  CircleStyle,
  LineStatusStyle,
  SymbolStyle,
  TitlesStyle,
  ItemText,  
} from "@modules/Checkout/styles";

const CheckoutRequested: React.FC<ItemProps> = ({ nextStep }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  return (
    <>
      <TitlePage title="checkout" subTitle="checkout.requested"/>
      <StatusCheckoutStyle>
        <SymbolStyle>
          <CircleStyle>
            <InfoIcon width={48} height={48} color={currentTheme.palette.primary.main || "#3174F6"} stroke={2}/>
          </CircleStyle>
          <LineStatusStyle style={{ background: currentTheme.palette.primary.main || "#3174F6" }} />
          <CircleStyle>
            <FilePlusIcon color={currentTheme.palette.primary.main || "#3174F6"} stroke={2.5}/>
          </CircleStyle>
          <LineStatusStyle style={{ background: currentTheme.palette.primary.main || "#3174F6" }} />
          <CircleStyle>
            <CheckCircleIcon width={48} height={48} color={currentTheme.palette.primary.main || "#3174F6"} stroke={2}/>
          </CircleStyle>
        </SymbolStyle>
        <TitlesStyle>
          <ItemText style={{ color: "#BDBCC5" }}>
            <FormattedMessage id="checkout.information" />
          </ItemText>
          <ItemText style={{ color: "#BDBCC5" }}>
            <FormattedMessage id="checkout.FinishingRequest" />
          </ItemText>
          <ItemText style={{ color: "#514D65" }}>
            <FormattedMessage id="checkout.requested" />
          </ItemText>
        </TitlesStyle>
      </StatusCheckoutStyle>
      <Line />
      <FinishingArea>
        <ItemArea>
          <ImageArea>
            <Image src={CheckCircle} alt="CheckOkIcon" />
          </ImageArea>

          <TextArea>
            <div>
              <FormattedMessage id="checkout.requestedOk" />
            </div>
          </TextArea>
          <TextArea>
            <span>
              <FormattedMessage id="checkout.sendOk" />
            </span>
          </TextArea>

          <Line />
          <ButtonArea>
            <Button
              variant="contained"
              color="default-primary"
              onClick={() => router.push("/requests")}
            >
              <FormattedMessage id="requests" />
            </Button>
            <Button variant="contained" color="primary" onClick={() => router.push("/")}>
              <FormattedMessage id="home" />
            </Button>
          </ButtonArea>
        </ItemArea>
      </FinishingArea>
    </>
  );
};

export default CheckoutRequested;
