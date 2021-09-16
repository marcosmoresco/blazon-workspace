import React, { FC, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Filter from "@components/Filter";
import Ordenation from "@components/Ordenation";
import { connect } from "react-redux";
import { inProgressStatusList, processedStatusList, filters } from "@modules/Requests/components/constants";
import type { ListProps, Task } from "@modules/Task/types";
import ListDetail from "./ListDetail";
import {
  Box,
  Header,
  HeaderFilters,
  HeaderFiltersContent,
} from "@modules/Requests/styles";

const RequestList: FC<ListProps> = ({ resolved }) => {
  
  const [requestFilters, setRequestFilters] = useState(resolved ? [...(filters.filter((f) => f.name !== "status")), {
    name: "status",
    label: <FormattedMessage id="status" />,
    type: "list",
    values: [
      {
        label: "ERROR",
        value: "ERROR"
      },      
      {
        label: "CANCELED",
        value: "CANCELED"
      },
    ],
    bind: "value",
    view: "label"
  }] : [...(filters.filter((f) => f.name !== "status"))]);
  const [filtered, setFiltered] = useState<{[key: string]: any}>(resolved ? {status: processedStatusList} : {status: inProgressStatusList});
  const [orderBy, setOrderBy] = useState<string>("createdAt:desc");

  const handleChangeFiltered = (f: {[key: string]: any}) => {
    if(!f.status) {      
      f.status = resolved ? processedStatusList : inProgressStatusList;
    }

    setFiltered({...f});
  };  

  const handleOrderBy = (orderBy: any) => {
    setOrderBy(orderBy);
  } 

  return (
    <Box>
      <Header>              
        <HeaderFiltersContent>
          <HeaderFilters>                                      
            <Filter filters={requestFilters} onChange={(f: any) => handleChangeFiltered(f)}/>
          </HeaderFilters> 
          <HeaderFilters>
            <Ordenation list={requestFilters} onChange={handleOrderBy} orderBy={orderBy}/>  
          </HeaderFilters>         
        </HeaderFiltersContent>                           
      </Header>
      <ListDetail resolved={resolved} filtered={filtered}/>
    </Box>  
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(RequestList);
