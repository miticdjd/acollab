import React, {useState, useCallback} from 'react';
import _debounce from 'lodash/debounce';
import {CCol, CRow, CFormLabel} from "@coreui/react";

const SearchInput = ({
    field,
    type,
    placeholder = '',
    initialValue = '',
    handleSearch,
    label,
    disabled = false,
}) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const handleChange = (e) => {
        setInputValue(e.target.value);
        debouncedSearch(e.target.value)
    }

    const debouncedSearch = useCallback(
        _debounce((value) => handleSearch(value) , 300),
        []
    );

    return (
        <CRow className='mb-2'>
            { label && 
                <CCol>
                    <CFormLabel className="is-label-text" htmlFor={field}>{label}</CFormLabel>
                </CCol>
            }
            <CCol>
                <input
                    className="form-control is-input-text"
                    type={type ? type : "search"}
                    name={field}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleChange}
                    disabled={disabled}
                />
            </CCol>
        </CRow>
    );
};

export default SearchInput;
