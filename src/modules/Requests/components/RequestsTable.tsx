// vendors
import React, { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import apolloClient from "@utils/apollo-client";
import { addMessage } from "@actions/index";

import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";

//queries
import { GET_REQUESTS } from "../queries";
import { GET_CANCEL_REQUEST } from "@modules/Requests/Detail/queries";

// types
import { Request } from "../types";

// components
import Card from "@components/Card";
import DataGrid from "@components/DataGrid";
import Filter from "@components/Filter";
import Button from "@components/Button";
import ArrowsOutIcon from "@icons/ArrowsOut";
import ArrowClockwiseIcon from "@icons/ArrowClockwise";
import XCircleIcon from "@icons/XCircle";
import { confirm } from "@components/Dialog/actions";

import Tag from "@icons/Tag";
import CaretRight from "@icons/CaretRight";
import { getContent } from "@modules/Requests/constants";
import type { RequestsTableProps } from "./types";

// styles
import {
  ExpandContentCard,
  StyleMenuGrid,
  StyleMenuGridTitle,
  ExpandContent,
} from "./styles";

//constants
import { columns, filters } from "./constants";

//images
import EmptyStateImage from "@images/EmptyStateRequests.svg";


const Tasks: FC<RequestsTableProps> = ({ intl }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [queryFilters, setQueryFilters] = useState({
    page: 0,
    size: 100,      
    filters: ""
  });

  const cancel = async () => {

    const result = await confirm(
      intl.formatMessage({
        id: "request.cancel.title",
      }),
      intl.formatMessage({
        id: "request.cancel.text",
      }),
      <XCircleIcon width={48} height={48} color="#FF134A"/>
    );

    if (result) {      

      const promises = [];
      const cancelListError = [];

      for( const requestId of selecteds ) {
        promises.push(
          apolloClient
          .query({
            query: GET_CANCEL_REQUEST,
            variables: {
              id: requestId,
            },
          })
          .catch(() => {
            cancelListError.push(requestId);            
          }));
      }

      Promise.all(promises)
        .then(() => {
          if(cancelListError.length) {
            dispatch(
              addMessage(
                intl.formatMessage({
                  id: "requests.cancel.error",
                }),
                "error"
              )
            );
          } else {
            dispatch(
              addMessage(
                intl.formatMessage({
                  id: "requests.cancel.success",
                })
              )
            );
            search({
              currentDate: new Date().getTime()
            });
            if(callbackClear) {
              callbackClear(true);
            }            
          }          
        });                
    }
  };

  const search = (filters?: any) => {
    setQueryFilters({
      page: 0,
      size: 100,
      filters: JSON.stringify({        
        ...filters
      }),
    });
  };

  const [callbackClear, setCallbackClear] = useState(() => (clear: boolean) => {} );
  const [selecteds, setSelecteds] = useState([]);
  const [expandAll, setExpandAll] = useState(false); 

  const handleSelected = (selecteds: any, callbackClearSelected: any) => {    
    setSelecteds(selecteds);
    setCallbackClear(() => callbackClearSelected);
  };

  const handleClickRow = (request: Request) => {
    router.push(`/requests/${request.identifier}`);
  };

  const expandContent = (item: Request) => {
    return (
      <ExpandContent>
        <ExpandContentCard>
          <StyleMenuGrid>
            <StyleMenuGridTitle>
              <Tag height={16} width={15} />
              <span>
                <FormattedMessage id="request.request.detail" />
              </span>
            </StyleMenuGridTitle>
            <Link href={`/requests/${item.identifier}`}>
              <a>
                <FormattedMessage id="detail" />
                <CaretRight height={15} width={18} />
              </a>
            </Link>
          </StyleMenuGrid>
          {getContent(item, intl)}
        </ExpandContentCard>
      </ExpandContent>
    );
  };

  const actions = (
    <React.Fragment>        
      <Button         
        variant="rounded" 
        color="secondary"       
        onClick={cancel}
        isLoading={0}>
        <FormattedMessage id="app.cancel"/>
      </Button>
    </React.Fragment>
  )

  return (
    <div className="Default-content">
      <Card>
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
            actions={actions}   
            emptyStateImage={EmptyStateImage} 
            defaultOrderBy="createDate:desc"                
            query={GET_REQUESTS}
            queryFilters={queryFilters}
            height={600}
            getResponseLinks={(data: any) => data?.getRequests?.links}
            getResponse={(data: any) => data?.getRequests?.requests}           
            columns={columns}
            page={1}
            size={100}
            rowsPerPageList={[25, 50, 75, 100]}
            handleSelected={handleSelected}           
            expand={expandContent}
            expandOnClick
            expandAll={expandAll}
            selectable
            disabledCheckboxItem={(item: any) => !["NEW", "WAITING_EXECUTION", "WAITING_APPROVAL"].includes(item.status)}
            type="pagination"
          />
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(injectIntl(Tasks));