import React, { FC, useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import apolloClient from "@utils/apollo-client";
import DataGrid from "@components/DataGrid";
import { connect } from "react-redux";
import { columns } from "./constants";
import type { Entitlement, ListProps } from "./types";
import { SelfService, EntitlementDirectory } from "@portal/Search/types";
import { GET_SELF_SERVICE_ITEM, GET_DIRECTORY_RESOURCE_ENTITLEMENTS } from "@portal/Search/queries";

const ResourceEntitlements: FC<ListProps> = ({ dispatch }) => {
  const router = useRouter();
  const { id } = router.query;
  
  const { loading, error, data, refetch } = useQuery<{
    getSelfServiceItem: SelfService;
  }>(GET_SELF_SERVICE_ITEM, {
    variables: {
      id: id,
    },
  });

  const resource = data?.getSelfServiceItem;

  const handleClickRow = (row: Entitlement) => {
    router.push(`/search/entitlement/${row.identifier}`);
  };

  return (
    <>
      <div>
        <DataGrid
          query={GET_DIRECTORY_RESOURCE_ENTITLEMENTS}
          queryFilters={{ id: resource?.referenceTo?.referenceToIdentifier, page: 0, size: 100 }}
          height={600}                  
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
