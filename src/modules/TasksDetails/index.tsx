// vendors
import React from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

// components
import Header from "./Header";
import UserInfo from "./UserInfo";
import JustifyCard from "./JustifyCard";
import Information from "./Information";
import GridRole from "./GridAdditionalInformations";
import GridHistory from "./GridHistory";
import Loading from "@components/Loading";
import Approval from "./Approval";
import Certification from "./Certification";
import Provisioning from "./Provisioning";
import RoleRight from "./RoleRight";
import User from "./User";
import SoD from "./SoD";

const TasksDetails: React.FC = () => {

  const router = useRouter();
  const { type } = router.query;

  return (
    <>     
      {type === "approval" && (
        <Approval />
      )}
      {type === "certification" && (
        <Certification />
      )}
      {type === "provisioning" && (
        <Provisioning />
      )}
      {type === "roleRight" && (
        <RoleRight />
      )}
      {type === "sod" && (
        <SoD />
      )}
      {type === "user" && (
        <User />
      )}
    </>
  );
};

export default TasksDetails;
