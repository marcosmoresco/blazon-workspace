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

  const [loadingEntitlements, setLoadingEntitlements] = useState(true);
  const [entitlements, setEntitlements] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if(!loading && resource) {      
      apolloClient
        .query({
          query: GET_DIRECTORY_RESOURCE_ENTITLEMENTS,
          variables: {
            id: resource?.referenceTo?.referenceToIdentifier,
            page: 0,
            size: 100,
          },
        })
        .then(({ data }) => {
          setEntitlements(data?.getRepresentation?.representation);
          setLinks(data?.getRepresentation?.links);
          setLoadingEntitlements(false);
        });
    }
  }, [loading, resource]);

  const handleClickRow = (row: Entitlement) => {
    router.push(`/search/entitlement/${row.identifier}`);
  };

  return (
    <>
      <div>
        <DataGrid
          query={GET_DIRECTORY_RESOURCE_ENTITLEMENTS}
          queryFilters={{ id: resource?.referenceTo?.referenceToIdentifier }}
          height={600}
          list={entitlements}
          links={links}
          fetching={loadingEntitlements}
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
