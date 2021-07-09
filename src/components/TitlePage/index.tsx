import React from "react";
import { injectIntl } from "react-intl";
import { TitleProps } from "./types";
import PaperPlaneTiltIcon from "@icons/PaperPlaneTilt";
import ArrowLeft from "@icons/ArrowLeft";
import { TitleBox, TitleText, SubTitleBox, SubTitleText, Line, Header, Box } from "./styles";

const TitlePage: React.FC<TitleProps> = ({
  title,
  subTitle,
  intl,
  onBack,
  icon,
}) => {
  return (
    <>
      <Box>
        <Header>
          {onBack && (
            <div onClick={onBack}>
              <ArrowLeft />
            </div>
          )}
          <TitleBox>
            {icon}
            <TitleText>{intl.formatMessage({ id: title })}</TitleText>
          </TitleBox>
        </Header>
        {subTitle && (
          <SubTitleBox>
            <SubTitleText>{intl.formatMessage({ id: subTitle })}</SubTitleText>
          </SubTitleBox>
        )}
      </Box>
      <Line />
    </>
  );
};

TitlePage.defaultProps = {
  icon: <PaperPlaneTiltIcon width={24} height={24} />,
};

export default injectIntl(TitlePage);
