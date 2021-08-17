import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import CardScreen from "@components/CardScreen";
import Filter from "@components/Filter";
import DataGrid from "@components/DataGrid";
import { useStyles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { RoleDirectory } from "@portal/Search/types";
import { GET_USER_ROLES } from "@modules/User/queries";
import { TitleHierarchy } from "@components/TitlePage/types";
import EmptyStateImage from "@images/EmptyStateRoles.svg";

const columns = () => [
  {
    field: "name",
    headerName: <FormattedMessage id="name" />,
    sortable: false,
  },
];

const filters = [
  {
    name: "name",
    label: <FormattedMessage id="name" />,
    type: "text",
  },
];

const Roles = ({ classes }) => {
  
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

  const hierarchy: TitleHierarchy = {
    name: "profile.header.breadcrumb"      
  };

  return (
    <CardScreen
      loading={false}
      title="roles"          
      onBack={() => router.push("/profile")}
      hierarchy={hierarchy}
    >    
     <div className="Default-header-filter">
        <Filter
          filters={filters}
          onChange={(filters: any) => search(filters)}
        />        
      </div>  
      <div>
        <DataGrid
          emptyStateImage={EmptyStateImage}
          query={GET_USER_ROLES}
          queryFilters={queryFilters}
          getResponseLinks={(data: any) => data?.getRepresentation?.links}
          getResponse={(data: any) => data?.getRepresentation?.roles}
          height={600}          
          columns={columns({ classes })}
          page={0}
          size={25}
          rowsPerPageList={[25, 50, 75, 100]}
          handleClick={() => {}}
        />
      </div>
    </CardScreen>
  );
};

export default withStyles(useStyles)(Roles);
