// vendors
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

// components
import PaperPlaneTiltIcon from "@icons/PaperPlaneTilt";
import ArrowRightIcon from "@icons/ArrowRight";

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
  Image,
  HistoryBox,
  UserHistory,
  UserName,
  User,
  UserBox,
  DataHistories,
  DataHistory,
} from "./style";

const histories = [
  {
    date: "31/05/2021  06:04:17",
    assigned: {
      from: {
        name: "Edson Francisco Pereira",
        avatar: "https://i.ibb.co/nwV8d4s/Avatar.png",
      },
      to: {
        name: "Phillipe Ferreira Amaral",
        avatar: "https://i.ibb.co/nwV8d4s/Avatar.png",
      },
    },
  },
  {
    date: "31/05/2021  06:04:17",
    assigned: {
      from: {
        name: "CSC ALgar",
        avatar: "https://i.ibb.co/nwV8d4s/Avatar.png",
      },
      to: {
        name: "Algar Tel.",
        avatar: "https://i.ibb.co/nwV8d4s/Avatar.png",
      },
    },
  },
  {
    date: "31/05/2021  06:04:17",
    assigned: {
      from: {
        name: "Edson Francisco Pereira",
        avatar: "https://i.ibb.co/nwV8d4s/Avatar.png",
      },
      to: {
        name: "Phillipe Ferreira Amaral",
        avatar: "https://i.ibb.co/nwV8d4s/Avatar.png",
      },
    },
  },
];

const GridHistory: React.FC = () => {
  const [tab, setTab] = useState<"Comments" | "history">("Comments");
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
                      src="https://i.ibb.co/nwV8d4s/Avatar.png"
                      width={64}
                      height={64}
                    />
                    <Text placeholder="Insira um comentário aqui"></Text>
                    <PaperPlaneBox>
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
                <CommentsRegister>
                  <>
                    <div>
                      <Image
                        src="https://i.ibb.co/nwV8d4s/Avatar.png"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div>
                      <UserComments>
                        <UserNameComments>
                          Phillipe Ferreira Amaral
                        </UserNameComments>
                        <DataComment>20/02/2021 14:32:20</DataComment>
                      </UserComments>
                      <Comment>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Commodo odio aliquam aliquam eget id justo mauris, enim
                        nunc. Pellentesque blandit magna tellus arcu sed. Odio
                        pharetra nisl leo est sem.
                      </Comment>
                    </div>
                  </>
                </CommentsRegister>
              </>
            ) : tab === "history" ? (
              <div>
                {histories.map((history) => (
                  <HistoryBox key={`task-${history.assigned.from.name}`}>
                    <UserBox>
                      <UserHistory>
                        <Image
                          src={history.assigned.from.avatar}
                          width={64}
                          height={64}
                          alt={history.assigned.from.name}
                        />
                        <UserName>
                          <FormattedMessage id="tasks.AssignedFrom" />
                          <User>{history.assigned.from.name}</User>
                        </UserName>
                      </UserHistory>
                      <ArrowRightIcon color="#0E46D7" />
                      <UserHistory>
                        <Image
                          src={history.assigned.to.avatar}
                          width={64}
                          height={64}
                          alt={history.assigned.to.name}
                        />
                        <UserName>
                          <FormattedMessage id="tasks.AssignedTo" />
                          <User>{history.assigned.to.name}</User>
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
