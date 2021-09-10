// vendors
import React from "react";
import { injectIntl } from "react-intl";
import ShoppingCartSimpleIcon from "@icons/ShoppingCartSimple";
import ArrowLeft from "@icons/ArrowLeft";
import Link from "next/link";
import { useRouter } from "next/router"; 

// types
import { TitleProps } from "./types";

// styles
import { TitleBox, TitleText, Line, Header, InfoText } from "./styles";

import { TitleHierarchy } from "@components/TitlePage/types";
import TitlePage from "@components/TitlePage";

const TitlePageTask: React.FC<TitleProps> = ({ intl, onBack, task }) => {

  const router = useRouter();  
  const { id, type } = router.query;

  const hierarchy: TitleHierarchy = {
    name: "tasks",  
    href: "/tasks",
    children: [{
      formatedName: String(id)
    }]  
  };

  let subTitle = "";

  if(["approval", "sod"].includes(type as string)) {
    if(task?.approvalItemDetails?.entitlementName) {
      subTitle = `${task?.approvalItemDetails?.entitlementName} - ${task?.approvalItemDetails?.entitlementIdentifier}`;
    }
    if(task?.approvalItemDetails?.roleName) {
      subTitle = `${task?.approvalItemDetails?.roleName} - ${task?.approvalItemDetails?.roleIdentifier}`;
    }
    if(task?.approvalItemDetails?.resourceName) {
      subTitle = `${task?.approvalItemDetails?.resourceName} - ${task?.approvalItemDetails?.resourceIdentifier}`;
    }
  } else if(type as string  === "certification") {
    if(task?.certificationItemDetails?.entitlementName) {
      subTitle = `${task?.certificationItemDetails?.entitlementName} - ${task?.certificationItemDetails?.entitlementIdentifier}`;
    }
    if(task?.certificationItemDetails?.roleName) {
      subTitle = `${task?.certificationItemDetails?.roleName} - ${task?.certificationItemDetails?.roleIdentifier}`;
    }
    if(task?.certificationItemDetails?.resourceName) {
      subTitle = `${task?.certificationItemDetails?.resourceName} - ${task?.certificationItemDetails?.resourceIdentifier}`;
    }
  } else if(type as string  === "provisioning") {
    subTitle = `${task?.provisioningItemDetail?.resource?.name} - ${task?.provisioningItemDetail?.resource?.name}`;
  } else if(type as string  === "provisioning") {
    subTitle = `${task?.itemDetails?.roleName}`;
  }

  return (
    <>
     <TitlePage 
        title={subTitle}                 
        hierarchy={hierarchy} 
        onBack={() => router.push("/tasks")}/>      
    </>
  );
};

export default injectIntl(TitlePageTask);
