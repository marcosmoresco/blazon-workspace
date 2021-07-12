import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
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
import CheckSquareOffsetIcon from "@icons/CheckSquareOffset";
import UserGearIcon from "@icons/UserGear";
import { connect } from "react-redux";
//import { all, save, remove } from './actions'
import { addMessage } from "@actions/index";
import { types, filters } from "./constants";
import type { Task, ListProps } from "./types";
import { Box, Header, HeaderFilters } from "./styles";

const Tasks: FC<ListProps> = ({ dispatch }) => {

  const [type] = useState("APPROVAL");
  
  const sections = [
    {
      icon: <CheckSquareOffsetIcon />,
      name: "tasks",
      value: "TASKS",
    },
    {
      icon: <UserGearIcon />,
      name: "tasks.personal",
      value: "TASKS_PERSONAL",
    },
  ];

  return (
    <div className="Default-content">
      <Tutorial title="task.tutorial.title" text="task.tutorial.text" />
      <Card>
        <Section list={sections} defaultValue="TASKS" />
        <Box>
          <Header>
            <Checkbox />
            <HeaderFilters>
              <Select options={types} bind="value" view="label" value={type}/>
              <Filter filters={filters} />
            </HeaderFilters>            
          </Header>
        </Box>
      </Card>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(injectIntl(Tasks));
