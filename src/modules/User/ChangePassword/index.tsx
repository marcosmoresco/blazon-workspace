import React, { FC } from "react";
import { withStyles } from "@material-ui/core/styles";
import { injectIntl, IntlShape, FormattedMessage } from "react-intl";
import useStyles from "./styles";
import { Formik } from "formik";
import * as Yup from "yup";
import Box from "@material-ui/core/Box";
import PasswordField from "@components/PasswordField";
import CardScreen from "@components/CardScreen";
import Button from "@components/Button";
import Loading from "@components/Loading";
import { Divider } from "@material-ui/core";
import User from "@icons/User";
import { useRouter } from "next/router";
import { StyledForm } from "../EditProfile";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import { useUser } from "@hooks";
import {
  CHANGE_USER_PASSWORD
} from "@modules/User/mutations";

export const StyledFormElement = withStyles(() => ({
  root: {
    marginTop: 24,
  },
}))((props: any) => <Box className={props.classes.root}>{props.children}</Box>);

type ChangePasswordScreenProps = {
  intl: IntlShape;
  classes: any;
};

const initialValues = {
  changePassword: {
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  },
};

const validationSchema = Yup.object({
  changePassword: Yup.object({
    currentPassword: Yup.string()
      .max(15, <FormattedMessage id="changepassword.password.chars" />)
      .required(
        <FormattedMessage id="changepassword.currentPassword.required" />
      ),
    newPassword: Yup.string()
      .max(15, <FormattedMessage id="changepassword.password.chars" />)
      .required(<FormattedMessage id="changepassword.newPassword.required" />),
    newPasswordConfirm: Yup.string()
      .max(15, <FormattedMessage id="changepassword.password.chars" />)
      .required(
        <FormattedMessage id="changepassword.repeatPassword.required" />
      )
      .oneOf([Yup.ref('newPassword'), null], <FormattedMessage id="changepassword.repeatPassword.invalid" />),
      
  }).required("Required"),
});

const ChangePassword: FC<ChangePasswordScreenProps> = ({ classes, intl }) => {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, thumb, {mutate, loading: loadingUser}] = useUser();

  const [changePassword, {}] = useMutation(CHANGE_USER_PASSWORD, {    
    onCompleted: ({changePassword}) => {   
      if(changePassword) {
        dispatch(
          addMessage(
            <FormattedMessage id="changepassword.success" />
          )
        );       
      }        
    },
    onError: () => {
      dispatch(
        addMessage(
          intl.formatMessage({id: "changepassword.error"}),
          "error"
        )
      );     
    }
  });

  const formik = {
    initialValues,
    validationSchema,
    enableReinitialize: true,
    isInitialValid: false,
    onSubmit: (values: any) => {      
      changePassword({
        variables: values.changePassword
      });
    },
  }; 

  return (
    <Formik
      {...formik}
      render={(form) => {
        return (
        <>
          {loadingUser && (
            <Loading container/> 
          )}
          {!loadingUser && (
            <CardScreen
              title="profile"
              subTitle="changepassword.header.title"
              icon={<User height={24} width={24} />}
              onBack={() => router.push("/profile")}
              actions={
                <div>
                  <Button
                    type="submit"
                    onClick={form.submitForm}
                    color="primary"
                    variant="contained"
                    disabled={!form?.isValid}
                  >
                    {intl.formatMessage({ id: "save" })}
                  </Button>
                </div>
              }
            >
              <div className={classes.header}>
                <div className={classes.title}>
                  {intl.formatMessage({ id: `changepassword.title` })}
                </div>
                <div className={classes.description}>
                  {intl.formatMessage({ id: `changepassword.description` })}
                </div>
              </div>
              <Divider />         
              <StyledForm className={classes.form}>
                <PasswordField key={`user-change-password-currentPassword`} placeholder="changepassword.currentpassword.placeholder" form={form} name="changePassword.currentPassword" />
                <StyledFormElement>
                  <PasswordField key={`user-change-password-newPassword`} placeholder="changepassword.newpassword.placeholder" form={form} name="changePassword.newPassword" />
                </StyledFormElement>
                <StyledFormElement>
                  <PasswordField key={`user-change-password-newPasswordConfirm`} placeholder="changepassword.newpasswordconfirm.placeholder" form={form} name="changePassword.newPasswordConfirm" />
                </StyledFormElement>
              </StyledForm>
            </CardScreen>
          )}          
        </>);
      }}
    />
  );
};

export default withStyles(useStyles)(injectIntl(ChangePassword));
