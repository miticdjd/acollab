import { CCol, CRow, CFormLabel, CButton } from "@coreui/react";
import { Form as ReactForm } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage } from "formik";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { t } from "i18next";

const Attachments = ({
  files,
  field,
  errors,
  type,
  onChange,
  label,
  placeholder,
  touched,
  onRemove,
  wide = false,
  multiple = false,
  required = false
}) => {
  const firstColumnSize = wide ? 3 : 2;
  const secondColumnSize = wide ? 9 : 10;

  const buttonRef = useRef();
  const startUpload = () => {
    buttonRef.current.click();
  };

  return (
    <CRow className="mb-3">
      <CCol md={firstColumnSize}>
        {label && (
          <CFormLabel className="is-label-text" htmlFor={field}>
            {label} {required && <strong style={{ color: "red" }}>*</strong>}
          </CFormLabel>
        )}
      </CCol>
      <CCol xs="12" md={secondColumnSize}>
          {files.map( file => (
            <div style={{ display: "flex", gap: "10px", marginBottom: "2px" }}>
              <code>{file.name}</code> <span className="ml-2" style={{ color: 'red', cursor: 'pointer' }} onClick={() => { onRemove(file) }}><FontAwesomeIcon icon={faClose} /></span>
            </div>
          ))}
        
        <CButton
          type="button"
          color="primary"
          className="is-btn me-3"
          onClick={startUpload}
          style={{ width: "fit-content" }}
        >
          {placeholder}
        </CButton>

        <ReactForm.Control
          ref={buttonRef}
          style={{ display: "none" }}
          type={type ? type : "button"}
          multiple={multiple}
          name={field}
          isInvalid={touched[field] && !!errors[field]}
          errors={errors}
          onChange={(e) => { onChange && onChange(e.target.files) }}
        />
        <ErrorMessage
          field={field}
          name={field}
          component="div"
          className="error invalid-feedback"
        />
      </CCol>
    </CRow>
  );
};

export default Attachments;
