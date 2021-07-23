import React, { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { FormattedMessage, injectIntl } from "react-intl";
import { useQuery, useMutation } from "@apollo/client";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@components/Tooltip";
import Button from "@components/Button";
import { confirm } from "@components/Dialog/actions";
import ShoppingCartSimpleIcon from "@icons/ShoppingCartSimple";
import CaretDownIcon from "@icons/CaretDown";
import PuzzlePieceIcon from "@icons/PuzzlePiece";
import ArticleIcon from "@icons/Article";
import NewspaperClippingIcon from "@icons/NewspaperClipping";
import UserGearIcon from "@icons/UserGear";
import TrashIcon from "@icons/Trash";
import XIcon from "@icons/X";
import XCircleIcon from "@icons/XCircle";
import { addMessage, addCartItemMessage } from "@actions/index";
import { useCart } from "@requestCart/index";
import { GET_SELF_SERVICE_CART } from "@requestCart/queries";
import {
  DELETE_SELF_SERVICE_CART,
  DELETE_SELF_SERVICE_CART_ITEM,
} from "@requestCart/mutations";
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

  const [deleteSelfServiceCartItem, {}] = useMutation(
    DELETE_SELF_SERVICE_CART_ITEM,
    {
      refetchQueries: [
        {
          query: GET_SELF_SERVICE_CART,
        },
      ],
      onCompleted: (data) => {
        dispatch(
          addCartItemMessage({
            ...data?.deleteSelfServiceCartItem,
            messageType: "remove",
          })
        );
      },
    }
  );

  const [deleteSelfServiceCart, {}] = useMutation(DELETE_SELF_SERVICE_CART, {
    refetchQueries: [
      {
        query: GET_SELF_SERVICE_CART,
      },
    ],
    onCompleted: () => {
      dispatch(
        addMessage(<FormattedMessage id="cart.items.removed.message" />)
      );
    },
  });

  useEffect(() => {
    if (!loading && !error) {
      setCart(data?.getSelfServiceCart || ({} as SelfServiceCart));
    }
  }, [loading, error, cart, setCart, data]);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");

  const handleClickFilter = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (
    e: React.MouseEvent,
    item: SelfServiceCartItem
  ) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const result = await confirm(
      intl.formatMessage({
        id: "cart.remove.item",
      }),
      intl.formatMessage({
        id: "cart.remove.item.confirm",
      }),
      <XCircleIcon width={48} height={48} color="#FF134A" />
    );
    if (result) {
      deleteSelfServiceCartItem({
        variables: {
          identifier: item.identifier,
          name: item.name,
          targetType: item.targetType,
        },
      });
    }
  };

  const handleDeleteAll = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const result = await confirm(
      intl.formatMessage({
        id: "cart.remove.items",
      }),
      intl.formatMessage({
        id: "cart.remove.items.confirm",
      }),
      <XCircleIcon width={48} height={48} color="#FF134A" />
    );
    if (result) {
      deleteSelfServiceCart();
    }
  };

  const iconByType: { [key: string]: any } = {
    RESOURCE: <PuzzlePieceIcon width={24} height={24} color="#3174F6" />,
    ENTITLEMENT: <ArticleIcon width={24} height={24} color="#3174F6" />,
    ROLE: <NewspaperClippingIcon width={24} height={24} color="#3174F6" />,
    ADMIN_PASSWORD: <UserGearIcon width={24} height={24} color="#3174F6" />,
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
              <HeaderTitle>
                <FormattedMessage id="cart" />
              </HeaderTitle>
              <CloseHeader onClick={() => setOpen(false)}>
                <XIcon />
              </CloseHeader>
            </Header>
            <HeaderDivider />
            <BoxHeader>
              <BoxHeaderTitle>
                04 {intl.formatMessage({ id: "requests.in.progress" })}
              </BoxHeaderTitle>
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
              {(selfServiceCart?.items || []).length}{" "}
              {intl.formatMessage({ id: "cart.items.added" })}
            </BoxContainerTitleText>
            <BoxContainerTitleTagContent onClick={handleClickFilter}>
              <BoxContainerTitleTag>
                <FormattedMessage id={currentFilter} />
              </BoxContainerTitleTag>
              <CaretDownIcon width={21} height={21} color="#676378" />
            </BoxContainerTitleTagContent>
            <Menu
              id="menu-filter-cart-items"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseFilter}
            >
              <MenuItem
                onClick={() => {
                  setCurrentFilter("all");
                  handleCloseFilter();
                }}
              >
                <FormattedMessage id="all" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setCurrentFilter("resource");
                  handleCloseFilter();
                }}
              >
                <FormattedMessage id="resource" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setCurrentFilter("entitlement");
                  handleCloseFilter();
                }}
              >
                <FormattedMessage id="entitlement" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setCurrentFilter("role");
                  handleCloseFilter();
                }}
              >
                <FormattedMessage id="role" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setCurrentFilter("adminAccount");
                  handleCloseFilter();
                }}
              >
                <FormattedMessage id="adminAccount" />
              </MenuItem>
            </Menu>
          </BoxContainerTitle>
          <ItemsDivider />
          {(selfServiceCart?.items || [])
            .filter(
              (item: SelfServiceCartItem) =>
                currentFilter === "all" ||
                item.catalogItemType ===
                  ((currentFilter === "adminAccount" && "ADMIN_PASSWORD") ||
                    currentFilter.toLocaleUpperCase())
            )
            .map((item: SelfServiceCartItem) => (
              <BoxRequestCartItem
                key={`selfServiceCart-item-${item.identifier}`}
              >
                <BoxRequestCartItemInfo>
                  <BoxRequestCartItemType>
                    {iconByType[item.catalogItemType]}
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
            <Button
              color="primary"
              onClick={(e: React.MouseEvent) => handleDeleteAll(e)}
            >
              {intl.formatMessage({ id: "clear.cart" })}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/checkout")}
            >
              {intl.formatMessage({ id: "checkout" })}
            </Button>
          </BoxFooter>
        </BoxRequestCart>
      </Drawer>
    </>
  );
};

export default injectIntl(HeaderRequestCart);
