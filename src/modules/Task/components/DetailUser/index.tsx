//vendors
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { getLink } from "@utils/index";
import Avatar from "@material-ui/core/Avatar";

//components
import Dialog from "./Dialog";
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

const DetailUser: React.FC<DetailUserProps> = ({ task }) => {  

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <BoxRequester onClick={() => setModalOpen(true)}>
        <Info>
          <BoxRequesterAvatar>
            <Avatar src={getLink("thumb", task?.headers?.from?.links || [])} />
          </BoxRequesterAvatar>                     
          <BoxRequesterContent>
            <BoxRequesterTitle>
              <FormattedMessage id="task.requester" />
            </BoxRequesterTitle>
            <BoxRequesterDisplayName>
              {task?.headers?.from?.displayName || " - "}
            </BoxRequesterDisplayName>
          </BoxRequesterContent>                      
        </Info>                    
      </BoxRequester>
      <Dialog
        onClose={() => setModalOpen(false)}
        onSave={() => setModalOpen(false)}
        fullWidth={false}
        isValid={true}
        open={modalOpen}
        title={task?.headers?.from?.displayName}
        noActions
      >
        <UserContent user={task?.headers?.from} />
      </Dialog>    
    </>    
  );
};

export default DetailUser;