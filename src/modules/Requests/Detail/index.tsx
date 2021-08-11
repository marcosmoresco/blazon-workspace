// vendors
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

// types
import { RequestsProps } from "./types";
import { Request } from "../types";
import { TitleHierarchy } from "@components/TitlePage/types";

// components
import TitlePage from "@components/TitlePage";
import Info from "./Info";
import RequestsDetail from "./RequestsDetail";

// queries
import { GET_REQUEST } from "./queries";

const RequestsDetailing: React.FC<RequestsProps> = () => {
  
  const [requestReloaded, setRequestReloaded] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data, refetch } = useQuery<{
    getRequest: Request;
  }>(GET_REQUEST, {
    variables: {
      id: Number(id),
    },
  });

  const request = data?.getRequest;

  const hierarchy: TitleHierarchy = {
    name: "request.requests",
    href: "/requests",
    children: [
      {
        formatedName: String(id),
      },
    ],
  };

  return (
    <>
      <TitlePage 
        title="request.requests"
        onBack={() => router.push("/requests")} 
        hierarchy={hierarchy} />
      <Info request={requestReloaded || request} refetch={refetch}/>
      <RequestsDetail request={request} />
    </>
  );
};

export default RequestsDetailing;
