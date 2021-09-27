import React, { FC } from "react";
import { withStyles } from "@material-ui/core/styles";
import { injectIntl, IntlShape, FormattedMessage } from "react-intl";
import useStyles from "./styles";
import { Formik } from "formik";
import { IMaskInput } from "react-imask";
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
  CHANGE_PHONE
} from "@modules/User/mutations";

import { TitleHierarchy } from "@components/TitlePage/types";

export const StyledFormElement = withStyles(() => ({
  root: {
    marginTop: 24,
  },
}))((props: any) => <Box className={props.classes.root}>{props.children}</Box>);

type ChangePhoneScreenProps = {
  intl: IntlShape;
  classes: any;
};

const initialValues = {
  changephone: {
    newPhone: "",
  },
};

const validationSchema = Yup.object({
  changephone: Yup.object({
    newPhone: Yup.string()    
      .min(11, <FormattedMessage id="changephone.newPhone.min.chars" />)  
      .required(
        <FormattedMessage id="changephone.newPhone.required" />
      )
  }).required("Required"),
});

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(00) 00000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
        unmask={true}
      />
    );
  },
);

const ChangePhone: FC<ChangePhoneScreenProps> = ({ classes, intl }) => {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, thumb, {mutate, loading: loadingUser}] = useUser();

  const [changePhone, {}] = useMutation(CHANGE_PHONE, {    
    onCompleted: ({changePhone}) => {   
      if(changePhone) {
        dispatch(
          addMessage(
            <FormattedMessage id="changephone.success" />
          )
        );       
      }        
    },
    onError: () => {
      dispatch(
        addMessage(
          intl.formatMessage({id: "changephone.error"}),
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
      changePhone({
        variables: {
          payload: JSON.stringify({
            mobilePhone: values.changephone.newPhone
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
        name: "profile.changephone"
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
              title="profile.changephone"              
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
                  {intl.formatMessage({ id: `changephone.title` })}
                </div>
                <div className={classes.description}>
                  {intl.formatMessage({ id: `changephone.description` })}
                </div>
              </div>
              <Divider />         
              <StyledForm className={classes.form}>
                <TextField 
                  key={`user-change-newPhone`} 
                  placeholder="changephone.newphone.placeholder" 
                  form={form} 
                  name="changephone.newPhone" 
                  inputComponent={TextMaskCustom as any}/>               
              </StyledForm>
            </CardScreen>
          )}          
        </>);
      }}
    />
  );
};

export default withStyles(useStyles)(injectIntl(ChangePhone));