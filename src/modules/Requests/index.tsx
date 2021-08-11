// vendors
import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

// types
import { RequestsProps } from "./types";
import { TitleHierarchy } from "@components/TitlePage/types";

// components
import RequestsTable from "./components/RequestsTable";
import TitlePage from "@components/TitlePage";

const Requests: React.FC<RequestsProps> = ({ onBack }) => {

  const hierarchy: TitleHierarchy = {
    name: "request.requests",   
  };
  
  return (
    <>     
      <TitlePage
        title={"request.requests"}                     
        hierarchy={hierarchy}
      />
      <RequestsTable />
    </>
  );
};

export default injectIntl(Requests);
