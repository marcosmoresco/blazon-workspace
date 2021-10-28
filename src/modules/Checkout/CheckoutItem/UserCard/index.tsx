// venders
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { getLink, getSelfServiceAttributeValue } from "@utils/index";
import { Form, Formik, withFormik, useFormikContext } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import apolloClient from "@utils/apollo-client";
import * as Yup from "yup";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { useCart } from "@requestCart/index";
import { IMaskInput } from 'react-imask';
import axios from "axios";

// components
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Loading from "@components/Loading";
import MinusCircleIcon from "@icons/MinusCircle";
import Status from "./Status";
import Autocomplete from "@components/Autocomplete";
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
import { SelfService } from "@portal/Search/types";

//constants
import { findItemByCatalogItemId } from "./constants";

//queries
import { GET_SELF_SERVICE_ITEM, SEARCH_ITEMS } from "@portal/Search/queries";
import { GET_SELF_SERVICE_CART } from "@requestCart/queries";
import { GET_FORM_DATAS, GET_APPLICATION_ACCOUNTS_BY_ENTITLEMENT, FORM_RENDER } from "@modules/Checkout/queries";

//mutations
import { UPDATE_SELF_SERVICE_CART_ITEM_INSTANCE, VALIDATE_FORM_FIELD } from "@modules/Checkout/mutations";


interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { mask, onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask}            
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
        unmask={true}
      />
    );
  },
);


const UserCard: React.FC<CheckouitemIstanceProps> = ({
  instance,
  index,
  item,
  onDelete,
  onAdd,
  onAddItem,
  onDeleteItem,
  onUpdateItem,
  loadingDeleteItemInstance
}) => {
  
  const dispatch = useDispatch();
  const intl = useIntl(); 
  const { cart } = useCart();
  const [ user ] = useUser();

  const [validateFormField, {}] = useMutation(VALIDATE_FORM_FIELD);

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
  

  const { loading, error, data, refetch } = useQuery<{
    getSelfServiceItem: SelfService;
  }>(GET_SELF_SERVICE_ITEM, {
    variables: {
      id: item?.catalogItemId,
    },
  });

  let initialValues: {[key: string]: any} = {
    instance: {}
  };

  if(instance.payload) {  
    initialValues = {
      instance: JSON.parse(instance.payload)
    };   
  }

  const [formik, setFormik] = useState({  
    render: false,  
    validationSchema: {},
    initialValues,
    enableReinitialize: true,
    isInitialValid: false,
    onSubmit: (values: any) => {    
      
      let expireAt = values?.instance?.expireAt;
      let accountId = values?.instance?.accountId && Number(values?.instance?.accountId) || null;
      const payload = {...values?.instance};
      delete payload.expireAt;
      delete payload.accountId;

      const variables = {
        itemId: item.identifier,
        identifier: instance.identifier,
        payload: JSON.stringify(payload),
        expireAt,
        accountId
      }

      updateSelfServiceCartItemInstance({
        variables
      });
    },
  });
  
  const [formDatas, setFormDatas] = useState<{[key: string]: any}>();  

  if(["USER", "RESOURCE"].includes(item?.catalogItemType) && !formDatas) {
    const formId = getSelfServiceAttributeValue("formId", data?.getSelfServiceItem?.attributes || []);
        
    if(formId) {
      apolloClient
        .query({
          query: FORM_RENDER,
          variables: {          
            formId: Number(formId)      
          },
        })
        .then(async ({ data }) => {
          const formFields = JSON.parse(data?.formFieldRender);              
          const schema: {[key: string]: any} = {}; 
          const extraFormDatas: {[key: string]: any} = {};

          if(formFields) {                       
            Object.keys(formFields?.attributes).map(async (category: any, index: number) => {
              formFields?.attributes[category].forEach(async (attribute: any) => {  
                if(!extraFormDatas[category]) {
                  extraFormDatas[category] = [];
                }                             
                if(["STRING", "TEXTAREA", "DATE"].includes(attribute.type)) {                  
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
                  extraFormDatas[category].push({
                    displayType: attribute.type,
                    name: attribute.name,
                    label: attribute.label,  
                    writable: !attribute.disabled,
                    identifier: attribute.identifier,
                    mask: attribute.mask,                  
                    options: attribute.listValues || []
                  });                                                               
                } else if (attribute.type === "NUMBER") {                 

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
                    schema[attribute.name] = yupObject;
                  } else {
                    const yupObject = Yup
                      .number();                     
                    schema[attribute.name] = yupObject;
                  }  
                  extraFormDatas[category].push({
                    displayType: attribute.type,
                    name: attribute.name,
                    label: attribute.label,       
                    writable: !attribute.disabled,    
                    identifier: attribute.identifier,
                    mask: attribute.mask,          
                    options: attribute.listValues || []
                  });                
                } else if (attribute.type === "CHECKBOX") {
                  const yupObject = Yup
                  .bool();                     
                  schema[attribute.name] = yupObject;
                  extraFormDatas[category].push({
                    displayType: attribute.type,
                    name: attribute.name,
                    label: attribute.label,       
                    writable: !attribute.disabled,
                    identifier: attribute.identifier                                   
                  }); 
                } else if (["USER", "ORGANIZATION", "LIST"].includes(attribute.type)) {
                  if(attribute.required) {
                    const yupObject = Yup
                      .object()
                      .required(
                        intl.formatMessage({
                          id: "isRequired"                      
                        }, {
                          field: attribute?.label
                        })
                      ); 
                    schema[attribute.name] = yupObject;
                  } else {
                    const yupObject = Yup
                    .object();                    
                    schema[attribute.name] = yupObject;
                  }                                                  
                  extraFormDatas[category].push({
                    displayType: attribute.type,
                    name: attribute.name,
                    label: attribute.label,                    
                    options: attribute.listValues || [],
                    identifier: attribute.identifier                     
                  });
                }                               
              });
            });                                        
          }

          const validationSchema = Yup.object({
            instance: Yup.object({
              ...schema
            })    
          });

          formik.validationSchema = validationSchema;           
          formik.render = true;         
               
          setFormik(formik);
          setFormDatas({...extraFormDatas});
        });
    }    
  } else if(item?.catalogItemType === "ENTITLEMENT" && item?.resourceType === "APPLICATION" && !formDatas) {

    apolloClient
      .query({
        query: GET_APPLICATION_ACCOUNTS_BY_ENTITLEMENT,
        variables: {          
          payload: JSON.stringify({
            entitlementId: Number(item?.targetId)
          }),
        },
      })
      .then(({ data }) => {                

        const schema: {[key: string]: any} = {}; 
        const extraFormDatas: {[key: string]: any} = {};
    
        const label = intl.formatMessage({
          id: "account"                      
        });
        const yupObject = Yup
          .string()
          .required(
            intl.formatMessage({
              id: "isRequired"                      
            }, {
              field: label
            })
          ); 
        schema.accountId = yupObject; 
        extraFormDatas[intl.formatMessage({id: "checkout.select.account"})] =  [{
          displayType: "RADIOBUTTON",
          name: "accountId",
          label: intl.formatMessage({
            id: "account"                  
          }),
          bind: {
            label: "accountIdentifier",
            value: "identifier"
          },
          options: data?.getApplicationAccountsByEntitlement
        }];
    
        const validationSchema = Yup.object({
          instance: Yup.object({
            ...schema
          })    
        });
    
        formik.validationSchema = validationSchema;           
        formik.render = true;         
             
        setFormik(formik);
        setFormDatas({...extraFormDatas});
      });    
  } else if (item?.catalogItemType === "RESOURCE" && !formDatas) {

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
          const schema: {[key: string]: any} = {}; 
          const extraFormDatas: {[key: string]: any} = {};
          if(item?.resourceType === "TEMPORARY_RESOURCE") {
            const label = intl.formatMessage({
              id: "expireAt"                      
            });
            const yupObject = Yup
              .string()
              .required(
                intl.formatMessage({
                  id: "isRequired"                      
                }, {
                  field: label
                })
              ); 
            schema.expireAt = yupObject; 
            extraFormDatas[intl.formatMessage({id: "checkout.select.expiredAt"})] =  [{
              displayType: "DATETIME",
              name: "expireAt",
              label: intl.formatMessage({
                id: "expireAt"                  
              })
            }];             
          }                 

          if(attributes.length) {                       
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
                    schema[attribute.name] = yupObject;
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
          }

          const validationSchema = Yup.object({
            instance: Yup.object({
              ...schema
            })    
          });

          formik.validationSchema = validationSchema;           
          formik.render = true;         
               
          setFormik(formik);
          setFormDatas({...formNewEntry.attributes, ...extraFormDatas});  
        }        
      });
  }

  const handleValidateFormField = async (attribute: any, value: any, form: any) => {
    if(attribute?.identifier) {
      const _field: {[key: string]: any} = {};
      _field[attribute.name] = value;
      const result: any = await validateFormField({
        variables: {
          fieldId: attribute.identifier,
          payload: JSON.stringify(_field)
        }                              
      })

      if(result?.data?.validateFormField) {
        const resp: any = JSON.parse(result?.data?.validateFormField);
        if(!resp.result) {
          const _error: {[key: string]: any} = {
            instance: {...form.errors.instance}
          };
          _error["instance"][attribute.name] = "Invalid field";
          form.setErrors(_error); 
        }               
      }
    }    
  }

  const async = (type: string, query: string, callback: any) => {
    
    apolloClient
    .query({
      query: SEARCH_ITEMS,
      variables: { 
        payload: "[]",         
        q: query || "",
        size: 10,
        type      
      },
    })
    .then(async ({ data }) => { 
      if(type === "USER") {
        callback(data.searchItems.representation.map((item: SelfService) => ({
          identifier: item.referenceTo.referenceToIdentifier,
          displayName: getSelfServiceAttributeValue("displayName", item.attributes),
          username: getSelfServiceAttributeValue("username", item.attributes),
          image: `/api/images?url=http://localhost:8087/blazon-workspace-backend/public/workspace/images/${getSelfServiceAttributeValue("thumbImageId", item.attributes)}`        
        })));
      } else {
        callback(data.searchItems.representation.map((item: SelfService) => ({
          identifier: item.referenceTo.referenceToIdentifier,
          name: item.name,
          type: getSelfServiceAttributeValue("organizationType", item.attributes),
        })));
      }         
    });

    /*dispatch(search(query || '', 10, 'USER', 'displayName;email;personalEmail;username'))
      .then((resp) => {
        if(resp.error) {
          dispatch(addMessage((resp.payload.response && resp.payload.response.message) || <FormattedMessage id="app.internal.error"/>, 'error'))
          return
        }

        callback(resp.payload.representation.map((u) => ({
          identifier: u.referenceTo.referenceToIdentifier,
          displayName: getAttribute(u.attributes, 'displayName'),
          links: [{
            href: `/provisionmanager/public/images/${getAttribute(u.attributes, 'thumbImageId')}`
          }]
        })))
      })*/
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
        <>
          {loadingDeleteItemInstance && (
            <Loading type="blue"/>
          ) || (
            <IconSpace onClick={onDelete}>
              <MinusCircleIcon width={24} height={24} className="classes.root" />
            </IconSpace>    
          )}
        </>  
        )}
      </UserCardTitle>
      {formDatas && !!Object.keys(formDatas).length && <Line />}
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
      
      {formDatas && !!Object.keys(formDatas).length && formik.render && (
        <Formik
          {...formik}
          render={(form) => {
          return (
            <Form>
              {Object.keys(formDatas).map((category: any, index: number) => (
                <>
                  <Category>{category}</Category>
                  {formDatas[category].map((attribute: any, key: number) => {                 
                
                    const fieldValue = get(form.values.instance, attribute.name);                                                      
                    let currentError = null;
                    if(["DATE", "DATETIME", "RADIOBUTTON"].includes(attribute.displayType)) {                    
                      currentError = (!form?.values?.instance || !form?.values?.instance[attribute.name]) && form?.errors?.instance && form?.errors?.instance[attribute.name];
                    }                  

                    let TextMaskCustomItem = TextMaskCustom;

                    if(["STRING", "TEXTAREA", "NUMBER"].includes(attribute.displayType) && attribute.mask) {
                      TextMaskCustomItem.defaultProps = {mask: attribute.mask};
                    }

                    return (
                    <div key={`form-datas-attribute-${index}-${key}`}>
                      <AddDados>                                     
                        {["STRING", "TEXTAREA", "NUMBER"].includes(attribute.displayType) && (
                        <TextField
                          className="Add-dados-textField"
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
                          inputComponent={attribute.mask && TextMaskCustomItem as any}  
                          onBlur={async (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                            handleValidateFormField(attribute, event.target.value, form);                            
                          }}                                    
                        />)}
                        {["LIST"].includes(attribute.displayType) && (
                        <div>
                          <label>{attribute?.label}</label>
                          <Autocomplete
                            filterSelectedOptions
                            options={attribute?.options}
                            label="label"                         
                            name={"instance." + attribute.name}                         
                            value={fieldValue}
                            onChange={(event: any, value: string) => form.setFieldValue("instance." + attribute.name, value, false)}
                            key={index}                                          
                          />
                        </div>)}                        
                        {["DATE", "DATETIME"].includes(attribute.displayType) && (
                          <DateType>
                            <DatePicker       
                              isTime={"DATETIME" === attribute.displayType}                    
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
                        {["RADIOBUTTON"].includes(attribute.displayType) && (
                          <RadioGroup  
                            name={"instance." + attribute.name} 
                            value={fieldValue} 
                            onChange={(e: any) => {
                              form.setFieldValue("instance." + attribute.name, e?.target?.value, false)
                            }}>
                            {(attribute?.options || []).map((opt: any) => (
                              <FormControlLabel 
                                key={`option.${index}.option.${opt[attribute?.bind["value"]]}`} 
                                value={String(opt[attribute?.bind["value"]])} 
                                control={<Radio color="primary"/>} 
                                label={opt[attribute?.bind["label"]] || " - "}/>
                            ))}    
                            <FormHelperText error>{currentError}</FormHelperText>                        
                          </RadioGroup>
                        )}
                        {["ORGANIZATION"].includes(attribute.displayType) && (
                        <div>
                          <label>{attribute?.label}</label>
                          <Autocomplete
                            async={(query: string, callback: any) => async("ORGANIZATION_UNIT", query, callback)}
                            filterSelectedOptions                            
                            label="name"                         
                            name={"instance." + attribute.name}                         
                            value={fieldValue}
                            renderOption={(option: any) => (
                              <div>
                                <div><b><FormattedMessage id={`organization.${option.type}`}/></b></div>
                                <div>{option.name}</div>
                              </div>
                            )} 
                            onChange={(event: any, value: string) => form.setFieldValue("instance." + attribute.name, value, false)}
                            key={index}                                          
                          />
                        </div>)} 
                        {["USER"].includes(attribute.displayType) && (
                        <div>
                          <label>{attribute?.label}</label>
                          <Autocomplete
                            async={(query: string, callback: any) => async("USER", query, callback)}
                            filterSelectedOptions                           
                            label="displayName"                         
                            name={"instance." + attribute.name}                         
                            value={fieldValue}
                            renderOption={(option: any) => (
                              <React.Fragment>
                                <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                                  <div>
                                    <UserThumb user={option} image={option.image} />
                                  </div>
                                  <div>
                                    <div><b>{option.username}</b></div>
                                    <div>{option.displayName}</div>
                                  </div>                                   
                                </div>
                              </React.Fragment>
                            )}          
                            inputprops={{
                              startAdornment: (
                                fieldValue && 
                                <div style={{marginRight: 10}}>
                                  <UserThumb user={fieldValue} image={fieldValue?.image} notShowDisplayName isSmall/>   
                                </div>                         
                              )
                            }}
                            onChange={(event: any, value: string) => form.setFieldValue("instance." + attribute.name, value, false)}
                            key={index}                                          
                          />
                        </div>)}
                      </AddDados>
                    </div>              
                  )})} 
                </>
              ))}                          
              <Line className="Add-top"/>                          
              <UserBottomArea>
                <Button                    
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    console.log(form)
                    form.submitForm()
                  }}
                >
                  <FormattedMessage id="checkout.save" />
                </Button>
              </UserBottomArea>
            </Form>)          
        }} />                     
      )}         
    </UserCardStyle>
  );
};

export default UserCard;
