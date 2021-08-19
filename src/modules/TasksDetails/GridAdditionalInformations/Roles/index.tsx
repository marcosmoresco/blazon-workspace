import React, { useState, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import DataGrid from "@components/DataGrid";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import useMockRequest from "@utils/mockRequest";
import Filter from "@components/Filter";
import useStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@components/Checkbox";
import CardScreen from "./CardScreenUntitle";

//queries
import {
  GET_ROLE_RIGHT_APPROVAL_TASK_ITEMS
} from "@modules/Task/queries";

//mutations 
import {
  APPROVE_ROLE_RIGHT_APPROVAL_TASK_ITEMS
} from "@modules/Task/mutations";

//types
import {
  RoleRightTaskItems
} from "@modules/Task/types";

const Roles = () => {
  
  const intl = useIntl();
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const [list, setList] = useState([]);
  const [listClearValue, setListClearValue] = useState<boolean>(false);
  const [type, setType] = useState<string>("APPROVED");

  const { loading, error, data, refetch, previousData } = useQuery<{
    getRoleRightApprovalTaskItems: RoleRightTaskItems;
  }>(GET_ROLE_RIGHT_APPROVAL_TASK_ITEMS, {
    variables: {
      id: Number(id)
    },
  });

  if(JSON.stringify(data?.getRoleRightApprovalTaskItems.items || []) !== (JSON.stringify(list))) {
    setListClearValue(true); 
    setList(data?.getRoleRightApprovalTaskItems?.items || []);
  } 

  const [approveRoleRightApprovalTaskItems, {}] = useMutation(APPROVE_ROLE_RIGHT_APPROVAL_TASK_ITEMS, { 
    refetchQueries: [
      {
        query: GET_ROLE_RIGHT_APPROVAL_TASK_ITEMS,
        variables: {
          id: Number(id)
        }
      },
    ],  
    onCompleted: ({ approveRoleRightApprovalTaskItems }) => {        
      if(approveRoleRightApprovalTaskItems) {
        dispatch(
          addMessage(
            intl.formatMessage({id: type === "APPROVED" ? "tasks.item.approved.success" : "tasks.item.disapproved.success"})
          )
        );                         
      }     
    },
  });

  const columns = [
    {
      field: "entryType",
      headerName: <FormattedMessage id="tasks.entryType"/>,
      sortable: false,
    },
    {
      field: "entryId",
      headerName: <FormattedMessage id="tasks.entryIdentifier" />,
      sortable: false,
    },
    {
      field: "entryName",
      headerName: <FormattedMessage id="tasks.entryName"/>,
      sortable: false,
    },
    {
      field: "approvalStatus",
      headerName: <FormattedMessage id="tasks.approved" />,
      sortable: false,
      renderCell: (row) => <Checkbox value={row.approvalStatus === "APPROVED"} onChange={(val: any) => {
        const approvalStatus = row.approvalStatus === "APPROVED" ? "DISAPPROVED": "APPROVED";
        setType(approvalStatus);        
        approveRoleRightApprovalTaskItems({
          variables: {
            id: Number(id),
            payload: JSON.stringify([{
              identifier: row.identifier,
              entryId: row.entryId,
              approvalStatus
            }])
          }
        })
      }}/>
    },
  ];

  return (
    <CardScreen
      loading={loading}
      title="profile"
      icon=""
      onBack={() => router.push("/profile")}
    >          
      <div>
        <DataGrid   
          listClear={listClearValue}
          handleListClear={() => setListClearValue(false)}
          params={{}}
          height={600}
          list={list || []}
          links={[]}
          columns={columns}
          page={1}
          size={100}
          rowsPerPageList={[25, 50, 75, 100]}
          handleClick={() => {}}
        />
      </div>
    </CardScreen>
  );
};

export default withStyles(useStyles)(Roles);
