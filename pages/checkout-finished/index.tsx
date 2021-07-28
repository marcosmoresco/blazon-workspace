// vendors
import React from "react";
import { useRouter } from "next/router";

// components
import CheckoutRequested from "@modules/Checkout/CheckoutRequested";

export default function CheckoutPage() {
  const router = useRouter();
  return <CheckoutRequested nextStep={() => router.push("/checkout")}/>;
}
