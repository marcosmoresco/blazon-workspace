import { Formik, FormikValues } from 'formik'
import React from 'react'

const withFormik = (formik: FormikValues) => {
  return (component: Element) => (
    <Formik {...formik} render={(form) => component} />
  )
}

export default withFormik
