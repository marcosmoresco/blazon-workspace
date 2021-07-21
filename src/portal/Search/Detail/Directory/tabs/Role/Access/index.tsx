import React, { FC, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import apolloClient from "@utils/apollo-client";
import DataGrid from "@components/DataGrid";
import Dialog from "@components/Dialog";
import { connect } from "react-redux";
import { columns, columnsEntitlements } from "./constants";
import type { ListProps } from "./types";
import { RoleDirectoryRight, EntitlementDirectory } from "@portal/Search/types";
import {
  GET_DIRECTORY_ROLE_RIGHTS,
  GET_DIRECTORY_ROLE_RIGHT_ENTITLEMENTS,
} from "@portal/Search/queries";
import { EntitlementsDialog } from "./styles";

const RoleAccess: FC<ListProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data, refetch } = useQuery<{
    getRepresentation: { representation: RoleDirectoryRight[]; links: [] };
  }>(GET_DIRECTORY_ROLE_RIGHTS, {
    variables: {
      id: Number(id),
      page: 0,
      size: 100,
    },
  });

  const rights = data?.getRepresentation?.representation;
  const links = data?.getRepresentation?.links;

  const [open, setOpen] = useState(false);
  const [loadingEntitlements, setLoadingEntitlements] = useState(false);
  const [current, setCurrent] = useState<EntitlementDirectory>();
  const [entitlements, setEntitlements] = useState([]);
  const [entitlementsLinks, setEntitlementsLinks] = useState([]);

  const handleOpen = (row: any) => {
    setLoadingEntitlements(true);
    setCurrent(row);
    setOpen(true);
    apolloClient
      .query({
        query: GET_DIRECTORY_ROLE_RIGHT_ENTITLEMENTS,
        variables: {
          id: Number(id),
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
          params={{ id: Number(id) }}
          height={600}
          list={rights}
          links={links}
          fetching={loading}
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
            params={{ id: Number(id), rightId: current?.identifier }}
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
