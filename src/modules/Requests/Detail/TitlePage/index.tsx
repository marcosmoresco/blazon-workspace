// vendors
import React from "react";
import { injectIntl } from "react-intl";
import PaperPlaneTiltIcon from "@icons/PaperPlaneTilt";
import ArrowLeft from "@icons/ArrowLeft";
import Link from "next/link";

// types
import { TitleProps } from "./types";

// styles
import { TitleBox, TitleText, Line, Header } from "./styles";

const TitlePage: React.FC<TitleProps> = ({ intl, onBack }) => {
  return (
    <>
      <Header>
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
          <PaperPlaneTiltIcon width={24} height={24} />
          <TitleText>
            {intl.formatMessage({ id: "request.requests" })}
          </TitleText>
        </TitleBox>
      </Header>
      <Line />
    </>
  );
};

export default injectIntl(TitlePage);
