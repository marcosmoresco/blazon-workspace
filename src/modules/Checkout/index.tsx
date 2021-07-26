// vendors
import React, { useState } from "react";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";

// components
import CheckoutFirstElement from "./CheckoutFirstElement";
import CheckoutFinishing from "./CheckoutFinishing";
import CheckoutRequested from "./CheckoutRequested";
import TitlePage from "./TitlePage";
import Nav from "./Nav";
import InfoIcon from "@icons/Info/index 2";
import FilePlusIcon from "@icons/FilePlus";
import CheckCircleIcon from "@icons/CheckCircle";
import { NavItem } from "./Nav/type";
import { CheckoutProp } from "./type";

// const items = [
//   {
//     id: 1,
//     itemName: "Information",
//     icon: <InfoIcon />,
//   },
//   {
//     id: 2,
//     itemName: <FormattedMessage id="checkout.FinishingRequest" />,
//     icon: <FilePlusIcon />,
//   },
//   {
//     id: 3,
//     itemName: "Requestedff",
//     icon: <CheckCircleIcon />,
//   },
// ];

const Checkout: React.FC<CheckoutProp> = ({ empty }) => {
  const [items, setItems] = useState<NavItem[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setItems([
      {
        id: 1,
        itemName: <FormattedMessage id="checkout.information" />,
        icon: (
          <InfoIcon
            color={
              currentIndex > 0
                ? "#3174F6"
                : currentIndex === 0
                ? "#514D65"
                : "#7D7A8C"
            }
          />
        ),
      },
      {
        id: 2,
        itemName: <FormattedMessage id="checkout.Finishing" />,
        icon: (
          <FilePlusIcon
            color={
              currentIndex > 1
                ? "#3174F6"
                : currentIndex === 1
                ? "#514D65"
                : "#7D7A8C"
            }
          />
        ),
      },
      {
        id: 3,
        itemName: <FormattedMessage id="checkout.requested" />,
        icon: (
          <CheckCircleIcon color={currentIndex >= 2 ? "#3174F6" : "#7D7A8C"} />
        ),
      },
    ]);
  }, [currentIndex]);

  const nextStep = () => {
    setCurrentIndex((index) => index + 1);
  };

  return (
    <>
      <TitlePage onBack={() => {}} currentIndex={currentIndex} />

      <Nav items={items} currentIndex={currentIndex} />

      {currentIndex === 0 ? (
        <CheckoutFirstElement nextStep={nextStep} emptyPage={empty} />
      ) : currentIndex === 1 ? (
        <CheckoutFinishing nextStep={nextStep} />
      ) : currentIndex === 2 ? (
        <CheckoutRequested nextStep={nextStep} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Checkout;
