import React from "react";
import { ErrorMessage } from "formik";
import { CCol, CRow, CFormLabel } from "@coreui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";

const InputDatePicker = ({
  date,
  handleDateChange,
  label,
  field,
  placeholder,
  errors,
  touched,
  maxDate = undefined,
  minDate = undefined,
  isRequired = false,
  isDisabled = false,
}) => {
  return (
    <CRow className="mb-3">
      <CCol md="2">
        {label && (
          <CFormLabel className="is-label-text" htmlFor={field}>
            {label}
          </CFormLabel>
        )}
      </CCol>
      <CCol md="10">
        <DatePicker
          dateFormat="dd.MM.yyyy."
          selected={date}
          name={field}
          maxDate={maxDate}
          minDate={minDate}
          onChange={(date) => handleDateChange(date)}
          isClearable
          placeholderText={placeholder ? placeholder : field}
          isInvalid={touched[field] && !!errors[field]}
          className={`form-control is-input-text ${errors[field] && 'is-invalid'}`}
          disabled={isDisabled}
          popperClassName="popper-arrow"
        />

        {!errors[field] || typeof errors[field] === "string" ? (
          <ErrorMessage
            field={field}
            name={field}
            component="div"
            className="error-message"
          />
        ) : (
          errors[field].map((error, index) => (
            <div key={index} className="error-message">
              {error}
            </div>
          ))
        )}
      </CCol>
    </CRow>
  );
};

export default InputDatePicker;
