// vendors
import React, { useState } from "react";
import { FormattedMessage, injectIntl, useIntl } from "react-intl";
import { useQuery, useMutation } from "@apollo/client";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import { paginate, getLink } from "@utils/index";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import * as Yup from "yup";
import { useFormikContext, withFormik } from "formik";

// types
import { TeamProps, ResponsibleTeamRepresentation, ResponsibleTeam } from "./types";
import { TitleHierarchy } from "@components/TitlePage/types";
import { User } from "@types";

// components
import TitlePage from "@components/TitlePage";
import Loading from "@components/Loading";
import UserThumb from "@components/UserThumb";
import Checkbox from "@components/Checkbox";
import Dialog from "@components/Dialog";
import Button from "@components/Button";
import Tabs from "@components/Tabs";
import EmptyState from "@components/EmptyState";
import Snackbar from "@components/Snackbar";
import DatePicker from "@components/DatePicker";
import TextField from "@components/TextField";
import TeamDetails from "./Details";

// images
import EmptyStateImage from "@images/EmptyStateTypeahead.svg";

// Icons
import SearchIcon from "@icons/Search";

// Queries
import {
  GET_TEAM
} from "@modules/Team/queries";

//Mutations
import {
  RESPONSIBLE_TEAM_GENERATE_REQUESTS
} from "@modules/Team/mutations";

// styles
import {  
  InputSearchBox,
  OutlinedInputSearch,  
  ItemCard,
  Content,
  UserContent,
  Username,
  DisplayName,
  UserContentInfo,
  CheckboxContent,
  Actions,
  DialogContent,
  LoadMoreContent,
} from "./styles";

const validationSchema = Yup.object({
  applicationDialog: Yup.object({
    effectiveDate: Yup.string(),
    justification: Yup.string().required(<FormattedMessage id="applicationdialog.justification.required" />)
  })
})

const formik = {
  initialValues: {
    applicationDialog: {
      effectiveDate: undefined,
      justification: ''
    }
  },
  validationSchema,
  enableReinitialize: true,
  isInitialValid: false
}

const ApplicationDialog = () => {
  const form = useFormikContext()
  const intl = useIntl()
  return (
    <div className='modal'>
      <div className='modal-section'>
        {intl.formatMessage({ id: 'applicationdialog.dialog.title' })}
      </div>
      <div className='modal-description'>
        {intl.formatMessage({ id: 'applicationdialog.dialog.description' })}
      </div>
      <div className='pt48'></div>
      <DatePicker
        label={intl.formatMessage({
          id: 'applicationdialog.dialog.effectiveDate'
        })}
        name='applicationDialog.effectiveDate'
        onChange={(value: any) => {
          form.setFieldValue('applicationDialog.effectiveDate', value)
        }}
      />
      <div className='pt22'></div>
      <TextField
        form={form}
        name='applicationDialog.justification'
        multiline
        rows={3}
        rowsMax={4}
      />
    </div>
  )
}


const Team: React.FC<TeamProps> = ({ intl }) => {

  const dispatch = useDispatch();

  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(20);
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<User>();
  const [checked, setChecked] = useState<number[]>([]);
  const [requestType, setRequestType] = useState<string>("");
  const form = useFormikContext();

  const { loading, data, refetch } = useQuery<{
    getResponsibleTeam: ResponsibleTeamRepresentation;
  }>(GET_TEAM, {
    fetchPolicy: "network-only"    
  }); 

  const [generateRequests, {}] = useMutation(RESPONSIBLE_TEAM_GENERATE_REQUESTS, { 
    refetchQueries: [
      {
        query: GET_TEAM        
      }
    ],  
    onCompleted: ({ result }) => {        
      if(result) {
        dispatch(
          addMessage(
            intl.formatMessage({id: `team.message.${requestType}`})
          )
        );  
        setChecked([]);      
        setModalOpen(false);      
        form.resetForm();             
      }     
    },
  });

  if(loading) {
    return (
      <Loading container/>
    )
  } 

  const handleCheck = (t: number) => {
    let newChecked = [];
    if(checked.includes(t)) {
      newChecked = checked.filter((c) => c !== t);      
    } else {
      newChecked = [...checked, t];     
    }          
    setChecked(newChecked);
  };

  const hierarchy: TitleHierarchy = {
    name: "team",   
  };

  const tabs = [{
    id: 1,
    name: intl.formatMessage({id: "attributes"}),
    content: <TeamDetails user={current}/>,
  }];

  const actions = (
    <>     
      <Button
        onClick={() => {
          setRequestType("REVOKE_USER");
          setModalOpen(true);
        }}
        color="primary"
        variant="rounded">
          <FormattedMessage id="revoke" />
      </Button>
      <Button
        onClick={() => {
          setRequestType("INACTIVATE_USER");
          setModalOpen(true);
        }}
        color="primary"
        variant="rounded">
          <FormattedMessage id="inactivate" />
      </Button>
      <Button
        onClick={() => {
          setRequestType("ACTIVATE_USER");
          setModalOpen(true);
        }}
        color="primary"
        variant="rounded">
          <FormattedMessage id="activate" />
      </Button>
    </>
  )    
  
  return (
    <>     
      <TitlePage
        title={"team"}                     
        hierarchy={hierarchy}
      />   
      <InputSearchBox>
        <OutlinedInputSearch
          value={filter}
          placeholder={intl.formatMessage({id: "team.find.member"})}
          onChange={async (e: any) => {
            setFilter(e?.target?.value);
            setPage(0);
            setTotal(20);                                     
          }}            
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          labelWidth={0}
        />
      </InputSearchBox>

      <Content>
        <Grid container spacing={3}>
          {paginate((data?.getResponsibleTeam?.representation || []), total, 0)
          .filter((team: ResponsibleTeam) => !filter || team?.user?.displayName.toLocaleUpperCase().includes(filter.toLocaleUpperCase()))
          .map((team: ResponsibleTeam, index: number) => (
            <Grid item xs={3} key={`search-card-item-${index}`}>
              <ItemCard>
                <CheckboxContent>
                  <Checkbox value={checked.includes(team?.user?.identifier || -1)} onChange={(val: any, event: any) => {
                    event.stopPropagation();
                    event.nativeEvent.stopImmediatePropagation();
                    handleCheck(team?.user?.identifier);
                  }}/>
                </CheckboxContent>               
                <UserContent onClick={() => {
                  setCurrent(team?.user);
                  setOpen(true);
                }}>
                  <UserThumb 
                    notShowDisplayName
                    image={getLink("thumb", team?.user?.links || [])}
                  /> 
                  <UserContentInfo>
                    <Username>{team?.user?.username}</Username>
                    <DisplayName>{team?.user?.displayName}</DisplayName>
                  </UserContentInfo>
                </UserContent>                    
              </ItemCard>
            </Grid>
          ))}  
        </Grid>
      </Content> 
      {paginate((data?.getResponsibleTeam?.representation || []), total, 0)
      .filter((team: ResponsibleTeam) => !filter || team?.user?.displayName.toLocaleUpperCase().includes(filter.toLocaleUpperCase())).length === 0 && (
          <EmptyState
            image={EmptyStateImage}
            title="team.emptyState.title"
            text="team.emptyState.description.text"
          />
      )}
      {paginate((data?.getResponsibleTeam?.representation || []), total, page + 1)
      .filter((team: ResponsibleTeam) => !filter || team?.user?.displayName.toLocaleUpperCase().includes(filter.toLocaleUpperCase())).length > 0 && (
        <LoadMoreContent>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {                   
              setPage(page + 1);
              setTotal(total + 20);
            }}
          >
            <FormattedMessage id="loadMore" />
          </Button>
        </LoadMoreContent>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={current?.displayName}
        content={<DialogContent dividers><Tabs tabs={tabs} /></DialogContent>}
        header={<>
          <UserContentInfo>
            <Username>{current?.username}</Username>
            <DisplayName>{current?.displayName}</DisplayName>
          </UserContentInfo>
        </>}
        actions={<Actions>
          <Button                    
            variant="contained"
            color="primary"
            onClick={async () => {                                      
              setOpen(false);                                   
            }}
          >
            {intl.formatMessage({id: "close"})}
          </Button>
        </Actions>}
        onSave={() => {
                    
        }}        
      />  
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={intl.formatMessage({ id: `team.${requestType}` })}
        onSave={() => {         
          generateRequests({
            variables: {
              payload: JSON.stringify({
                requestType, 
                beneficiaries: checked.map((userId: number) => ({
                  identifier: userId
                })),
                ...form?.values?.applicationDialog
              })              
            },
          });
        }}
        isValid={form?.isValid}
      >
        <ApplicationDialog />
      </Dialog>
       <Snackbar
        open={checked.length}
        total={checked.length}
        action={
          actions
        }
      />             
    </>
  );
};

export default withFormik(formik)(injectIntl(Team));
