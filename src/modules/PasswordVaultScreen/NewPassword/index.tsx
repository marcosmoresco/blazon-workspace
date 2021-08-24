import Dialog from "@components/Dialog";
import Divider from "@components/Divider";
import PasswordField from "@components/PasswordField";
import TextField from "@components/TextField";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import { useIntl } from "react-intl";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { GET_ENTRIES } from "@modules/PasswordVaultItem/queries";
import { SAVE_PASSWORD_VAULT } from "@modules/PasswordVaultScreen/mutations";

type NewPasswordProps = {
  open: boolean;
  onClose(): void;
  onSave(sucess: boolean): void;
};

const NewPassword: FC<NewPasswordProps> = ({ open, onClose, onSave }) => {
  const intl = useIntl();

  const [savePasswordVault, {}] = useMutation(SAVE_PASSWORD_VAULT, {
    refetchQueries: [
      {
        query: GET_ENTRIES,
      },
    ],
    onCompleted: ({ savePasswordVault }) => {      
      if (savePasswordVault) {
        onClose();
        onSave?.(true);
      }
    },
  });

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
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: any, {resetForm}:{resetForm: any}) => {      
      await savePasswordVault({
        variables: {
          ...values?.changePasswordForm,
        },
      });
      resetForm();
    },
  };

  return (
    <Formik
      {...formik}
      render={(form) => (
        <Dialog
          cancelButton={true}
          open={open}
          title={intl.formatMessage({
            id: "changepasswordform.dialog.title",
          })}
          isValid={true}
          onSave={() => {
            form.submitForm();
          }}
          onClose={onClose}
        >
          <Form className="modal">
            <div>
              <div className="modal-section">
                {intl.formatMessage({
                  id: "passwordVault.newpassword.info.title",
                })}
              </div>
              <div className="modal-description">
                {intl.formatMessage({
                  id: "passwordVault.newpassword.info.description",
                })}
              </div>
              <div className="pt32"></div>
            </div>

            <TextField form={form} name="changePasswordForm.name" />
            <div className="pt18"></div>
            <TextField form={form} name="changePasswordForm.description" />
            <div className="pb32 pt32">
              <Divider />
            </div>

            <div>
              <div className="modal-section">
                {intl.formatMessage({
                  id: "passwordVault.newpassword.access.title",
                })}
              </div>
              <div className="modal-description">
                {intl.formatMessage({
                  id: "passwordVault.newpassword.access.description",
                })}
              </div>
              <div className="pt32"></div>
            </div>
            <TextField form={form} name="changePasswordForm.username" />
            <div className="pt18"></div>
            <PasswordField form={form} name="changePasswordForm.password" />
          </Form>
        </Dialog>
      )}
    />
  );
};

export default NewPassword;
