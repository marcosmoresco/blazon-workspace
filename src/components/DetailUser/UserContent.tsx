//vendors
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { getLink } from "@utils/index";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";


//components
import Loading from "@components/Loading";
import Button from "@components/Button";

//types
import { UserContentProps, UserDetail } from "./types";
import { User } from "@types";

//styles
import {
 Header,
 HeaderBox,
 HeaderDisplayName,
 HeaderUsername,
 InformationsText,
 InformationContent,
 InformationLabel,
 InformationText,
 Actions,
 CenterAlign
} from "./styles";

const getUser = async (identifier: number, callback: any, type: string) => { 
  const resp = await axios.get(`/api/user/detail/${identifier}?type=${type}`,        
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",           
      },
    }
  );
  callback(resp);
}

const UserContent: React.FC<UserContentProps> = ({ user, close, type }) => { 
  
  const [userDetail, setUserDetail] = useState<{[key: string] : any}>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if(!userDetail.fields && !loading && user?.identifier) {
      setLoading(true);
      getUser(user.identifier, (resp: any) => {       
        setUserDetail(resp.data);
        setLoading(false);
      }, type);
    }
  }, [user, userDetail, loading, type]); 

  if(loading) {
    return (
      <>
        <CenterAlign>
          <Loading container/>
        </CenterAlign>        
        <Actions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => close()}         
          >
            <FormattedMessage id="close" />
          </Button>
        </Actions>  
      </>     
    )
  }

  return (
    <>
      <Header>  
        <HeaderBox>
          <Avatar src={getLink("thumb", user.links || [])} />
          <div>
            <HeaderDisplayName>{userDetail?.displayName}</HeaderDisplayName>
            <HeaderUsername>{userDetail?.username || " - "}</HeaderUsername>
          </div>
        </HeaderBox>              
      </Header>
      <InformationsText>
        <FormattedMessage id="informations" />
        {(userDetail?.fields || []).map((u: UserDetail) => (
          <>
            <InformationLabel>
              {u.label}
            </InformationLabel>
            <InformationContent>          
              <InformationText>{u?.value || " - "}</InformationText>
            </InformationContent>
          </>
        ))}    
        {!(userDetail?.fields || []).length && (
          <FormattedMessage id="user.no.additional.info" />
        )}   
      </InformationsText>   
      <AppBar
        position="fixed"                
      >
        <Actions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => close()}         
          >
            <FormattedMessage id="close" />
          </Button>
        </Actions>   
      </AppBar>            
    </>    
  );
};

export default UserContent;