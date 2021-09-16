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
import SharedAccountIcon from "@icons/SharedAccount";
import ApplicationAccountIcon from "@icons/ApplicationAccount";
import RegularAccountIcon from "@icons/RegularAccount";
import AdministrativeAccountIcon from "@icons/AdministrativeAccount";
import TemporaryAccountIcon from "@icons/Watch";
import CheckCircleIcon from "@icons/CheckCircle";
import SecurityUserIcon from "@icons/SecurityUser";
import PeopleIcon from "@icons/People";
import TrashIcon from "@icons/Trash";
import XIcon from "@icons/X";
import XCircleIcon from "@icons/XCircle";
import Empty from "./Empty";
import { addMessage, addCartItemMessage } from "@actions/index";
import { GET_OPEN_REQUESTS } from "@modules/Requests/queries";
import { useCart } from "@requestCart/index";
import { GET_SELF_SERVICE_CART } from "@requestCart/queries";
import {
  DELETE_SELF_SERVICE_CART,
  DELETE_SELF_SERVICE_CART_ITEM,
} from "@requestCart/mutations";
import type { SelfServiceCart, SelfServiceCartItem } from "@requestCart/types";
import type { HeaderRequestCartProps } from "./types";
import type { OpenRequests } from "@modules/Requests/types";
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
import Loading from "@components/Loading";

const HeaderRequestCart: FC<HeaderRequestCartProps> = ({
  intl,
  classes,
  currentTheme,
}) => {
  const { cart, setCart } = useCart();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loadingItems, setLoadingItems] = useState<number[]>([]); 
  const { loading, error, data, refetch } = useQuery<{
    getSelfServiceCart: SelfServiceCart;
  }>(GET_SELF_SERVICE_CART);
  const selfServiceCart: SelfServiceCart =
    data?.getSelfServiceCart || ({} as SelfServiceCart);

  const { loading: loadingOpenRequests, data: dataOpenRequests, refetch: refetchOpenRequests } = useQuery<{
    getOpenRequests: OpenRequests
  }>(GET_OPEN_REQUESTS, {
    fetchPolicy: "network-only"
  });

  const [deleteSelfServiceCartItem, {loading: loadingDeleteSelfServiceCartItem}] = useMutation(
    DELETE_SELF_SERVICE_CART_ITEM,
    {
      refetchQueries: [
        {
          query: GET_SELF_SERVICE_CART,
        },
      ],
      onCompleted: (data) => {
        setLoadingItems(loadingItems.filter((i) => i !== data?.deleteSelfServiceCartItem.identifier)); 
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
      <XCircleIcon width={48} height={48} color="#FF134A" />,
      null,
      currentTheme  
    );
    if (result) { 
      setLoadingItems([...loadingItems, item.identifier as number]);     
      deleteSelfServiceCartItem({
        variables: {
          identifier: item.identifier,
          name: item.name,
          resourceType: item.resourceType,
          catalogItemType: item.catalogItemType
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
    RESOURCESHARED_RESOURCE: <SharedAccountIcon width={24} height={24} color={currentTheme.palette.primary.main || "#3174F6"} />,
    RESOURCEAPPLICATION_RESOURCE: <ApplicationAccountIcon width={24} height={24} color={currentTheme.palette.primary.main || "#3174F6"} />,
    RESOURCEREGULAR_RESOURCE: <RegularAccountIcon width={24} height={24} color={currentTheme.palette.primary.main || "#3174F6"} />,
    RESOURCETEMPORARY_RESOURCE: <TemporaryAccountIcon width={24} height={24} color={currentTheme.palette.primary.main || "#3174F6"} />,
    RESOURCEADMIN_RESOURCE: <AdministrativeAccountIcon width={24} height={24} color={currentTheme.palette.primary.main || "#3174F6"} />,
    ENTITLEMENT: <CheckCircleIcon width={24} height={24} color={currentTheme.palette.primary.main || "#3174F6"} />,
    ROLE: <PeopleIcon width={24} height={24} color={currentTheme.palette.primary.main || "#3174F6"} />,
    ADMIN_PASSWORD: <SecurityUserIcon width={24} height={24} color={currentTheme.palette.primary.main || "#3174F6"} />,
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
          <div className={classes.optionImage} onClick={() => {
            refetchOpenRequests();
            setOpen(true);
          }}>
            <ShoppingCartSimpleIcon
              width={21}
              height={21}
              color={currentTheme.palette.header.contrastText}
              stroke={1}
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
                {dataOpenRequests?.getOpenRequests?.amountOpen === 0 && (
                  <FormattedMessage id="requests.no.progress" />
                )}
                {(dataOpenRequests?.getOpenRequests?.amountOpen || 0) > 0 && (
                  <>
                    {(dataOpenRequests?.getOpenRequests?.amountOpen || 0) > 10 && "10+ " || dataOpenRequests?.getOpenRequests?.amountOpen + " "}
                    <FormattedMessage id="requests.in.progress" />
                  </>
                )}             
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
          {!(selfServiceCart?.items || []).length && (
            <Empty />
          )}
          {(selfServiceCart?.items || []).length > 0 && (
            <>
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
            </>
          )}                   
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
                    {iconByType[`${item.catalogItemType}${(item.catalogItemType === "RESOURCE" && item.resourceType) || ""}`]}
                  </BoxRequestCartItemType>
                  <BoxRequestCartItemText>
                    {item.name || " - "}
                  </BoxRequestCartItemText>
                </BoxRequestCartItemInfo>
                {loadingItems.includes(item.identifier) && (
                  <BoxRequestCartItemTrash className="Disabled-action">
                    <Loading type="blue"/>
                  </BoxRequestCartItemTrash>
                )}   
                {!loadingItems.includes(item.identifier) && (
                  <BoxRequestCartItemTrash
                    onClick={(e: React.MouseEvent) => handleDelete(e, item)}
                  >
                    <TrashIcon />
                  </BoxRequestCartItemTrash>
                )}             
              </BoxRequestCartItem>
            ))}
           {(selfServiceCart?.items || []).length > 0 && (
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
              onClick={() => {
                setOpen(false);
                router.push("/checkout");
              }}
            >
              {intl.formatMessage({ id: "checkout" })}
            </Button>
          </BoxFooter>)}
        </BoxRequestCart>
      </Drawer>
    </>
  );
};

export default injectIntl(HeaderRequestCart);
