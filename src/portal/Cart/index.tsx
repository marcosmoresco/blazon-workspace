import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCartItemMessage, removeCartItemMessage } from "../../actions";
import { SnackbarProvider, useSnackbar } from "notistack";
import XIcon from "@icons/X";
import CheckCircleIcon from "@icons/CheckCircle";
import PuzzlePieceIcon from "@icons/PuzzlePiece";
import type { SelfServiceCartItem } from "@requestCart/types";
import type { CartProps, CartState, SelfServiceCartItemMessage } from "./types";
import { Box, Header, HeaderInfo, HeaderCloseIcon, BoxContent, IconItem, TextItem } from "./styles";
import { iconByType, getSelfServiceAttributeValue } from "@utils/index";

function Alert(props: any) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { items = [], onClose } = props;

  const [messagesQueued, setMessagesQueued] = React.useState([] as any);

  React.useEffect(() => {
    let existMessage = items.length;

    if (existMessage) {
      items.forEach((m: SelfServiceCartItem & SelfServiceCartItemMessage) => {
        if (messagesQueued.indexOf(m.id) === -1) {
          enqueueSnackbar(null, {
            variant: "success",
            autoHideDuration: 3000,
            key: m.id,
            content: <Box>
              <Header>
                {m.messageType === "add" && (
                <HeaderInfo>
                  <CheckCircleIcon width={21} height={21} color="#3174F6"/>
                  <FormattedMessage id="cart.added" />
                </HeaderInfo>)}
                {m.messageType === "remove" && (
                <HeaderInfo>
                  <CheckCircleIcon width={21} height={21} color="#3174F6"/>
                  <FormattedMessage id="cart.removed" />
                </HeaderInfo>)}
                <HeaderCloseIcon onClick={() => closeSnackbar(m.id)}>
                  <XIcon/>   
                </HeaderCloseIcon> 
              </Header> 
              <BoxContent>
                <IconItem>
                  {iconByType("#3174F6", 25)[(m.targetType === "RESOURCE" && m.resourceType && `RESOURCE${m.resourceType}`) || m.targetType]}                  
                </IconItem>
                <TextItem>
                  {m.name}
                </TextItem>
              </BoxContent>              
            </Box>
          });
          messagesQueued.push(m.id);
          setMessagesQueued(messagesQueued);
        }
      });
    }
  });

  return null;
}

class Cart extends Component<CartProps, CartState> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: [],
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate(prevProps: any) {
    const { items } = this.state;
    const { cart } = this.props;
    const previousCart = prevProps.cart;

    if (previousCart?.items.length !== cart?.items.length) {
      cart.items.forEach(
        (msg: SelfServiceCartItem & SelfServiceCartItemMessage) => {
          if (
            items.filter(
              (m: SelfServiceCartItem & SelfServiceCartItemMessage) =>
                m.id === msg.id
            ).length === 0
          ) {
            items.push(msg);
          }
        }
      );

      this.setState({ items });
    }
  }

  handleClose(event: any, reason: string, id: number) {
    if (reason === "clickaway") {
      return;
    }

    const { removeCartItem } = this.props;

    let { items } = this.state;

    items = items.filter((m) => m.id !== id);

    this.setState({ items });

    removeCartItem(id);
  }

  render() {
    const { items } = this.state;

    return (
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        maxSnack={3}
      >
        <Alert items={items} onClose={this.handleClose}></Alert>
      </SnackbarProvider>
    );
  }
}

const mapStateToProps = (store: any) => ({
  cart: store.cart,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ addCartItemMessage, removeCartItemMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
