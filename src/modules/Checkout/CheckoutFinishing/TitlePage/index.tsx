// vendors
import React from "react";
import { injectIntl } from "react-intl";
import ShoppingCartSimpleIcon from "@icons/ShoppingCartSimple";
import ArrowLeft from "@icons/ArrowLeft";
import Link from "next/link";

// types
import { TitleProps } from "./types";

// styles
import { TitleBox, TitleText, Line, Header, InfoText } from "./styles";

const TitlePage: React.FC<TitleProps> = ({ intl, onBack }) => {
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
              {intl.formatMessage({ id: "checkout.checkout" })}
            </TitleText>
          </TitleBox>
        </div>
        <InfoText>
          {intl.formatMessage({ id: "checkout.FinishingRequest" })}
        </InfoText>
      </Header>
      <Line />
    </>
  );
};

export default injectIntl(TitlePage);
