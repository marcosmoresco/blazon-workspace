// vendors
import React, { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";

//queries
import { GET_REQUESTS } from "../queries";

// types
import { Request } from "../types";

// components
import Card from "@components/Card";
import DataGrid from "@components/DataGrid";
import Filter from "@components/Filter";
import ArrowsOutIcon from "@icons/ArrowsOut";
import ArrowClockwiseIcon from "@icons/ArrowClockwise";

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
  const [queryFilters, setQueryFilters] = useState({
    page: 0,
    size: 100,      
    filters: ""
  });

  const search = (filters?: any) => {
    setQueryFilters({
      page: 0,
      size: 100,
      filters: JSON.stringify({        
        ...filters
      }),
    });
  };

  const [callbackClear, setCallbackClear] = useState({ execute: () => {} });
  const [selecteds, setSelecteds] = useState([]);
  const [expandAll, setExpandAll] = useState(false); 

  const handleSelected = (selecteds: any, callbackClear: any) => {
    setCallbackClear(callbackClear);
    setSelecteds(selecteds);
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
            type="pagination"
          />
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(injectIntl(Tasks));