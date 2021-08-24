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
import { UserContentProps } from "./types";
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

const getUser = async (identifier: number, callback: any) => { 
  const resp = await axios.get(`/api/user/${identifier}`,        
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",           
      },
    }
  );
  callback(resp);
}

const UserContent: React.FC<UserContentProps> = ({ user, close }) => { 
  
  const [userDetail, setUserDetail] = useState<{[key: string] : any}>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if(!userDetail.identifier && !loading && user?.identifier) {
      setLoading(true);
      getUser(user.identifier, (resp: any) => {       
        setUserDetail(resp.data);
        setLoading(false);
      });
    }
  }, [user, userDetail, loading]); 

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
        <InformationLabel>
          <FormattedMessage id="identifier" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.identifier || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="username" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.username || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="personalEmail" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.personalEmail || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="email" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.email || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="firstName" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.firstName || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="middleName" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.middleName || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="lastName" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.lastName || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="birthDate" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.birthDate || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="mobilePhone" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.mobilePhone || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="phone" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.phone || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="createdAt" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.createdAt || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="modifiedAt" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.modifiedAt || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="lastAccess" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{userDetail?.lastAccess || " - "}</InformationText>
        </InformationContent>
        <InformationLabel>
          <FormattedMessage id="locked" />
        </InformationLabel>
        <InformationContent>          
          <InformationText>{<FormattedMessage id={userDetail?.locked ? "yes": "no"} />}</InformationText>
        </InformationContent>
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