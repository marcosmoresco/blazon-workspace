// vendors
import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

// types
import { RequestsProps } from "./types";

// styles
import { TitleBox, TitleText, Line, Header } from "./styles";

// components
import PaperPlaneTiltIcon from "@icons/PaperPlaneTilt";
import ArrowLeft from "@icons/ArrowLeft";
import RequestsTable from "./components/RequestsTable";

const Requests: React.FC<RequestsProps> = ({ onBack }) => {
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
          <TitleText>
            <FormattedMessage id="request.requests" />
          </TitleText>
        </TitleBox>
      </Header>
      <Line />
      <RequestsTable />
    </>
  );
};

export default injectIntl(Requests);
