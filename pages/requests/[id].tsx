import React from "react";
import { useRouter } from "next/router";
import RequestsDetailing from "../../src/modules/Requests/Detail";

export default function RequestsDetailingPage() {
  const router = useRouter();
  let { id } = router.query;

  if (!id) {
    return null;
  }

  return <RequestsDetailing />;
}
