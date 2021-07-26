// vendors
import React from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Image from "next/image";

// components
import CheckCircle from "./essets/CheckCircle.svg";
import Button from "@components/Button";

// types
import { ItemProps } from "./type";

// styles
import {
  Line,
  FinishingArea,
  ItemArea,
  ImageArea,
  ButtonArea,
  TextArea,
} from "./styles";

const CheckoutRequested: React.FC<ItemProps> = ({ nextStep }) => {
  const router = useRouter();
  return (
    <>
      <FinishingArea>
        <ItemArea>
          <ImageArea>
            <Image src={CheckCircle} alt="CheckOkIcon" />
          </ImageArea>

          <TextArea>
            <div>
              <FormattedMessage id="checkout.requestedOk" />
            </div>
          </TextArea>
          <TextArea>
            <span>
              <FormattedMessage id="checkout.sendOk" />
            </span>
          </TextArea>

          <Line />
          <ButtonArea>
            <Button
              variant="contained"
              color="default-primary"
              onClick={() => router.push("/checkout")}
            >
              <FormattedMessage id="checkout.cancel" />
            </Button>
            <Button variant="contained" color="primary" onClick={nextStep}>
              <FormattedMessage id="checkout.save" />
            </Button>
          </ButtonArea>
        </ItemArea>
      </FinishingArea>
    </>
  );
};

export default CheckoutRequested;
