import React from 'react';
import {ErrorMessage} from "formik";
import {Form as ReactForm} from "react-bootstrap";
import {CCol, CInputGroup, CFormLabel} from "@coreui/react";

const Checkbox = ({
  options,
  optionsCaption,
  type,
  field,
  label,
  touched,
  errors,
  values,
  handleChange,
  className
}) => {
  return (
    <CInputGroup className={className}>
      <CCol xs="12" md="2">
        {label && (<CFormLabel className="is-label-text" htmlFor={field}>{label}</CFormLabel>)}
      </CCol>
      <CCol xs="12" md="10" className='d-flex flex-wrap'>
        {optionsCaption && <CFormLabel className="is-label-text ms-1">{optionsCaption}</CFormLabel>}
        {options.map(({id, name}, index) => (
          <ReactForm.Group key={`${name}-${id}`} className="d-flex align-items-center custom-checkbox">
            <ReactForm.Check
                className="mb-1 me-2"
                type={type}
                id={`inline-checkbox${index}`}
                key={`inline-checkbox${index}`}
                name={field}
                value={id}
                isInvalid={touched[field] && !!errors[field]}
                onChange={handleChange}
                checked={type === 'checkbox' 
                  ? values && values[field] && values[field].includes(id.toString())
                  : values && values[field] === id}
            />
            <CFormLabel key={`label-checkbox-${id}`} className="is-label-text mb-1" htmlFor={`inline-checkbox${index}`}>{name}</CFormLabel>
          </ReactForm.Group>
        ))}
        <ErrorMessage field={field} name={field} component="div" className="error invalid-feedback" />
      </CCol>
    </CInputGroup>
  );
};

export default Checkbox;
