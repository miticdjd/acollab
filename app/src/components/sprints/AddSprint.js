import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, useFormikContext } from "formik";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'

import InputDatePicker from "../common/form/InputDatePicker";
import InputText from "../common/form/InputText";
import InputTextarea from "../common/form/InputTextarea";
import DropdownSelect from "../common/form/DropdownSelect";
import DropdownMultiSelect from "../common/form/DropdownMultiSelect";
import Spinner from "../common/spinner/Spinner";
import { hasRole, hasOneOfRoles } from "../../services/helpers/autorization"
import { ROLE_ADMINISTRATOR, ROLE_MANAGER } from "../../constants/roles";
import { SPRINT_FORM } from "../../services/validation/form.validation";
import { refreshErrors, addSprint } from '../../redux/sprints/sprintsSlice';
import { fetchAllProjectsList } from '../../redux/projects/projectsSlice';
import { fetchAllIssuesByProject } from '../../redux/issues/issuesSlice';
import { returnDefaultMomentFormatForDB } from "../../services/helpers/date-helper";

const AddSprint = () => {
    const addSprintForm = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { roles } = useSelector(state => state.auth);
    const { allProjects } = useSelector(state => state.projects);
    const { allIssuesByProject } = useSelector(state => state.issues);
    const { errors, isSubmitting } = useSelector(state => state.sprints);
    const canWriteSprint = hasOneOfRoles(roles, [ROLE_ADMINISTRATOR, ROLE_MANAGER]);
    const isAdministrator = hasRole(roles, ROLE_ADMINISTRATOR);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [innerState, setInnerState] = useState({
        selectedProjectId: null,
        issuesOptions: [],
        selectedIssues: [],
        loadingIssues: false
    })

    const handleAddSprintSave = () => {
        addSprintForm.current.submitForm();
    }
    
    const handleAddSprintFormSubmit = (values) => {
        dispatch(addSprint({reqBody : values}));
    }

    const handleCancel = () => navigate("/sprints");

    useEffect(() => {
        dispatch(fetchAllProjectsList());
    }, []);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            addSprintForm.current.setSubmitting(false);
            addSprintForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    const handleAddOption = (data, formField, innerStateKey) => {
        const newSelectedOptionsState = [...innerState[innerStateKey], data];
        setInnerState(prevState => {
            let updatedValues = {};
            updatedValues[innerStateKey] = newSelectedOptionsState;
            return {...prevState, ...updatedValues};
        });
        addSprintForm.current.setFieldValue(formField, [...addSprintForm.current.values[formField], data.value])
    };
    
    const handleRemoveOption = (data, formField, innerStateKey) => {
        const newSelectedOptionsState = innerState[innerStateKey].filter(option => option.value !== data.value);
        const newOptionsIds = addSprintForm.current.values[formField].filter(optionId => optionId !== data.value);
        addSprintForm.current.setFieldValue(formField, [...newOptionsIds])


        setInnerState(prevState => {
            let updatedValues = {};
            updatedValues[innerStateKey] = newSelectedOptionsState;
            return {...prevState, ...updatedValues};
        });
    };
    
    const handleClearOptions = (formField, innerStateKey) => {
        setInnerState(prevState => {
            let  updatedValues = {};
            updatedValues[innerStateKey] = [];
            return {...prevState, ...updatedValues};
        });
        addSprintForm.current.setFieldValue(formField, []);
    };

    useEffect(() => {
        const issuesFormattedForOptionList = allIssuesByProject.map(issue => {
            return {value: issue.id, label: `${issue.code} - ${issue.name}`};
        });
        setInnerState(prevState => {
            const updatedValues = {issuesOptions: issuesFormattedForOptionList, loadingIssues: false, loadIssues: false};
            return {...prevState, ...updatedValues};
        });
    }, [allIssuesByProject]);

    useEffect(() => {
        if (innerState.loadIssues) {
            dispatch(fetchAllIssuesByProject({ project_id: innerState.selectedProjectId }));
        }
    }, [innerState.loadIssues])

    const FetchAppropriateIssues = () => {
        const { values } = useFormikContext();
        React.useEffect(() => {
          if (values.project_id > 0 && innerState.selectedProjectId !== values.project_id && innerState.loadingIssues === false) {
            setInnerState({...innerState, loadingIssues: true, loadIssues: true, selectedProjectId: values.project_id, issuesOptions: [], selectedIssues: []});
          }
        }, [values]);
        return null;
      };

    return (
        <CRow>
        <CCol>
            <CCard>
                <CCardHeader className="bg-white">
                    Kreiraj novi sprint
                </CCardHeader>
                <CCardBody className='mb-100'>
                    <Formik
                        innerRef={addSprintForm}
                        validationSchema={SPRINT_FORM}
                        onSubmit={handleAddSprintFormSubmit}
                        enableReinitialize={true}
                        initialValues={{
                            project_id: 0,
                            name: '',
                            objective: '',
                            start: '',
                            end: '',
                            issues: []
                        }}
                    >
                    {({ handleSubmit, touched, errors, values, handleChange }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <FetchAppropriateIssues />
                        <DropdownSelect
                            field="project_id"
                            options={allProjects}
                            placeholder="Molimo Vas da izaberete projekat"
                            label="Projekat"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}>
                        </DropdownSelect>
                        <InputText
                            field="name"
                            placeholder="Molimo Vas da unesete naziv sprinta"
                            label="Naziv"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />
                        <InputTextarea
                            field="objective"
                            placeholder="Molimo Vas da unesete cilj"
                            label="Cilj"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />
                        <InputDatePicker
                            date={startDate}
                            maxDate={new Date()}
                            handleDateChange={date => {
                            addSprintForm.current.setFieldValue(
                                "start",
                                date ? returnDefaultMomentFormatForDB(date) : ""
                            );
                            setStartDate(date);
                            }}
                            label="Početak sprinta"
                            field="start"
                            placeholder="Molimo Vas da izaberete početak sprinta"
                            errors={errors}
                            touched={touched}
                        />
                        <InputDatePicker
                            date={endDate}
                            minDate={new Date()}
                            handleDateChange={date => {
                            addSprintForm.current.setFieldValue(
                                "end",
                                date ? returnDefaultMomentFormatForDB(date) : ""
                            );
                            setEndDate(date);
                            }}
                            label="Kraj sprinta"
                            field="end"
                            placeholder="Molimo Vas da izaberete kraj sprinta"
                            errors={errors}
                            touched={touched}
                        />
                        <DropdownMultiSelect
                            classes="ms-1"
                            field="issues"
                            options={innerState.issuesOptions}
                            placeholder="Molimo Vas da izaberete taskove"
                            label="Taskovi"
                            value={innerState.selectedIssues}
                            touched={touched}
                            errors={errors}
                            isLoading={innerState.loadingIssues}
                            isDisabled={values.project_id === null}
                            multiple={true}
                            handleChange={(value, action) => {
                                if (action.action === 'select-option') {
                                    handleAddOption(action.option, 'issues', 'selectedIssues');
                                } else if (action.action === 'remove-value') {
                                    handleRemoveOption(action.removedValue, 'issues', 'selectedIssues');
                                } else if (action.action === 'clear') {
                                    handleClearOptions('issues', 'selectedIssues');
                                }
                            }}>
                        </DropdownMultiSelect>
                    </Form>
                    )}
                    </Formik>
                </CCardBody>
                {canWriteSprint && (
                    <CCardFooter className="bg-white">
                        <CButton type="button" color="primary" className="is-btn me-3" onClick={handleAddSprintSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }Sačuvaj</CButton>
                        <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
                    </CCardFooter>
                )}
            </CCard>
        </CCol>
    </CRow>
    )
}

export default AddSprint;
