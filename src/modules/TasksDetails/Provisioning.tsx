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
  GET_PROVISIONING_TASK
} from "@modules/Task/queries";

const Approval: React.FC = () => {

  const router = useRouter();
  const { id } = router.query;  

  const { loading, error, data, refetch } = useQuery<{
    getProvisioningTask: Task;
  }>(GET_PROVISIONING_TASK, {
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
      <TitlePage onBack={() => router.push("/tasks")} task={data?.getProvisioningTask}/>
      <Header task={data?.getProvisioningTask} />
      <UserInfo task={data?.getProvisioningTask}/>
      <JustifyCard task={data?.getProvisioningTask}/>      
      <GridAdditionalInformations task={data?.getProvisioningTask}/>
      <GridHistory task={data?.getProvisioningTask}/>
    </div>
  );
};

export default Approval;
