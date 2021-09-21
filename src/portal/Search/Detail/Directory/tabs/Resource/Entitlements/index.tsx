import React, { FC } from "react";
import { injectIntl } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import DataGrid from "@components/DataGrid";
import { connect } from "react-redux";
import { columns } from "./constants";
import type { Entitlement, ListProps } from "./types";
import { EntitlementDirectory } from "@portal/Search/types";
import { GET_DIRECTORY_RESOURCE_ENTITLEMENTS } from "@portal/Search/queries";
import EmptyStateTypeahead from "@images/EmptyStateTypeahead.svg";

const ResourceEntitlements: FC<ListProps> = ({ dispatch }) => {
 
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data, refetch } = useQuery<{
    getRepresentation: { representation: EntitlementDirectory[]; links: [] };
  }>(GET_DIRECTORY_RESOURCE_ENTITLEMENTS, {
    variables: {
      id: Number(id),
      page: 0,
      size: 100
    },
  });

  const entitlements = data?.getRepresentation?.representation;
  const links = data?.getRepresentation?.links;

  const handleClickRow = (row: Entitlement) => {
    router.push(`/search/entitlement/${row.identifier}`);
  };

  return (
    <>          
      <div>
        <DataGrid
          emptyStateImage={EmptyStateTypeahead}
          query={GET_DIRECTORY_RESOURCE_ENTITLEMENTS}
          queryFilters={{id: Number(id)}}
          height={600}
          list={entitlements}
          links={links}
          fetching={loading}
          columns={columns}
          page={1}
          size={100}
          rowsPerPageList={[25, 50, 75, 100]}
          handleClick={handleClickRow}                           
          type="pagination"
        />
      </div>     
    </>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(injectIntl(ResourceEntitlements));
