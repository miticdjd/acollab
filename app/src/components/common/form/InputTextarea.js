import React from 'react';
import {Form as ReactForm} from "react-bootstrap";
import {CCol, CRow, CFormLabel} from "@coreui/react";
import {ErrorMessage} from 'formik';

const InputTextarea = ({
  field,
  placeholder = '',
  touched,
  errors,
  values,
  handleChange,
  label,
  rows = 3,
  required = false,
  disabled = false,
  wide = false
}) => {
  const firstColumnSize = wide ? 4 : 2;
  const secondColumnSize = wide ? 8 : 10;

  return (
    <CRow className="mb-3">
      <CCol md={firstColumnSize}>
        {label && (<CFormLabel className="is-label-text" htmlFor={field}>{label}</CFormLabel>)}
      </CCol>
      <CCol xs="12" md={secondColumnSize}>
        <ReactForm.Control
          className="form-control is-input-text"
          as="textarea" rows={rows}
          name={field}
          placeholder={placeholder}
          autoComplete={field}
          isInvalid={touched[field] && !!errors[field]}
          value={values && values[field]}
          onChange={handleChange}
          disabled={disabled}
        />
        { !errors[field] || (typeof errors[field] === 'string')
          ? <ErrorMessage field={field} name={field} component="div" className="error invalid-feedback" />
          : errors[field].map(
              (error, index) => <div key={index} className="error invalid-feedback">{error}</div>
            )
        }
      </CCol>
    </CRow>
  );

};

export default InputTextarea
