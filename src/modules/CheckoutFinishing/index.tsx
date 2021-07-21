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
import Finishing from "./essets/Finishing.svg";
import Calendar from "@icons/Calendar";

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
  EffetiveDate,
  Description,
  DescriptionTitle,
  ButtonArea,
  ButtonBlue,
  ButtonTransparent,
} from "./styles";

const CheckoutFinishing: React.FC = () => {
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
            <FilePlusIcon color="#514D65" />
          </CircleStyle>
          <LineStatusStyle style={{ background: "#E9E8EB" }} />
          <CircleStyle>
            <CheckCircleIcon color="#BDBCC5" />
          </CircleStyle>
        </SymbolStyle>
        <TitlesStyle>
          <ItemText style={{ color: "#BDBCC5" }}>
            <FormattedMessage id="checkout.information" />
          </ItemText>
          <ItemText style={{ color: "#514D65" }}>
            <FormattedMessage id="checkout.Finishing" />
          </ItemText>
          <ItemText style={{ color: "#BDBCC5" }}>
            <FormattedMessage id="checkout.requested" />
          </ItemText>
        </TitlesStyle>
      </StatusCheckoutStyle>
      <Line />

      <FinishingArea>
        <ItemArea>
          <div>
            <ImageArea>
              <Image src={Finishing} alt="FinishingIcon" />
            </ImageArea>

            <span>
              Fill in the data below to finalize your access request. In the
              effective date field, you can request that this request be
              processed at a future date, and on the date of expiration til a
              data limit date to that your stored is exactly up to it. After
              yoursubmission, your request can be controlled bu an approval
              process, you can track its proghress without any request icon that
              is just above this page.
            </span>
          </div>
          <EffetiveDate>
            <Calendar />
            <span>Effetive Date</span>
          </EffetiveDate>
          <DescriptionTitle>
            <FormattedMessage id="checkout.description" />
          </DescriptionTitle>
          <Description>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              velit accumsan, massa lacus gravida tincidunt metus. Rutrum
              ultricies tellus ac dolor sagittis massa et.
            </span>
          </Description>
          <Line />
          <ButtonArea>
            <ButtonTransparent onClick={() => router.push("/checkout")}>
              <FormattedMessage id="checkout.cancel" />
            </ButtonTransparent>
            <ButtonBlue onClick={() => router.push("/checkout-requested")}>
              <FormattedMessage id="checkout.save" />
            </ButtonBlue>
          </ButtonArea>
        </ItemArea>
      </FinishingArea>
    </>
  );
};

export default CheckoutFinishing;
