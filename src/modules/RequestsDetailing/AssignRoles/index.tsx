// vendors
import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useRouter } from "next/router";
import Tag from "@icons/Tag";

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
} from "./styles";

// types
import { FirstTaskProps } from "./types";

// components
import UserRequesterCard from "./UserRequesterCard";
import UserBeneficiaryCard from "./UserBeneficiaryCard";
import RequestStatus from "./RequestStatus";
import TableResource from "./TableResource";
import TableRole from "./TableRole";
import JustificationText from "./JustificationText";
import MenuGrid from "./MenuGrid";
import Button from "@components/Button";

const AssignRoles: React.FC<FirstTaskProps> = ({ intl }) => {
  const router = useRouter();
  return (
    <WorkArea>
      <ButtonArea>
        <Button
          variant="contained"
          color="default-primary"
          onClick={() => router.push("/requests")}
        >
          {intl.formatMessage({ id: "request.refresh" })}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push("/requests")}
        >
          <FormattedMessage id="request.cancel" />
        </Button>
      </ButtonArea>
      <Grid>
        <MenuGrid />
        <UserGrid>
          <StyledCards>
            <UserRequesterCard
              UserImage="https://i.ibb.co/nwV8d4s/Avatar.png"
              UserName="Phillipe Ferreira Amaral"
            />
            <UserBeneficiaryCard
              UserImage="https://i.ibb.co/nwV8d4s/Avatar.png"
              UserName="Jhefferson Alves Souza"
            />
          </StyledCards>
          <RequestStatus notification="ALREADY_TO_EXECUTION" />
        </UserGrid>

        <JustificationText
          justificationText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet interdum
          turpis accumsan nibh condimentum. Vestibulum in sapien metus nunc, nunc
          facilisi odio."
        />
        <ResourceGrid>
          <span>{intl.formatMessage({ id: "request.resource" })}</span>
          <TableResource
            requestIdentifier="347959"
            requestCreated_at="13/05/2021 10:28:29"
            requestEffectived_at="13/05/2021 10:28:29"
            requestFinalized_at="-"
          />
        </ResourceGrid>

        <InsideLine />

        <RequestDetail>
          <div>
            <Tag height={18} width={18} />
          </div>
          <span>{intl.formatMessage({ id: "request.request.detail" })}</span>
        </RequestDetail>

        <ResourceGrid>
          <span>{intl.formatMessage({ id: "request.role" })}</span>
          <TableRole
            requestName="EXPENSE MOBI (APP)"
            requestDescription="Libera acessa ao sistema ultilizado para realizar reembolso de despesas"
          />
        </ResourceGrid>
      </Grid>
    </WorkArea>
  );
};

export default injectIntl(AssignRoles);
