import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FormattedMessage, useIntl } from "react-intl";
import TitlePage from "@components/TitlePage";
import { TitleHierarchy } from "@components/TitlePage/types";
import Card from "@components/Card";
import DataGrid from "@components/DataGrid";
import Button from "@components/Button";
import TextField from "@components/TextField";
import PlusIcon from "@icons/PlusSimple";
import XCircleIcon from "@icons/XCircle";
import { SAVE_SECRET_QUESTION, DELETE_SECRET_QUESTIONS, UPDATE_SECRET_QUESTION } from "@modules/User/mutations";
import { GET_SECRET_QUESTIONS } from "@modules/User/queries";
import { SecretQuestion } from "@modules/User/types";
import Dialog from "@components/Dialog";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import { useTheme, themes } from "@theme/index";
import { confirm } from "@components/Dialog/actions";
import EmptyStateTypeahead from "@images/EmptyStateTypeahead.svg";

const columns = [
  {
    field: "question",
    headerName: <FormattedMessage id="question" />,
    sortable: false    
  },
  {
    field: "answer",
    headerName: <FormattedMessage id="answer" />,
    sortable: false,
  }
];

const SecretQuestions = () => {

  const intl = useIntl();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const [current, setCurrent] = useState<SecretQuestion>();
  const [open, setOpen] = useState<boolean>(false);
  const [refetchLoading, setRefetchLoading] = useState<boolean>(false);

  const { loading, data, networkStatus } = useQuery<{
    getSecretQuestions: [SecretQuestion];
  }>(GET_SECRET_QUESTIONS, {
    variables: {
      fetchPolicy: "network-only" 
    },
    notifyOnNetworkStatusChange: true   
  }); 

  const [saveSecretQuestion, {}] = useMutation(SAVE_SECRET_QUESTION, { 
    refetchQueries: [
      {
        query: GET_SECRET_QUESTIONS        
      },
    ],  
    awaitRefetchQueries: true,
    onCompleted: ({ saveSecretQuestion }) => {          
      if(saveSecretQuestion) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "newquestion.saved.success"})
          )
        );
        setOpen(false);                 
      }  

    },
  });

  const [updateSecretQuestion, {}] = useMutation(UPDATE_SECRET_QUESTION, { 
    refetchQueries: [
      {
        query: GET_SECRET_QUESTIONS        
      },
    ],  
    awaitRefetchQueries: true,
    onCompleted: ({ updateSecretQuestion }) => {            
      if(updateSecretQuestion) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "newquestion.updated.success"})
          )
        );
        setOpen(false);  
        setCurrent(undefined);               
      }  

    },
  });

  const [deleteSecretQuestions, {}] = useMutation(DELETE_SECRET_QUESTIONS, { 
    refetchQueries: [
      {
        query: GET_SECRET_QUESTIONS        
      },
    ],  
    awaitRefetchQueries: true,
    onCompleted: ({ deleteSecretQuestions }) => {           
      if(deleteSecretQuestions) {
        dispatch(
          addMessage(
            intl.formatMessage({id: `secretquestion${selecteds.length > 1 && "s" || ""}.remove.success`})
          )
        );
        callbackClear(true);
        setSelecteds([]);
        setOpen(false);              
      }  

    },
  });

  const hierarchy: TitleHierarchy = {
    name: "profile",
    href: "/profile",
    children: [
      {
        name: "profile.secretquestions"
      },
    ],
  };

  const initialValues = {
    newQuestion: current ? current : {
      question: "",
      answer: ""     
    },
  };

  const validationSchema = Yup.object({
    newQuestion: Yup.object({
      question: Yup.string().required(
        intl.formatMessage(
          {
            id: "isRequired",
          },
          {
            field: intl.formatMessage({ id: "question" }),
          }
        )
      ),
      answer: Yup.string().required(
        intl.formatMessage(
          {
            id: "isRequired",
          },
          {
            field: intl.formatMessage({ id: "answer" }),
          }
        )
      ),    
    }).required("Required"),
  });

  const formik = {
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: any, {resetForm}:{resetForm: any}) => {  
      setRefetchLoading(true); 
      if(current?.identifier) {
        await updateSecretQuestion({
          variables: {
            id: current?.identifier,
            payload: JSON.stringify(values?.newQuestion)
          }
        });
        setRefetchLoading(false); 
      } else {
        await saveSecretQuestion({
          variables: {
            payload: JSON.stringify(values?.newQuestion)
          }
        }); 
        setRefetchLoading(false); 
      }                  
      resetForm();
    },
  };

  const [callbackClear, setCallbackClear] = useState(() => (clear: boolean) => {} );
  const [selecteds, setSelecteds] = useState([]);

  const handleSelected = (selecteds: any, callbackClearSelected: any) => {
    setSelecteds(selecteds);
    setCallbackClear(() => callbackClearSelected);
  };

  const remove = async () => {

    const result = await confirm(
      intl.formatMessage({
        id: `secretquestion${selecteds.length > 1 && "s" || ""}.remove.title`,
      }),
      intl.formatMessage({
        id: `secretquestion${selecteds.length > 1 && "s" || ""}.remove.text`,
      }),
      <XCircleIcon width={48} height={48} color="#FF134A"/>,
      null,
      currentTheme
    );
    if(result) {
      setRefetchLoading(true);
      await deleteSecretQuestions({
        variables: {
          payload: JSON.stringify(selecteds.map((s) => ({identifier: s})))
        }
      });   
      setRefetchLoading(false);  
    }    
  }


  const actions = (
    <React.Fragment>
      <Button
        variant="rounded"
        color="secondary"
        onClick={remove}
        isLoading={0}>
        <FormattedMessage id="remove"/>
      </Button>
    </React.Fragment>
  )

  return (
    <>
      <TitlePage
       title="profile.secretquestions"        
        hierarchy={hierarchy}
      />
      <Card>
        <div className="Default-header-filter">
          <Button
            color="primary"
            variant="contained"
            startIcon={<PlusIcon color="#FFFFFF" width={21} height={21}/>}
            onClick={() => setOpen(true)}
          >
            <FormattedMessage id="profile.newQuestion" />
          </Button>
        </div>
        <div>
          <DataGrid  
            emptyStateImage={EmptyStateTypeahead}
            actions={actions}        
            fetching={loading || refetchLoading}
            list={data?.getSecretQuestions || []}         
            height={600}          
            columns={columns}
            page={0}
            size={100}
            rowsPerPageList={[25, 50, 75, 100]}
            handleClick={(row: SecretQuestion) => {
              setOpen(true);
              setCurrent(row);
            }}
            handleSelected={handleSelected}
            selectable
            type="pagination"
          />
        </div>
      </Card>   
      <Formik
      {...formik}
      render={(form) => (
        <Dialog
          cancelButton={true}
          open={open}
          title={intl.formatMessage({
            id: current ? "profile.changeQuestion" : "profile.newQuestion",
          })}
          isValid={true}
          onSave={() => {
            form.submitForm();
          }}
          onClose={() => {
            setOpen(false);
            setCurrent(undefined);
          }}
        >
          <Form className="modal">
            <div>
              <div className="modal-section">
                {intl.formatMessage({
                  id: "profile.newQuestion.title",
                })}
              </div>
              <div className="modal-description">
                {intl.formatMessage({
                  id: "profile.newQuestion.subTitle",
                })}
              </div>
              <div className="pt32"></div>
            </div>

            <TextField form={form} name="newQuestion.question" />
            <div className="pt18"></div>
            <TextField form={form} name="newQuestion.answer" />                        
          </Form>
        </Dialog>
      )}
    />   
    </>
  )
}

export default SecretQuestions;