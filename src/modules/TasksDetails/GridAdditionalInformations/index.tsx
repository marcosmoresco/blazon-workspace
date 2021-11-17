// vendors
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
// components
import Roles from "./Roles";
import GridAdditionalInformationsApproval from "./Approval";
import GridAdditionalInformationsCertification from "./Certification";
import GridAdditionalInformationsProvisioning from "./Provisioning";
import GridAdditionalInformationsRoleRight from "./RoleRight";
import GridAdditionalInformationsUser from "./User";

// styles
import {
  WorkArea,
  MenuDetail,
  StyleApprovalTab,
  InsideLine,
  DeitalList,
  GridArea,
} from "./style";

//types
import { 
  AdditionalInformationsProps 
} from "./types";

const GridAdditionalInformations: React.FC<AdditionalInformationsProps> = ({ task }) => {
  
  const router = useRouter();
  const { id, type } = router.query;

  const [tab, setTab] = useState<"resource" | "role">("resource");
  
  return (
    <>  
      {type === "approval" && (
        <GridAdditionalInformationsApproval task={task} />
      )}
      {type === "certification" && (
        <GridAdditionalInformationsCertification task={task} /> 
      )}
      {type === "provisioning" && (
        <GridAdditionalInformationsProvisioning task={task} />
      )}
      {type === "roleRight" && (
        <GridAdditionalInformationsRoleRight task={task} />
      )}
       {type === "user" && (
        <GridAdditionalInformationsUser task={task} />
      )}          
    </>
  );
};

export default GridAdditionalInformations;
