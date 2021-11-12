// vendors
import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { useQuery } from "@apollo/client";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import { paginate, getLink } from "@utils/index";

// types
import { TeamDetailProps, ResponsibleTeamUserDetailRepresentation, UserDetail } from "./types";
import { TitleHierarchy } from "@components/TitlePage/types";
import { User } from "@types";

// components
import TitlePage from "@components/TitlePage";
import Loading from "@components/Loading";
import UserThumb from "@components/UserThumb";
import Checkbox from "@components/Checkbox";
import Dialog from "@components/Dialog";
import Button from "@components/Button";
import Tabs from "@components/Tabs";

//Icons
import SearchIcon from "@icons/Search";

//Queries
import {
  GET_TEAM_USER_DATA
} from "@modules/Team/queries";

//styles
import {
  InformationsText,  
  InformationLabel,
  InformationContent,
  InformationText,
  OutlinedInputSearch,  
  ItemCard,
  Content,
  UserContent,
  Username,
  DisplayName,
  UserContentInfo,
  CheckboxContent,
  Actions,
} from "./styles";


const TeamDetails: React.FC<TeamDetailProps> = ({ intl, user }) => {

  const [filter, setFilter] = useState<string>("");  

  const { loading, data, refetch } = useQuery<{
    getResponsibleTeamUserData: ResponsibleTeamUserDetailRepresentation;
  }>(GET_TEAM_USER_DATA, {
    variables: {
      id: Number(user?.identifier),
    },
    fetchPolicy: "network-only"    
  }); 

  if(loading) {
    return (
      <Loading container bgColor="#FFFFFF"/>
    )
  }   
  
  return (
    <>           
      <InformationsText>                
        {(data?.getResponsibleTeamUserData?.fields || []).map((u: UserDetail) => (
          <div key={`information-${u.name}`}>            
            <InformationLabel>
              {u.label}
            </InformationLabel>
            <InformationContent>          
              <InformationText>{u?.value || " - "}</InformationText>
            </InformationContent>
          </div>
        ))}            
      </InformationsText>            
    </>
  );
};

export default injectIntl(TeamDetails);
