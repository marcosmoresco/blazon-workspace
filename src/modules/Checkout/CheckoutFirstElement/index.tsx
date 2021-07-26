// vendors
import React, { useState } from "react";

// types
import { ItemProps } from "./type";

// components
import CheckoutEmpty from "./CheckoutEmpty";
import CheckoutItem from "./CheckoutItem";

const CheckoutFirstElement: React.FC<ItemProps> = ({ nextStep, emptyPage }) => {
  return (
    <>
      {emptyPage === true ? (
        <CheckoutEmpty />
      ) : (
        <CheckoutItem nextStep={nextStep} />
      )}
    </>
  );
};

export default CheckoutFirstElement;
