import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ShareIcon from "@icons/Share";
import { FormattedMessage, useIntl } from "react-intl";
import { useQuery, useMutation } from "@apollo/client";
import Dialog from "@components/Dialog";
import Checkbox from "@components/Checkbox";
import { Form, Formik, useFormikContext } from "formik";
import {
  ActionIcon,
  BoxDivider,
  PasswordVaultHeader,
  PasswordVaultCardIconContent,
  PasswordVaultCardIcon,
  PasswordVaultCardHeaderContent,
  PasswordVaultCardHeaderTitle,
  PasswordVaultCardHeaderSubTitle,
  BoxAutocompleteOption,
  AutocompleteUsers,
  BoxUserThumb,
  AutocompletePaper,
  BoxContentTitle,
  TableUsers,
  TableUsersTh,
  TableUsersTr
} from "./styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import KeyIcon from "@icons/Key";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MagnifyingGlassIcon from "@icons/MagnifyingGlass";
import UserThumb from "@components/UserThumb";
import { addMessage } from "@actions/index";
import { GET_ENTRIES } from "@modules/PasswordVaultItem/queries";
import {
  GET_USER_FULL_TEXT,
} from "@modules/User/queries";
import { 
  SHARE_PASSWORD_VAULT_ENTRY,
  REVOKE_PASSWORD_VAULT_ENTRY, 
  GRANT_PASSWORD_VAULT_ENTRY
} from "@modules/PasswordVaultScreen/mutations";
import {
  GET_PASSWORD_VAULT_ENTRY
} from "@modules/PasswordVaultItem/queries";
import { User } from "@types";
import { getLink } from "@utils/index";
import { ShareDialogProps, SharedDialogContentProps } from "./types";
import { useTheme, themes } from "@theme/index";

const SharedDialogContent: React.FC<SharedDialogContentProps> = ({ current, setCurrPasswordVault }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { name, description, identifier } = current;
  const form = useFormikContext();
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const { loading, error, data, refetch } = useQuery<{
    getUserFullText: User[];
  }>(GET_USER_FULL_TEXT, {
    variables: {
      q: "",
      size: 10,
    },
  });

  const users = data?.getUserFullText || [];

  const [sharePasswordVaultEntry, {}] = useMutation(SHARE_PASSWORD_VAULT_ENTRY, {
    refetchQueries: [
      {
        query: GET_ENTRIES       
      },
    ],
    onCompleted: ({sharePasswordVaultEntry}) => {   
      if(sharePasswordVaultEntry) {
        dispatch(
          addMessage(
            <FormattedMessage id="shareddialog.share.success" />
          )
        );
        setOpen(false);
      }        
    },
  });  

  const [revokePasswordVaultEntry, {}] = useMutation(REVOKE_PASSWORD_VAULT_ENTRY, {
    refetchQueries: [
      {
        query: GET_ENTRIES       
      },
    ],
    onCompleted: ({revokePasswordVaultEntry}) => {   
      if(revokePasswordVaultEntry) {
        dispatch(
          addMessage(
            <FormattedMessage id="passwordVault.permission.revoked.success" />
          )
        );       
      }        
    },
  });

  const [grantPasswordVaultEntry, {}] = useMutation(GRANT_PASSWORD_VAULT_ENTRY, {
    refetchQueries: [
      {
        query: GET_ENTRIES       
      },
    ],
    onCompleted: ({grantPasswordVaultEntry}) => {   
      if(grantPasswordVaultEntry) {
        dispatch(
          addMessage(
            <FormattedMessage id="passwordVault.permission.granted.success" />
          )
        );       
      }        
    },
  });

  const execute = (e: any, permission: any, value: boolean, type: string, index: number) => {    
    e.stopPropagation();
    if(value) {
      revokePasswordVaultEntry({
        variables: {
          id: current?.identifier,
          permission: type,
          userId: Number(permission?.user.identifier)
        }
      })
    } else {
      grantPasswordVaultEntry({
        variables: {
          id: current?.identifier,
          permission: type,
          userId: Number(permission?.user.identifier)
        }
      })
    }     
    const _permissions = [...current?.permissions];
    const _permission = {...permission};
    if(type === "READ") {
      _permission.read = !value;
    } else if(type === "MODIFY") {
      _permission.modify = !value;
    } else {
      _permission.share = !value;
    }
    _permissions[index] = _permission;
    const _changed = {
      ...current,
      permissions: _permissions
    };    

    setCurrPasswordVault(_changed);
  };

  const share = (e: any, option: any) => {    
    e.stopPropagation();    
    sharePasswordVaultEntry({
      variables: {
        id: Number(current.identifier),
        payload: JSON.stringify({
          users: [{
            identifier: Number(option.identifier)
          }]
        })
      },
    });
  };

  AutocompletePaper.defaultProps = {theme: currentTheme};

  return (
    <Form>
      <PasswordVaultHeader>
        <PasswordVaultCardIconContent>
          <PasswordVaultCardIcon>
            <KeyIcon height={42} width={42} color="#3174F6"/>
          </PasswordVaultCardIcon>            
        </PasswordVaultCardIconContent>
        <PasswordVaultCardHeaderContent>
          <PasswordVaultCardHeaderTitle>{name}</PasswordVaultCardHeaderTitle>
          <PasswordVaultCardHeaderSubTitle>{description || " - "}</PasswordVaultCardHeaderSubTitle>
        </PasswordVaultCardHeaderContent>  
      </PasswordVaultHeader>      
      <Grid>
        <BoxContentTitle>
          {intl.formatMessage({ id: "passwordVault.sharing.informations" })}
        </BoxContentTitle>
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
              <ActionIcon className="Shared-action-icon" onClick={(e: any) => share(e, option)}>
                <ShareIcon height={28} width={28} />
              </ActionIcon>
            </BoxAutocompleteOption>
          )}
          renderInput={(params: any) => (
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
      <BoxDivider />
      <TableUsers>
        <thead>
          <TableUsersTh>
            <FormattedMessage id="user" />
          </TableUsersTh>
          <TableUsersTh>
            <FormattedMessage id="read" />
          </TableUsersTh>
          <TableUsersTh>
            <FormattedMessage id="modify" />
          </TableUsersTh>
          <TableUsersTh>
            <FormattedMessage id="share" />
          </TableUsersTh>
        </thead>
        <tbody>
          {(current.permissions || []).map((permission: any, index: number) => (
            <TableUsersTr key={`password-vault-permission-${index}`}>
              <td>
                <UserThumb displayName={permission?.user?.displayName} image={getLink("thumb", permission?.user?.links || [])}/>
              </td>
              <td>
                <Checkbox value={permission?.read} onClick={(e: any) => execute(e, permission, permission?.read, "READ", index)}/>
              </td>
              <td>
                <Checkbox value={permission?.modify} onClick={(e: any) => execute(e, permission, permission?.modify, "MODIFY", index)}/>
              </td>
              <td>
                <Checkbox value={permission?.share} onClick={(e: any) => execute(e, permission, permission?.share, "SHARE", index)}/>
              </td>
            </TableUsersTr>
          ))}
        </tbody>
      </TableUsers>      
    </Form>
  );
};

const ShareDialog: React.FC<ShareDialogProps> = ({ modalOpen, setModalOpen, currentSelected, setCurrPasswordVault, classes }) => {
  const intl = useIntl();

  const permissionsWithoutIndex = currentSelected?.permissions || [];

  const permissions = permissionsWithoutIndex?.map?.((a: any, index: number) => {
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
          title={intl.formatMessage({ id: "passwordVault.sharing" })}          
          onClose={() => setModalOpen(false)}
          isValid={true}
          noActions
        >
          <SharedDialogContent current={currentSelected} setCurrPasswordVault={setCurrPasswordVault} classes={classes} />
        </Dialog>
      )}
    />
  );
};

export default ShareDialog;