import React from 'react';
import {ErrorMessage} from "formik";
import {CCol, CInputGroup, CFormLabel} from "@coreui/react";
import Select from 'react-select';

const DropdownMultiSelect = ({
  field,
  placeholder,
  errors,
  handleChange,
  label,
  options = [],
  value,
  isLoading = false,
  classes = ''
}) => {

  const styles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused || state.isSelected ? '1px solid #958bef' : '1px solid #d8dbe0',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(50, 31, 219, 0.25)' : 'none',
      color: '#768192'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#768192'
    })
  };

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 10,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <CInputGroup className="mb-3 dropdown-multi-select">
        {label && (<CCol md="2">
            <CFormLabel htmlFor={field ? field : ''} className="is-label-text">{label}</CFormLabel>
        </CCol>)}
        <CCol xs="12" md={label ? '10' : '12'}>
            <Select className={`py-0 dropdown-text ${classes}`}
                isMulti
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={handleChange}
                options={options}
                value={value}
                placeholder={placeholder}
                styles={styles}
                formatGroupLabel={formatGroupLabel}
            />
            {field && (
              !errors[field] || (typeof errors[field] === 'string')
                ? <ErrorMessage field={field} name={field} component="div" className="ms-1 error-message" />
                : errors[field].map(
                    (error, index) => <div key={index} className="ms-1 error-message">{error}</div>
                  )
              )
            }
        </CCol>
    </CInputGroup>
  );

};

export default DropdownMultiSelect