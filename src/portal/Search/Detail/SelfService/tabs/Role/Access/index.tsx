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
  const [current, setCurrent] = useState<EntitlementDirectory>(); 

  const handleOpen = (row: any) => {    
    setCurrent(row);
    setOpen(true);    
  };

  return (
    <>
      <div>
        <DataGrid
          query={GET_DIRECTORY_ROLE_RIGHTS}         
          queryFilters={{ id: role?.referenceTo?.referenceToIdentifier, page: 0, size: 100 }}
          height={600}         
          columns={columns(handleOpen)}
          page={1}
          size={100}
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
            queryFilters={{ id: role?.referenceTo?.referenceToIdentifier, rightId: current?.identifier, page: 0, size: 1000 }}
            height={600}           
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
