import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import CardScreen from "@components/CardScreen";
import User from "@icons/User";
import DataGrid from "@components/DataGrid";
import { useStyles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { RoleDirectory } from "@portal/Search/types";
import { GET_USER_ROLES } from "@modules/User/queries";

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
    type: "string",
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

  return (
    <CardScreen
      loading={false}
      title="profile"
      subTitle="roles"
      icon={<User height={24} width={24} />}
      onBack={() => router.push("/profile")}
    >      
      <div>
        <DataGrid
          query={GET_USER_ROLES}
          queryFilters={queryFilters}
          getResponseLinks={(data: any) => data?.getRepresentation?.links}
          getResponse={(data: any) => data?.getRepresentation?.roles}
          height={600}          
          columns={columns({ classes })}
          page={1}
          size={25}
          rowsPerPageList={[25, 50, 75, 100]}
          handleClick={() => {}}
        />
      </div>
    </CardScreen>
  );
};

export default withStyles(useStyles)(Roles);
