import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import Card from "@components/Card";
import TitlePage from "@components/TitlePage";
import Tabs from "@components/Tabs";
import SearchIcon from "@icons/Search";
import ResourceDetails from "./tabs/Resource/Details";
import ResourceEntitlements from "./tabs/Resource/Entitlements";
import EntitlementDetails from "./tabs/Entitlement/Details";
import RoleAttributes from "./tabs/Role/Attributes";
import RoleAccess from "./tabs/Role/Access";
import AdminAccountDetails from "./tabs/AdminAccount/Details";
import type { SearchDetailProps } from "./types";

export default function PageSearchDetail() {

  const router = useRouter();
  const int = useIntl();

  let tabs: SearchDetailProps[] = [];

  if(router.pathname.indexOf("resource") > -1) {
    tabs = [
      {
        id: 1,
        name: int.formatMessage({id: "details"}),
        content: <ResourceDetails />,
      },
      {
        id: 2,
        name: int.formatMessage({id: "entitlements"}),
        content: <ResourceEntitlements />,
      },
    ];
  } else if(router.pathname.indexOf("entitlement") > -1) {
    tabs = [
      {
        id: 1,
        name: int.formatMessage({id: "details"}),
        content: <EntitlementDetails />,
      },
    ]
  } else if(router.pathname.indexOf("role") > -1) {
    tabs = [
      {
        id: 1,
        name: int.formatMessage({id: "attributes"}),
        content: <RoleAttributes />,
      },
      {
        id: 2,
        name: int.formatMessage({id: "access"}),
        content: <RoleAccess />,
      },
    ]
  } else {
    tabs = [
      {
        id: 1,
        name: int.formatMessage({id: "details"}),
        content: <AdminAccountDetails />,
      },
    ]
  }

  return (
    <>
      <TitlePage 
        title="search" 
        subTitle="detailing"
        onBack={() => router.push("/search")} icon={<SearchIcon width={21} height={21}/>}/>
      <div className="Default-content">
        <Card>
          <Tabs tabs={tabs} />
        </Card>
      </div>     
    </>
  );
}
