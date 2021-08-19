import React, { FC, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { injectIntl, IntlShape } from "react-intl";
import { Form, Formik } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { parse, format } from "date-fns";
import useStyles from "./styles";
import CardScreen from "@components/CardScreen";
import Button from "@components/Button";
import DatePicker from "@components/DatePicker";
import Switch from "@components/Switch";
import { PersonOutline } from "@material-ui/icons";
import { Avatar, Divider, Box } from "@material-ui/core";
import TextField from "@components/TextField";
import { useRouter } from "next/router";
import CameraIcon from "@icons/Camera";
import { forOwn, get } from "lodash";
import { useUser } from "@hooks";
import Dialog from "@components/Dialog";
import Loading from "@components/Loading";
import * as Yup from 'yup'
import EditAvatar from "./EditAvatar";
import { GET_FORM_DATAS } from "@modules/User/queries";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import {
 CHANGE_USER_THUMB,
 UPDATE_USER
} from "@modules/User/mutations";

type EditProfileProps = {
  intl: IntlShape;
  classes: any;
};

export const StyledForm = withStyles(() => ({
  root: {
    padding: "24px 27%",
  },
}))((props: any) => <Form {...props} className={props.classes.root} />);

export const StyledFormElement = withStyles(() => ({
  root: {
    marginTop: 24,    
  },
}))((props: any) => <Box className={props.classes.root}>{props.children}</Box>);

const EditProfile: FC<EditProfileProps> = ({ classes, intl }) => {

  const dispatch = useDispatch();

  const [changeUserThumb, {}] = useMutation(CHANGE_USER_THUMB, {   
    onCompleted: ({changeUserThumb} : {changeUserThumb: any}) => {   
      if(changeUserThumb) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "profile.edit.avatar.success"})
          )
        );  
        setThumbUpdated(thumbChanged);                   
        setModalOpen(false);
      }        
    },
  });  

  const { loading, error, data, refetch } = useQuery(GET_FORM_DATAS, {
    variables: {
      entryId: 1,
      schema: "USER",
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [thumbChanged, setThumbChanged] = useState("");
  const [thumbUpdated, setThumbUpdated] = useState("");

  const [user, thumb, {mutate, loading: loadingUser}] = useUser();  
  const router = useRouter();

  const [updateUser, {loading: loadingUpdateUser}] = useMutation(UPDATE_USER, {   
    refetchQueries: [ {
      query: GET_FORM_DATAS,
      variables: {
        entryId: user?.identifier,
        schema: "USER",      
      },
    }],
    onCompleted: async ({updateUser} : {updateUser: any}) => {   
      if(updateUser) {                    
        dispatch(
          addMessage(
            intl.formatMessage({id: "profile.edit.success"})
          )
        );        
        mutate(null);    
      }        
    },
  });

  const formikUser = {
    initialValues: { profileeditform: user },
    validationSchema: {},
    onSubmit: (values: any, { resetForm } : { resetForm: any }) => {   
      const payload = values.profileeditform;
      delete payload.links;    
      updateUser({
        variables: {
          payload: JSON.stringify(payload)
        }
      });  
      resetForm();
    },
    enableReinitialize: true,
  };

  const categorizedFields = {} as any;
  const schema: {[key: string]: any} = {}; 
  if (!loading && !error) {
    const formData = JSON.parse(data?.getModifyEntry);

    forOwn(formData?.attributes, function (categoryValue, categoryKey) {
      categorizedFields[categoryKey] = [] as any;

      forOwn(categoryValue, function (value, key) {
        if (["STRING", "NUMBER", "DATE", "CHECKBOX"].includes(value.displayType)) {                           
          categorizedFields[categoryKey].push({
            name: `profileeditform.${value.name}`,
            label: value.label,
            defaultValue:
              value.displayType === "DATE" && value.value 
                ? format(parse(value.value.replace(/BRST |BRT /, "").substring(4), "MMM dd HH:mm:ss yyyy", new Date()), "dd/MM/yyyy")
                : value.value,
            required: value.required,
            disabled: !value.writable,
            value,
            type: value.displayType === "STRING" ? "text" : value.displayType === "NUMBER" ? "number" : "text",
          });
          if(value.required) {
            const yupObject = Yup
              .string()
                .required(
                  intl.formatMessage({
                    id: "isRequired"                      
                  }, {
                    field: value.label
                  })
                ); 
            schema[value.name] = yupObject; 
          } else {
            const yupObject = Yup
              .string();
            schema[value.name] = yupObject;
          }          
        }
      });
    });
  }

  const validationSchemaUser = Yup.object({
    profileeditform: Yup.object({
      ...schema
    })    
  });

  formikUser.validationSchema = validationSchemaUser;  

  return (
    <>
      <Dialog
        onClose={() => setModalOpen(false)}
        fullWidth={false}
        isValid={true}
        open={modalOpen}
        title={intl.formatMessage({ id: "profile.edit.avatar.dialog" })}
        onSave={() => {
          changeUserThumb({
            variables: {
            thumb: thumbChanged || thumb
          }})
        }}
      >
        <EditAvatar onCrop={(t: string) => setThumbChanged(t)}/>
      </Dialog>           
      <Formik
        {...formikUser}
        render={(form: any) => {
          return (
            <>
              {(loading || loadingUser) && (
                <Loading container/> 
              )}
              {(!loading && !loadingUser) && (
                <CardScreen
                  loading={!user}
                  title="profile"
                  subTitle="profileedit.title"
                  icon={<PersonOutline />}
                  onBack={() => router.push("/profile")}
                  actions={
                    <div>
                      <Button
                        onClick={() => {
                          form.submitForm();                       
                        }}
                        color="primary"
                        variant="contained"
                        isLoading={loadingUpdateUser ? 1 : 0}
                      >
                        {intl.formatMessage({ id: "save" })}
                      </Button>
                    </div>
                  }
                >
                  <div className={classes.header}>
                    <div className={classes.title}>
                      {intl.formatMessage({ id: `profileedit.title` })}
                    </div>
                    <div className={classes.description}>
                      {intl.formatMessage({ id: `profileedit.description` })}
                    </div>
                  </div>
                  <Divider />

                  <div className={classes.userHeader}>
                    <div className={classes.userHeaderBg}>
                      <div
                        className={`${classes.avatarAction} pointer`}
                        onClick={() => setModalOpen(true)}
                      >
                        <CameraIcon />
                      </div>
                      <Avatar src={thumbUpdated || thumb} className={classes.avatar}></Avatar>
                    </div>
                  </div>

                  <StyledForm className={classes.formControl}>
                    {Object.keys(categorizedFields).map((key, index) => (
                      <>
                        <div
                          className={`${classes.category} ${
                            (index > 0 && "Top") || ""
                          }`}
                        >
                          {key}
                        </div>
                        {categorizedFields[key].map((field: any, key: any) => {
                          const fieldValue = get(form.values.profileeditform, field.name);                                                                             
                          let currentError = null;
                          if(["DATE"].includes(field.value.displayType)) {                    
                            currentError = (!form?.values?.profileeditform || !form?.values?.profileeditform[field.name]) && form?.errors?.profileeditform && form?.errors?.profileeditform[field.name];
                          }                       

                          if (field.value.displayType === "DATE") {
                            return (
                              <StyledFormElement>
                                <DatePicker
                                  {...field}
                                  key={key}
                                  value={fieldValue || field.defaultValue}
                                  onChange={(value: string) => console.log(value)}
                                  helperText={currentError}
                                  error={Boolean(currentError) && !Boolean(form?.values?.profileeditform[field.name])}                                 
                                  onChange={(date: string) => form.setFieldValue("profileeditform." + field.name, date, false)}
                                />
                              </StyledFormElement>                          
                            );
                          } else if(field.value.displayType === "CHECKBOX") {
                            return (
                            <StyledFormElement>
                              <Switch  
                                {...field}  
                                key={key}                                          
                                value={fieldValue || field.defaultValue}                                   
                              />
                            </StyledFormElement>                        
                            );
                          } else {
                            return (
                              <StyledFormElement>
                                <TextField
                                  form={form}
                                  {...field}
                                  value={fieldValue}
                                  key={key}
                                  placeholder="profileeditform.field.placeholder"
                                />
                              </StyledFormElement>                          
                            );
                          }                                     
                        })}
                      </>
                    ))}
                  </StyledForm>
                </CardScreen>  
              )}           
            </>
          );
        }}
      />
    </>
  );
};

export default withStyles(useStyles)(injectIntl(EditProfile));
