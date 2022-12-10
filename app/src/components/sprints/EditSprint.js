import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import { Formik, Form, useFormikContext } from "formik";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react';

import InputDatePicker from "../common/form/InputDatePicker";
import InputText from "../common/form/InputText";
import InputTextarea from "../common/form/InputTextarea";
import DropdownSelect from "../common/form/DropdownSelect";
import DropdownMultiSelect from "../common/form/DropdownMultiSelect";
import Spinner from "../common/spinner/Spinner";
import FormContentLoader from "../common/form/FormContentLoader";
import { getSingleSprint } from "../../services/http-services/sprints";
import { hasRole, hasOneOfRoles } from "../../services/helpers/autorization"
import { ROLE_ADMINISTRATOR, ROLE_MANAGER } from "../../constants/roles";
import { SPRINT_FORM } from "../../services/validation/form.validation";
import { refreshErrors, editSprint } from '../../redux/sprints/sprintsSlice';
import { fetchAllProjectsList } from '../../redux/projects/projectsSlice';
import { fetchAllIssuesByProject } from '../../redux/issues/issuesSlice';
import { returnDefaultMomentFormatForDB } from "../../services/helpers/date-helper";

const EditSprint = () => {
    const { id } = useParams();
    const editSprintForm = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        project_id: 0,
        name: '',
        objective: '',
        start: null,
        end: null,
        selectedProjectId: 0,
        issuesOptions: [],
        selectedIssues: [],
        loadingIssues: false
    });
    const [loadingData, setLoadingData] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const { roles } = useSelector(state => state.auth);
    const { allProjects } = useSelector(state => state.projects);
    const { allIssuesByProject } = useSelector(state => state.issues);
    const { errors, isSubmitting } = useSelector(state => state.sprints);
    const canWriteSprint = hasOneOfRoles(roles, [ROLE_ADMINISTRATOR, ROLE_MANAGER]);
    const isAdministrator = hasRole(roles, ROLE_ADMINISTRATOR);

    const getSprint = async (sprintId) => {
        setLoadingData(true);
        const response = await getSingleSprint(sprintId);
        if (response && response.status === 200) {
            const selectedIssues = response.data.data.issues.map(issue => ({value: issue.id, label: `${issue.code} - ${issue.name}`}));
            setInnerState(prevState => {
                const updatedValues = {
                    project_id: response.data.data.project.id,
                    name: response.data.data.name,
                    objective: response.data.data.objective,
                    start: response.data.data.start,
                    end: response.data.data.end,
                    issues: response.data.data.issues.map(issue => issue.id),
                    selectedProjectId: response.data.data.project.id,
                    selectedIssues
                };
                return {...prevState, ...updatedValues};
            });
            dispatch(fetchAllIssuesByProject({ project_id: response.data.data.project.id }));
            setStartDate(Date.parse(response.data.data.start));
            setEndDate(Date.parse(response.data.data.end));
            setTimeout(() => setLoadingData(false), 800);
        }
    }

    const handleEditSprintSave = () => editSprintForm.current.submitForm();
    const handleEditSprintFormSubmit = values => {
        dispatch(editSprint({id, reqBody: values}));
    }

    const handleCancel = () => navigate("/sprints");

    useEffect(() => {
        getSprint(id);
        dispatch(fetchAllProjectsList());
    }, [id]);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            editSprintForm.current.setSubmitting(false);
            editSprintForm.current.setErrors(errors);
    
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
        editSprintForm.current.setFieldValue(formField, [...editSprintForm.current.values[formField], data.value])
    };
    
    const handleRemoveOption = (data, formField, innerStateKey) => {
        const newSelectedOptionsState = innerState[innerStateKey].filter(option => option.value !== data.value);
        const newOptionsIds = editSprintForm.current.values[formField].filter(optionId => optionId !== data.value);
        editSprintForm.current.setFieldValue(formField, [...newOptionsIds])


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
        editSprintForm.current.setFieldValue(formField, []);
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
                        Promeni sprint
                    </CCardHeader>
                    {loadingData && <FormContentLoader rows={10}/>}
                    {!loadingData && <CCardBody className='mb-100'>
                        <Formik
                            innerRef={editSprintForm}
                            validationSchema={SPRINT_FORM}
                            onSubmit={handleEditSprintFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                project_id: innerState.project_id,
                                name: innerState.name,
                                objective: innerState.objective,
                                start: innerState.start,
                                end: innerState.end,
                                issues: innerState.issues
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
                            editSprintForm.current.setFieldValue(
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
                            editSprintForm.current.setFieldValue(
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
                    </CCardBody>}

                    {(!loadingData && canWriteSprint) && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleEditSprintSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }Sačuvaj</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EditSprint;