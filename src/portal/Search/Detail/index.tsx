import { useRouter } from "next/router";
import Card from "@components/Card";
import TitlePage from "@components/TitlePage";
import Tabs from "@components/Tabs";
import SearchIcon from "@icons/Search";
import Details from "./tabs/Details";
import Entitlements from "./tabs/Entitlements";

export default function PageSearchDetail() {

  const router = useRouter();

  const tabs = [
    {
      id: 1,
      name: "Details",
      content: <Details />,
    },
    {
      id: 2,
      name: "Entitlements",
      content: <Entitlements />,
    },
  ];

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
