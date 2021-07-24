// vendors
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

// components
import Avatar from "@material-ui/core/Avatar";
import Check from "@icons/Check";
import CalendarIcon from "@icons/Calendar";
import BrowsersIcon from "@icons/BrowsersIcon";

// styles
import {
  BoxCard,
  BoxCardContent,
  BoxCardText,
  BoxCardHeader,
  BoxCardHeaderContent,
  BoxCardHeaderInfo,
  BoxCardTitle,
  BoxCardIdentifier,
  Info,
  Box,
  BoxRequester,
  BoxRequesterContent,
  BoxRequesterTitle,
  BoxRequesterDisplayName,
  BoxRequesterAvatar,
  BoxCardFooter,
  BoxCardFooterInfo,
  BoxPriority,
  BarPriorityLow,
  BarPriorityMedium,
  BarPriorityHigh,
  BoxCardStatus,
  InfoCheck,
  InfoBrowsers,
} from "./style";

const UserInfo: React.FC = () => {
  const tasks = [
    {
      identifier: 132593,
      title: "Algar Telecom Portal Interativo",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio nibh integer amet sit amet sit nibh sapien.",
      type: "membership role",
      date: "30/02/2021",
      priority: "LOW",
    },
  ];

  const priorityToElement: { [key: string]: any } = {
    LOW: <BarPriorityLow variant="determinate" value={30} />,
    MEDIUM: <BarPriorityMedium variant="determinate" value={50} />,
    HIGH: <BarPriorityHigh variant="determinate" value={100} />,
  };

  return (
    <>
      <Box>
        {tasks.map((task) => (
          <BoxCard key={`task-${task.identifier}`}>
            <BoxCardContent>
              <BoxCardHeader>
                <BoxCardHeaderContent>
                  <BoxCardTitle>{task.title}</BoxCardTitle>
                  <BoxCardIdentifier>{task.identifier}</BoxCardIdentifier>
                </BoxCardHeaderContent>
                <BoxCardStatus>STATUS: Novo</BoxCardStatus>
              </BoxCardHeader>
              <BoxCardText>{task.text}</BoxCardText>
              <BoxCardFooter>
                <BoxCardFooterInfo>
                  <BoxRequester>
                    <Info>
                      <BoxRequesterAvatar>
                        <Avatar src="https://i.ibb.co/nwV8d4s/Avatar.png" />
                      </BoxRequesterAvatar>
                      <BoxRequesterContent>
                        <BoxRequesterTitle>Solicitante</BoxRequesterTitle>
                        <BoxRequesterDisplayName>
                          Phillipe Ferreira
                        </BoxRequesterDisplayName>
                      </BoxRequesterContent>
                    </Info>
                  </BoxRequester>
                  <BoxPriority>
                    Prioridade
                    {priorityToElement[task.priority]}
                  </BoxPriority>
                </BoxCardFooterInfo>
                <BoxCardFooterInfo>
                  <BoxCardHeaderInfo>
                    <Info>
                      <CalendarIcon />
                      {task.date}
                    </Info>
                    <InfoCheck>
                      <Check color="#0d875b" />
                      {task.date}
                    </InfoCheck>
                    <InfoBrowsers>
                      <BrowsersIcon color="#92909F" />
                      {task.date}
                    </InfoBrowsers>
                  </BoxCardHeaderInfo>
                </BoxCardFooterInfo>
              </BoxCardFooter>
            </BoxCardContent>
          </BoxCard>
        ))}
      </Box>
      ;
    </>
  );
};

export default UserInfo;
