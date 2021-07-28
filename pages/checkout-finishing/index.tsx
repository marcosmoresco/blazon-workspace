// vendors
import React from "react";
import { useRouter } from "next/router";

// components
import CheckoutFinishing from "@modules/Checkout/CheckoutFinishing";

export default function CheckoutPage() {
  const router = useRouter();
  return <CheckoutFinishing nextStep={() => router.push("/checkout")}/>;
}
