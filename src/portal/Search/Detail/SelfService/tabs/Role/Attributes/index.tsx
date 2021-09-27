import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import FormControl from "@material-ui/core/FormControl";
import Loading from "@components/Loading";
import CheckCircleIcon from "@icons/CheckCircle";
import ShoppingCartIcon from "@icons/ShoppingCart";
import CaretRightIcon from "@icons/CaretRight";
import LinkIcon from "@icons/Link";
import {
  Box,
  BoxHeader,
  BoxHeaderName,
  BoxHeaderTitle,
  BoxContent,
  BoxDescription,
  BoxCart,
  BoxCartItem,
  BoxCartItemIcon,
  Label,
  BoxExternalReference,
  ExternalReference,
} from "./styles";
import { useCart } from "@requestCart/index";
import { addCartItemMessage } from "@actions/index";
import { SelfService } from "@portal/Search/types";
import { GET_SELF_SERVICE_ITEM } from "@portal/Search/queries";
import { ADD_SELF_SERVICE_CART_ITEM } from "@requestCart/mutations";
import { GET_SELF_SERVICE_CART } from "@requestCart/queries";
import { iconByType, getSelfServiceAttributeValue } from "@utils/index";
import { useTheme, themes } from "@theme/index";

export default function RoleAttributes() {
  const { cart } = useCart();
  const router = useRouter();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };
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

  const [addSelfServiceCartItem, {loading: loadingAddSelfServiceCartItem}] = useMutation(ADD_SELF_SERVICE_CART_ITEM, {
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

  const role = data?.getSelfServiceItem;

  return (
    <>
      <Box>
        <BoxHeader>
          <BoxHeaderName>
            {role?.name || " - "}
          </BoxHeaderName>
          <BoxHeaderTitle>
            {iconByType('', 21)[`ROLE`]}
            <FormattedMessage id="role" />
          </BoxHeaderTitle>
        </BoxHeader>
        <BoxContent>         
          <FormControl fullWidth={true} margin="normal">
            <Label>
              <FormattedMessage id="description" />
            </Label>
            <BoxDescription>
              {role?.description || " - "}
            </BoxDescription>
            <BoxExternalReference>
              <Label>
                <FormattedMessage id="externalReference" />
              </Label>
              {!getSelfServiceAttributeValue("externalReference", role?.attributes || []) && <div>
                <FormattedMessage id="search.detail.no.external.reference" />
              </div>}
              {getSelfServiceAttributeValue("externalReference", role?.attributes || []) && <ExternalReference 
                href={getSelfServiceAttributeValue("externalReference", role?.attributes || [])}
                target="__blank"
                color={currentTheme.palette.primary.main}>
                {getSelfServiceAttributeValue("externalReference", role?.attributes || [])} <LinkIcon color={currentTheme.palette.primary.main}/>
              </ExternalReference>}
            </BoxExternalReference>
          </FormControl>
        </BoxContent>
      </Box>
      {addedItems.indexOf(id as string) === -1 && (
        <>
          {loadingAddSelfServiceCartItem && (
            <BoxCart className="Disabled-action">
              <BoxCartItem>
                <BoxCartItemIcon>
                  <Loading type="blue"/>
                </BoxCartItemIcon>
                <FormattedMessage id="cart.add" />
                <CaretRightIcon width={21} height={21} stroke={2}/>
              </BoxCartItem>
            </BoxCart>               
          )} 
          {!loadingAddSelfServiceCartItem && (
            <BoxCart className="Added"
              onClick={() =>
                addSelfServiceCartItem({
                  variables: {
                    id,
                  },
                })
              }
            >
              <BoxCartItem>
                <BoxCartItemIcon>
                  <ShoppingCartIcon width={21} height={21} />
                </BoxCartItemIcon>                
                <FormattedMessage id="cart.add" />
                <CaretRightIcon width={21} height={21} stroke={2}/>
              </BoxCartItem>              
            </BoxCart>
          )}
        </>
      )}
      {addedItems.indexOf(id as string) > -1 && (
        <BoxCart>
          <BoxCartItem>
            <CheckCircleIcon width={25} height={25} color="#26213F" />
            <FormattedMessage id="search.selfService.added" />
          </BoxCartItem>         
        </BoxCart>
      )}
    </>
  );
}
