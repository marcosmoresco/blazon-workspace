// vendors
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import { useRouter } from "next/router";
import { useUser } from "@hooks";
import { getLink } from "@utils/index";
import moment from "moment";

// components
import PaperPlaneTiltIcon from "@icons/PaperPlaneTilt";
import ArrowRightIcon from "@icons/ArrowRight";
import ListBulletsIcon from "@icons/ListBullets";
import EmptyState from "@components/EmptyState";
import EmptyStateSearchIcon from "@icons/EmptyStateSearch";

//constants
import {
  getQueryByType,
  addCommentByType
} from "./constants";

//types
import type { GridHistoryProps } from "./types";
import type { TaskComment, TaskHistory } from "@modules/Task/types";

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

  const [tab, setTab] = useState<"Comments" | "history">("Comments");
  const [currentComment, setCurrentComment] = useState<string>("");


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
              selected={tab === "Comments"}
              onClick={() => setTab("Comments")}
            >
              <FormattedMessage id="tasks.comments" />
            </StyleApprovalTab>
            <StyleApprovalTab
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
                <CommentsTab>
                  <IsertComments>
                    <Image
                      alt="From thumb"
                      src={thumb}
                      width={64}
                      height={64}
                    />
                    <Text 
                      placeholder={intl.formatMessage({id: "tasks.add.comment.here"})} 
                      value={currentComment} 
                      onChange={(event: any) => setCurrentComment(event?.target?.value)}>                      
                    </Text>
                    <PaperPlaneBox onClick={() => {
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
                </CommentsTab>
                <TitleComments>
                  <FormattedMessage id="tasks.comments" />
                </TitleComments>
                {(task?.comments || []).length === 0 && (
                  <EmptyState icon={<EmptyStateSearchIcon />} title="tasks.noComments" text="tasks.noComments.text" bgColor="#FFFFFF"/>
                )}
                {(task?.comments || []).map((comment: TaskComment) => (
                  <CommentsRegister key={`comment-${comment.identifier}`}>
                    <>
                      <div>
                        <Image
                          alt="Thumb comment"
                          src={getLink("thumb", comment?.user?.links || [])}
                          width={64}
                          height={64}
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
                {(task?.assignHistory || []).map((history: TaskHistory, index: number) => (
                  <HistoryBox key={`task-assign-history-${index}`}>
                    <UserBox>
                      <UserHistory>
                        {!history?.from && (
                          <>
                            <HistorySystem>
                              <ListBulletsIcon />
                            </HistorySystem>
                            <UserName>
                              <FormattedMessage id="tasks.AssignedFrom" />
                              <User>{history?.from?.displayName || intl.formatMessage({id: "tasks.system"})}</User>
                            </UserName>
                          </>                          
                        )}
                        {history?.from && (
                          <>
                            <Image
                              src={getLink("thumb", history?.from?.links)}
                              width={64}
                              height={64}
                              alt={history?.from?.displayName}
                            />
                            <UserName>
                              <FormattedMessage id="tasks.AssignedFrom" />
                              <User>{history?.from?.displayName || " - "}</User>
                            </UserName>
                          </>                         
                        )}                        
                      </UserHistory>
                      <ArrowRightIcon color="#0E46D7" />
                      <UserHistory>
                        <Image
                          src={getLink("thumb", history?.to?.links)}
                          width={64}
                          height={64}
                          alt={history?.to?.displayName}
                        />
                        <UserName>
                          <FormattedMessage id="tasks.AssignedTo" />
                          <User>{history?.to?.displayName}</User>
                        </UserName>
                      </UserHistory>
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
