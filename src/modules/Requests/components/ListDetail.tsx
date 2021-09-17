import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useQuery } from "@apollo/client";
import Button from "@components/Button";
import Loading from "@components/Loading";
import EmptyState from "@components/EmptyState";
import EmptyStateImage from "@images/EmptyStateRequests.svg";
import Requests from "./index";
import { connect } from "react-redux";
import { getLink } from "@utils/index";
import { filters } from "@modules/Requests/components/constants";
import type { ListProps, Task } from "@modules/Task/types";
import type { Request } from "@modules/Requests/types";
import type { Link } from "@types";
import {
  LoadMoreContent,
} from "@modules/Requests/styles";

import { 
  GET_REQUESTS
} from "@modules/Requests/queries";


const RequestListDetail: FC<ListProps> = ({ filtered, orderBy = "createdAt:desc" }) => {

  const intl = useIntl();

  const [checkAll, setCheckAll] = useState<boolean>(false);   
  const [currentOrderBy, setCurrentOrderBy] = useState<string>("createdAt:desc");
  const [filteredString, setFilteredString] = useState<string>(JSON.stringify(filtered));
  const [size, setSize] = useState<number>(10);
  const [checked, setChecked] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState(checkAll);

  const { loading, error, data, refetch } = useQuery<{
    getRequests: { links: Link[], requests: Request[] };
  }>(GET_REQUESTS, {
    variables: {
      page: 0,
      size: 10,
      ord: orderBy,
      filters: filteredString
    }, 
    fetchPolicy: "network-only"   
  });

  const handleCheck = (t: number) => {
    let newChecked = [];
    if(checked.includes(t)) {
      newChecked = checked.filter((c) => c !== t);      
    } else {
      newChecked = [...checked, t];     
    }          
    setChecked(newChecked);
  };

  useEffect(() => {
    if(JSON.stringify(filtered) !== filteredString) {
      setSize(10);
      setFilteredString(JSON.stringify(filtered));
      refetch({
        page: 0,
        size: 10,
        ord: orderBy,
        filters: JSON.stringify(filtered)
      });
    }

    if(checkAll !== checkedAll) {
      setCheckedAll(checkAll);
      let newChecked: number[] = [];
      let statusChecked: string[] = [];
      if(checkAll) {
        (data?.getRequests?.requests || [])          
          .forEach((t) => {
            newChecked.push(t?.identifier);
            statusChecked.push(t?.status);            
          });
      }
            
      setChecked(newChecked);
    }

    if(orderBy !== currentOrderBy) {
      setCurrentOrderBy(orderBy);
      refetch({
        page: 0,
        size: 10,
        ord: orderBy,
        filters: JSON.stringify(filtered)
      });
    }

  }, [filteredString, filtered, checkAll, checkedAll, checked, data, refetch, orderBy]);

  if(loading) {
    return (
      <Loading container bgColor="#FFFFFF"/>
    )
  }  

  return (
    <>     
      <Requests list={data?.getRequests?.requests || []} checked={checked} onCheck={handleCheck} subType="any" size={size} filteredString={filteredString}/>                 
      {(data?.getRequests?.requests || []).length === 0 && (
        <EmptyState image={EmptyStateImage} title="request.empty" text="request.empty.text" bgColor="#FFFFFF"/>
      )}
      {getLink("next", data?.getRequests?.links || []) && (
        <LoadMoreContent>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCheckAll(false);
              setSize(size + 10);
              refetch({
                page: 0,
                size: size + 10,
                ord: orderBy,
                filters: filteredString
              })
            }}
          >
            <FormattedMessage id="loadMore" />
          </Button>
        </LoadMoreContent>
      )}
    </>  
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(RequestListDetail);
