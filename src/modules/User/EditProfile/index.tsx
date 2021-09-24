import React, { FC, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";
import { Form, Formik } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { parse, format } from "date-fns";
import useStyles from "./styles";
import CardScreen from "@components/CardScreen";
import Button from "@components/Button";
import DatePicker from "@components/DatePicker";
import Switch from "@components/Switch";
import { CodeSharp, PersonOutline } from "@material-ui/icons";
import { Avatar, Divider, Box } from "@material-ui/core";
import TextField from "@components/TextField";
import { useRouter } from "next/router";
import CameraIcon from "@icons/Camera";
import { forOwn, get } from "lodash";
import { useUser } from "@hooks";
import Dialog from "@components/Dialog";
import Loading from "@components/Loading";
import PencilSimpleIcon from "@icons/PencilSimple";
import * as Yup from 'yup'
import EditAvatar from "./EditAvatar";
import { GET_FORM_DATAS, GET_USER_DATA } from "@modules/User/queries";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import {
 CHANGE_USER_THUMB,
 UPDATE_USER
} from "@modules/User/mutations";
import type {
  UserDataRepresentation,
  UserData
} from "@modules/User/types";

type EditProfileProps = {
  intl: IntlShape;
  classes: any;
};

export const StyledForm = withStyles(() => ({
  root: {
    padding: "24px 27% 44px 27%",
  },
}))((props: any) => <Form {...props} className={props.classes.root} />);

export const StyledFormElement = withStyles(() => ({
  root: {
    marginTop: 24,    
    "& .MuiFormControl-marginNormal input": {
      padding: "18.5px 11.5px 18.5px"
    },
    "&.No-top": {
      marginTop: 0
    }
  },
}))((props: any) => <Box className={`${props.classes.root} ${props.noTop ? "No-top" : ""}`}>{props.children}</Box>);

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

  const { loading, error, data, refetch } = useQuery<{
    getUserData: UserDataRepresentation
  }>(GET_USER_DATA);

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [thumbChanged, setThumbChanged] = useState("");
  const [thumbUpdated, setThumbUpdated] = useState("");
  const [current, setCurrent] = useState();
  const [user, thumb, {mutate, loading: loadingUser}] = useUser();  
  const router = useRouter();

  const [updateUser, {loading: loadingUpdateUser}] = useMutation(UPDATE_USER, {   
    refetchQueries: [{
      query: GET_USER_DATA     
    }],
    onCompleted: async ({updateUser} : {updateUser: any}) => {   
      if(updateUser) {                    
        dispatch(
          addMessage(
            intl.formatMessage({id: "profile.edit.success"})
          )
        );        
        mutate(null);  
        setEditModalOpen(false);  
      }        
    },
  });
  
  const initialValues: {[key: string]: any} = { profileeditform: {} };

  const fields: any[] = [];
  const schema: {[key: string]: any} = {};
  if (!loading && !error) {   

    forOwn(data?.getUserData?.fields, (value: UserData, key: string) => {
      if (["STRING", "NUMBER", "DATE", "CHECKBOX"].includes(value.type)) {  
        
        let yupObject;

        if(value.required) {
          yupObject = Yup
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
          yupObject = Yup
            .string();
          schema[value.name] = yupObject;
        }
        
        const currentValue = value.type === "DATE" && value.value 
        ? format(parse(value.value.replace(/BRST |BRT /, "").substring(4), "MMM dd HH:mm:ss yyyy", new Date()), "dd/MM/yyyy")
        : value.value;
                  
        initialValues.profileeditform[value.name] = currentValue;                                
        fields.push({
          name: `profileeditform.${value.name}`,
          label: value.label,
          defaultValue: currentValue,
          required: value.required,         
          value,
          editable: value.editable,
          yupObject,
          type: value.type === "STRING" ? "text" : value.type === "NUMBER" ? "number" : "text",
        });
      }
    });   
  }

  const formikUser = {
    initialValues: initialValues,
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

  const validationSchemaUser = Yup.object({
    profileeditform: Yup.object({
      ...schema
    })    
  });

  formikUser.validationSchema = validationSchemaUser; 
  
  const getFormikEdit = (field: any) => {

    const editSchema: {[key: string]: any} = {};
    editSchema[field.value.name] = field.yupObject;    
    
    const editValues: {[key: string]: any} = {profileeditform: {}};
    editValues.profileeditform[field.value.name] = field.defaultValue;

    const formikUserEdit = {
      initialValues: editValues,
      validationSchema: Yup.object({
        profileeditform: Yup.object({
          ...editSchema
        })    
      }),    
      onSubmit: (values: any, { resetForm } : { resetForm: any }) => {   
                            
        updateUser({
          variables: {
            payload: JSON.stringify([{
              name: current?.value?.name,
              value: values?.profileeditform[current?.value?.name]
            }])
          }
        });
        resetForm();
      },
      enableReinitialize: true,
    }; 

    return formikUserEdit;

  }  

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
      
      {current && editModalOpen &&

        <Formik
        {...(getFormikEdit(current))}
        render={(form: any) => {
                      
          const fieldValue = get(form.values.profileeditform, current?.name);
          let currentError = null;
          if(["DATE"].includes(current?.value?.displayType)) {                    
            currentError = (!form?.values?.profileeditform || !form?.values?.profileeditform[current?.name]) && form?.errors?.profileeditform && form?.errors?.profileeditform[current?.name];
          }

          return (
            <Dialog
              onClose={() => setEditModalOpen(false)}
              fullWidth={true}
              isValid={true}
              open={editModalOpen}
              title={intl.formatMessage({ id: "profile.edit" })}
              onSave={() => {                             
                form.submitForm();
              }}
            >                        
              {current?.value?.type != "DATE" && 
                <StyledFormElement noTop={true}>
                  <TextField
                    form={form}
                    {...current}
                    disabled={false}
                    value={fieldValue}               
                  />
                </StyledFormElement>
              }
              {current?.value?.type === "DATE" && 
              <StyledFormElement>
                <DatePicker
                  {...current}                 
                  value={fieldValue || current.defaultValue}                 
                  helperText={currentError}
                  error={Boolean(currentError) && !Boolean(form?.values[current?.name])}                                 
                  onChange={(date: string) => form.setFieldValue(current?.name, date, false)}
                />
              </StyledFormElement>
              }
            </Dialog>
          )
        }} />                  

      }            
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
                    <>
                      <div
                        className={`${classes.category}`}
                      >
                        <FormattedMessage id="profileedit.title" />
                      </div>
                      {fields.map((field: any, key: any) => {                        
                        const fieldValue = get(form.values.profileeditform, field.name);                                                                             
                        let currentError = null;
                        if(["DATE"].includes(field.value.displayType)) {                    
                          currentError = (!form?.values?.profileeditform || !form?.values?.profileeditform[field.name]) && form?.errors?.profileeditform && form?.errors?.profileeditform[field.name];
                        }                       

                        if(field.value.type === "CHECKBOX") {
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
                                disabled={true}                          
                                endAdornment={
                                  <InputAdornment position="end">
                                    {field.editable && (
                                    <div className={classes.editButton} onClick={() => {
                                      setCurrent(field);
                                      setEditModalOpen(true);
                                    }}>
                                      <PencilSimpleIcon />
                                    </div>)}
                                  </InputAdornment>
                                }
                              />
                            </StyledFormElement>                          
                          );
                        }                                     
                      })}
                    </>                    
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
