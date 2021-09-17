import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import Button from "@components/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme: any) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#F1F1FE",
    "& .title": {
      lineHeight: "31px",
      color: "#4F486A",
      fontSize: 24,
    },
    "& .subTitle": {
      fontSize: 13,
      color: "#777779",
    },
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: "30px 24px",
    borderBottom: "none",
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiInputBase-formControl": {
      width: "100%",
    },
    "& .Mui-error": {
      marginLeft: 0,
    },
    "& input": {
      padding: "11.5px",
    },
  },
}))(MuiDialogContent);

const stylesActions = (theme: any) => ({
  root: {
    margin: 0,
    height: 90,
    paddingRight: 40,
    background: "#E9E8EB",
    boxShadow: "0px 4px 74px rgba(0, 0, 0, 0.25)",
    paddingLeft: 40,
    display: "flex",
    justifyContent: "center",
    "& button" : {
      width: 179
    }
  },
});

const DialogActions = withStyles(stylesActions)((props: any) => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogActions className={classes.root} {...other}>
      {children}
    </MuiDialogActions>
  );
});

export default function CustomizedDialogs(props: any) {
  const {
    title,
    open,
    onSave,
    onClose,
    maxWidth,
    isLoading,
    fullWidth,
    ...other
  } = props;

  const handleClose = () => {
    onClose();
  };

  const save = () => {
    onSave();
  };

  return (
    <div>
      <Dialog
        {...other}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={(maxWidth && maxWidth) || "md"}
        fullWidth={fullWidth}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <React.Fragment>
            <div className="title">{title}</div>
          </React.Fragment>
        </DialogTitle>
        <DialogContent dividers>{props.children}</DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={save}
            isLoading={isLoading ? 1 : 0}
          >
            <FormattedMessage id="close" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CustomizedDialogs.defaultProps = {
  fullWidth: true,
};
