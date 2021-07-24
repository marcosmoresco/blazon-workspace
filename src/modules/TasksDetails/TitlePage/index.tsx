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
              <Link href="/tasks">
                <a>
                  <ArrowLeft />
                </a>
              </Link>
            </div>
          )}
          <TitleBox>
            <ShoppingCartSimpleIcon width={24} height={24} />
            <TitleText>{intl.formatMessage({ id: "tasks" })}</TitleText>
          </TitleBox>
        </div>
        <InfoText>Algar Telecom Portal Interativo - 132593</InfoText>
      </Header>
      <Line />
    </>
  );
};

export default injectIntl(TitlePage);
