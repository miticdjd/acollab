import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
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
} from '@coreui/react';

import InputText from "../common/form/InputText";
import InputTextarea from "../common/form/InputTextarea";
import Spinner from "../common/spinner/Spinner";
import FormContentLoader from "../common/form/FormContentLoader";
import { getSingleProject } from "../../services/http-services/projects";
import { fetchAllDevelopers, fetchAllManagers } from '../../redux/settings/users/usersSlice';
import { hasRole, hasOneOfRoles } from "../../services/helpers/autorization"
import { ROLE_ADMINISTRATOR, ROLE_MANAGER } from "../../constants/roles";
import { PROJECT_SETTINGS_FORM } from "../../services/validation/form.validation";
import { refreshErrors, editProject } from '../../redux/projects/projectsSlice';
import DropdownMultiSelect from "../common/form/DropdownMultiSelect";

const EditUser = () => {
    const { id } = useParams();
    const editProjectForm = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        name: '',
        code: '',
        description: '',
        managers: [],
        developers: [],
        managerOptions: [],
        selectedManagers: [],
        developerOptions: [],
        selectedDevelopers: []
    });
    const [loadingData, setLoadingData] = useState(false);
    const { roles } = useSelector(state => state.auth);
    const { allManagers, allDevelopers } = useSelector(state => state.users);
    const { errors, isSubmitting } = useSelector(state => state.projects);
    const canWriteProject = hasOneOfRoles(roles, [ROLE_ADMINISTRATOR, ROLE_MANAGER]);
    const isAdministrator = hasRole(roles, ROLE_ADMINISTRATOR);

    const getProject = async (projectId) => {
        setLoadingData(true);
        const response = await getSingleProject(projectId);
        if (response && response.status === 200) {
            const managerIds = response.data.data.managers.map(manager => manager.id);
            const selectedManagers = response.data.data.managers.map(manager => {
                return {value: manager.id, label: `${manager.first_name} ${manager.last_name}`};
            });
            const developerIds = response.data.data.developers.map(developer => developer.id);
            const selectedDevelopers = response.data.data.developers.map(developer => {
                return {value: developer.id, label: `${developer.first_name} ${developer.last_name}`};
            });
            setInnerState(prevState => {
                const updatedValues = {
                    name: response.data.data.name,
                    code: response.data.data.code,
                    description: response.data.data.description,
                    managers: managerIds,
                    developers: developerIds,
                    selectedManagers,
                    selectedDevelopers
                };
                return {...prevState, ...updatedValues};
            });
            setTimeout(() => setLoadingData(false), 800);
        }
    }

    const handleEditProjectSave = () => editProjectForm.current.submitForm();
    const handleEditProjectFormSubmit = values => {
        dispatch(editProject({id, reqBody: values}));
    }

    const handleCancel = () => navigate("/projects");

    useEffect(() => {
        dispatch(fetchAllManagers());
        dispatch(fetchAllDevelopers());
        getProject(id);
    }, [id]);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            editProjectForm.current.setSubmitting(false);
            editProjectForm.current.setErrors(errors);
    
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
        editProjectForm.current.setFieldValue(formField, [...editProjectForm.current.values[formField], data.value])
    };
    
    const handleRemoveOption = (data, formField, innerStateKey) => {
        const newSelectedOptionsState = innerState[innerStateKey].filter(option => option.value !== data.value);
        const newOptionsIds = editProjectForm.current.values[formField].filter(optionId => optionId !== data.value);
        editProjectForm.current.setFieldValue(formField, [...newOptionsIds])


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
        editProjectForm.current.setFieldValue(formField, [])
    };

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        Promeni projekat
                    </CCardHeader>
                    {loadingData && <FormContentLoader rows={10}/>}
                    {!loadingData && <CCardBody className='mb-100'>
                        <Formik
                            innerRef={editProjectForm}
                            validationSchema={PROJECT_SETTINGS_FORM}
                            onSubmit={handleEditProjectFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: innerState.name,
                                code: innerState.code,
                                description: innerState.description,
                                managers: innerState.managers,
                                developers: innerState.developers,
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
                                    placeholder="Izaberite manadžere projekta"
                                    label="Manadžeri"
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
                                            {innerState.selectedManagers.map(manager => manager.label).join(', ')}
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
                    </CCardBody>}

                    {(!loadingData && canWriteProject) && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleEditProjectSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }Sačuvaj</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EditUser;