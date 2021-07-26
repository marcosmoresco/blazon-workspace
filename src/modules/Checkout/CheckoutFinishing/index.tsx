// vendors
import React from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Image from "next/image";

// components
import Finishing from "./essets/Finishing.svg";
import Calendar from "@icons/Calendar";
import Button from "@components/Button";

// types
import { ItemProps } from "./type";

// styles
import {
  Line,
  FinishingArea,
  ItemArea,
  TextArea,
  Span,
  ImageArea,
  EffetiveDate,
  Description,
  DescriptionTitle,
  ButtonArea,
} from "./styles";

const CheckoutFinishing: React.FC<ItemProps> = ({ nextStep }) => {
  const router = useRouter();
  return (
    <>
      <FinishingArea>
        <ItemArea>
          <TextArea>
            <ImageArea>
              <Image src={Finishing} alt="FinishingIcon" />
            </ImageArea>

            <Span>
              Fill in the data below to finalize your access request. In the
              effective date field, you can request that this request be
              processed at a future date, and on the date of expiration til a
              data limit date to that your stored is exactly up to it. <br />
              <br />
              After yoursubmission, your request can be controlled bu an
              approval process, you can track its proghress without any request
              icon that is just above this page.
            </Span>
          </TextArea>

          <EffetiveDate placeholder="Effective date">
            <Calendar width={32} height={32} />
            <span>Effetive Date</span>
          </EffetiveDate>
          <DescriptionTitle>
            <FormattedMessage id="checkout.description" />
          </DescriptionTitle>
          <Description>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              velit accumsan, massa lacus gravida tincidunt metus. Rutrum
              ultricies tellus ac dolor sagittis massa et.
            </span>
          </Description>
          <Line />
          <ButtonArea>
            <Button
              variant="contained"
              color="default-primary"
              onClick={() => router.push("/checkout-finishing")}
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

export default CheckoutFinishing;
