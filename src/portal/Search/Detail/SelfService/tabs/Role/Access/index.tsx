import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmptyState from "@components/EmptyState";
import Loading from "@components/Loading";
import SearchIcon from "@icons/Search";
import FolderIcon from "@icons/Folder";
import FolderNotchOpenIcon from "@icons/FolderNotchOpen";
import EmptyStateTypeahead from "@images/EmptyStateTypeahead.svg";
import { connect } from "react-redux";
import { columns, columnsEntitlements } from "./constants";
import type { ListProps } from "./types";
import { SelfService, RoleDirectoryRight, EntitlementDirectory } from "@portal/Search/types";
import {
  GET_SELF_SERVICE_ITEM,
  GET_DIRECTORY_ROLE_RIGHTS,
  GET_DIRECTORY_ROLE_RIGHT_ENTITLEMENTS,
} from "@portal/Search/queries";
import { 
  EntitlementsDialog, 
  Box, 
  Input, 
  Label, 
  Resource, 
  Resources,
  EmptyResources,
  Detail,
  EmptyDetail,
  DetailHeader,
  Entitlement,
  Entitlements,
  EntitlementHeader,
  EmptyEntitlements 
} from "./styles";

const RoleAccess: FC<ListProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const [entitlementFilter, setEntitlementFilter] = useState<string>("");
  const [resourceFilter, setResourceFilter] = useState<string>(""); 
  const [selected, setSelected] = useState<RoleDirectoryRight>();
  const [entitlements, setEntitlements] = useState<EntitlementDirectory[]>([]);
  const [loadingEntitlements, setLoadingEntitlements] = useState<boolean>(false); 
  
  const { loading, error, data, refetch } = useQuery<{
    getSelfServiceItem: SelfService;
  }>(GET_SELF_SERVICE_ITEM, {
    variables: {
      id: id,
    },
  });

  const { loading: loadingRoleRights, data: dataRoleRights } = useQuery<{
    getRepresentation: {
      representation: [RoleDirectoryRight]
    };
  }>(GET_DIRECTORY_ROLE_RIGHTS, {
    variables: {
      id: data?.getSelfServiceItem?.referenceTo?.referenceToIdentifier, 
      page: 0, 
      size: 1000
    },
  });

  const { refetch: refetchEntitlementRights } = useQuery<{
    getRepresentation: {
      representation: [EntitlementDirectory]
    };
  }>(GET_DIRECTORY_ROLE_RIGHT_ENTITLEMENTS, {   
    skip: true  
  });

  if(loading || loadingRoleRights) {
    return (
      <Loading container/>
    )
  }

  return (
    <>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Resources>
              <Label><FormattedMessage id="resource" /></Label>
              <Input 
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon width={21}/>
                    </InputAdornment>
                  ),
                }}
                value={resourceFilter}
                onChange={(event: any) => setResourceFilter(event.target.value)}
              />
              {!(dataRoleRights?.getRepresentation?.representation || []).length && 
                <EmptyResources>
                  <EmptyState image={EmptyStateTypeahead} title="search.detail.rights.resource.empty.title" text="search.detail.rights.resource.empty.text"/>
                </EmptyResources>                
              }
              {(dataRoleRights?.getRepresentation?.representation || [])
                .filter((right: RoleDirectoryRight) => !resourceFilter || right?.resource?.name.toLocaleLowerCase().includes(resourceFilter.toLocaleLowerCase()))
                .map((right: RoleDirectoryRight) => (
                <Resource 
                  key={`resource-${right?.resource?.identifier}`} 
                  className={`${selected?.resource?.identifier === right?.resource?.identifier && "Active"}`}
                  onClick={async () => { 
                    setEntitlementFilter("");
                    setLoadingEntitlements(true);                
                    const result = await refetchEntitlementRights({
                      id: data?.getSelfServiceItem?.referenceTo?.referenceToIdentifier, 
                      rightId: right?.identifier, 
                      page: 0, 
                      size: 1000
                    });
                    setLoadingEntitlements(false);                  
                    setEntitlements(result?.data?.getRepresentation?.representation);
                    setSelected(right);
                  }}>
                  {right?.resource?.name || " - "}
                  {selected?.resource?.identifier !== right?.resource?.identifier && <FolderIcon /> || <FolderNotchOpenIcon />}  
                </Resource>
              ))}
            </Resources>            
          </Grid>  
          <Grid item xs={6}>
            <Detail>
              {selected && (
                <>
                  <DetailHeader>
                    <Label>{selected?.resource?.name || " - "}</Label>
                    <Input 
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon width={21}/>
                          </InputAdornment>
                        ),
                      }}
                      value={entitlementFilter}
                      onChange={(event: any) => setEntitlementFilter(event.target.value)}
                    />
                  </DetailHeader>
                  <EntitlementHeader>
                    <FormattedMessage id="entitlement" />
                  </EntitlementHeader>  
                  {!(entitlements || []).length && (
                    <EmptyEntitlements>
                      <EmptyState image={EmptyStateTypeahead} title="search.detail.rights.entitlement.empty.title" text="search.detail.rights.entitlement.empty.text"/>
                    </EmptyEntitlements>
                  )}                 
                  {!loadingEntitlements &&  
                    <Entitlements>                    
                      {(entitlements || [])
                      .filter((entitlement: EntitlementDirectory) => !entitlementFilter || entitlement?.name.toLocaleLowerCase().includes(entitlementFilter.toLocaleLowerCase()))
                      .map((entitlement: EntitlementDirectory, index: number) => (
                        <Entitlement 
                          key={`entitlement-${entitlement?.identifier}`}
                          className={`${index < entitlements.filter((entitlement: EntitlementDirectory) => !entitlementFilter || entitlement?.name.toLocaleLowerCase().includes(entitlementFilter.toLocaleLowerCase())).length - 1 && "Border"}`}>
                          {entitlement?.name || " - "}
                        </Entitlement>
                      ))} 
                    </Entitlements>
                  }   
                  {loadingEntitlements && <Loading container/>}                              
                </>                
              )}
              {!selected && (
                <EmptyDetail>
                  <EmptyState image={EmptyStateTypeahead} title="search.detail.rights.resource.noSelect.entitlement.title" text="search.detail.rights.resource.noSelect.entitlement.text"/>
                </EmptyDetail>  
              )}
            </Detail>
          </Grid>
        </Grid>
      </Box>      
    </>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(injectIntl(RoleAccess));
