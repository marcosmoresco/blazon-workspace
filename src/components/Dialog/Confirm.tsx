import React, { FC, useState } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import { IntlProvider, injectIntl } from "react-intl";
import Image from "next/image";
import Button from "../Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import infoIcon from "./images/information.svg";
import { useRouter } from "next/router";
import type { LocalesType } from "../../locales/types";

import messages_en from "./translations/en.json";
import messages_pt from "./translations/pt.json";

const messages: LocalesType = {
  en: { ...messages_en },
  pt: { ...messages_pt },
};

const styles = (theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#F4F4F5",    
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props: any) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const stylesContent = () => ({
  root: {
    textAlign: "center",
    maxWidth: 600,
    backgroundColor: "#F4F4F5",
    paddingBottom: 98,
    "& .Icon": {
      display: "flex",
      justifyContent: "center",
    },
    "& .Title": {
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "100%",
      textAlign: "center",
      color: "#26213F"
    },
    "& .SubTitle": {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 16,
      lineHeight: "130%",
      textAlign: "center",
      color: "#A8A6B2",
      marginTop: 15,
    },
  },
});

const DialogContent = withStyles(stylesContent)(
  injectIntl((props: any) => {
    const { title, text, template, classes, onClose, icon, intl, ...other } = props;
    return (
      <MuiDialogContent className={classes.root} {...other}>
        {icon && (
        <div className="Icon">
          {icon}
        </div>)}
        {title && (
        <div className="Title">
          {title}
        </div>
        )}
        {text && (
        <div className="SubTitle">
          {text}
        </div>
        )}
        {template}
      </MuiDialogContent>
    );
  })
);

const stylesActions = () => ({
  root: {
    justifyContent: "space-between",   
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: "#F4F4F5",
    boxShadow: "0px 4px 74px rgba(0, 0, 0, 0.25)",
    "&.MuiDialogActions-spacing > :not(:first-child)": {
      marginLeft: 0,
    },
    "& .Default-Red": {
      minWidth: 140,
    },
    "& .MuiButton-textPrimary": {
      color: "#0E46D7",
      minWidth: 100,
    },
    "& .MuiButton-containedPrimary": {
      background: "#0E46D7",
      minWidth: 179
    }
  },
});

const DialogActions = withStyles(stylesActions)(
  injectIntl((props: any) => {
    const { classes, handleCancel, handleConfirm, intl, ...other } = props;

    return (
      <MuiDialogActions className={classes.root} {...other}>
        <Button onClick={handleCancel} color="primary">
          {intl.formatMessage({
            id: "app.cancel",
          })}
        </Button>
        <Button variant="contained" onClick={handleConfirm} color="primary">
          {intl.formatMessage({
            id: "app.continue",
          })}
        </Button>
      </MuiDialogActions>
    );
  })
);

export type ConfirmPropsType = {
  title: string;
  text: string;
  template?: any;
  resolve: any;
  reject?: any;
};

export type ConfirmStateType = {
  isOpen: boolean;
  text: string;
  template?: any;
};

const Confirm: FC<ConfirmPropsType> = ({ title, text, template, resolve }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCancel = () => {
    setIsOpen(false);
    resolve(false);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    resolve(true);
  };

  const { locale = "en", defaultLocale } = useRouter() || {};

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Dialog
        open={isOpen}
        onClose={handleCancel}
        maxWidth="sm"
        fullWidth={true}
        aria-labelledby="confirm-dialog"
      >
        <DialogTitle
          id="customized-confirm-dialog-title"
          onClose={handleCancel}
        ></DialogTitle>
        <DialogContent title={title} text={text} template={template} />
        <DialogActions
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      </Dialog>
    </IntlProvider>
  );
};

export default Confirm;
