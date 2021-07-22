import React, { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { FormattedMessage, injectIntl } from "react-intl";
import { useQuery, useMutation } from "@apollo/client";
import Drawer from "@material-ui/core/Drawer";
import Tooltip from "@components/Tooltip";
import Button from "@components/Button";
import { confirm } from "@components/Dialog/actions";
import ShoppingCartSimpleIcon from "@icons/ShoppingCartSimple";
import CaretDownIcon from "@icons/CaretDown";
import PuzzlePieceIcon from "@icons/PuzzlePiece";
import TrashIcon from "@icons/Trash";
import XIcon from "@icons/X";
import XCircleIcon from "@icons/XCircle";
import { addCartItemMessage } from "@actions/index";
import { useCart } from "@requestCart/index";
import { GET_SELF_SERVICE_CART } from "@requestCart/queries";
import { DELETE_SELF_SERVICE_CART_ITEM } from "@requestCart/mutations";
import type { SelfServiceCart, SelfServiceCartItem } from "@requestCart/types";
import type { HeaderRequestCartProps } from "./types";
import {
  Badge,
  BoxRequestCart,
  BoxRequestCartHeader,
  Header,
  HeaderTitle,
  HeaderDivider,
  CloseHeader,
  BoxHeader,
  BoxHeaderTitle,
  BoxHeaderButton,
  BoxContainerTitle,
  BoxContainerTitleText,
  BoxContainerTitleTagContent,
  BoxContainerTitleTag,
  BoxRequestCartItem,
  BoxRequestCartItemInfo,
  BoxRequestCartItemType,
  BoxRequestCartItemText,
  BoxRequestCartItemTrash,
  ItemsDivider,
  BoxFooter,
} from "./styles";

const HeaderRequestCart: FC<HeaderRequestCartProps> = ({
  intl,
  classes,
  currentTheme,
}) => {
  const { cart, setCart } = useCart();
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, data, refetch } = useQuery<{
    getSelfServiceCart: SelfServiceCart;
  }>(GET_SELF_SERVICE_CART);
  const selfServiceCart: SelfServiceCart =
    data?.getSelfServiceCart || ({} as SelfServiceCart);

  const [
    deleteSelfServiceCartItem,
    { loading: loadingDelete, error: errorDelete, data: dataDelete },
  ] = useMutation(DELETE_SELF_SERVICE_CART_ITEM, {
    refetchQueries: [
      {
        query: GET_SELF_SERVICE_CART,
      },
    ],
    onCompleted: (data) => {
      dispatch(addCartItemMessage({name: "Teste", messageType: "remove"}));
      setCart(data?.getSelfServiceCart || ({} as SelfServiceCart));
    }
  });

  useEffect(() => {
    if (!loading && !error && !cart?.identifier) {
      setCart(data?.getSelfServiceCart || ({} as SelfServiceCart));
    }   
  }, [
    loading,
    error,
    cart,
    setCart,
    data    
  ]);

  const [open, setOpen] = useState(false);

  const handleDelete = async (
    e: React.MouseEvent,
    item: SelfServiceCartItem
  ) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const result = await confirm(
      intl.formatMessage({
        id: "request.cancel.title",
      }),
      intl.formatMessage({
        id: "request.cancel.text",
      }),
      <XCircleIcon width={48} height={48} color="#FF134A" />
    );
    if (result) {
      deleteSelfServiceCartItem({
        variables: { id: item.identifier },
      });
    }
  };

  return (
    <>
      <Tooltip
        title={intl.formatMessage({ id: "requestCart" })}
        placement="bottom"
      >
        <Badge
          badgeContent={(selfServiceCart?.items || []).length}
          color="primary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div className={classes.optionImage} onClick={() => setOpen(true)}>
            <ShoppingCartSimpleIcon
              width={21}
              height={21}
              color={currentTheme.overrides.MuiIcon.root.color}
            />
          </div>
        </Badge>
      </Tooltip>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <BoxRequestCart>
          <BoxRequestCartHeader>
            <Header>
              <HeaderTitle>Carrinho</HeaderTitle>
              <CloseHeader onClick={() => setOpen(false)}>
                <XIcon />
              </CloseHeader>
            </Header>
            <HeaderDivider />
            <BoxHeader>
              <BoxHeaderTitle>04 Solicitações em andamento</BoxHeaderTitle>
              <BoxHeaderButton
                onClick={() => {
                  router.push("/requests");
                  setOpen(false);
                }}
              >
                <FormattedMessage id="requests" />
              </BoxHeaderButton>
            </BoxHeader>
          </BoxRequestCartHeader>
          <BoxContainerTitle>
            <BoxContainerTitleText>
              {(selfServiceCart?.items || []).length} itens adicionados no
              carrinho
            </BoxContainerTitleText>
            <BoxContainerTitleTagContent>
              <BoxContainerTitleTag>Todos</BoxContainerTitleTag>
              <CaretDownIcon width={21} height={21} color="#676378" />
            </BoxContainerTitleTagContent>
          </BoxContainerTitle>
          <ItemsDivider />
          {(selfServiceCart?.items || []).map((item: SelfServiceCartItem) => (
            <BoxRequestCartItem key={`selfServiceCart-item-${item.identifier}`}>
              <BoxRequestCartItemInfo>
                <BoxRequestCartItemType>
                  <PuzzlePieceIcon width={24} height={24} color="#3174F6" />
                </BoxRequestCartItemType>
                <BoxRequestCartItemText>
                  {item.name || " - "}
                </BoxRequestCartItemText>
              </BoxRequestCartItemInfo>
              <BoxRequestCartItemTrash
                onClick={(e: React.MouseEvent) => handleDelete(e, item)}
              >
                <TrashIcon />
              </BoxRequestCartItemTrash>
            </BoxRequestCartItem>
          ))}
          <BoxFooter>
            <Button color="primary">Limpar carrinho</Button>
            <Button variant="contained" color="primary">
              Checkout
            </Button>
          </BoxFooter>
        </BoxRequestCart>
      </Drawer>
    </>
  );
};

export default injectIntl(HeaderRequestCart);
