import Loading from "@components/Loading";
import { makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import { injectIntl, IntlShape } from "react-intl";

const useStyles = makeStyles(() => ({
  root: {
    padding: 1,
    background: "#FFFFFF",
    borderRadius: 8,
    minHeight: "100%",
    margin: "0",
  },
  actions: {
    textAlign: "right",
    borderTop: "1px solid #E9E8EB",
    padding: "20px 20px",
    marginTop: 32,
  },
  separator: {
    borderBottom: "1px solid #E9E8EB",
    padding: 0,
    margin: 0,
  },
}));

type CardScreenProps = {
  intl: IntlShape;
  onBack?: () => void;
  title: string;
  subTitle?: string;
  actions?: React.ReactNode;
  icon: React.ReactNode;
  loading?: boolean;
};

const CardScreen: FC<CardScreenProps> = ({ children, actions, loading }) => {
  const classes = useStyles();

  return (
    <>
      {loading ? (
        <Loading type="blue" container={true} />
      ) : (
        <div className={classes.root}>
          <div className={classes.content}>{children}</div>
          {actions && <div className={classes.actions}>{actions}</div>}
        </div>
      )}
    </>
  );
};

CardScreen.defaultProps = {
  loading: false,
};

export default injectIntl(CardScreen);
