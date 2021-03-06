// vendors
import React from "react";
import { useDispatch } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { useRouter } from "next/router";
import Tag from "@icons/Tag";
import { getLink } from "@utils/index";
import apolloClient from "@utils/apollo-client";
import { confirm } from "@components/Dialog/actions";
import DetailUser from "@components/DetailUser";
import { addMessage } from "@actions/index";
import { useTheme, themes } from "@theme/index";
import { processedStatusList, inProgressStatusList } from "@modules/Requests/components/constants";

// styles
import {
  InsideLine,
  WorkArea,
  Grid,
  UserGrid,
  ResourceGrid,
  RequestDetail,
  StyledCards,
  ButtonArea,
  Spacing,
  Header,
  UserContent,
  InfoDivider
} from "./styles";

// styles
import {
  BoxJustification,
  BoxJustificationValue,
  TitleJustification,
  BoxCardIdentifier,
  BoxCardHeaderContent,
  BoxCardHeader,
  BoxCardHeaderInfo,
  InfoText,
  InfoTextContainer,
  BoxCardFooterInfo,
  BoxCardFooter,
  BoxCardTitle,
  BoxCardTitleResource
} from "@modules/Requests/styles";

// types
import { FirstTaskProps } from "./types";

//queries
import { GET_CANCEL_REQUEST } from "@modules/Requests/Detail/queries";

// components
import UserRequesterCard from "./UserRequesterCard";
import UserBeneficiaryCard from "./UserBeneficiaryCard";
import RequestStatus from "./RequestStatus";
import TableHeader from "./TableHeader";
import JustificationText from "./JustificationText";
import MenuGrid from "./MenuGrid";
import Button from "@components/Button";
import { getContent } from "@modules/Requests/constants";
import XCircleIcon from "@icons/XCircle";

const Info: React.FC<FirstTaskProps> = ({ intl, request, refetch }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const content = getContent(request, intl, true);

  const cancel = async () => {
    const result = await confirm(
      intl.formatMessage({
        id: "request.cancel.title",
      }),
      intl.formatMessage({
        id: "request.cancel.text",
      }),
      <XCircleIcon width={48} height={48} color="#FF134A"/>,
      null,
      currentTheme
    );

    if (result) {      

      apolloClient
        .query({
          query: GET_CANCEL_REQUEST,
          variables: {
            id: Number(id),
          },
        })
        .then(({ data }) => {          
          if(data?.getCancelRequest) {
            dispatch(
              addMessage(
                intl.formatMessage({
                  id: "request.cancel.success",
                })
              )
            );
            refetch();
          }          
        });
    }
  };

  return (
    <WorkArea>
      {["NEW", "WAITING_EXECUTION", "WAITING_APPROVAL"].includes(request?.status as string) &&
      <ButtonArea>       
        <Button
          variant="contained"
          color="secondary"         
          onClick={cancel}
        >
          <FormattedMessage id="request.cancel" />
        </Button>
      </ButtonArea>}
      <Grid>
        <Header>
          <BoxCardHeader>
            <BoxCardHeaderContent>
              <BoxCardIdentifier
                background="#EDEDEF" 
                color={currentTheme.palette.primary.main}>
                ID: {request?.identifier}
              </BoxCardIdentifier>                                                                                                   
            </BoxCardHeaderContent>
            <BoxCardHeaderInfo>                                    
              <BoxCardFooterInfo>
                <InfoText>
                  <InfoTextContainer>
                    <FormattedMessage id="createdAt" />: {request?.createdAt}
                  </InfoTextContainer>                   
                  <InfoTextContainer>
                    <FormattedMessage id="effectivedAt" />: {request?.effectiveDate}
                  </InfoTextContainer>   
                  {processedStatusList.includes(request?.status as string) &&                    
                    <InfoTextContainer>
                      <FormattedMessage id="finalizedAt" />: {request?.finalizedAt}
                    </InfoTextContainer>
                  }                                                                                                         
                  <InfoTextContainer>
                    <FormattedMessage id="task.status"/>: {request?.status} 
                  </InfoTextContainer>                    
                </InfoText>                                                                                                                                          
              </BoxCardFooterInfo>
            </BoxCardHeaderInfo>
          </BoxCardHeader>   
          <BoxCardTitle>
            {[
              "CREATE_ACCOUNT", 
              "UPDATE_ACCOUNT", 
              "REVOKE_ACCOUNT",
              "INACTIVATE_ACCOUNT",
              "ACTIVATE_ACCOUNT",
              "CHECKIN_ADMIN_ACCOUNT_PASSWORD", 
              "CHECKOUT_ADMIN_ACCOUNT_PASSWORD", 
              "CHECKIN_APPLICATION_ACCOUNT_PASSWORD"
            ].includes(request?.type as string) && (
              request?.resource.name || " - "
            )}              
            {[
              "REVOKE_ENTITLEMENT", 
              "ASSIGN_ENTITLEMENT" 
            ].includes(request?.type as string) && (                                 
              <>
                <BoxCardTitleResource>
                  {request?.resource?.name}
                </BoxCardTitleResource> / {request?.entitlement?.name}
              </>  
            )}   
            {[
              "ASSIGN_ROLE", 
              "REVOKE_ROLE" 
            ].includes(request?.type as string) && (
              request?.role?.name || " - "
            )}        
          </BoxCardTitle>                 
        </Header>                         
        <UserContent>
          <BoxCardFooterInfo>       
            <DetailUser request={request} user={request?.requester} title="request.requester"/>                          
            {request?.beneficiary && <DetailUser request={request} user={request?.beneficiary} title="request.beneficiary"/>}                               
          </BoxCardFooterInfo>         
        </UserContent> 
        <InfoDivider />       
        <Spacing>
          <BoxJustification>
            <TitleJustification>
              <FormattedMessage id="justification" />  
            </TitleJustification> 
            <BoxJustificationValue>
              {request?.justification || " - "}
            </BoxJustificationValue>
          </BoxJustification>
        </Spacing>        
      </Grid>      
      {[
        "UPDATE_ACCOUNT", 
        "ACTIVATE_ACCOUNT", 
        "INACTIVATE_ACCOUNT",
        "REVOKE_ACCOUNT", 
        "CHECKIN_ADMIN_ACCOUNT_PASSWORD", 
        "CHECKOUT_ADMIN_ACCOUNT_PASSWORD", 
        "CHECKIN_APPLICATION_ACCOUNT_PASSWORD",
        "REVOKE_ENTITLEMENT", 
        "ASSIGN_ENTITLEMENT"
      ].includes(request?.type as string) && 
      <Grid>
        <Spacing className="Add-top">  
          <BoxCardTitle>
            <FormattedMessage id="request.accountInformations" />  
          </BoxCardTitle>      
          <BoxJustification>
            <TitleJustification>
              <FormattedMessage id="accountIdentifier" />
            </TitleJustification>
            <BoxJustificationValue>
              {request?.account?.accountIdentifier || " - "}
            </BoxJustificationValue>
          </BoxJustification>
        </Spacing>
      </Grid>} 
      {[
        "NEW_USER"      
      ].includes(request?.type as string) && 
      <Grid>
        <Spacing className="Add-top">  
          <BoxCardTitle>
            <FormattedMessage id="request.userInformations" />  
          </BoxCardTitle>      
          <BoxJustification>
            <TitleJustification>
              <FormattedMessage id="firstName" />
            </TitleJustification>
            <BoxJustificationValue>
              {request?.user?.firstName || " - "}
            </BoxJustificationValue>
            <TitleJustification className="Add-top">
              <FormattedMessage id="middleName" />
            </TitleJustification>
            <BoxJustificationValue>
              {request?.user?.middleName || " - "}
            </BoxJustificationValue>
            <TitleJustification className="Add-top">
              <FormattedMessage id="lastName" />
            </TitleJustification>
            <BoxJustificationValue>
              {request?.user?.middleName || " - "}
            </BoxJustificationValue>
            <TitleJustification className="Add-top">
              <FormattedMessage id="displayName" />
            </TitleJustification>
            <BoxJustificationValue>
              {request?.user?.displayName || " - "}
            </BoxJustificationValue>
            <TitleJustification className="Add-top">
              <FormattedMessage id="personalEmail" />
            </TitleJustification>
            <BoxJustificationValue>
              {request?.user?.personalEmail || " - "}
            </BoxJustificationValue>
            <TitleJustification className="Add-top">
              <FormattedMessage id="email" />
            </TitleJustification>
            <BoxJustificationValue>
              {request?.user?.email || " - "}
            </BoxJustificationValue>
            <TitleJustification className="Add-top">
              <FormattedMessage id="phone" />
            </TitleJustification>
            <BoxJustificationValue>
              {request?.user?.phone || " - "}
            </BoxJustificationValue>
            <TitleJustification className="Add-top">
              <FormattedMessage id="mobilePhone" />
            </TitleJustification>
            <BoxJustificationValue>
              {request?.user?.mobilePhone || " - "}
            </BoxJustificationValue>           
          </BoxJustification>
        </Spacing>
      </Grid>}    
    </WorkArea>
  );
};

export default injectIntl(Info);
