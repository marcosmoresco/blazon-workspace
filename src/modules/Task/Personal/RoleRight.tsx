import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import apolloClient from "@utils/apollo-client";
import { useQuery } from "@apollo/client";
import Avatar from "@material-ui/core/Avatar";
import Button from "@components/Button";
import Card from "@components/Card";
import Checkbox from "@components/Checkbox";
import Loading from "@components/Loading";
import Filter from "@components/Filter";
import Section from "@components/Section";
import Select from "@components/Select";
import Tutorial from "@components/Tutorial";
import EmptyState from "@components/EmptyState";
import EmptyStateSearchIcon from "@icons/EmptyStateSearch";
import ArrowsOutIcon from "@icons/ArrowsOut";
import ArrowClockwiseIcon from "@icons/ArrowClockwise";
import CalendarIcon from "@icons/Calendar";
import CheckSquareOffsetIcon from "@icons/CheckSquareOffset";
import CirclesFourIcon from "@icons/CirclesFour";
import DotsThreeIcon from "@icons/DotsThree";
import UserGearIcon from "@icons/UserGear";
import { connect } from "react-redux";
//import { all, save, remove } from './actions'
import { addMessage } from "@actions/index";
import { sections, types, filters } from "@modules/Task/constants";
import type { ListProps, Task } from "@modules/Task/types";
import type { Link } from "@types";
import { getLink } from "@utils/index";
import {
  LoadMoreContent,
} from "@modules/Task/styles";
import Tasks from "@modules/Task/components";

//queries
import { GET_ROLE_RIGHT_APPROVAL_TASKS } from "@modules/Task/queries";

const PersonalTasksProvisioning: FC<ListProps> = ({ dispatch, filtered = {} }) => {

  const [filteredString, setFilteredString] = useState<string>("{}");
  const [size, setSize] = useState<number>(10);

  const { loading, error, data, refetch } = useQuery<{
    getRoleRightApprovalTasks: { links: Link[], representation: Task[] };
  }>(GET_ROLE_RIGHT_APPROVAL_TASKS, {
    variables: {
      page: 0,
      size: 10,
      ord: "createdDate:desc"
    },  
  });

  useEffect(() => {
    if(JSON.stringify(filtered) !== filteredString) {
      setSize(10);
      setFilteredString(JSON.stringify(filtered));
      refetch({       
        page: 0,
        size: 10,
        ord: "createdDate:desc",
        filters: JSON.stringify(filtered)
      });
    }
  }, [filteredString, filtered, refetch]);

  if(loading) {
    return (
      <Loading container bgColor="#FFFFFF"/>
    )
  }  

  return (   
    <>
      {(data?.getRoleRightApprovalTasks?.representation || []).length > 0 && (
        <Tasks list={data?.getRoleRightApprovalTasks.representation || []} type="ROLE_RIGHT_TASK" subType="roleRight" size={size} filteredString={filteredString}/>
      )}
      {(data?.getRoleRightApprovalTasks?.representation || []).length === 0 && (
        <EmptyState icon={<EmptyStateSearchIcon />} title="task.empty" text="task.empty.text" bgColor="#FFFFFF"/>
      )}
      {getLink("next", data?.getRoleRightApprovalTasks?.links || []) && (
        <LoadMoreContent>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSize(size + 10);
              refetch({
                page: 0,
                size: size + 10,
                ord: "createdDate:desc",
                filters: filteredString
              })
            }}
          >
            <FormattedMessage id="loadMore" />
          </Button>
        </LoadMoreContent>
      )}
    </> 
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(PersonalTasksProvisioning);
