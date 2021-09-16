// vendors
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import Image from "next/image";
import * as Yup from "yup";
import { Formik } from "formik";
import { useTheme, themes } from "@theme/index";

// components
import Finishing from "./essets/Finishing.svg";
import Button from "@components/Button";
import DatePicker from "@components/DatePicker";
import TextField from "@components/TextField";
import TitlePage from "@components/TitlePage";
import Loading from "@components/Loading";
import InfoIcon from "@icons/Info/index";
import FilePlusIcon from "@icons/FilePlus";
import CheckCircleIcon from "@icons/CheckCircle";
import { useCart } from "@requestCart/index";
import { isValidCart } from "@utils/index";
import { addMessage } from "@actions/index";

// types
import { ItemProps, CheckoutFinishingProps } from "./type";
import { SelfServiceCart } from "@requestCart/types";

// styles
import {
  Line,
  FinishingArea,
  ItemArea,
  TextArea,
  Span,
  ImageArea,
  Description,
  ButtonArea,
} from "./styles";

import {  
  StatusCheckoutStyle,
  CircleStyle,
  LineStatusStyle,
  SymbolStyle,
  TitlesStyle,
  ItemText,  
} from "@modules/Checkout/styles";

//mutations
import { SUBMIT_SELF_SERVICE_CART } from "@requestCart/mutations";
import { GET_SELF_SERVICE_CART } from "@requestCart/queries";

const CheckoutContent: React.FC<CheckoutFinishingProps> = ({form}) => { 
  const intl = useIntl();

  return (
    <>     
      <div className="pt22"></div>
      <DatePicker
        label={intl.formatMessage({
          id: "effectiveDate",
        })}
        name="checkout.effectiveDate"
        onChange={(value: any) => {
          form.setFieldValue("checkout.effectiveDate", value);
        }}
      />
      <div className="pt22"></div>
      <Description>
        <TextField
          form={form}
          label={intl.formatMessage({id: "justification"})}
          name="checkout.justification"
          multiline
          rows={3}
          rowsMax={4}
        />  
      </Description>                   
    </>
  );
};

const CheckoutFinishing: React.FC<ItemProps> = ({ nextStep }) => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useDispatch();
  const { cart, setCart } = useCart();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const { loading: loadingRequestCart, error, data } = useQuery<{
    getSelfServiceCart: SelfServiceCart;
  }>(GET_SELF_SERVICE_CART);
  
  const [submitSelfServiceCart, { loading }] = useMutation(SUBMIT_SELF_SERVICE_CART, { 
    refetchQueries: [
      {
        query: GET_SELF_SERVICE_CART,
      },
    ],  
    onCompleted: ({submitSelfServiceCart}) => {   
      if(submitSelfServiceCart) {
       router.push("/checkout-finished");       
      }        
    },
  });

  const validationSchema = Yup.object({
    checkout: Yup.object({
      effectiveDate: Yup.string(),
      justification: Yup
        .string()
        .required(
          intl.formatMessage({
            id: "isRequired"                      
          }, {
            field: intl.formatMessage({id: "justification"})
          })
        ),
    }),
  });
  
  const formik = {
    initialValues: {
      checkout: {
        effectiveDate: undefined,
        justification: "",
      },
    },
    validationSchema,
    onSubmit: (values: any) => {
      if(!data?.getSelfServiceCart?.items.length) {
        dispatch(addMessage(intl.formatMessage({
          id: "checkout.AddItems"
        }), "warning"));
        return;     
      }
      if(!isValidCart(data?.getSelfServiceCart)) {
        dispatch(addMessage(intl.formatMessage({
          id: "checkout.invalid.items"
        }), "warning"));
        return;
      }
      submitSelfServiceCart({
        variables: {
          ...values.checkout
        }
      });     
    },
    enableReinitialize: true,
  };

  useEffect(() => {
    if (!loading && !error && !cart) {
      setCart(data?.getSelfServiceCart || ({} as SelfServiceCart));
    }
  }, [loading, error, cart, setCart, data]);

  if(loadingRequestCart) {
    return (
      <Loading container/>
    )
  }

  return (
    <>
      <TitlePage onBack={() => router.push("/checkout")} title="checkout" subTitle="checkout.FinishingRequest"/>
      <StatusCheckoutStyle>
        <SymbolStyle>
          <CircleStyle>
            <InfoIcon width={48} height={48} color={currentTheme.palette.primary.main || "#3174F6"} stroke={2}/>
          </CircleStyle>
          <LineStatusStyle style={{ background: currentTheme.palette.primary.main || "#3174F6" }} />
          <CircleStyle>
            <FilePlusIcon color="#514D65" stroke={2.5}/>
          </CircleStyle>
          <LineStatusStyle style={{ background: "#E9E8EB" }} />
          <CircleStyle>
            <CheckCircleIcon width={48} height={48} color="#BDBCC5" stroke={2}/>
          </CircleStyle>
        </SymbolStyle>
        <TitlesStyle>
          <ItemText style={{ color: "#BDBCC5" }}>
            <FormattedMessage id="checkout.information" />
          </ItemText>
          <ItemText style={{ color: "#514D65" }}>
            <FormattedMessage id="checkout.FinishingRequest" />
          </ItemText>
          <ItemText style={{ color: "#BDBCC5" }}>
            <FormattedMessage id="checkout.requested" />
          </ItemText>
        </TitlesStyle>
      </StatusCheckoutStyle>
      <Line />
      <FinishingArea>
        <ItemArea>
          <TextArea>
            <ImageArea>
              <Image src={Finishing} alt="FinishingIcon" />
            </ImageArea>
            <Span>
              {intl.formatMessage({id: "checkout.finishing.title"})}
              <br />
              <br />
              {intl.formatMessage({id: "checkout.finishing.subTitle"})}
            </Span>
          </TextArea>   
          <Formik
          {...formik}
          render={(form) => (
            <>
              <CheckoutContent form={form}/>
              <Line />
              <ButtonArea>
                <Button
                  variant="contained"
                  color="default-primary"
                  onClick={() => router.push("/checkout")}
                >
                  <FormattedMessage id="checkout.cancel" />
                </Button>
                <Button variant="contained" color="primary" onClick={() => {
                  form.submitForm();             
                  //nextStep
                }}
                isLoading={loading ? 1 : 0}>
                  <FormattedMessage id="checkout.submit" />
                </Button>
              </ButtonArea>
            </>            
          )}
          />                                    
        </ItemArea>
      </FinishingArea>
    </>
  );
};

export default CheckoutFinishing;
