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
import Empty from "./essets/Empty.svg";
import Button from "@components/Button";

// styles
import {
  Line,
  PageInfoStyle,
  StatusCheckoutStyle,
  CircleStyle,
  LineStatusStyle,
  SymbolStyle,
  TitlesStyle,
  ItemText,
  // Button,
  EmptyArea,
} from "./styles";

const CheckoutEmpty: React.FC = () => {
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
          <span>
            {`${""}`}
            <FormattedMessage id="checkout.AddAnItemToContinue" />
          </span>
        </div>
        <Button variant="contained" color="disabled">
          <FormattedMessage id="checkout.continue" />
        </Button>
      </PageInfoStyle>
      <EmptyArea>
        <Image src={Empty} alt="EmptyIcon" />
        <div>
          <div>
            <FormattedMessage id="checkout.NoResults" />
          </div>
          <div>
            <span>
              <FormattedMessage id="checkout.AddItems" />
            </span>
          </div>
          <div>
            <a href="/checkout">
              <FormattedMessage id="checkout.SearchItem" />
            </a>
          </div>
        </div>
      </EmptyArea>
    </>
  );
};

export default CheckoutEmpty;
