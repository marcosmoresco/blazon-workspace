// vendors
import React from "react";

// components
import TitlePage from "./TitlePage";
import Header from "./Header";
import UserInfo from "./UserInfo";
import JustifyCard from "./JustifyCard";
import Information from "./Information";
import GridRole from "./GridRole";
import GridHistory from "./GridHistory";

const TasksDetails: React.FC = () => {
  return (
    <div>
      <TitlePage onBack={() => {}} />
      <Header />
      <UserInfo />
      <JustifyCard />
      <Information />
      <GridRole />
      <GridHistory />
    </div>
  );
};

export default TasksDetails;
