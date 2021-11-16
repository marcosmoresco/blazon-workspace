import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ShareIcon from "@icons/Share";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import Button from "@components/Button";
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
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MagnifyingGlassIcon from "@icons/MagnifyingGlass";
import UserThumb from "@components/UserThumb";
import { confirm } from "@components/Dialog/actions";
import {
  GET_USER_FULL_TEXT,
} from "@modules/User/queries";
import { User } from "@types";
import { getLink } from "@utils/index";
import { ForwardDialogProps, ForwardDialogContentProps } from "./types";
import { useTheme, themes } from "@theme/index";

const ForwardDialogContent: React.FC<ForwardDialogContentProps> = ({ execute }) => {
  const intl = useIntl();
  const { theme, setTheme } = useTheme();
  const currentTheme = themes[theme];
  const [open, setOpen] = useState<boolean>(false);

  const { loading, error, data, refetch } = useQuery<{
    getUserFullText: User[];
  }>(GET_USER_FULL_TEXT, {
    variables: {
      q: "",
      size: 10,
    },
  });

  const users = data?.getUserFullText || []; 

  const forward = async (e: any, option: any) => {    
    e.stopPropagation();
    const result = await confirm(intl.formatMessage({
      id: "task.forward.user.confirm"
    }), intl.formatMessage({
      id: "task.forward.user.confirm.text"
    }, {
      user: option.displayName || " - "
    }),
    <ShareIcon width={48} height={48} color="#0E46D7" />,
    null,
    currentTheme);
    
    if(result) {
      execute(Number(option.identifier));  
    }    
     
  };

  AutocompletePaper.defaultProps = {currentTheme: currentTheme};

  return (
    <Form>          
      <Grid>
        <BoxContentTitle>
          {intl.formatMessage({ id: "users" })}
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
              <ActionIcon className="Shared-action-icon" onClick={(e: any) => forward(e, option)}>
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
    </Form>
  );
};

const ForwardUser: React.FC<ForwardDialogProps> = ({ modalOpen, setModalOpen, execute }) => {
  const intl = useIntl();  

  const formik = {
    initialValues: {
      shareddialog: {
        current: {}       
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
          title={intl.formatMessage({ id: "tasks.forwardToUser" })}          
          onClose={() => setModalOpen(false)}
          isValid={true}
          noActions
        >
          <ForwardDialogContent execute={execute}/>
        </Dialog>
      )}
    />
  );
};

export default ForwardUser;