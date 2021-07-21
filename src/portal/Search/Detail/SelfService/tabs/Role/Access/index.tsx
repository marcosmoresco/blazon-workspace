import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import apolloClient from "@utils/apollo-client";
import DataGrid from "@components/DataGrid";
import Dialog from "@components/Dialog";
import { connect } from "react-redux";
import { columns, columnsEntitlements } from "./constants";
import type { ListProps } from "./types";
import { SelfService, RoleDirectoryRight, EntitlementDirectory } from "@portal/Search/types";
import {
  GET_SELF_SERVICE_ITEM,
  GET_DIRECTORY_ROLE_RIGHTS,
  GET_DIRECTORY_ROLE_RIGHT_ENTITLEMENTS,
} from "@portal/Search/queries";
import { EntitlementsDialog } from "./styles";

const RoleAccess: FC<ListProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const { loading, error, data, refetch } = useQuery<{
    getSelfServiceItem: SelfService;
  }>(GET_SELF_SERVICE_ITEM, {
    variables: {
      id: id,
    },
  });

  const role = data?.getSelfServiceItem;

  const [open, setOpen] = useState(false);
  const [loadingEntitlements, setLoadingEntitlements] = useState(false);
  const [current, setCurrent] = useState<EntitlementDirectory>();
  const [entitlements, setEntitlements] = useState([]);
  const [entitlementsLinks, setEntitlementsLinks] = useState([]);
  const [loadingRights, setLoadingRights] = useState(true);
  const [rights, setRights] = useState([]);
  const [rightsLinks, setRightsLinks] = useState([]);

  useEffect(() => {
    if(!loading && role) {      
      apolloClient
        .query({
          query: GET_DIRECTORY_ROLE_RIGHTS,
          variables: {
            id: role?.referenceTo?.referenceToIdentifier,
            page: 0,
            size: 100,
          },
        })
        .then(({ data }) => {
          setRights(data?.getRepresentation?.representation);
          setRightsLinks(data?.getRepresentation?.links);
          setLoadingRights(false);
        });
    }
  }, [loading, role]);
  

  const handleOpen = (row: any) => {
    setLoadingEntitlements(true);
    setCurrent(row);
    setOpen(true);
    apolloClient
      .query({
        query: GET_DIRECTORY_ROLE_RIGHT_ENTITLEMENTS,
        variables: {
          id: role?.referenceTo?.referenceToIdentifier,
          rightId: row?.identifier,
          page: 0,
          size: 100,
        },
      })
      .then(({ data }) => {
        setEntitlements(data?.getRepresentation?.representation);
        setEntitlementsLinks(data?.getRepresentation?.links);
        setLoadingEntitlements(false);
      });
  };

  return (
    <>
      <div>
        <DataGrid
          query={GET_DIRECTORY_ROLE_RIGHTS}
          params={{ id: role?.referenceTo?.referenceToIdentifier }}
          height={600}
          list={rights}
          links={rightsLinks}
          fetching={loadingRights}
          columns={columns(handleOpen)}
          page={1}
          size={25}
          rowsPerPageList={[25, 50, 75, 100]}
          type="pagination"
        />
      </div>
      <Dialog
        title={<FormattedMessage id="entitlements" />}
        open={open}
        onSave={() => console.log("save")}
        onClose={() => setOpen(false)}
        isLoading={loading}
        noActions
      >
        <EntitlementsDialog>
          <DataGrid
            query={GET_DIRECTORY_ROLE_RIGHT_ENTITLEMENTS}
            params={{ id: role?.referenceTo?.referenceToIdentifier, rightId: current?.identifier }}
            height={600}
            list={entitlements}
            links={entitlementsLinks}
            fetching={loadingEntitlements}
            columns={columnsEntitlements}
            page={1}
            size={25}
            rowsPerPageList={[25, 50, 75, 100]}
            type="pagination"
          />
        </EntitlementsDialog>
      </Dialog>
    </>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(injectIntl(RoleAccess));
