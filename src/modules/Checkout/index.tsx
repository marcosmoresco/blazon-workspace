// vendors
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

// components
import TitlePage from "./TitlePage";
import CheckoutItem from "./CheckoutItem";
import Button from "@components/Button";
import InfoIcon from "@icons/Info/index 2";
import FilePlusIcon from "@icons/FilePlus";
import CheckCircleIcon from "@icons/CheckCircle";

// styles
import {
  Line,
  PageInfoStyle,
  CheckBox,
  StatusCheckoutStyle,
  CircleStyle,
  LineStatusStyle,
  SymbolStyle,
  TitlesStyle,
  ItemText,
} from "./styles";

const Checkout: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <TitlePage onBack={() => {}} />
      <StatusCheckoutStyle>
        <SymbolStyle>
          <CircleStyle>
            <InfoIcon color="#514D65" />
          </CircleStyle>
          <LineStatusStyle style={{ background: "#E9E8EB" }} />
          <CircleStyle>
            <FilePlusIcon color="#BDBCC5" />
          </CircleStyle>
          <LineStatusStyle style={{ background: "#E9E8EB" }} />
          <CircleStyle>
            <CheckCircleIcon color="#BDBCC5" />
          </CircleStyle>
        </SymbolStyle>
        <TitlesStyle>
          <ItemText style={{ color: "#514D65" }}>
            <FormattedMessage id="checkout.information" />
          </ItemText>
          <ItemText style={{ color: "#BDBCC5" }}>
            <FormattedMessage id="checkout.Finishing" />
          </ItemText>
          <ItemText style={{ color: "#BDBCC5" }}>
            <FormattedMessage id="checkout.requested" />
          </ItemText>
        </TitlesStyle>
      </StatusCheckoutStyle>
      <Line />
      <PageInfoStyle>
        <div>
          <CheckBox type="checkbox" id="PageUp" />
          <span>
            {`${""}`}
            <FormattedMessage id="checkout.SelectedItems" />
          </span>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/checkout-finishing")}
        >
          <FormattedMessage id="checkout.continue" />
        </Button>
      </PageInfoStyle>
      <CheckoutItem />
      <Line />
      <PageInfoStyle>
        <div>
          <CheckBox type="checkbox" id="PageDown" />
          <span>
            {`${""}`}
            <FormattedMessage id="checkout.SelectedItems" />
          </span>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/checkout-finishing")}
        >
          <FormattedMessage id="checkout.continue" />
        </Button>
      </PageInfoStyle>
    </>
  );
};

export default Checkout;
