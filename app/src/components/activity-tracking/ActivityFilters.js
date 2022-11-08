import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

import { CRow, CCol } from "@coreui/react";
import SearchInput from "../common/form/SearchInput";
import DropdownMultiSelect from "../common/form/DropdownMultiSelect";
import RangeDatePicker from "../common/form/RangeDatePicker";
import { fetchAllUsersList } from "../../redux/settings/users/usersSlice";
import { fetchEventTypes } from "../../redux/activity-tracking/activitiesSlice";
import { returnDefaultMomentFormatForDB } from "../../services/helpers/date-helper";

const ActivityFilters = ({
    onFiltersChange
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { allUsers } = useSelector(state => state.users);
    const { eventTypes } = useSelector(state => state.activities);
    const [innerState, setInnerState] = useState({
        userOptions: [],
        selectedUsers: [],
        eventTypesOptions: [],
        selectedEvents: [],
        user_id: [],
        event_type: [],
        ip_address: '',
        created_at: { start: null, end: null },
    });

    const handleAddOption = (data, field, innerStateKey) => {
        const newSelectedOptionsState = [...innerState[innerStateKey], data];
        const newFieldState = [...innerState[field], data.value];
        setInnerState(prevState => {
            let updatedValues = {};
            updatedValues[innerStateKey] = newSelectedOptionsState;
            updatedValues[field] = newFieldState;
            return {...prevState, ...updatedValues};
        });
    };
    
    const handleRemoveOption = (data, field, innerStateKey) => {
        const newSelectedOptionsState = innerState[innerStateKey].filter(option => option.value !== data.value);
        const newOptionsIds = innerState[field].filter(optionId => optionId !== data.value);

        setInnerState(prevState => {
            let updatedValues = {};
            updatedValues[innerStateKey] = newSelectedOptionsState;
            updatedValues[field] = newOptionsIds;
            return {...prevState, ...updatedValues};
        });
    };
    
    const handleClearOptions = (field, innerStateKey) => {
        setInnerState(prevState => {
            let updatedValues = {};
            updatedValues[innerStateKey] = [];
            updatedValues[field] = [];
            return {...prevState, ...updatedValues};
        });
    };

    const onSearch = (value) => {
        setInnerState(prevState => {
            const updatedValues = {ip_address: value};
            return {...prevState, ...updatedValues};
        });    
    }

    const onRangeDatePickerFilterChange = (dates) => {
        setInnerState(prevState => {
            const updatedValues = {
                created_at: { 
                    start: dates[0] ? returnDefaultMomentFormatForDB(dates[0]) : null, 
                    end: dates[1] ? returnDefaultMomentFormatForDB(dates[1]) : null
                }
            };
            return {...prevState, ...updatedValues};
        });   
    }

    useEffect(() => {
        dispatch(fetchAllUsersList());
    }, [dispatch])

    useEffect(() => {
        const usersFormatedForOptionList = allUsers.map(user => {
            return {value: user.id, label: `${user.first_name} ${user.last_name}`};
        });
        setInnerState(prevState => {
            const updatedValues = {userOptions: usersFormatedForOptionList};
            return {...prevState, ...updatedValues};
        });
    }, [allUsers])

    useEffect(() => {
        dispatch(fetchEventTypes());
    }, [dispatch])

    useEffect(() => {
        const eventTypesFormatedForOptionList = eventTypes.map(type => {
            return {value: type, label: type};
        });
        setInnerState(prevState => {
            const updatedValues = {eventTypesOptions: eventTypesFormatedForOptionList};
            return {...prevState, ...updatedValues};
        });
    }, [eventTypes])

    useEffect(() => {
        const filters = {
            ip_address: innerState.ip_address ? innerState.ip_address : undefined,
            user_id: innerState.user_id.length ? innerState.user_id : undefined,
            event_type: innerState.event_type.length ? innerState.event_type : undefined,
            created_at: (innerState.created_at.end && innerState.created_at.start) ? innerState.created_at : undefined,
        }
        onFiltersChange(filters);
    }, [innerState.created_at.end, innerState.event_type, innerState.ip_address, innerState.user_id])

    return (
        <CRow>
            <CCol>
                <SearchInput 
                    field="searchActivities"
                    placeholder="Search IP Address"
                    handleSearch={onSearch}
                    >
                </SearchInput>
                <div className="d-flex">
                    <DropdownMultiSelect 
                        classes="ms-0 me-2"
                        options={innerState.userOptions}
                        placeholder={t('placeholder.select_user')}
                        value={innerState.selectedUsers}
                        multiple={true}
                        handleChange={(value, action) => {
                            if (action.action === 'select-option') {
                                handleAddOption(action.option, 'user_id', 'selectedUsers');
                            } else if (action.action === 'remove-value') {
                                handleRemoveOption(action.removedValue, 'user_id', 'selectedUsers');
                            } else if (action.action === 'clear') {
                                handleClearOptions('user_id', 'selectedUsers');
                            }
                        }}>
                    </DropdownMultiSelect>
                    <DropdownMultiSelect 
                        classes="ms-0 me-2"
                        options={innerState.eventTypesOptions}
                        placeholder={t('placeholder.select_event')}
                        value={innerState.selectedEvents}
                        multiple={true}
                        handleChange={(value, action) => {
                            if (action.action === 'select-option') {
                                handleAddOption(action.option, 'event_type', 'selectedEvents');
                            } else if (action.action === 'remove-value') {
                                handleRemoveOption(action.removedValue, 'event_type', 'selectedEvents');
                            } else if (action.action === 'clear') {
                                handleClearOptions('event_type', 'selectedEvents');
                            }
                        }}>
                    </DropdownMultiSelect>
                    <RangeDatePicker
                        onRangeDatePickerChange={onRangeDatePickerFilterChange}
                        placeholder="Select date range">
                    </RangeDatePicker>
                </div>
            </CCol>
        </CRow>
    )
}

export default ActivityFilters;