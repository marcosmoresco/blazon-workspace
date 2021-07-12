import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Card from "@components/Card";
import Button from "@components/Button";
import DataGrid from "@components/DataGrid";
import Filter from "@components/Filter";
import Section from "@components/Section";
import Tutorial from "@components/Tutorial";
import { confirm } from "@components/Dialog/actions";
import ArrowsOutIcon from "@icons/ArrowsOut";
import ArrowClockwiseIcon from "@icons/ArrowClockwise";
import CheckSquareOffsetIcon from "@icons/CheckSquareOffset";
import UserGearIcon from "@icons/UserGear";
import { connect } from "react-redux";
//import { all, save, remove } from './actions'
import { addMessage } from "@actions/index";
import { columns, filters } from "./constants";
import type { Task, ListProps } from "./types";

const Tasks: FC<ListProps> = ({ dispatch }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [links, setLinks] = useState([]);
  const [tasks, setTasks] = useState<Task[]>();
  const [callbackClear, setCallbackClear] = useState({ execute: () => {} });
  const [selecteds, setSelecteds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandAll, setExpandAll] = useState(false);

  useEffect(() => {
    if (!tasks?.length) {
      setTimeout(() => {
        setIsFetching(false);
        setLinks([]);
        setTasks([
          {
            identifier: 1,
            name: "Teste 1",
            status: "ACTIVE",
            date: 1625347034626,
          },
          {
            identifier: 2,
            name: "Teste 2",
            status: "ACTIVE",
            date: 1625347034626,
          },
          {
            identifier: 3,
            name: "Teste 3",
            status: "ACTIVE",
            date: 1625347034626,
          },
          {
            identifier: 4,
            name: "Teste 4",
            status: "ACTIVE",
            date: 1625347034626,
          },
          {
            identifier: 5,
            name: "Teste 5",
            status: "ACTIVE",
            date: 1625347034626,
          },
        ]);
      }, 4000);
    }
  });

  const search = (filters?: any) => {
    console.log(filters);
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
    }, 4000);
  };

  const handleSelected = (selecteds: any, callbackClear: any) => {
    setCallbackClear(callbackClear);
    setSelecteds(selecteds);
  };

  const handleClickRemove = async () => {
    const result = await confirm();
    if (result) {
      if (selecteds && selecteds.length) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          if (callbackClear?.execute) {
            callbackClear.execute();
          }
          dispatch(addMessage(<FormattedMessage id="task.remove.message" />));
          setIsFetching(true);
          setTimeout(() => {
            setIsFetching(false);
          }, 3000);
        }, 3000);
      }
    }
  };

  const handleClickRow = (row: Task) => {
    dispatch(addMessage(`Click task : ${row.identifier}`));
  };

  const actions = (
    <React.Fragment>
      <Button
        variant="rounded"
        color="secondary"
        onClick={handleClickRemove}
        isLoading={loading ? 1 : 0}
      >
        <FormattedMessage id="remove" />
      </Button>
    </React.Fragment>
  );

  const expandContent = (item: any) => (
    <div style={{ margin: "0 20px" }}>
      <Card>
        <div style={{ padding: 20 }}>Expand item {item.id}</div>
      </Card>
    </div>
  );

  const sections = [{
    icon: <CheckSquareOffsetIcon />,
    name: "tasks",
    value: "TASKS"
  }, {
    icon: <UserGearIcon />,
    name: "tasks.personal",
    value: "TASKS_PERSONAL"
  }];

  return (
    <div className="Default-content">
      <Tutorial title="task.tutorial.title" text="task.tutorial.text"/>
      <Card>
        <Section list={sections} defaultValue="TASKS"/>
        <div className="Default-header-filter">
          <Filter
            filters={filters}
            onChange={(filters: any) => search(filters)}
          />
          <div className="Card-actions">
            <div className="Action" onClick={() => setExpandAll(!expandAll)}>
              <ArrowsOutIcon width={20} height={20} color="#514D65" />
            </div>
            <div className="Action" onClick={() => search()}>
              <ArrowClockwiseIcon width={20} height={20} color="#514D65" />
            </div>
          </div>
        </div>
        <div>
          <DataGrid
            height={600}
            list={tasks}
            links={[]}
            fetching={isFetching}
            columns={columns}
            page={1}
            size={25}
            rowsPerPageList={[25, 50, 75, 100]}
            //handleClick={handleClickRow}
            handleSelected={handleSelected}
            actions={actions}
            expand={expandContent}
            expandOnClick
            expandAll={expandAll}
            selectable
          />
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(injectIntl(Tasks));
