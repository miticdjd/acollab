import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CFormLabel
} from '@coreui/react'

import InputText from "../common/form/InputText";
import InputTextarea from "../common/form/InputTextarea";
import Spinner from "../common/spinner/Spinner";
import { hasRole, hasOneOfRoles } from "../../services/helpers/autorization"
import { ROLE_ADMINISTRATOR, ROLE_MANAGER } from "../../constants/roles";
import { PROJECT_SETTINGS_FORM } from "../../services/validation/form.validation";
import { refreshErrors, addProject } from '../../redux/projects/projectsSlice';
import { fetchAllDevelopers, fetchAllManagers } from '../../redux/settings/users/usersSlice';
import DropdownMultiSelect from "../common/form/DropdownMultiSelect";

const AddProject = () => {
    const addProjectForm = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        managerOptions: [],
        selectedManagers: [],
        developerOptions: [],
        selectedDevelopers: []
    });
    const { roles, user } = useSelector(state => state.auth);
    const { allManagers, allDevelopers } = useSelector(state => state.users);
    const { errors, isSubmitting } = useSelector(state => state.projects);
    const canWriteProject = hasOneOfRoles(roles, [ROLE_ADMINISTRATOR, ROLE_MANAGER]);
    const isAdministrator = hasRole(roles, ROLE_ADMINISTRATOR);

    const handleAddProjectSave = () => {
        addProjectForm.current.submitForm();
    }
    
    const handleAddProjectFormSubmit = (values) => {
        dispatch(addProject({reqBody : values}));
    }

    const handleCancel = () => navigate("/projects");

    useEffect(() => {
        dispatch(fetchAllManagers());
        dispatch(fetchAllDevelopers());
    }, []);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            addProjectForm.current.setSubmitting(false);
            addProjectForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    useEffect(() => {
        const managersFormatedForOptionList = allManagers.map(manager => {
            return {value: manager.id, label: `${manager.first_name} ${manager.last_name}`};
        });
        setInnerState(prevState => {
            const updatedValues = {managerOptions: managersFormatedForOptionList};
            return {...prevState, ...updatedValues};
        });
    }, [allManagers]);

    useEffect(() => {
        const developersFormatedForOptionList = allDevelopers.map(developer => {
            return {value: developer.id, label: `${developer.first_name} ${developer.last_name}`};
        });
        setInnerState(prevState => {
            const updatedValues = {developerOptions: developersFormatedForOptionList};
            return {...prevState, ...updatedValues};
        });
    }, [allDevelopers]);

    const handleAddOption = (data, formField, innerStateKey) => {
        const newSelectedOptionsState = [...innerState[innerStateKey], data];
        setInnerState(prevState => {
            let updatedValues = {};
            updatedValues[innerStateKey] = newSelectedOptionsState;
            return {...prevState, ...updatedValues};
        });
        addProjectForm.current.setFieldValue(formField, [...addProjectForm.current.values[formField], data.value])
    };
    
    const handleRemoveOption = (data, formField, innerStateKey) => {
        const newSelectedOptionsState = innerState[innerStateKey].filter(option => option.value !== data.value);
        const newOptionsIds = addProjectForm.current.values[formField].filter(optionId => optionId !== data.value);
        addProjectForm.current.setFieldValue(formField, [...newOptionsIds])


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
        addProjectForm.current.setFieldValue(formField, [])
    };

    return (
        <CRow>
        <CCol>
            <CCard>
                <CCardHeader className="bg-white">
                    Kreiraj novi projekat
                </CCardHeader>
                <CCardBody className='mb-100'>
                    <Formik
                        innerRef={addProjectForm}
                        validationSchema={PROJECT_SETTINGS_FORM}
                        onSubmit={handleAddProjectFormSubmit}
                        enableReinitialize={true}
                        initialValues={{
                            name: '',
                            code: '',
                            description: '',
                            managers: [],
                            developers: []
                        }}
                    >
                    {({ handleSubmit, touched, errors, values, handleChange }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <InputText
                            field="name"
                            placeholder="Molimo Vas da unesete naziv projekta"
                            label="Naziv"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />
                        <InputText
                            field="code"
                            placeholder="Molimo Vas da unesete šifru projekta"
                            label="Šifra"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />
                        <InputTextarea
                            field="description"
                            placeholder="Molimo Vas da unesete opis projekta"
                            label="Opis"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />
                        { allManagers?.length > 0 && isAdministrator && 
                            <DropdownMultiSelect
                                classes="ms-1"
                                field="departments"
                                options={innerState.managerOptions}
                                placeholder="Izaberite manadzere projekta"
                                label="Manadzeri"
                                value={innerState.selectedManagers}
                                touched={touched}
                                errors={errors}
                                multiple={true}
                                handleChange={(value, action) => {
                                    if (action.action === 'select-option') {
                                        handleAddOption(action.option, 'managers', 'selectedManagers');
                                    } else if (action.action === 'remove-value') {
                                        handleRemoveOption(action.removedValue, 'managers', 'selectedManagers');
                                    } else if (action.action === 'clear') {
                                        handleClearOptions('managers', 'selectedManagers');
                                    }
                                }}>
                            </DropdownMultiSelect>
                        }
                        {
                            !isAdministrator && (
                                <CRow className="mb-3">
                                    <CCol md="2">
                                        <CFormLabel className="is-label-text" htmlFor="managers">Manadžeri</CFormLabel>
                                    </CCol>
                                    <CCol xs="12" md="10">
                                        {user.first_name} {user.last_name}
                                    </CCol>
                                </CRow>
                            )
                        }
                        { allDevelopers?.length > 0 && 
                            <DropdownMultiSelect
                                classes="ms-1"
                                field="departments"
                                options={innerState.developerOptions}
                                placeholder="Izaberite programere koji rade na projektu"
                                label="Programeri"
                                value={innerState.selectedDevelopers}
                                touched={touched}
                                errors={errors}
                                multiple={true}
                                handleChange={(value, action) => {
                                    if (action.action === 'select-option') {
                                        handleAddOption(action.option, 'developers', 'selectedDevelopers');
                                    } else if (action.action === 'remove-value') {
                                        handleRemoveOption(action.removedValue, 'developers', 'selectedDevelopers');
                                    } else if (action.action === 'clear') {
                                        handleClearOptions('developers', 'selectedDevelopers');
                                    }
                                }}>
                            </DropdownMultiSelect>
                        }
                    </Form>
                    )}
                    </Formik>
                </CCardBody>
                {canWriteProject && (
                    <CCardFooter className="bg-white">
                        <CButton type="button" color="primary" className="is-btn me-3" onClick={handleAddProjectSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }Sačuvaj</CButton>
                        <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
                    </CCardFooter>
                )}
            </CCard>
        </CCol>
    </CRow>
    )
}

export default AddProject;
