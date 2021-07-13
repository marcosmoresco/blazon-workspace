// vendors
import React from "react";
import { FormattedMessage } from "react-intl";

// types
import { UserCardProps } from "./types";

// styles

import { User, UserType, Name, Image } from "./styles";

const UserRequesterCard: React.FC<UserCardProps> = ({
  UserName,
  UserImage,
}) => {
  return (
    <User>
      <Image src={UserImage} alt={UserName} />
      <span>
        <UserType>
          <FormattedMessage id="request.requester" />
        </UserType>
        <Name>{UserName}</Name>
      </span>
    </User>
  );
};

export default UserRequesterCard;
