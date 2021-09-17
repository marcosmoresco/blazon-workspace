//vendors
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { getLink } from "@utils/index";

//components
import Avatar from "@material-ui/core/Avatar";
import UserContent from "./UserContent";

//types
import { DetailUserProps } from "./types";

//styles
import {
  Info,
  BoxRequester,
  BoxRequesterContent,
  BoxRequesterTitle,
  BoxRequesterDisplayName,
  BoxRequesterAvatar,  
} from "@modules/Task/styles";

import {
  DrawerDetailUser
} from "./styles";

const DetailUser: React.FC<DetailUserProps> = ({ task, request, title = "task.requester", user }) => {  

  const [modalOpen, setModalOpen] = useState(false);

  const currentUser = user || task?.headers?.from;

  return (
    <>
      <BoxRequester onClick={() => setModalOpen(true)}>
        <Info>
          <BoxRequesterAvatar>
            <Avatar src={getLink("thumb", currentUser?.links || [])} />
          </BoxRequesterAvatar>                     
          <BoxRequesterContent>
            <BoxRequesterTitle>
              <FormattedMessage id={title} />
            </BoxRequesterTitle>
            <BoxRequesterDisplayName>
              {currentUser?.displayName || " - "}
            </BoxRequesterDisplayName>
          </BoxRequesterContent>                      
        </Info>                    
      </BoxRequester>
      {/*<Dialog
        onClose={() => setModalOpen(false)}
        onSave={() => setModalOpen(false)}
        fullWidth={false}
        isValid={true}
        open={modalOpen}
        title={currentUser?.displayName}
        noActions
      >
        <UserContent user={currentUser} />
      </Dialog>*/} 
      <DrawerDetailUser 
        anchor="right" 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}>
        <UserContent user={currentUser} close={() => setModalOpen(false)} type={(task && "task") || "request"}/>                
      </DrawerDetailUser>
    </>    
  );
};

export default DetailUser;