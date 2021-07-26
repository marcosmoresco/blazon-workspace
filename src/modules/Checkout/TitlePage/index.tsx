// vendors
import React from "react";
import { FormattedMessage } from "react-intl";
import ShoppingCartSimpleIcon from "@icons/ShoppingCartSimple";
import ArrowLeft from "@icons/ArrowLeft";
import Link from "next/link";

// types
import { TitleProps } from "./types";

// styles
import { TitleBox, TitleText, Line, Header, InfoText } from "./styles";

const TitlePage: React.FC<TitleProps> = ({ onBack, currentIndex }) => {
  return (
    <>
      <Header>
        <div>
          {onBack && (
            <div onClick={onBack}>
              <Link href="/requests">
                <a>
                  <ArrowLeft />
                </a>
              </Link>
            </div>
          )}
          <TitleBox>
            <ShoppingCartSimpleIcon width={24} height={24} />
            <TitleText>
              <FormattedMessage id="checkout.checkout" />
            </TitleText>
          </TitleBox>
        </div>
        <InfoText>
          {currentIndex == 0 ? (
            <FormattedMessage id="checkout.RequestInformation" />
          ) : currentIndex == 1 ? (
            <FormattedMessage id="checkout.FinishingRequest" />
          ) : currentIndex == 2 ? (
            <FormattedMessage id="checkout.requested" />
          ) : (
            <></>
          )}
        </InfoText>
      </Header>
      <Line />
    </>
  );
};

export default TitlePage;
