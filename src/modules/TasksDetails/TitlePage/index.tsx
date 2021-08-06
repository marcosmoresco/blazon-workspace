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

const TitlePage: React.FC<TitleProps> = ({ intl, onBack, task }) => {

  const router = useRouter();  
  const { type } = router.query;

  return (
    <>
      <Header>
        <div>
          {onBack && (
            <div onClick={onBack}>
              <Link href="/tasks">
                <a>
                  <ArrowLeft />
                </a>
              </Link>
            </div>
          )}
          <TitleBox>
            <ShoppingCartSimpleIcon width={24} height={24} />
            <TitleText>{intl.formatMessage({ id: "tasks" })}</TitleText>
          </TitleBox>
        </div>
        <InfoText>
          {["approval", "sod"].includes(type as string) && (
            <>
              {task?.approvalItemDetails?.entitlementName && (
                <>
                  {task?.approvalItemDetails?.entitlementName} - {task?.approvalItemDetails?.entitlementIdentifier}
                </>                
              )}  
              {task?.approvalItemDetails?.roleName && (
                <>
                  {task?.approvalItemDetails?.roleName} - {task?.approvalItemDetails?.roleIdentifier}
                </>                
              )} 
              {task?.approvalItemDetails?.resourceName && (
                <>
                  {task?.approvalItemDetails?.resourceName} - {task?.approvalItemDetails?.resourceIdentifier}
                </>                
              )}              
            </>            
          )}
          {type === "certification" && (
            <>
              {task?.certificationItemDetails?.entitlementName && (
                <>
                  {task?.certificationItemDetails?.entitlementName} - {task?.certificationItemDetails?.entitlementIdentifier}
                </>                
              )}  
              {task?.certificationItemDetails?.roleName && (
                <>
                  {task?.certificationItemDetails?.roleName} - {task?.certificationItemDetails?.roleIdentifier}
                </>                
              )} 
              {task?.certificationItemDetails?.resourceName && (
                <>
                  {task?.certificationItemDetails?.resourceName} - {task?.certificationItemDetails?.resourceIdentifier}
                </>                
              )}              
            </>            
          )}
          {type === "provisioning" && (
            <>              
              {task?.provisioningItemDetail?.resource?.name && (
                <>
                  {task?.provisioningItemDetail?.resource?.name} - {task?.provisioningItemDetail?.resource?.name}
                </>                
              )}              
            </>            
          )}
          {type === "roleRight" && (
            <> 
              {task?.itemDetails?.roleName && (
                <>
                  {task?.itemDetails?.roleName}
                </>                
              )}            
            </>            
          )}
        </InfoText>
      </Header>
      <Line />
    </>
  );
};

export default injectIntl(TitlePage);
