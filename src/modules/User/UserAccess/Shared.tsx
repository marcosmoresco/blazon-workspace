import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ShareIcon from "@icons/Share";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import Button from "@components/Button";
import CardScreen from "@components/CardScreen";
import UserIcon from "@icons/User";
import Dialog from "@components/Dialog";
import DataGrid from "@components/DataGrid";
import Filter from "@components/Filter";
import { Form, Formik, useFormikContext } from "formik";
import {
  useStyles,
  BoxAction,
  BoxAutocompleteOption,
  AutocompleteUsers,
  BoxUserThumb,
  AutocompletePaper,
} from "./styles";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotebookIcon from "@icons/Notebook";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@components/Divider";
import MagnifyingGlassIcon from "@icons/MagnifyingGlass";
import UserThumb from "@components/UserThumb";
import { confirm } from "@components/Dialog/actions";
import { addMessage } from "@actions/index";
import {
  GET_USER_FULL_TEXT,
  GET_USER_ACCOUNTS,
  GET_USER_SHARED_ACCOUNT_MEMBERS,
} from "@modules/User/queries";
import {
  SHARE_USER_SHARED_ACCOUNT,
  UNSHARE_USER_SHARED_ACCOUNT,
} from "@modules/User/mutations";
import { User } from "@types";
import { getLink } from "@utils/index";
import { TitleHierarchy } from "@components/TitlePage/types";
import EmptyStateSharedAccountImage from "@images/EmptyStateSharedAccount.svg";

const filters = [
  {
    name: "resourceName",
    label: <FormattedMessage id="resource" />,
    type: "text",
  },
  {
    name: "accountIdentifier",
    label: <FormattedMessage id="accountIdentifier" />,
    type: "text",
  },
  {
    name: "status",
    label: <FormattedMessage id="status" />,
    type: "list",
    values: [
      {
        label: <FormattedMessage id="active" />,
        value: "ACTIVE",
      },
      {
        label: <FormattedMessage id="revoked" />,
        value: "REVOKED",
      },
    ],
    bind: "value",
    view: "label",
  }, 
];

const columns = ({ classes }) => [
  {
    field: "resourceName",
    headerName: <FormattedMessage id="resource" />,
    sortable: false,
  },
  {
    field: "accountIdentifier",
    headerName: <FormattedMessage id="accountIdentifier" />,
    sortable: false,
  },
  {
    field: "createdAt",
    headerName: <FormattedMessage id="createdAt" />,
    sortable: false,
  },
  {
    field: "status",
    headerName: <FormattedMessage id="status" />,
    sortable: false,
  },
  {
    field: "action",
    headerName: <FormattedMessage id="actions" />,
    sortable: false,
    renderCell: () => {
      return (
        <div className={classes.actionIcon}>
          <ShareIcon height={28} width={28} />
        </div>
      );
    },
  },
];

const SharedDialogContent = ({ current, classes }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { resourceName, accountIdentifier, identifier } = current;
  const form = useFormikContext();
  const [open, setOpen] = useState(false);

  const { loading, error, data, refetch } = useQuery<{
    getUserFullText: User[];
  }>(GET_USER_FULL_TEXT, {
    variables: {
      q: "",
      size: 10,
    },
  });

  const users = data?.getUserFullText || [];

  const [shareUserSharedAccount, {}] = useMutation(SHARE_USER_SHARED_ACCOUNT, {
    refetchQueries: [
      {
        query: GET_USER_SHARED_ACCOUNT_MEMBERS,
        variables: {
          id: identifier,
        },
      },
    ],
    onCompleted: ({shareUserSharedAccount}) => {   
      if(shareUserSharedAccount) {
        dispatch(
          addMessage(
            <FormattedMessage id="shareddialog.share.success" />
          )
        );
        setOpen(false);
      }        
    },
  });

  const [unshareUserSharedAccount, {}] = useMutation(UNSHARE_USER_SHARED_ACCOUNT, {
    refetchQueries: [
      {
        query: GET_USER_SHARED_ACCOUNT_MEMBERS,
        variables: {
          id: identifier,
        },
      },
    ],
    onCompleted: ({unshareUserSharedAccount}) => {   
      if(unshareUserSharedAccount) {
        dispatch(
          addMessage(
            <FormattedMessage id="shareddialog.unshare.success" />
          )
        );
        setOpen(false);
      }        
    },
  });

  const share = (e: any, option: any) => {    
    e.stopPropagation();
    shareUserSharedAccount({
      variables: {
        userId: Number(option.identifier),
        accountId: Number(identifier)
      },
    })  
  };

  const unShare = async (e: any, option: any) => {    
    e.stopPropagation();
    const result = await confirm(
      intl.formatMessage({
        id: "shareddialog.grid.share",
      }),
      intl.formatMessage({
        id: "shareddialog.unshare.warning",
      })
    );

    if (result) { 
      unshareUserSharedAccount({
        variables: {
          userId: Number(option.identifier),
          accountId: Number(identifier)
        },
      })  
    }   
  };

  return (
    <Form>
      <Grid container className={classes.dialogIconDetail}>
        <Grid item className="iconBg">
          <div className="iconCell">
            <NotebookIcon height={42} width={42} />
          </div>
        </Grid>
        <Grid item className="detailContent">
          <div className="title">{resourceName}</div>
          <div className="description">{accountIdentifier || " - "}</div>
        </Grid>
      </Grid>
      <Grid className={classes.searchSection}>
        <div className="title">
          {intl.formatMessage({ id: "shareddialog.information" })}
        </div>
        <AutocompleteUsers
          loading={loading}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          PaperComponent={AutocompletePaper}
          getOptionSelected={(option: any, value: any) =>
            option.identifier === value.identifier
          }
          getOptionLabel={(option: any) => option.displayName}
          options={users}
          renderOption={(option: any) => (
            <BoxAutocompleteOption>
              <BoxUserThumb>
                <UserThumb image={getLink("thumb", option?.links || [])} />
                <div>{option?.displayName || " - "}</div>
              </BoxUserThumb>
              <div className={`${classes.actionIcon} Shared-action-icon`} onClick={(e: any) => share(e, option)}>
                <ShareIcon height={28} width={28} />
              </div>
            </BoxAutocompleteOption>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label=""
              variant="outlined"
              onChange={(event: any) => {
                const value = event?.target?.value;
                const variables = {
                  size: 10,
                  q: "",
                };

                if (value) {
                  variables.q = value;
                }

                refetch(variables);
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <MagnifyingGlassIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Divider className={classes.divider} />
      <DataGrid
        links={[]}
        page={1}
        size={10000}
        rowsPerPageList={[25, 50, 75, 100]}
        list={form.values.shareddialog.permissions}
        columns={[
          {
            field: "user",
            headerName: <FormattedMessage id="shareddialog.grid.user" />,
            sortable: false,
            renderCell: (row: any) => {
              return row?.links ? (
                <UserThumb
                  isSmall
                  displayName={row?.displayName}
                  image={getLink("thumb", row?.links || [])}
                />
              ) : (
                " - "
              );

            },

          },
          {
            field: "remove",
            headerName: "",
            sortable: false,
            renderCell: (row: any) => {
              return (
                <BoxAction>
                  <Button color="primary" variant="contained" onClick={(e: any) => unShare(e, row)}>
                    <FormattedMessage id="remove" />
                  </Button>
                </BoxAction>
              );
            },

          },

        ]}
      />
    </Form>
  );
};

const ShareDialog = ({ modalOpen, setModalOpen, currentSelected, classes }) => {
  const intl = useIntl();


  const { loading, error, data, refetch } = useQuery<{
    getUserSharedAccountMembers: User[];
  }>(GET_USER_SHARED_ACCOUNT_MEMBERS, {
    variables: {
      id: currentSelected?.identifier,
    },
  });

  const permissionsWithoutIndex = data?.getUserSharedAccountMembers || [];

  const permissions = permissionsWithoutIndex?.map?.((a, index) => {
    return { ...a, index };
  });

  const formik = {
    initialValues: {
      shareddialog: {
        current: currentSelected,
        permissions,
      },
    },
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
    enableReinitialize: true,
  };

  return (
    <Formik
      {...formik}
      render={(form) => (
        <Dialog
          open={modalOpen}
          title={intl.formatMessage({ id: "profile.accounts.shared" })}
          saveLabel={intl.formatMessage({ id: "shareddialog.grid.share" })}
          onClose={() => setModalOpen(false)}

          isValid={true}
          noActions
        >
          <SharedDialogContent current={currentSelected} classes={classes} />
        </Dialog>
      )}
    />
  );
};

const Shared = ({ classes }) => {
  const intl = useIntl();
  const router = useRouter();
  const screen = {};
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<any>(undefined);

  const [queryFilters, setQueryFilters] = useState({
    page: 0,
    size: 100,
    filters: JSON.stringify({
      resourceType: "SHARED",
    }),
  });

  const search = (filters?: any) => {
    setQueryFilters({
      page: 0,
      size: 100,
      filters: JSON.stringify({
        resourceType: "SHARED",
        ...filters,
      }),
    });
  };

  const handleClickRow = (row: any) => {
    setModalOpen(true);
    setCurrentSelected(row);
  };

  const onSave = () => {
    setModalOpen(false);
  };

  const hierarchy: TitleHierarchy = {
    name: "profile.header.breadcrumb",
    href: "/profile",
    children: [
      {
        name: "profile.accounts",
      },
    ],
  };

  return (
    <CardScreen
      loading={false}
      title="profile.accounts.shared"     
      onBack={() => router.push("/profile")}
      hierarchy={hierarchy}
    >
      <ShareDialog
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentSelected={currentSelected}
        classes={classes}
      />
      <div className="Default-header-filter">
        <Filter
          filters={filters}
          onChange={(filters: any) => search(filters)}
        />

      </div>
      <div>
        <DataGrid
          emptyStateImage={EmptyStateSharedAccountImage}
          query={GET_USER_ACCOUNTS}
          queryFilters={queryFilters}
          getResponseLinks={(data: any) => data?.getUserAccounts?.links}
          getResponse={(data: any) => data?.getUserAccounts?.accounts}
          height={600}
          columns={columns({ classes })}
          page={1}
          size={100}
          handleClick={handleClickRow}
          type="pagination"
        />
      </div>
    </CardScreen>
  );
};

export default withStyles(useStyles)(Shared);