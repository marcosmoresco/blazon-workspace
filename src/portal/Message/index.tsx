import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addMessage, removeMessage } from "../../actions";
import { SnackbarProvider, useSnackbar } from "notistack";
import CancelIcon from "@material-ui/icons/Cancel";
import type { MessageType, MessageProps, MessageState } from "./types";

function Alert(props: any) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { messages, onClose } = props;

  const [messagesQueued, setMessagesQueued] = React.useState([] as any);

  const action = (key: any) => (
    <React.Fragment>
      <CancelIcon
        onClick={() => {
          closeSnackbar(key);
          onClose(null, null, key);
        }}
      />
    </React.Fragment>
  );

  React.useEffect(() => {
    let existMessage = messages.length;

    if (existMessage) {
      messages.forEach((m: MessageType) => {
        if (messagesQueued.indexOf(m.id) === -1) {
          enqueueSnackbar(m.message, {
            variant: m.type,
            autoHideDuration: 3000,
            action,
            key: m.id,
          });
          messagesQueued.push(m.id);
          setMessagesQueued(messagesQueued);
        }
      });
    }
  });

  return null;
}

class Message extends Component<MessageProps, MessageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      messages: [],
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate(prevProps: any) {
    const { messages } = this.state;
    const { message } = this.props;
    const previousMessage = prevProps.message;

    if (previousMessage.messages.length !== message.messages.length) {
      message.messages.forEach((msg: MessageType) => {
        if (messages.filter((m: MessageType) => m.id === msg.id).length === 0) {
          messages.push(msg);
        }
      });

      this.setState({ messages });
    }
  }

  handleClose(event: any, reason: string, id: number) {
    if (reason === "clickaway") {
      return;
    }

    const { removeMessage } = this.props;

    let { messages } = this.state;

    messages = messages.filter((m) => m.id !== id);

    this.setState({ messages });

    removeMessage(id);
  }

  render() {
    const { messages } = this.state;

    return (
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        maxSnack={3}
      >
        <Alert messages={messages} onClose={this.handleClose}></Alert>
      </SnackbarProvider>
    );
  }
}

const mapStateToProps = (store: any) => ({
  message: store.message,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ addMessage, removeMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Message);
