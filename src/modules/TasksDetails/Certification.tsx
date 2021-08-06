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
  GET_CERTIFICATION_APPROVAL_TASK
} from "@modules/Task/queries";

const Certifcation: React.FC = () => {

  const router = useRouter();
  const { id } = router.query;  

  const { loading, error, data, refetch } = useQuery<{
    getCertificationApprovalTask: Task;
  }>(GET_CERTIFICATION_APPROVAL_TASK, {
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
      <TitlePage onBack={() => router.push("/tasks")} task={data?.getCertificationApprovalTask}/>
      <Header task={data?.getCertificationApprovalTask}/>
      <UserInfo task={data?.getCertificationApprovalTask}/>
      <JustifyCard task={data?.getCertificationApprovalTask}/>        
      <GridHistory task={data?.getCertificationApprovalTask}/>
    </div>
  );
};

export default Certifcation;
