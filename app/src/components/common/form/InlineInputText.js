import React from 'react';
import {Form as ReactForm} from "react-bootstrap";
import {ErrorMessage} from "formik";
import {CFormLabel} from "@coreui/react";

const InlineInputText = ({
  field,
  type,
  placeholder,
  touched,
  errors,
  values,
  handleChange,
  label,
  required = false,
}) => {

  return (
    <>
        {label && (<CFormLabel htmlFor={field}>{label}</CFormLabel>)}
        <ReactForm.Control
          className="form-control"
          type={type ? type : "text"}
          name={field}
          autoComplete={field}
          placeholder={placeholder ? placeholder : field}
          isInvalid={touched[field] && !!errors[field]}
          defaultValue={values && values[field]}
          onChange={handleChange}
        />
        <ErrorMessage field={field} name={field} component="div" className="error invalid-feedback" />
    </>
  );

};

export default InlineInputText;