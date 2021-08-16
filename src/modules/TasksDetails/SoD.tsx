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
  GET_SOD_APPROVAL_TASK
} from "@modules/Task/queries";

const SoD: React.FC = () => {

  const router = useRouter();
  const { id } = router.query;  

  const { loading, error, data, refetch } = useQuery<{
    getSoDApprovalTask: Task;
  }>(GET_SOD_APPROVAL_TASK, {
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
      <TitlePage onBack={() => router.push("/tasks")} task={data?.getSoDApprovalTask}/>
      <Header task={data?.getSoDApprovalTask}/>
      <UserInfo task={data?.getSoDApprovalTask}/>
      <JustifyCard task={data?.getSoDApprovalTask}/>        
      <GridHistory task={data?.getSoDApprovalTask}/>
    </div>
  );
};

export default SoD;
