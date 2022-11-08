import React from 'react';
import {Form as ReactForm} from "react-bootstrap";
import {ErrorMessage} from "formik";
import {CCol, CRow, CFormLabel} from "@coreui/react";
import {useTranslation} from "react-i18next";

const DropdownSelect = ({
  options,
  field,
  touched,
  errors,
  values,
  handleChange,
  label,
  disabled = false,
  multiple = false,
  placeholder = null,
  wide = false
}) => {
  const { t } = useTranslation();
  const firstColumnSize = wide ? 4 : 2;
  const secondColumnSize = wide ? 8 : 10;

  return (
    <CRow className="mb-3">
      <CCol md={firstColumnSize}>
        {label && (<CFormLabel className="is-label-text" htmlFor={field}>{label}</CFormLabel>)}
      </CCol>
      <CCol xs="12" md={secondColumnSize}>
        <ReactForm.Select
            className={`form-control is-input-text dropdown-padding ${values && values[field] ? '' : ' select-placeholder'}`}
            name={field}
            isInvalid={touched[field] && !!errors[field]}
            value={values && values[field]}
            onChange={handleChange}
            disabled={disabled}
            multiple={multiple}
        >
          <option value={''}>{placeholder ? placeholder : t('label.please_select')}</option>
          {options.map(({ id, name }) => (
            <option key={`${name}-${id}`} value={id}>{name}</option>
          ))}
        </ReactForm.Select>
        <ErrorMessage field={field} name={field} component="div" className="error invalid-feedback" />
      </CCol>
    </CRow>
  );

};

export default DropdownSelect;
