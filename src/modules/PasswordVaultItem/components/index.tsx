import React, { FC, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "../../../components/TextField";
import type { PasswordVaultProps, PasswordVaultType } from "./types";
import { useQuery } from "@apollo/client";
import useStyles from "./styles";
import { Formik } from "formik";
import PasswordField from "@components/PasswordField";
import { useIntl } from "react-intl";
import { useTheme, themes } from "@theme/index";
import Dialog from "@components/Dialog";
import Divider from "@components/Divider";
import Loading from "@components/Loading";
import KeyIcon from "@icons/Key";
import { useUser } from "@hooks";
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
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };
  const [user] = useUser();
  const [modify, setModify] = useState<string>();

  const { loading, error, data, refetch } = useQuery<{
    getPasswordVault: PasswordVaultType;
  }>(GET_PASSWORD_VAULT_ENTRY, {
    variables: {
      id: Number(passwordVault.identifier)
    },
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    if(!modify && passwordVault && user) {
      const filtered = passwordVault.permissions.filter((permission: any) => Number(permission.user.identifier) === user.identifier);
      if(filtered.length) {
        setModify("YES");
      } else {
        setModify("NO");
      }
    }
  }, [modify, passwordVault, user]);

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
      changePasswordForm: data?.getPasswordVaultEntry || initialValues,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values: any) => {        
      onSave(values?.changePasswordForm);
    }   
  };

  return (
    <Formik
      {...formik}
      render={(form) => (
        <Dialog
          onClose={() => onClose(passwordVault)}
          open={open}
          title={passwordVault.name}
          saveLabel={intl.formatMessage({ id: "save" })}
          cancelButton={true}
          onSave={() => {   
            console.log(form)         
            form.submitForm();
          }}
          isValid={true}
          noActions={!modify}
        >
          <div className={`${classes.root} modal`}>
            <div className={classes.passwordVaultCardContent}>
              <div className={classes.passwordVaultCardContentHeader}>
                <div className={classes.passwordVaultCardContentHeaderIcon}>
                  <KeyIcon width={44} height={44} color={currentTheme.palette.primary.main || "#3174F6"} stroke={2}/>
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
                  name="changePasswordForm.name"
                  className={classes.margin}
                  disabled={!modify}
                />
                <div className="pt18"></div>
                <TextField
                  name="changePasswordForm.description"
                  className={classes.margin}
                  disabled={!modify}
                />
                <div className="pt18"></div>
                <TextField
                  name="changePasswordForm.username"
                  className={classes.margin}
                  disabled={!modify}
                />
                <div className="pt18"></div>
                <PasswordField
                  name="changePasswordForm.password"
                  className={classes.margin}
                  disabled={!modify}
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
