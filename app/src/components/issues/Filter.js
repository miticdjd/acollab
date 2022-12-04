import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import { CRow, CCol } from "@coreui/react";
import SearchInput from "../common/form/SearchInput";
import DropdownMultiSelect from "../common/form/DropdownMultiSelect";
import { fetchAllDevelopers } from '../../redux/settings/users/usersSlice';
import { fetchAllProjectsList } from "../../redux/projects/projectsSlice";
import { fetchIssuesTypes, fetchIssuesStatuses } from "../../redux/issues/issuesSlice";

const Filter = ({
    onFiltersChange
}) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { allProjects } = useSelector(state => state.projects);
    const { allDevelopers } = useSelector(state => state.users);
    const { issuesTypes, issuesStatuses } = useSelector(state => state.issues);
    const [innerState, setInnerState] = useState({
        projectOptions: [],
        selectedProjects: [],
        project_id: [],
        issueTypeOptions: [],
        selectedIssueTypes: [],
        issue_type_id: [],
        issueStatusOptions: [],
        selectedIssueStatuses: [],
        status: [],
        developerOptions: [],
        selectedDevelopers: [],
        user_id: [],
        name: ''
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
            const updatedValues = {name: value};
            return {...prevState, ...updatedValues};
        });    
    }

    useEffect(() => {
        dispatch(fetchAllDevelopers());
        dispatch(fetchIssuesStatuses());
        dispatch(fetchIssuesTypes());
        dispatch(fetchAllProjectsList());
    }, [])

    useEffect(() => {
        const projectsFormattedForOptionList = allProjects.map(project => {
            return {value: project.id, label: project.name};
        });
        setInnerState(prevState => {
            const updatedValues = {projectOptions: projectsFormattedForOptionList};
            return {...prevState, ...updatedValues};
        });
    }, [allProjects]);

    useEffect(() => {
        const issueTypesFormattedForOptionList = issuesTypes.map(type => {
            return {value: type.id, label: type.name};
        });
        setInnerState(prevState => {
            const updatedValues = {issueTypeOptions: issueTypesFormattedForOptionList};
            return {...prevState, ...updatedValues};
        });
    }, [issuesTypes]);

    useEffect(() => {
        const issueStatusesFormattedForOptionList = issuesStatuses.map(status => {
            return {value: status, label: status};
        });
        setInnerState(prevState => {
            const updatedValues = {issueStatusOptions: issueStatusesFormattedForOptionList};
            return {...prevState, ...updatedValues};
        });
    }, [issuesTypes]);

    useEffect(() => {
        const developersFormattedForOptionList = allDevelopers.map(developer => {
            return {value: developer.id, label: developer.id === user.id ? 'Meni' : `${developer.first_name} ${developer.last_name}`};
        });
        setInnerState(prevState => {
            const updatedValues = {developerOptions: developersFormattedForOptionList};
            return {...prevState, ...updatedValues};
        });
    }, [allDevelopers]);

    useEffect(() => {
        const filters = {
            name: innerState.name ? innerState.name : undefined,
            project_id: innerState.project_id.length ? innerState.project_id : undefined,
            issue_type_id: innerState.issue_type_id.length ? innerState.issue_type_id : undefined,
            status: innerState.status.length ? innerState.status : undefined,
            user_id: innerState.user_id.length ? innerState.user_id : undefined
        }
        onFiltersChange(filters);
    }, [innerState.name, innerState.project_id, innerState.issue_type_id, innerState.status, innerState.user_id])

    return (
        <CRow>
            <CCol>
                <SearchInput
                    field="name"
                    placeholder="Pretraži po nazivu ili kodu"
                    handleSearch={onSearch}
                    >
                </SearchInput>
                <div className="row">
                    <div className="col-12 col-md-6 col-xl-3">
                        <DropdownMultiSelect 
                            classes="ms-0"
                            options={innerState.developerOptions}
                            placeholder="Dodeljen"
                            value={innerState.selectedDevelopers}
                            multiple={true}
                            handleChange={(value, action) => {
                                if (action.action === 'select-option') {
                                    handleAddOption(action.option, 'user_id', 'selectedDevelopers');
                                } else if (action.action === 'remove-value') {
                                    handleRemoveOption(action.removedValue, 'user_id', 'selectedDevelopers');
                                } else if (action.action === 'clear') {
                                    handleClearOptions('user_id', 'selectedDevelopers');
                                }
                            }}>
                        </DropdownMultiSelect>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3">
                        <DropdownMultiSelect 
                            classes="ms-0"
                            options={innerState.projectOptions}
                            placeholder="Izaberi projekte"
                            value={innerState.selectedProjects}
                            multiple={true}
                            handleChange={(value, action) => {
                                if (action.action === 'select-option') {
                                    handleAddOption(action.option, 'project_id', 'selectedProjects');
                                } else if (action.action === 'remove-value') {
                                    handleRemoveOption(action.removedValue, 'project_id', 'selectedProjects');
                                } else if (action.action === 'clear') {
                                    handleClearOptions('project_id', 'selectedProjects');
                                }
                            }}>
                        </DropdownMultiSelect>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3">
                        <DropdownMultiSelect 
                            classes="ms-0"
                            options={innerState.issueTypeOptions}
                            placeholder="Izaberi tip"
                            value={innerState.selectedIssueTypes}
                            multiple={true}
                            handleChange={(value, action) => {
                                if (action.action === 'select-option') {
                                    handleAddOption(action.option, 'issue_type_id', 'selectedIssueTypes');
                                } else if (action.action === 'remove-value') {
                                    handleRemoveOption(action.removedValue, 'issue_type_id', 'selectedIssueTypes');
                                } else if (action.action === 'clear') {
                                    handleClearOptions('issue_type_id', 'selectedIssueTypes');
                                }
                            }}>
                        </DropdownMultiSelect>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3">
                        <DropdownMultiSelect 
                            classes="ms-0"
                            options={innerState.issueStatusOptions}
                            placeholder="Izaberi status"
                            value={innerState.selectedIssueStatuses}
                            multiple={true}
                            handleChange={(value, action) => {
                                if (action.action === 'select-option') {
                                    handleAddOption(action.option, 'status', 'selectedIssueStatuses');
                                } else if (action.action === 'remove-value') {
                                    handleRemoveOption(action.removedValue, 'status', 'selectedIssueStatuses');
                                } else if (action.action === 'clear') {
                                    handleClearOptions('status', 'selectedIssueStatuses');
                                }
                            }}>
                        </DropdownMultiSelect>
                    </div>
                </div>
            </CCol>
        </CRow>
    )
}

export default Filter;