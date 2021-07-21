// venders
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

// components
import MinusCircleIcon from "@icons/MinusCircle";
import Status from "./Status";
import Button from "@components/Button";

// styles
import {
  UserCardStyle,
  UserCardTitle,
  UserId,
  UserPosition,
  Line,
  IconSpace,
  ObservationArea,
  Observation,
  TextArea,
  Text,
  AddDados,
  TextDescription,
  UserBottomArea,
} from "./styles";
import { CheckOutlined } from "@material-ui/icons";

const UserCard: React.FC = () => {
  const router = useRouter();
  return (
    <UserCardStyle>
      <UserCardTitle>
        <UserId>
          <Image
            src="https://i.ibb.co/nwV8d4s/Avatar.png"
            width={48}
            height={48}
          />
          <div>
            <div>
              <span>Access 1</span>
            </div>
            <div>
              <UserPosition>Administrador</UserPosition>
            </div>
          </div>
        </UserId>
        <IconSpace>
          <MinusCircleIcon width={24} height={24} className="classes.root" />
        </IconSpace>
      </UserCardTitle>
      <Line />
      <ObservationArea>
        <Observation>
          <TextArea>
            <span>This item cannot be requested because:</span>
            <div>
              -This entitlement requires an account on the resource, but this
              resource is not currently available in self-service.
            </div>
          </TextArea>

          <Status notification="INVALID ITEM" />
        </Observation>
      </ObservationArea>

      <AddDados>
        <span>Email*</span>
        <Text>REDE CSC ALGAR</Text>
      </AddDados>

      <AddDados>
        <span>CPF*</span>
        <Text>REDE CSC ALGAR</Text>
      </AddDados>

      <AddDados>
        <span>
          <FormattedMessage id="checkout.description" />*
        </span>
        <TextDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam velit
          accumsan, massa lacus gravida tincidunt metus. Rutrum ultricies tellus
          ac dolor sagittis massa et.
        </TextDescription>
      </AddDados>
      <Line />

      <UserBottomArea>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/checkout")}
        >
          <FormattedMessage id="checkout.save" />
        </Button>
      </UserBottomArea>
    </UserCardStyle>
  );
};

export default UserCard;
