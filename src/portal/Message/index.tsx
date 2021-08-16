import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addMessage, removeMessage } from "../../actions";
import { SnackbarProvider, useSnackbar } from "notistack";
import CheckCircleIcon from "@icons/CheckCircle";
import XCircleIcon from "@icons/XCircle";
import XIcon from "@icons/X";
import { Box, Header, HeaderInfo, HeaderCloseIcon, BoxContent, TextItem } from "./styles";
import type { MessageType, MessageProps, MessageState } from "./types";

const colorsByType: {[key: string]: string} = {
  "success": "#4EB862",
  "warning": "#FBB13C",
  "error": "#FF134A"
};

const iconByType: {[key: string]: React.ReactNode} = {
  "success": <CheckCircleIcon width={21} height={21} color="#4EB862"/>,
  "warning": <XCircleIcon width={21} height={21} color="#FBB13C"/>,
  "error":  <XCircleIcon width={21} height={21} color="#FF134A"/>
};

function Alert(props: any) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { messages } = props;

  const [messagesQueued, setMessagesQueued] = React.useState([] as any);

  React.useEffect(() => {
    let existMessage = messages.length;

    if (existMessage) {
      messages.forEach((m: MessageType) => {
        if (messagesQueued.indexOf(m.id) === -1) {
          enqueueSnackbar(m.message, {
            variant: m.type,
            autoHideDuration: 3000,          
            key: m.id,
            content: <Box>
              <Header>
                <HeaderInfo style={{color: colorsByType[m.type]}}>
                  {iconByType[m.type]}                  
                  <FormattedMessage id={`message.${m.type}`} />
                </HeaderInfo>                
                <HeaderCloseIcon onClick={() => closeSnackbar(m.id)}>
                  <XIcon/>   
                </HeaderCloseIcon> 
              </Header> 
              <BoxContent>                
                <TextItem>
                  {m.message}
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
