import React from "react";
import { injectIntl } from "react-intl";
import { TitleProps } from "./types";
import PaperPlaneTiltIcon from "@icons/PaperPlaneTilt";
import ArrowLeft from "@icons/ArrowLeft";
import { TitleBox, TitleText, Line, Header } from "./styles";

const TitlePage: React.FC<TitleProps> = ({ title, intl, onBack }) => {
  return (
    <>
      <Header>
        {onBack && (
          <div onClick={onBack}>
            <ArrowLeft />
          </div>
        )}
        <TitleBox>
          <PaperPlaneTiltIcon width={24} height={24} />
          <TitleText>{intl.formatMessage({ id: title })}</TitleText>
        </TitleBox>
      </Header>
      <Line />
    </>
  );
};

export default injectIntl(TitlePage);
