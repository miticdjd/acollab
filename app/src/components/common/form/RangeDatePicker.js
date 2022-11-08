import React, {useState} from "react";

import { CCol, CRow } from "@coreui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";

const RangeDatePicker = ({
    placeholder = '',
    onRangeDatePickerChange
}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      onRangeDatePickerChange(dates);
      setStartDate(start);
      setEndDate(end);
    };
    return (
        <CRow className="mb-3 col-4">
            <CCol>
                <DatePicker
                    dateFormat="dd.MM.yyyy"
                    placeholderText={placeholder}
                    selectsRange={true}
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    isClearable={true}
                />
            </CCol>
        </CRow>
    );
};

export default RangeDatePicker;