import React, { FC } from "react";
import { withStyles } from "@material-ui/core/styles";
import { injectIntl, IntlShape, FormattedMessage } from "react-intl";
import useStyles from "./styles";
import { Formik } from "formik";
import * as Yup from "yup";
import Box from "@material-ui/core/Box";
import TextField from "@components/TextField";
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
  CHANGE_EMAIL
} from "@modules/User/mutations";

import { TitleHierarchy } from "@components/TitlePage/types";

export const StyledFormElement = withStyles(() => ({
  root: {
    marginTop: 24,
  },
}))((props: any) => <Box className={props.classes.root}>{props.children}</Box>);

type ChangeEmailScreenProps = {
  intl: IntlShape;
  classes: any;
};

const validationSchema = Yup.object({
  changeemail: Yup.object({
    newEmail: Yup.string()      
      .required(
        <FormattedMessage id="changeemail.newEmail.required" />
      )
  }).required("Required"),
});

const ChangeEmail: FC<ChangeEmailScreenProps> = ({ classes, intl }) => {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, thumb, {mutate, loading: loadingUser}] = useUser();

  const initialValues = {
    changeemail: {
      newEmail: user?.personalEmail,
    },
  };

  const [changeEmail, {}] = useMutation(CHANGE_EMAIL, {    
    onCompleted: ({changeEmail}) => {   
      if(changeEmail) {
        dispatch(
          addMessage(
            <FormattedMessage id="changeemail.success" />
          )
        );       
      }        
    },
    onError: () => {
      dispatch(
        addMessage(
          intl.formatMessage({id: "changeemail.error"}),
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
      changeEmail({
        variables: {
          payload: JSON.stringify({
            personalEmail: values.changeemail.newEmail
          })
        }
      });
    },
  }; 

  const hierarchy: TitleHierarchy = {
    name: "profile",
    href: "/profile",
    children: [
      {
        name: "profile.changeemail"
      },
    ],
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
              title="profile.changeemail"              
              icon={<User height={24} width={24} />}
              onBack={() => router.push("/profile")}
              hierarchy={hierarchy}
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
                  {intl.formatMessage({ id: `changeemail.title` })}
                </div>
                <div className={classes.description}>
                  {intl.formatMessage({ id: `changeemail.description` })}
                </div>
              </div>
              <Divider />         
              <StyledForm className={classes.form}>
                <TextField 
                  key={`user-change-newEmail`} 
                  placeholder="changeemail.newemail.placeholder" 
                  form={form} 
                  name="changeemail.newEmail" />               
              </StyledForm>
            </CardScreen>
          )}          
        </>);
      }}
    />
  );
};

export default withStyles(useStyles)(injectIntl(ChangeEmail));
