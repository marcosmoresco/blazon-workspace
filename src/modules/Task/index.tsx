import React, { FC, useState } from "react";
import Card from "@components/Card";
import Section from "@components/Section";
import { connect } from "react-redux";
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
            {section === "TASKS_RESOLVED" && (
              <PersonalTasks resolved={true}/>
            )}
          </Card>
        </Content>     
      </div>
    </>    
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Tasks);
