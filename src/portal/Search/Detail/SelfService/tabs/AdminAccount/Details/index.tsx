import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import FormControl from "@material-ui/core/FormControl";
import ShoppingCartSimpleIcon from "@icons/ShoppingCartSimple";
import CheckCircleIcon from "@icons/CheckCircle";
import {
  Box,
  BoxHeader,
  BoxHeaderName,
  BoxHeaderTitle,
  BoxContent,
  BoxDescription,
  BoxCart,
  Label,
} from "./styles";
import { useCart } from "@requestCart/index";
import { addCartItemMessage } from "@actions/index";
import { SelfService } from "@portal/Search/types";
import { GET_SELF_SERVICE_ITEM } from "@portal/Search/queries";
import { ADD_SELF_SERVICE_CART_ITEM } from "@requestCart/mutations";
import { GET_SELF_SERVICE_CART } from "@requestCart/queries";
import { iconByType } from "@utils/index";


export default function EntitlementDetails() {
  const { cart } = useCart();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const [addedItems, setAddedItems] = useState<string[]>([]);

  useEffect(() => {
    if (cart && (cart.items || []).length) {
      const cartItems: string[] = [];
      cart.items.map((item) => cartItems.push(item.catalogItemId));
      if (JSON.stringify(cartItems) !== JSON.stringify(addedItems)) {
        setAddedItems(cartItems);
      }
    }
  }, [cart, addedItems, setAddedItems]);

  const [addSelfServiceCartItem, {}] = useMutation(ADD_SELF_SERVICE_CART_ITEM, {
    refetchQueries: [
      {
        query: GET_SELF_SERVICE_CART,
      },
    ],
    onCompleted: (data) => {
      setAddedItems([
        ...addedItems,
        data?.addSelfServiceCartItem.catalogItemId,
      ]);
      dispatch(
        addCartItemMessage({
          ...data?.addSelfServiceCartItem,
          messageType: "add",
        })
      );
    },
  });

  const { loading, error, data, refetch } = useQuery<{
    getSelfServiceItem: SelfService;
  }>(GET_SELF_SERVICE_ITEM, {
    variables: {
      id: id,
    },
  });

  const entitlement = data?.getSelfServiceItem;

  return (
    <>
      <Box>
        <BoxHeader>
          <BoxHeaderName>
            {entitlement?.name || " - "}
          </BoxHeaderName>
          <BoxHeaderTitle>
            {iconByType('', 21)[`ADMIN_PASSWORD`]}            
            <FormattedMessage id="adminAccount" />
          </BoxHeaderTitle>
        </BoxHeader>
        <BoxContent>          
          <FormControl fullWidth={true} margin="normal">
            <Label>
              <FormattedMessage id="description" />
            </Label>
            <BoxDescription>
              {entitlement?.description || " - "}
            </BoxDescription>
          </FormControl>          
        </BoxContent>
      </Box>
      {addedItems.indexOf(id as string) === -1 && (
        <BoxCart className="Added"
          onClick={() =>
            addSelfServiceCartItem({
              variables: {
                id,
              },
            })
          }
        >
          <ShoppingCartSimpleIcon width={21} height={21} />
          <FormattedMessage id="cart.add" />
        </BoxCart>
      )}
      {addedItems.indexOf(id as string) > -1 && (
        <BoxCart>
          <CheckCircleIcon width={25} height={25} color="#26213F" />
          <FormattedMessage id="search.selfService.added" />
        </BoxCart>
      )}
    </>
  );
}
