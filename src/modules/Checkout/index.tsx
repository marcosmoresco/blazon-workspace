// vendors
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import { isValidCart } from "@utils/index";

// components
import TitlePage from "@components/TitlePage";
import CheckoutItem from "./CheckoutItem";
import Button from "@components/Button";
import InfoIcon from "@icons/Info/index";
import FilePlusIcon from "@icons/FilePlus";
import CheckCircleIcon from "@icons/CheckCircle";
import { useCart } from "@requestCart/index";
import CheckoutEmpty from "@modules/Checkout/CheckoutFirstElement/CheckoutEmpty";

// styles
import {
  Line,
  PageInfoStyle,
  CheckBox,
  StatusCheckoutStyle,
  CircleStyle,
  LineStatusStyle,
  SymbolStyle,
  TitlesStyle,
  ItemText,
  ItemsAdded,
} from "./styles";
import { SelfServiceCartItem } from "@requestCart/types";

const Checkout: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const intl = useIntl();
  const { cart } = useCart();

  return (
    <>
      <TitlePage title="checkout" subTitle="checkout.RequestInformation" />
      <StatusCheckoutStyle>
        <SymbolStyle>
          <CircleStyle>
            <InfoIcon width={48} height={48} color="#514D65" stroke={2} />
          </CircleStyle>
          <LineStatusStyle style={{ background: "#E9E8EB" }} />
          <CircleStyle>
            <FilePlusIcon color="#BDBCC5" stroke={2} />
          </CircleStyle>
          <LineStatusStyle style={{ background: "#E9E8EB" }} />
          <CircleStyle>
            <CheckCircleIcon
              width={48}
              height={48}
              color="#BDBCC5"
              stroke={2}
            />
          </CircleStyle>
        </SymbolStyle>
        <TitlesStyle>
          <ItemText style={{ color: "#514D65" }}>
            <FormattedMessage id="checkout.information" />
          </ItemText>
          <ItemText style={{ color: "#BDBCC5" }}>
            <FormattedMessage id="checkout.FinishingRequest" />
          </ItemText>
          <ItemText style={{ color: "#BDBCC5" }}>
            <FormattedMessage id="checkout.requested" />
          </ItemText>
        </TitlesStyle>
      </StatusCheckoutStyle>
      <Line />
      {!(cart?.items || []).length ? <CheckoutEmpty /> : null}
      {(cart?.items || []).length ? (
        <>
          <PageInfoStyle>
            <div>
              <ItemsAdded>
                <div>{(cart?.items || []).length}</div>
                <FormattedMessage
                  id={
                    (cart?.items || []).length > 1
                      ? "checkout.items.added"
                      : "checkout.item.added"
                  }
                />
              </ItemsAdded>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (!isValidCart(cart)) {
                  dispatch(
                    addMessage(
                      intl.formatMessage({
                        id: "checkout.invalid.items",
                      }),
                      "warning"
                    )
                  );
                  return;
                }
                router.push("/checkout-finishing");
              }}
            >
              <FormattedMessage id="checkout.continue" />
            </Button>
          </PageInfoStyle>
          {(cart?.items || []).map((item: SelfServiceCartItem) => (
            <CheckoutItem
              key={`checkout-item-${item.identifier}`}
              item={item}
              allowedAssignTypes={cart?.allowedAssignTypes}
            />
          ))}
          <Line />
          <PageInfoStyle>
            <div>
              <ItemsAdded>
                <div>{(cart?.items || []).length}</div>
                <FormattedMessage
                  id={
                    (cart?.items || []).length > 1
                      ? "checkout.items.added"
                      : "checkout.item.added"
                  }
                />
              </ItemsAdded>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (!isValidCart(cart)) {
                  dispatch(
                    addMessage(
                      intl.formatMessage({
                        id: "checkout.invalid.items",
                      }),
                      "warning"
                    )
                  );
                  return;
                }
                router.push("/checkout-finishing");
              }}
            >
              <FormattedMessage id="checkout.continue" />
            </Button>
          </PageInfoStyle>
        </>
      ) : null}
    </>
  );
};

export default Checkout;
