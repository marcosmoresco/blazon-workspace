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
import { useCart } from "@requestCart/index";

// components
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MinusCircleIcon from "@icons/MinusCircle";
import Status from "./Status";
import Button from "@components/Button";
import DatePicker from "@components/DatePicker";
import Switch from "@components/Switch";
import UserThumb from "@components/UserThumb";
import TextField from "@components/TextField";
import { addMessage } from "@actions/index";
import { useUser } from "@hooks";

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
  UserBottomArea,
  Category,
  DateType,
} from "./styles";
import { CheckOutlined } from "@material-ui/icons";

//types
import { CheckouitemIstanceProps } from "./types";

//constants
import { findItemByCatalogItemId } from "./constants";

//queries
import { GET_FORM_DATAS } from "@modules/Checkout/queries";
import { GET_SELF_SERVICE_CART } from "@requestCart/queries";

//mutations
import { UPDATE_SELF_SERVICE_CART_ITEM_INSTANCE } from "@modules/Checkout/mutations";

const UserCard: React.FC<CheckouitemIstanceProps> = ({
  instance,
  index,
  item,
  onDelete,
  onAdd,
  onAddItem,
  onDeleteItem,
  onUpdateItem,
}) => {

  const dispatch = useDispatch();
  const intl = useIntl(); 
  const { cart } = useCart();
  const [ user ] = useUser();

  const [updateSelfServiceCartItemInstance, {}] = useMutation(UPDATE_SELF_SERVICE_CART_ITEM_INSTANCE, {   
    refetchQueries: [
      {
        query: GET_SELF_SERVICE_CART,
      },
    ],
    onCompleted: ({updateSelfServiceCartItemInstance}) => {   
      if(updateSelfServiceCartItemInstance) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "checkout.item.instance.updated.success"})
          )
        );       
      }        
    },
  });

  let initialValues: {[key: string]: any} = {};

  if(instance.payload) {
    const payload = JSON.parse(instance.payload);   
    initialValues = {
      instance: payload?.additionalFields
    };   
  }

  const [formik, setFormik] = useState({  
    render: false,  
    validationSchema: {},
    initialValues,
    enableReinitialize: true,
    isInitialValid: false,
    onSubmit: (values: any) => {
      const variables = {
        itemId: item.identifier,
        identifier: instance.identifier,
        payload: JSON.stringify(values?.instance || {})
      }
      updateSelfServiceCartItemInstance({
        variables
      });
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
            Object.keys(formNewEntry.attributes).map((category: any, index: number) => {
              formNewEntry.attributes[category].forEach((attribute: any) => {                
                if(["STRING", "TEXTAREA", "DATE"].includes(attribute.displayType)) {

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
                } else if (attribute.displayType === "CHECKBOX") {
                  const yupObject = Yup
                  .bool();                     
                  schema[attribute.name] = yupObject;
                }                                
              });
            });           

            const validationSchema = Yup.object({
              instance: Yup.object({
                ...schema
              })    
            });

            formik.validationSchema = validationSchema;           
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
        {["TO_ME_AND_TO", "TO"].includes(item?.assignType) && Number(instance.userId) !== user?.identifier && (
        <IconSpace onClick={onDelete}>
          <MinusCircleIcon width={24} height={24} className="classes.root" />
        </IconSpace>)}
      </UserCardTitle>
      <Line />
      {(instance.schemaValidatedError.status ||
       instance.alreadyRequestInProgressError.status || 
       instance.accessAlreadyExistError.status || 
       instance.adminAccountLockedError.status || 
       instance.needExpirationDateError.status || 
       instance.needSelectAccountError.status || 
       instance.relatedAccountNotFoundError.status ) && (
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
            {instance.relatedAccountNotFoundError.status && (
              <div>
                -{" "}
                <FormattedMessage 
                  id="checkout.item.invalid.relatedAccountNotFoundError" 
                  values={{ 
                    resourceName: instance.relatedAccountNotFoundError.relatedCatalogItemName,
                    link: <b 
                          className="pointer" 
                          onClick={() => {
                            const isLoggedUser = Number(instance.userId) === user.identifier;
                            const currentItem = findItemByCatalogItemId(instance.relatedAccountNotFoundError.relatedCatalogItemId, cart);
                            let updateAssignType = null;
                            if(currentItem) {
                              updateAssignType = isLoggedUser ? "TO_ME_AND_TO" : (currentItem.assignType === "TO_ME" ? "TO_ME_AND_TO" : "TO"); 
                            }                            
                            if(item.instances.length <= 1) {                              
                              onDeleteItem();
                              if(!currentItem) {
                                onAddItem(instance.relatedAccountNotFoundError.relatedCatalogItemId, instance.userId, isLoggedUser);
                              } else {
                                onUpdateItem(item.identifier, updateAssignType);
                                if(!isLoggedUser) {
                                  onAdd(currentItem.identifier, instance.userId);
                                }                                
                              }
                            } else {                              
                              if( item.assignType === "TO_ME_AND_TO" && isLoggedUser ) {
                                onUpdateItem(item.identifier, "TO");
                              }
                              onDelete(true);
                              if(currentItem) {
                                onAddItem(instance.relatedAccountNotFoundError.relatedCatalogItemId, instance.userId, isLoggedUser);
                              } else {
                                onUpdateItem(item.identifier, updateAssignType);
                                if(!isLoggedUser) {
                                  onAdd(currentItem.identifier, instance.userId);
                                }
                              }
                            }
                          }}>
                            {intl.formatMessage({id: "checkout.item.invalid.relatedAccountNotFoundError.here"})}
                          </b>,
                  }}
                />              
              </div>
            )}
          </TextArea>
          <Status
            notification={<FormattedMessage id="checkout.item.invalid.title" />}
          />
        </Observation>
      </ObservationArea>)}
      
      {formDatas && formik.render && (
        <Formik
          {...formik}
          render={(form) => {
          return (Object.keys(formDatas).map((category: any, index: number) => (
            <div key={`form-datas-category-${index}`}>
              <Form>
                <Category>{category}</Category>
                {formDatas[category].map((attribute: any) => {                 
                  
                  const fieldValue = get(form.values.instance, attribute.name);                                                      
                  let currentError = null;
                  if(["DATE"].includes(attribute.displayType)) {                    
                    currentError = (!form?.values?.instance || !form?.values?.instance[attribute.name]) && form?.errors?.instance && form?.errors?.instance[attribute.name];
                  }                  

                  return (
                  <div key={`form-datas-attribute-${index}-${attribute.position}`}>
                    <AddDados>                                     
                      {["STRING", "TEXTAREA", "NUMBER"].includes(attribute.displayType) && (
                      <TextField
                        form={form}
                        label={attribute.label}
                        type={attribute.displayType === "NUMBER" ? "number" : "text"}
                        name={"instance." + attribute.name}
                        required={attribute.required}
                        disabled={!attribute.writable}
                        value={fieldValue}
                        key={index}  
                        multiline={"TEXTAREA" === attribute.displayType} 
                        rows={"TEXTAREA" === attribute.displayType ? 3 : 0}                   
                      />)}
                      {["DATE"].includes(attribute.displayType) && (
                        <DateType>
                          <DatePicker
                            label={attribute.label}
                            key={index}
                            helperText={currentError}
                            error={Boolean(currentError) && !Boolean(form?.values?.instance[attribute.name])}
                            name={"instance." + attribute.name}                            
                            value={fieldValue}
                            onChange={(date: string) => form.setFieldValue("instance." + attribute.name, date, false)}
                          />
                        </DateType>                        
                      )}
                      {["CHECKBOX"].includes(attribute.displayType) && (
                        <Switch
                          label={attribute.label}
                          value={fieldValue}
                          checked={fieldValue}
                          onChange={(val: any) => form.setFieldValue("instance." + attribute.name, val, false)}
                          name={"instance." + attribute.name}
                          lab
                          color="primary"
                        />                                              
                      )}
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
