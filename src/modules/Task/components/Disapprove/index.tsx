//vendors
import React from "react";
import { useIntl } from "react-intl";
import * as Yup from 'yup'
import Dialog from "@components/Dialog";
import { Form, Formik } from "formik";
import Grid from "@material-ui/core/Grid";
import TextField from "@components/TextField";

//types
import { DisapproveDialogProps, DisapproveDialogContentProps } from "./types";

const DisapproveDialogContent: React.FC<DisapproveDialogContentProps> = ({ form }) => {
  return (
    <Form>          
      <Grid>       
        <TextField
          form={form}
          name="taskdisapprovedialog.justification"
          multiline
          rows={3}
          rowsMax={4}
        />
      </Grid>              
    </Form>
  );
};

const Disapprove: React.FC<DisapproveDialogProps> = ({ modalOpen, setModalOpen, task, execute }) => {
  const intl = useIntl();

  const validationSchema = Yup.object({
    taskdisapprovedialog: Yup.object({      
      justification: Yup.string().required(intl.formatMessage({id: "applicationdialog.justification.required"}))
    })
  })
  
  const formik = {
    initialValues: {
      taskdisapprovedialog: {
        current: task       
      },
    },
    validationSchema,
    onSubmit: (values: any) => {
      execute(values?.taskdisapprovedialog?.justification);  
    },
    enableReinitialize: true,
    isInitialValid: false
  }

  return (
    <Formik
      {...formik}
      render={(form) => (
        <Dialog
          open={modalOpen}
          title={intl.formatMessage({ id: "taskdisapprovedialog.justification" })}          
          onClose={() => {
            form.resetForm();
            setModalOpen(false);
          }}
          onSave={() => form.submitForm()}
          isValid={true}          
        >
          <DisapproveDialogContent form={form}/>
        </Dialog>
      )}
    />
  );
};

export default Disapprove;