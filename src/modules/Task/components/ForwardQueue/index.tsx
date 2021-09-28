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
  AutocompleteQueue,
  BoxUserThumb,
  AutocompletePaper,
  BoxContentTitle,
  TableUsers,
  TableUsersTh,
  TableUsersTr
} from "./styles";
import XCircleIcon from "@icons/XCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import KeyIcon from "@icons/Key";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MagnifyingGlassIcon from "@icons/MagnifyingGlass";
import UserThumb from "@components/UserThumb";
import { confirm } from "@components/Dialog/actions";
import { addMessage } from "@actions/index";
import { GET_ENTRIES } from "@modules/PasswordVaultItem/queries";
import {
  GET_TASK_QUEUES
} from "@modules/Task/queries";
import {
  Task
} from "@modules/Task/types";
import { Link } from "@types";
import { getLink } from "@utils/index";
import { ForwardDialogProps, ForwardDialogContentProps } from "./types";
import { useTheme, themes } from "@theme/index";

const ForwardDialogContent: React.FC<ForwardDialogContentProps> = ({ execute }) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const currentTheme = themes[theme];

  const { loading, error, data, refetch } = useQuery<{
    getTaskQueues: { links: Link[], representation: Task[] };
  }>(GET_TASK_QUEUES);

  const queues = data?.getTaskQueues?.representation || []; 

  const forward = async (e: any, option: any) => {    
    e.stopPropagation();
    const result = await confirm(intl.formatMessage({
      id: "task.forward.queue.confirm"
    }), intl.formatMessage({
      id: "task.forward.queue.confirm.text"
    }, {
      queue: option.name || " - "
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
          {intl.formatMessage({ id: "queues" })}
        </BoxContentTitle>
        <AutocompleteQueue
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
          getOptionLabel={(option: any) => option.name}
          options={queues}
          renderOption={(option: any) => (
            <BoxAutocompleteOption>
              <div>{option?.name || " - "}</div>
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

const ForwardQueue: React.FC<ForwardDialogProps> = ({ modalOpen, setModalOpen, execute }) => {
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
          title={intl.formatMessage({ id: "tasks.forwardToQueue" })}          
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

export default ForwardQueue;