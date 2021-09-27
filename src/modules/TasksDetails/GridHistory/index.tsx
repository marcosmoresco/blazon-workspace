// vendors
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import { useRouter } from "next/router";
import { useUser } from "@hooks";
import { getLink } from "@utils/index";
import moment from "moment";
import { useTheme, themes } from "@theme/index";

// components
import PaperPlaneTiltIcon from "@icons/PaperPlaneTilt";
import ArrowRightIcon from "@icons/ArrowRight";
import ListBulletsIcon from "@icons/ListBullets";
import EmptyState from "@components/EmptyState";
import EmptyStateTypeahead from "@images/EmptyStateTypeahead.svg";

//constants
import {
  getQueryByType,
  addCommentByType,
  getHistoryByType
} from "./constants";

//types
import type { GridHistoryProps } from "./types";
import type { TaskComment, TaskHistory, TaskAssignHistory } from "@modules/Task/types";

//queries
import {
  GET_APPROVAL_MERGED_HISTORY,
  GET_CERTIFICATION_MERGED_HISTORY,
  GET_PROVISIONING_MERGED_HISTORY,
  GET_ROLE_RIGHT_MERGED_HISTORY,
  GET_SOD_MERGED_HISTORY
} from "@modules/Task/queries";

// styles
import {
  WorkArea,
  Grid,
  MenuDetail,
  StyleApprovalTab,
  InsideLine,
  DeitalList,
  CommentsTab,
  IsertComments,
  Text,
  PaperPlaneBox,
  CommentsRegister,
  TitleComments,
  UserNameComments,
  DataComment,
  UserComments,
  Comment,
  BoxComment,
  Image,
  HistoryBox,
  HistorySystem,
  UserHistory,
  UserName,
  User,
  UserBox,
  DataHistories,
  DataHistory,
} from "./style";

const GridHistory: React.FC<GridHistoryProps> = ({ task }) => {

  const [ user, thumb ] = useUser();
  const dispatch = useDispatch();
  const intl = useIntl();
  const router = useRouter();
  const { id, type } = router.query;
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const [tab, setTab] = useState<"Comments" | "history">("Comments");
  const [currentComment, setCurrentComment] = useState<string>("");

  const { loading, error, data, refetch } = useQuery<{
    getHistory: [TaskAssignHistory];
  }>(getHistoryByType(type), {
    variables: {
      id: Number(id)
    },
    fetchPolicy: "network-only"
  });

  const [addComment, {}] = useMutation(addCommentByType(type || "approval"), { 
    refetchQueries: [
      {
        query: getQueryByType(type || "approval"),
        variables: {
          id: Number(id)
        }
      },
    ],  
    onCompleted: ({ addComment }) => {        
      if(addComment) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "task.comment.added.success"})
          )
        );     
        setCurrentComment("");  
      }     
    },
  });

  return (
    <>
      <WorkArea>
        <Grid>
          <MenuDetail>
            <StyleApprovalTab
              color={currentTheme.palette.primary.main}
              selected={tab === "Comments"}
              onClick={() => setTab("Comments")}
            >
              <FormattedMessage id="tasks.comments" />
            </StyleApprovalTab>
            <StyleApprovalTab
              color={currentTheme.palette.primary.main}
              selected={tab === "history"}
              onClick={() => setTab("history")}
            >
              <FormattedMessage id="tasks.historyStates" />
            </StyleApprovalTab>
          </MenuDetail>
          <InsideLine />
          <DeitalList>
            {tab === "Comments" ? (
              <>
                {!task?.dates?.resolvedDate && 
                <CommentsTab>
                  <IsertComments>
                    <Image
                      alt="From thumb"
                      src={thumb}
                      width={48}
                      height={48}
                    />
                    <Text 
                      placeholder={intl.formatMessage({id: "tasks.add.comment.here"})} 
                      value={currentComment} 
                      onChange={(event: any) => setCurrentComment(event?.target?.value)}>                      
                    </Text>
                    <PaperPlaneBox 
                      color={currentTheme.palette.primary.main}
                      onClick={() => {
                        if(!currentComment) {
                          return;
                        }

                        addComment({
                          variables: {
                            id: Number(id),
                            comment: currentComment
                          }
                        })
                    }}>
                      <PaperPlaneTiltIcon
                        height={24}
                        width={24}
                        color={"#FFFF"}
                      />
                    </PaperPlaneBox>
                  </IsertComments>
                </CommentsTab>}
                <TitleComments>
                  <FormattedMessage id="tasks.comments" />
                </TitleComments>
                {(task?.comments || []).length === 0 && (
                  <EmptyState image={EmptyStateTypeahead} title="tasks.noComments" text="tasks.noComments.text" bgColor="#FFFFFF"/>
                )}
                {(task?.comments || []).map((comment: TaskComment) => (
                  <CommentsRegister key={`comment-${comment.identifier}`}>
                    <>
                      <div>
                        <Image
                          alt="Thumb comment"
                          src={getLink("thumb", comment?.user?.links || [])}
                          width={48}
                          height={48}
                        />
                      </div>
                      <BoxComment>
                        <UserComments>
                          <UserNameComments>
                            {comment?.user?.displayName || " - "}
                          </UserNameComments>
                          <DataComment>{moment(comment?.date).format("DD/MM/YYYY HH:mm")}</DataComment>
                        </UserComments>
                        <Comment>
                          {comment?.comment || " - "}
                        </Comment>
                      </BoxComment>
                    </>
                  </CommentsRegister>
                ))}                                                 
              </>
            ) : tab === "history" ? (
              <div>
                {(data?.getHistory || []).map((history: TaskAssignHistory, index: number) => (
                  <HistoryBox key={`task-assign-history-${index}`}>
                    <UserBox>
                      <UserHistory>
                        {!history?.from && (
                          <>
                            <HistorySystem>
                              <ListBulletsIcon width={21} height={21}/>
                            </HistorySystem>
                            <UserName>
                              <FormattedMessage id="tasks.AssignedFrom" />
                              <User>{history?.from?.name || intl.formatMessage({id: "tasks.system"})}</User>
                            </UserName>
                          </>                          
                        )}
                        {history?.from && history.from.type === "USER" && (
                          <>
                            <Image
                              src={getLink("thumb", history?.from?.links)}
                              width={32}
                              height={32}
                              alt={history?.from?.name}
                            />
                            <UserName>
                              <FormattedMessage id="tasks.AssignedFrom" />
                              <User>{history?.from?.name || " - "}</User>
                            </UserName>
                          </>                         
                        )} 
                        {history?.from && history.from.type === "QUEUE" && (
                          <>
                           <HistorySystem>
                              <ListBulletsIcon width={21} height={21}/>
                            </HistorySystem>
                            <UserName>
                              <FormattedMessage id="tasks.AssignedFrom" />
                              <User>{intl.formatMessage({id: "queue"})} {history.from.name}</User>
                            </UserName>
                          </>                         
                        )}                        
                      </UserHistory>
                      <ArrowRightIcon color="#26213F" stroke={2} width={21} height={21}/>
                      {history?.to && history.to.type === "USER" && (
                        <UserHistory>
                          <Image
                            src={getLink("thumb", history?.to?.links)}
                            width={32}
                            height={32}
                            alt={history?.to?.name}
                          />
                          <UserName>
                            <FormattedMessage id="tasks.AssignedTo" />
                            <User>{history?.to?.name}</User>
                          </UserName>
                        </UserHistory>
                      )}                      
                      {history?.to && history.to.type === "QUEUE" && (                        
                        <UserHistory>
                          <HistorySystem>
                            <ListBulletsIcon width={21} height={21}/>
                          </HistorySystem>
                          <UserName>
                            <FormattedMessage id="tasks.AssignedTo" />
                            <User>{intl.formatMessage({id: "queue"})} {history.to.name}</User>
                          </UserName>
                        </UserHistory>                         
                        )} 
                    </UserBox>
                    <DataHistories>
                      <FormattedMessage id="tasks.date" />
                      <DataHistory>{history.date}</DataHistory>
                    </DataHistories>
                  </HistoryBox>
                ))}
              </div>
            ) : (
              <></>
            )}
          </DeitalList>
        </Grid>
      </WorkArea>
    </>
  );
};

export default GridHistory;
