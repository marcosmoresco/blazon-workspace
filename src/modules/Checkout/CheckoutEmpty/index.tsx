// vendors
import React from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Image from "next/image";

// components
import Empty from "@images/EmptyStateCart.svg";
import Button from "@components/Button";

// styles
import { PageInfoStyle, EmptyArea } from "./styles";

const CheckoutEmpty: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <PageInfoStyle>
        <div>
          <span>
            {`${""}`}
            <FormattedMessage id="checkout.AddAnItemToContinue" />
          </span>
        </div>
        <Button variant="contained" disabled>
          <FormattedMessage id="checkout.continue" />
        </Button>
      </PageInfoStyle>
      <EmptyArea>
        <Image src={Empty} alt="EmptyIcon" />
        <div>
          <div>
            <FormattedMessage id="checkout.NoResults" />
          </div>
          <div>
            <span>
              <FormattedMessage id="checkout.AddItems" />
            </span>
          </div>
          <div>
            <a onClick={() => router.push("/search")}>
              <FormattedMessage id="checkout.SearchItem" />
            </a>
          </div>
        </div>
      </EmptyArea>
    </>
  );
};

export default CheckoutEmpty;
