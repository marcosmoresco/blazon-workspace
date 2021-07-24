// vendors
import React from "react";
import { FormattedMessage } from "react-intl";

// components
import CirclesFour from "@icons/CirclesFour";
import Button from "@components/Button";
import DotsThreeIcon from "@icons/DotsThree";

// styles
import {
  HeaderPage,
  InfoHeaderPage,
  TypeStyle,
  MembershipStyle,
  ButtonsArea,
  Actions,
} from "./style";

const Header: React.FC = () => {
  return (
    <>
      <HeaderPage>
        <InfoHeaderPage>
          <TypeStyle>APPROVAL</TypeStyle>
          <MembershipStyle>
            <CirclesFour />
            membership role
          </MembershipStyle>
        </InfoHeaderPage>
        <ButtonsArea>
          <Button variant="contained" color="default-primary">
            <FormattedMessage id="tasks.certify" />
          </Button>
          <Button variant="contained" color="secondary">
            <FormattedMessage id="tasks.revoke" />
          </Button>
          <Actions>
            <DotsThreeIcon height={24} width={24} />
          </Actions>
        </ButtonsArea>
      </HeaderPage>
      ;
    </>
  );
};
export default Header;
