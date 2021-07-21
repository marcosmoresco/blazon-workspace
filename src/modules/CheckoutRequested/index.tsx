// vendors
import React from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Image from "next/image";

// components
import TitlePage from "./TitlePage";
import InfoIcon from "@icons/Info/index 2";
import FilePlusIcon from "@icons/FilePlus";
import CheckCircleIcon from "@icons/CheckCircle";
import CheckCircle from "./essets/CheckCircle.svg";

// styles
import {
  Line,
  StatusCheckoutStyle,
  CircleStyle,
  LineStatusStyle,
  SymbolStyle,
  TitlesStyle,
  ItemText,
  FinishingArea,
  ItemArea,
  ImageArea,
  ButtonArea,
  ButtonBlue,
  ButtonTransparent,
  TextArea,
} from "./styles";

const CheckoutRequested: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <TitlePage onBack={() => {}} />
      <StatusCheckoutStyle>
        <SymbolStyle>
          <CircleStyle>
            <InfoIcon color="#3174F6" />
          </CircleStyle>
          <LineStatusStyle style={{ background: "#3174F6" }} />
          <CircleStyle>
            <FilePlusIcon color="#3174F6" />
          </CircleStyle>
          <LineStatusStyle style={{ background: "#3174F6" }} />
          <CircleStyle>
            <CheckCircleIcon color="#3174F6" />
          </CircleStyle>
        </SymbolStyle>
        <TitlesStyle>
          <ItemText style={{ color: "#BDBCC5" }}>
            <FormattedMessage id="checkout.information" />
          </ItemText>
          <ItemText style={{ color: "#BDBCC5" }}>
            <FormattedMessage id="checkout.Finishing" />
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
            <ButtonTransparent onClick={() => router.push("/requests")}>
              <FormattedMessage id="checkout.requests" />
            </ButtonTransparent>

            <ButtonBlue onClick={() => router.push("/checkout-empty")}>
              <FormattedMessage id="checkout.start" />
            </ButtonBlue>
          </ButtonArea>
        </ItemArea>
      </FinishingArea>
    </>
  );
};

export default CheckoutRequested;
