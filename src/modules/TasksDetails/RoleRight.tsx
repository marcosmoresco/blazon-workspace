// vendors
import React from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

// components
import TitlePage from "./TitlePage";
import Header from "./Header";
import UserInfo from "./UserInfo";
import JustifyCard from "./JustifyCard";
import Information from "./Information";
import GridAdditionalInformations from "./GridAdditionalInformations";
import GridHistory from "./GridHistory";
import Loading from "@components/Loading";

//types
import { 
  Task 
} from "@modules/Task/types";

//queries
import { 
  GET_ROLE_RIGHT_APPROVAL_TASK
} from "@modules/Task/queries";

const RoleRight: React.FC = () => {

  const router = useRouter();
  const { id } = router.query;  

  const { loading, error, data, refetch } = useQuery<{
    getRoleRightApprovalTask: Task;
  }>(GET_ROLE_RIGHT_APPROVAL_TASK, {
    variables: {
      id: Number(id)
    },
    fetchPolicy: "network-only"
  });

  if(loading) {
    return (
      <Loading container/>
    )
  }

  return (
    <div>
      <TitlePage onBack={() => router.push("/tasks")} task={data?.getRoleRightApprovalTask}/>
      <Header task={data?.getRoleRightApprovalTask}/>
      <UserInfo task={data?.getRoleRightApprovalTask}/>
      <JustifyCard task={data?.getRoleRightApprovalTask}/>      
      <GridAdditionalInformations task={data?.getRoleRightApprovalTask}/>
      <GridHistory task={data?.getRoleRightApprovalTask}/>
    </div>
  );
};

export default RoleRight;
