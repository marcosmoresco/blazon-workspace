// vendors
import React from "react";

// types
import { RequestsProps } from "./types";

// components
import TitlePage from "./TitlePage";
import AssignRoles from "./AssignRoles";
import RequestsDetail from "./RequestsDetail";

const RequestsDetailing: React.FC<RequestsProps> = ({ onBack }) => {
  return (
    <>
      <TitlePage onBack={onBack} />
      <AssignRoles />
      <RequestsDetail />
    </>
  );
};

export default RequestsDetailing;
