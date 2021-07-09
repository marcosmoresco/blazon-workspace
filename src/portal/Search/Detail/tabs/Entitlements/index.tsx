import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Card from "@components/Card";
import Button from "@components/Button";
import DataGrid from "@components/DataGrid";
import Filter from "@components/Filter";
import { confirm } from "@components/Dialog/actions";
import ArrowsOutIcon from "@icons/ArrowsOut";
import ArrowClockwiseIcon from "@icons/ArrowClockwise";
import { connect } from "react-redux";
//import { all, save, remove } from './actions'
import { addMessage } from "@actions/index";
import { columns, filters } from "./constants";
import type { Entitlement, ListProps } from "./types";

const Entitlements: FC<ListProps> = ({ dispatch }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [links, setLinks] = useState([]);
  const [entitlements, setEntitlements] = useState<Entitlement[]>();
  const [callbackClear, setCallbackClear] = useState({ execute: () => {} });
  const [selecteds, setSelecteds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandAll, setExpandAll] = useState(false);

  useEffect(() => {
    if (!entitlements?.length) {
      setTimeout(() => {
        setIsFetching(false);
        setLinks([]);
        setEntitlements([
          {
            identifier: 1,
            name: "Teste 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis libero."            
          },
          {
            identifier: 2,
            name: "Teste 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis libero."            
          },
          {
            identifier: 3,
            name: "Teste 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis libero."            
          },
          {
            identifier: 4,
            name: "Teste 4",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis libero."            
          },
          {
            identifier: 5,
            name: "Teste 5",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis libero."            
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

  const handleClickRow = (row: Entitlement) => {
    dispatch(addMessage(`Click entitlement : ${row.identifier}`));
  };

  const actions = (
    <>
      <Button
        variant="rounded"
        color="secondary"
        onClick={handleClickRemove}
        isLoading={loading ? 1 : 0}
      >
        <FormattedMessage id="remove" />
      </Button>
    </>
  );

  return (
    <>     
      <div className="Default-header-filter">
        <Filter
          filters={filters}
          onChange={(filters: any) => search(filters)}
        />
        <div className="Card-actions">
          <Button
            color="primary"
            variant="contained" 
          >

            <FormattedMessage id="entitlements" />
          </Button>
        </div>
      </div>
      <div>
        <DataGrid
          height={600}
          list={entitlements}
          links={[]}
          fetching={isFetching}
          columns={columns}
          page={1}
          size={25}
          rowsPerPageList={[25, 50, 75, 100]}
          //handleClick={handleClickRow}
          handleSelected={handleSelected}
          actions={actions}          
          selectable
        />
      </div>     
    </>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(injectIntl(Entitlements));
