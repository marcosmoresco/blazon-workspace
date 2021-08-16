// vendors
import React from "react";
import { useDispatch } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { useRouter } from "next/router";
import Tag from "@icons/Tag";
import { getLink } from "@utils/index";
import apolloClient from "@utils/apollo-client";
import { confirm } from "@components/Dialog/actions";
import { addMessage } from "@actions/index";

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

  const content = getContent(request, intl, true);

  const cancel = async () => {
    const result = await confirm(
      intl.formatMessage({
        id: "request.cancel.title",
      }),
      intl.formatMessage({
        id: "request.cancel.text",
      }),
      <XCircleIcon width={48} height={48} color="#FF134A"/>
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
      <ButtonArea>
        <Button
          variant="contained"
          color="primary"
          secondColor="default"
          onClick={() => router.reload()}
        >
          {intl.formatMessage({ id: "request.refresh" })}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={
            ["NEW", "WAITING_EXECUTION", "WAITING_APPROVAL"].indexOf(
              request?.status || ""
            ) === -1
          }
          onClick={cancel}
        >
          <FormattedMessage id="request.cancel" />
        </Button>
      </ButtonArea>
      <Grid>
        <MenuGrid type={request?.type || " - "} />
        <UserGrid>
          <StyledCards>
            <UserRequesterCard
              UserImage={getLink("thumb", request?.requester?.links || [])}
              UserName={request?.requester?.displayName || " - "}
            />
            <UserBeneficiaryCard
              UserImage={getLink("thumb", request?.beneficiary?.links || [])}
              UserName={request?.beneficiary?.displayName || " - "}
            />
          </StyledCards>
          <RequestStatus notification={request?.status || " - "} />
        </UserGrid>

        <JustificationText
          justificationText={request?.justification || " - "}
        />

        <ResourceGrid className="Detail">
          <TableHeader request={request} />
        </ResourceGrid>

        {content && (
          <>
            <InsideLine />
            <RequestDetail>
              <div>
                <Tag height={18} width={18} />
              </div>
              <span>
                {intl.formatMessage({ id: "request.request.detail" })}
              </span>
            </RequestDetail>
            {content}
          </>
        )}
      </Grid>
    </WorkArea>
  );
};

export default injectIntl(Info);
