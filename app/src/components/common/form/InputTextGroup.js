import React from 'react';
import {CInputGroup, CInputGroupText} from "@coreui/react";
import InlineInputText from "./InlineInputText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputTextGroup = ({
  iconName,
  field,
  type,
  placeholder,
  touched,
  errors,
  handleChange,
  className = "mb-3"
}) => {

  return (
    <>
      <CInputGroup className={className}>
        <CInputGroupText>
          <FontAwesomeIcon icon={iconName} />
        </CInputGroupText>
        <InlineInputText
          field={field}
          type={type}
          placeholder={placeholder}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
        />
      </CInputGroup>
    </>
  );

};

export default InputTextGroup;