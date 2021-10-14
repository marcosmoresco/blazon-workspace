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
  GET_USER_REVALIDATION_TASK
} from "@modules/Task/queries";

const UserRevalidation: React.FC = () => {

  const router = useRouter();
  const { id } = router.query;  

  const { loading, error, data, refetch } = useQuery<{
    getUserRevalidationTask: Task;
  }>(GET_USER_REVALIDATION_TASK, {
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
      <TitlePage onBack={() => router.push("/tasks")} task={data?.getUserRevalidationTask}/>
      <Header task={data?.getUserRevalidationTask}/>
      <UserInfo task={data?.getUserRevalidationTask}/>            
      <GridAdditionalInformations task={data?.getUserRevalidationTask}/>
      <GridHistory task={data?.getUserRevalidationTask}/>
    </div>
  );
};

export default UserRevalidation;
