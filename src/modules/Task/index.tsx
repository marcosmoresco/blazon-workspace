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
import { sections } from "./constants";
import type { ListProps } from "./types";
import {
  Content,
} from "./styles";
import PersonalTasks from "./Personal";
import QueueTasks from "./Queue";
import { TitleHierarchy } from "@components/TitlePage/types";
import TitlePage from "@components/TitlePage";

const Tasks: FC<ListProps> = ({ dispatch }) => {
  
  const [section, setSection] = useState("TASKS_PERSONAL");

  const hierarchy: TitleHierarchy = {
    name: "tasks",    
  };

  return (
    <>
      <TitlePage 
        title="tasks"        
        hierarchy={hierarchy} />
      <div className="Default-content">      
        <Content>
          <Card>
            <Section list={sections} defaultValue="TASKS_PERSONAL" onSelect={(sec: any) => setSection(sec.value)}/>
            {section === "TASKS" && (
              <QueueTasks />
            )}
            {section === "TASKS_PERSONAL" && (
              <PersonalTasks />
            )}
          </Card>
        </Content>     
      </div>
    </>    
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Tasks);
