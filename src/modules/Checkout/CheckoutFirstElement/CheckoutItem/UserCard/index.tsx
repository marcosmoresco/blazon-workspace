// venders
import React, { useState } from "react";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { getLink } from "@utils/index";
import { Form, Formik, withFormik, useFormikContext } from "formik";
import { useMutation } from "@apollo/client";
import apolloClient from "@utils/apollo-client";
import * as Yup from "yup";
import { get } from "lodash";
import { useDispatch } from "react-redux";

// components
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MinusCircleIcon from "@icons/MinusCircle";
import Status from "./Status";
import Button from "@components/Button";
import Checkbox from "@components/Checkbox";
import UserThumb from "@components/UserThumb";
import TextField from "@components/TextField";
import { addMessage } from "@actions/index";

// styles
import {
  UserCardStyle,
  UserCardTitle,
  UserId,
  UserPosition,
  Line,
  IconSpace,
  ObservationArea,
  Observation,
  TextArea,
  Text,
  AddDados,
  TextDescription,
  UserBottomArea,
  Category,
} from "./styles";
import { CheckOutlined } from "@material-ui/icons";

//types
import { CheckouitemIstanceProps } from "./types";

//queries
import { GET_FORM_DATAS } from "@modules/Checkout/queries";

//mutations
import { UPDATE_SELF_SERVICE_CART_ITEM_INSTANCE } from "@modules/Checkout/mutations";

const UserCard: React.FC<CheckouitemIstanceProps> = ({
  instance,
  index,
  item,
}) => {

  const dispatch = useDispatch();
  const intl = useIntl();
  const router = useRouter();

  const [updateSelfServiceCartItemInstance, {}] = useMutation(UPDATE_SELF_SERVICE_CART_ITEM_INSTANCE, {   
    onCompleted: ({updateSelfServiceCartItemInstance}) => {   
      if(updateSelfServiceCartItemInstance) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "profile.edit.avatar.success"})
          )
        );       
      }        
    },
  });

  const [formik, setFormik] = useState({  
    render: false,  
    validationSchema: {},
    initialValues: {},
    enableReinitialize: true,
    isInitialValid: false,
    onSubmit: (values: any) => {
      alert("submit")
      console.log(values);
    },
  });
  
  const [formDatas, setFormDatas] = useState<{[key: string]: any}>();

  if (item?.catalogItemType === "RESOURCE" && !formDatas) {
    apolloClient
      .query({
        query: GET_FORM_DATAS,
        variables: {
          schema: "ACCOUNT",
          resourceId: Number(item?.targetId),
        },
      })
      .then(({ data }) => {
        if(data?.getNewEntry) {
          const formNewEntry = JSON.parse(data?.getNewEntry);
          const attributes = Object.keys(formNewEntry.attributes);                          
          if(attributes.length) {  
            const schema: {[key: string]: any} = {};  
            const initialValues: {[key: string]: any} = {};                   
            Object.keys(formNewEntry.attributes).map((category: any, index: number) => {
              formNewEntry.attributes[category].forEach((attribute: any) => {
                initialValues[attribute.name] = attribute.value; 
                if(["STRING", "DATE"].includes(attribute.displayType)) {

                  if(attribute.required) {
                    const yupObject = Yup
                      .string()
                      .required(
                        intl.formatMessage({
                          id: "isRequired"                      
                        }, {
                          field: attribute.label
                        })
                      ); 
                    schema[attribute.name] = yupObject;   
                  } else {
                    const yupObject = Yup
                      .string();                     
                    schema[attribute.name] = yupObject;
                  } 
                                                               
                } else if (attribute.displayType === "NUMBER") {                 

                  if(attribute.required) {
                    const yupObject = Yup
                    .number()
                    .required(
                      intl.formatMessage({
                        id: "isRequired"                      
                      }, {
                        field: attribute.label
                      })
                    ); 
                  } else {
                    const yupObject = Yup
                      .number();                     
                    schema[attribute.name] = yupObject;
                  }                  
                }                                 
              });
            });           

            const validationSchema = Yup.object({
              instance: Yup.object({
                ...schema
              })    
            });

            formik.validationSchema = validationSchema;
            formik.initialValues = {
              instance: {
                ...initialValues
              }
            };
            formik.render = true;
                 
            setFormik(formik);
            setFormDatas(formNewEntry.attributes);                   
          }
        }        
      });
  }

  return (
    <UserCardStyle>
      <UserCardTitle>
        <UserId>
          <UserThumb image={getLink("thumb", instance?.links || [])} />
          <div>
            <div>
              <span><FormattedMessage id="checkout.access"/> {index}</span>
            </div>
            <div>
              <UserPosition>{instance.displayName || " - "}</UserPosition>
            </div>
          </div>
        </UserId>
        <IconSpace>
          <MinusCircleIcon width={24} height={24} className="classes.root" />
        </IconSpace>
      </UserCardTitle>
      <Line />
      <ObservationArea>
        <Observation>
          <TextArea>
            <span>
              <FormattedMessage id="checkout.item.invalid.subTitle" />
            </span>
            {instance.schemaValidatedError.status && (
              <div>
                -{" "}
                <FormattedMessage id="checkout.item.invalid.schemaValidatedError" />
              </div>
            )}
            {instance.alreadyRequestInProgressError.status && (
              <div>
                -{" "}
                <FormattedMessage id="checkout.item.invalid.alreadyRequestInProgressError" />
              </div>
            )}
            {instance.accessAlreadyExistError.status && (
              <div>
                -{" "}
                <FormattedMessage id="checkout.item.invalid.accessAlreadyExistError" />
              </div>
            )}
            {instance.adminAccountLockedError.status && (
              <div>
                -{" "}
                <FormattedMessage id="checkout.item.invalid.adminAccountLockedError" />
              </div>
            )}
            {instance.needExpirationDateError.status && (
              <div>
                -{" "}
                <FormattedMessage id="checkout.item.invalid.needExpirationDateError" />
              </div>
            )}
            {instance.needSelectAccountError.status && (
              <div>
                -{" "}
                <FormattedMessage id="checkout.item.invalid.needSelectAccountError" />
              </div>
            )}
          </TextArea>
          <Status
            notification={<FormattedMessage id="checkout.item.invalid.title" />}
          />
        </Observation>
      </ObservationArea>
      
      {formDatas && formik.render && (
        <Formik
          {...formik}
          render={(form) => {
          return (Object.keys(formDatas).map((category: any, index: number) => (
            <div key={`form-datas-category-${index}`}>
              <Form>
                <Category>{category}</Category>
                {formDatas[category].map((attribute: any) => {
                  
                  const fieldValue = get(form.values, attribute.name);                                 

                  return (
                  <div key={`form-datas-attribute-${index}-${attribute.position}`}>
                    <AddDados>                                     
                      <TextField
                        form={form}
                        label={attribute.label}
                        name={"instance." + attribute.name}
                        required={attribute.required}
                        disabled={!attribute.writable}
                        value={fieldValue}
                        key={index}                      
                      />
                    </AddDados>
                  </div>              
                )})}     
                <Line className="Add-top"/>         
                <UserBottomArea>
                  <Button                    
                    variant="contained"
                    color="primary"
                    onClick={() => form.submitForm()}
                  >
                    <FormattedMessage id="checkout.save" />
                  </Button>
                </UserBottomArea>
              </Form>                                  
            </div>          
          )))
        }} />                     
      )}
      
      {!formDatas && <Line className="Add-top"/>}      
    </UserCardStyle>
  );
};

export default UserCard;
