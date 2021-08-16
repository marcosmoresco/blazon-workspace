// vendors
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

// components
import TitlePage from "./TitlePage";
import Header from "./Header";
import UserInfo from "./UserInfo";
import JustifyCard from "./JustifyCard";
import Continue from "./Continue";
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
  const [payload, setPayload] = useState<{[key: string]: any}>(); 
  const [stage, setStage] = useState<string>("");

  const { loading, error, data, refetch } = useQuery<{
    getProvisioningTask: Task;
  }>(GET_PROVISIONING_TASK, {
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
      <TitlePage onBack={() => router.push("/tasks")} task={data?.getProvisioningTask}/>     
      <Header task={data?.getProvisioningTask} payload={payload} setPayload={setPayload} setStage={setStage} stage={stage}/>
      {["CREATE_ACCOUNT", "CHANGE_PASSWORD"].includes(data?.getProvisioningTask?.type || "") 
      && !["WAITING_ASSIGN", "DONE"].includes(data?.getProvisioningTask?.headers?.status || "") &&  <Continue task={data?.getProvisioningTask} stage={stage} payload={payload} setPayload={setPayload}/>}
      <UserInfo task={data?.getProvisioningTask}/>
      <JustifyCard task={data?.getProvisioningTask}/>      
      <GridAdditionalInformations task={data?.getProvisioningTask}/>
      <GridHistory task={data?.getProvisioningTask}/>
    </div>
  );
};

export default Approval;
