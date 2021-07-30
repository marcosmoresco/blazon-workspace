import React, { Component, FC } from "react";
import { withStyles } from "@material-ui/core/styles";
import Image from "next/image";
import X from "../../../icons/X";
import Instagram from "./images/instagram.svg";
import TextField from "../../../components/TextField";
import type { PasswordVaultProps, PasswordVaultType } from "./types";
import { useQuery } from "@apollo/client";
import useStyles from "./styles";
import { Formik } from "formik";
import PasswordField from "@components/PasswordField";
import { useIntl } from "react-intl";
import Dialog from "@components/Dialog";
import Divider from "@components/Divider";
import Loading from "@components/Loading";
import KeyIcon from "@icons/Key";
import * as Yup from "yup";
import { GET_PASSWORD_VAULT_ENTRY } from "@modules/PasswordVaultItem/queries";

const PasswordVault: FC<PasswordVaultProps> = ({
  classes,
  open,
  passwordVault,
  onClose,
  onSave,
}) => {
  const intl = useIntl();

  const { loading, error, data, refetch } = useQuery<{
    getPasswordVault: PasswordVaultType;
  }>(GET_PASSWORD_VAULT_ENTRY, {
    variables: {
      id: Number(passwordVault.identifier)
    },
  });

  if(loading) {
    return (
      <Loading />
    )
  }

  const initialValues = {
    changePasswordForm: {
      name: "",
      description: "",
      username: "",
      password: "",
    },
  };

  const validationSchema = Yup.object({
    changePasswordForm: Yup.object({
      name: Yup.string().required(
        intl.formatMessage(
          {
            id: "isRequired",
          },
          {
            field: intl.formatMessage({ id: "name" }),
          }
        )
      ),
      description: Yup.string(),
      username: Yup.string().required(
        intl.formatMessage(
          {
            id: "isRequired",
          },
          {
            field: intl.formatMessage({ id: "username" }),
          }
        )
      ),
      password: Yup.string().required(
        intl.formatMessage(
          {
            id: "isRequired",
          },
          {
            field: intl.formatMessage({ id: "password" }),
          }
        )
      ),
    }).required("Required"),
  });

  const formik = {
    initialValues: {
      passwordVaultForm: data?.getPasswordVaultEntry || initialValues,
    },
    validationSchema,
    handleSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
    enableReinitialize: true,
  };

  return (
    <Formik
      {...formik}
      render={({ values }) => (
        <Dialog
          onClose={() => onClose(passwordVault)}
          open={open}
          title={passwordVault.name}
          saveLabel={intl.formatMessage({ id: "save" })}
          cancelButton={true}
          onSave={onSave}
          isValid={true}
          noActions
        >
          <div className={`${classes.root} modal`}>
            <div className={classes.passwordVaultCardContent}>
              <div className={classes.passwordVaultCardContentHeader}>
                <div className={classes.passwordVaultCardContentHeaderIcon}>
                  <KeyIcon width={44} height={44} color="#3174F6" />
                </div>                
              </div>

              <div className="pt32"></div>
              <div>
                <div className="modal-section">
                  {intl.formatMessage({
                    id: "passwordvault.modal.info.title",
                  })}
                </div>
                <div className="modal-description">
                  {intl.formatMessage({
                    id: "passwordvault.modal.info.description",
                  })}
                </div>
                <div className="pt32"></div>
              </div>
              <form>
                <TextField
                  name="passwordVaultForm.username"
                  className={classes.margin}
                  disabled
                />
                <div className="pt18"></div>
                <PasswordField
                  name="passwordVaultForm.password"
                  className={classes.margin}
                  disabled
                />
                <Divider className={classes.divider} />
              </form>
            </div>
          </div>
        </Dialog>
      )}
    />
  );
};

export default withStyles(useStyles)(PasswordVault);
