import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Avatar from "@material-ui/core/Avatar";
import Button from "@components/Button";
import Card from "@components/Card";
import Checkbox from "@components/Checkbox";
import DataGrid from "@components/DataGrid";
import Filter from "@components/Filter";
import Section from "@components/Section";
import Select from "@components/Select";
import Tutorial from "@components/Tutorial";
import { confirm } from "@components/Dialog/actions";
import ArrowsOutIcon from "@icons/ArrowsOut";
import ArrowClockwiseIcon from "@icons/ArrowClockwise";
import CalendarIcon from "@icons/Calendar";
import CheckSquareOffsetIcon from "@icons/CheckSquareOffset";
import CirclesFourIcon from "@icons/CirclesFour";
import DotsThreeIcon from "@icons/DotsThree";
import UserGearIcon from "@icons/UserGear";
import { connect } from "react-redux";
//import { all, save, remove } from './actions'
import { addMessage } from "@actions/index";
import { sections, types, filters } from "./constants";
import type { Task, ListProps } from "./types";
import {
  Box,
  BoxCard,
  BoxCardContent,
  BoxCardText,
  BoxCardHeader,
  BoxCardHeaderContent,
  BoxCardHeaderInfo,
  BoxCardTitle,
  BoxCardIdentifier,
  Header,
  Content,
  HeaderFilters,
  Info,
  Actions,
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
  FooterType,
  FooterStatus,
} from "./styles";

const Tasks: FC<ListProps> = ({ dispatch }) => {
  const [type] = useState("APPROVAL");

  const tasks = [
    {
      identifier: 132593,
      title: "Algar Telecom Portal Interativo",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio nibh integer amet sit amet sit nibh sapien.",
      type: "membership role",
      date: "30/02/2021",
      priority: 'LOW',
    },
    {
      identifier: 132594,
      title: "Algar Telecom Portal Interativo",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio nibh integer amet sit amet sit nibh sapien.",
      type: "membership role",
      date: "30/02/2021",
      priority: 'MEDIUM',
    },
    {
      identifier: 132595,
      title: "Algar Telecom Portal Interativo",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio nibh integer amet sit amet sit nibh sapien.",
      type: "membership role",
      date: "30/02/2021",
      priority: 'HIGH',
    },
    {
      identifier: 132596,
      title: "Algar Telecom Portal Interativo",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio nibh integer amet sit amet sit nibh sapien.",
      type: "membership role",
      date: "30/02/2021",
      priority: 'LOW',
    },
  ];

  const priorityToElement: { [key: string]: any } = {
    "LOW": <BarPriorityLow variant="determinate" value={30} />,
    "MEDIUM": <BarPriorityMedium variant="determinate" value={50} />,
    "HIGH": <BarPriorityHigh variant="determinate" value={100} />
  };

  return (
    <div className="Default-content">
      <Tutorial title="task.tutorial.title" text="task.tutorial.text" />
      <Content>
        <Card>
          <Section list={sections} defaultValue="TASKS" />
          <Box>
            <Header>
              <Checkbox />
              <HeaderFilters>
                <Select options={types} bind="value" view="label" value={type} />
                <Filter filters={filters} />
              </HeaderFilters>
            </Header>
            {tasks.map((task) => (
              <Card key={`task-${task.identifier}`}>
                <BoxCard>
                  <Checkbox />
                  <BoxCardContent>
                    <BoxCardHeader>
                      <BoxCardHeaderContent>
                        <BoxCardTitle>{task.title}</BoxCardTitle>
                        <BoxCardIdentifier>{task.identifier}</BoxCardIdentifier>
                      </BoxCardHeaderContent>                  
                      <BoxCardHeaderInfo>
                        <Info>
                          <CirclesFourIcon />
                          {task.type}
                        </Info>
                        <Info>
                          <CalendarIcon />
                          {task.date}
                        </Info>
                        <Actions>
                          <DotsThreeIcon />
                        </Actions>
                      </BoxCardHeaderInfo>
                    </BoxCardHeader>
                    <BoxCardText>
                      {task.text}
                    </BoxCardText>
                    <BoxCardFooter>
                      <BoxCardFooterInfo>
                        <BoxRequester>
                          <Info>
                            <BoxRequesterAvatar>
                              <Avatar src="https://i.ibb.co/nwV8d4s/Avatar.png" />
                            </BoxRequesterAvatar>                     
                            <BoxRequesterContent>
                              <BoxRequesterTitle>
                                Solicitante
                              </BoxRequesterTitle>
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
                        <FooterType>
                          APPROVAL
                        </FooterType>
                        <FooterStatus>
                          STATUS: Novo
                        </FooterStatus>
                      </BoxCardFooterInfo>                                     
                    </BoxCardFooter>                  
                  </BoxCardContent>                              
                </BoxCard>
              </Card>
            ))}
          </Box>
        </Card>
      </Content>     
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(injectIntl(Tasks));
