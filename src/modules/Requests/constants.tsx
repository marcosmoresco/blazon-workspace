import { Request } from "@modules/Requests/types";
import { IntlShape, FormattedMessage } from "react-intl";
import TableResource from "@modules/Requests/Detail/Info/TableResource";
import TableRole from "@modules/Requests/Detail/Info/TableRole";
import TableUser from "@modules/Requests/Detail/Info/TableUser";
import TableEntitlement from "@modules/Requests/Detail/Info/TableEntitlement";
import TableAccount from "@modules/Requests/Detail/Info/TableAccount";

// styles
import { ResourceGrid } from "./Detail/Info/styles";
import { StyleResource } from "./components/styles";
import { InfoTextContainer, InfoText } from "./styles";

export const getContent = (
  request: Request | undefined,
  intl: IntlShape,
  isDetail?: boolean
): any => {
  if (!request) {
    return null;
  }

  let template;

  if (request?.type.indexOf("USER") > -1) {
    template =
      (request?.user && (
        <ResourceGrid className={isDetail ? "Detail" : ""}>
          <StyleResource>
            <span>{intl.formatMessage({ id: "user" })}</span>
          </StyleResource>
          <TableUser request={request} />
        </ResourceGrid>
      )) ||
      null;
  } else if (request?.type.indexOf("ACCOUNT") > -1) {
    const addAccount =
      [
        "ACTIVATE_ACCOUNT",
        "INACTIVATE_ACCOUNT",
        "REVOKE_ACCOUNT",
        "UPDATE_ACCOUNT",
        "CHECKIN_APPLICATION_ACCOUNT_PASSWORD"
      ].indexOf(request?.type) > -1;
    template = (
      <>
        <ResourceGrid
          className={isDetail ? "Detail" : addAccount ? "Box-bottom" : ""}
        >
          <StyleResource>
            <span>{intl.formatMessage({ id: "resource" })}</span>
          </StyleResource>
          <InfoText>
            <InfoTextContainer>
              <FormattedMessage id="name"/>: {request?.resource?.name} 
            </InfoTextContainer>   
            <InfoTextContainer>
              <FormattedMessage id="description"/>: {request?.resource?.description || " - "} 
            </InfoTextContainer>                 
          </InfoText>          
        </ResourceGrid>
        {addAccount && (
          <ResourceGrid className={isDetail ? "Detail" : ""}>
            <StyleResource>
              <span>{intl.formatMessage({ id: "account" })}</span>
            </StyleResource>
            <TableAccount request={request} />
          </ResourceGrid>
        )}
      </>
    );
  } else if (request?.type.indexOf("ENTITLEMENT") > -1) {
    template = (
      <>
        <ResourceGrid className={isDetail ? "Detail" : "Box-bottom"}>
          <StyleResource>
            <span>{intl.formatMessage({ id: "resource" })}</span>
          </StyleResource>
          <TableResource request={request} />
        </ResourceGrid>
        <ResourceGrid className={isDetail ? "Detail" : "Box-bottom"}>
          <StyleResource>
            <span>{intl.formatMessage({ id: "entitlement" })}</span>
          </StyleResource>
          <TableEntitlement request={request} />
        </ResourceGrid>
        <ResourceGrid className={isDetail ? "Detail" : ""}>
          <StyleResource>
            <span>{intl.formatMessage({ id: "account" })}</span>
          </StyleResource>
          <TableAccount request={request} />
        </ResourceGrid>
      </>
    );
  } else if (request?.type.indexOf("ROLE") > -1) {
    template = (
      <ResourceGrid className={isDetail ? "Detail" : ""}>
        <StyleResource>
          <span>{intl.formatMessage({ id: "role" })}</span>
        </StyleResource>
        <TableRole request={request} />
      </ResourceGrid>
    );
  }

  return template;
};

export const sections = [
  {   
    name: "request.inProgress",
    value: "IN_PROGRESS",
  },
  {   
    name: "request.processed",
    value: "PROCESSED",
  },    
];
