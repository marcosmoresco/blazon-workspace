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
  GET_REQUEST_APPROVAL_TASK
} from "@modules/Task/queries";

const Approval: React.FC = () => {

  const router = useRouter();
  const { id } = router.query;  

  const { loading, error, data, refetch } = useQuery<{
    getRequestApprovalTask: Task;
  }>(GET_REQUEST_APPROVAL_TASK, {
    variables: {
      id: Number(id)
    },
  });

  if(loading) {
    return (
      <Loading container/>
    )
  }

  return (
    <div>
      <TitlePage onBack={() => router.push("/tasks")} task={data?.getRequestApprovalTask}/>
      <Header task={data?.getRequestApprovalTask}/>
      <UserInfo task={data?.getRequestApprovalTask}/>
      <JustifyCard task={data?.getRequestApprovalTask}/>      
      <GridAdditionalInformations task={data?.getRequestApprovalTask}/>
      <GridHistory task={data?.getRequestApprovalTask}/>
    </div>
  );
};

export default Approval;
