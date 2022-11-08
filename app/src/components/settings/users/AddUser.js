import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useTranslation } from 'react-i18next';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react'

import InputText from "../../common/form/InputText";
import Checkbox from "../../common/form/Checkbox";
import Spinner from "../../common/spinner/Spinner";
import DropdownSelect from "../../common/form/DropdownSelect";
import AddressInputGroup from "../../common/form/AddressInputGroup";
import { getAllRoles } from "../../../services/http-services/settings/roles";
import { hasPermission } from "../../../services/helpers/autorization"
import { PERMISSION_USERS_WRITE } from "../../../constants/permissions";
import { USER_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, addUser } from '../../../redux/settings/users/usersSlice';
import { fetchAllCitiesList } from "../../../redux/settings/cities/citiesSlice";
import { fetchAllDepartmentsList } from "../../../redux/settings/departments/departmentsSlice";
import { fetchAllTeamsList } from "../../../redux/settings/teams/teamsSlice"
import { fetchAllPositionsList } from "../../../redux/settings/positions/positionsSlice";
import DropdownMultiSelect from "../../common/form/DropdownMultiSelect";

const AddUser = () => {
    const addUserForm = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        roles: [],
        departmentOptions: [],
        selectedDepartments: [],
        teamOptions: [],
        selectedTeams: []
    })
    const { permissions } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.users);
    const { allCities } = useSelector(state => state.cities);
    const { allDepartments } = useSelector(state => state.departments);
    const { allTeams } = useSelector(state => state.teams);
    const { allPositions } = useSelector(state => state.positions);
    const canWriteUser = hasPermission(permissions, PERMISSION_USERS_WRITE);

    const onCitySelected = (e) => {
        addUserForm.current.setFieldValue('city_id', e.target.value);
        const selectedCityObject = allCities.find(city => {
            return city.id.toString() === e.target.value.toString();
        })
        addUserForm.current.setFieldValue('country_id', selectedCityObject.country_id)
    }

    const getRoles = async () => {
        const response = await getAllRoles();
        if (response && response.status === 200) {
            setInnerState(prevState => {
                const updatedValues = {roles: response.data.data};
                return {...prevState, ...updatedValues};
            });
        }
    }

    const handleAddOption = (data, formField, innerStateKey) => {
        const newSelectedOptionsState = [...innerState[innerStateKey], data];
        setInnerState(prevState => {
            let updatedValues = {};
            updatedValues[innerStateKey] = newSelectedOptionsState;
            return {...prevState, ...updatedValues};
        });
        addUserForm.current.setFieldValue(formField, [...addUserForm.current.values[formField], data.value])
    };
    
    const handleRemoveOption = (data, formField, innerStateKey) => {
        const newSelectedOptionsState = innerState[innerStateKey].filter(option => option.value !== data.value);
        const newOptionsIds = addUserForm.current.values[formField].filter(optionId => optionId !== data.value);
        addUserForm.current.setFieldValue(formField, [...newOptionsIds])


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
        addUserForm.current.setFieldValue(formField, [])
    };

    const handleAddUserSave = () => {
        addUserForm.current.submitForm();
    }
    
    const handleAddUserFormSubmit = (values) => {
        let {roles} = values;
        roles = roles.map(Number);
        const reqBody = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone ? values.phone : undefined,
            departments: values.departments ? values.departments : undefined,
            teams: values.teams ? values.teams : undefined,
            position_id: values.position_id ? values.position_id : undefined,
            address: {
                country_id: values.country_id ? values.country_id : undefined,
                city_id: values.city_id ? values.city_id : undefined,
                street: values.street ? values.street : undefined,
                number: values.number ? values.number : undefined,
                apartment: values.apartment ? values.apartment : undefined,
                floor: values.floor ? values.floor : undefined,
                additional_info: values.additional_info ? values.additional_info : undefined
            },
            password: values.password,
            password_confirmation: values.password_confirmation,
            roles
        }
        dispatch(addUser({reqBody}));
    }

    const handleCancel = () => navigate("/settings/users");

    useEffect(() => {
        getRoles();
    }, [])

    useEffect(() => {
        dispatch(fetchAllCitiesList());
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchAllDepartmentsList());
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchAllTeamsList());
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchAllPositionsList());
    }, [dispatch])

    useEffect(() => {
        const departmentsFormatedForOptionList = allDepartments.map(department => {
            return {value: department.id, label: department.name};
        });
        setInnerState(prevState => {
            const updatedValues = {departmentOptions: departmentsFormatedForOptionList};
            return {...prevState, ...updatedValues};
        });
    }, [allDepartments])

    useEffect(() => {
        const teamsFormatedForOptionList = allTeams.map(team => {
            return {value: team.id, label: team.name};
        });
        setInnerState(prevState => {
            const updatedValues = {teamOptions: teamsFormatedForOptionList};
            return {...prevState, ...updatedValues};
        });
    }, [allTeams])

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            addUserForm.current.setSubmitting(false);
            addUserForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    return (
        <CRow>
        <CCol>
            <CCard>
                <CCardHeader className="bg-white">
                    {t('label.create_new_user')}
                </CCardHeader>
                <CCardBody className='mb-100'>
                    <Formik
                        innerRef={addUserForm}
                        validationSchema={USER_SETTINGS_FORM}
                        onSubmit={handleAddUserFormSubmit}
                        enableReinitialize={true}
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            email: '',
                            phone: '',
                            departments: [],
                            teams: [],
                            position_id: '',
                            country_id: '',
                            city_id: '',
                            street: '',
                            number: '',
                            apartment: '',
                            floor: '',
                            additional_info: '',
                            password: '',
                            password_confirmation: '',
                            roles: []
                        }}
                    >
                    {({ handleSubmit, touched, errors, values, handleChange }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <InputText
                            field="first_name"
                            placeholder={t('placeholder.first_name')}
                            label={t('label.first_name')}
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <InputText
                            field="last_name"
                            placeholder={t('placeholder.last_name')}
                            label={t('label.last_name')}
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <InputText
                            field="email"
                            placeholder={t('placeholder.email')}
                            label={t('label.email')}
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <InputText
                            field="phone"
                            placeholder={t('placeholder.phone')}
                            label={t('label.phone')}
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        { allDepartments?.length > 0 && 
                            <DropdownMultiSelect
                                classes="ms-1"
                                field="departments"
                                options={innerState.departmentOptions}
                                placeholder={t('placeholder.please_select_department')}
                                label={t('label.departments')}
                                value={innerState.selectedDepartments}
                                touched={touched}
                                errors={errors}
                                multiple={true}
                                handleChange={(value, action) => {
                                    if (action.action === 'select-option') {
                                        handleAddOption(action.option, 'departments', 'selectedDepartments');
                                    } else if (action.action === 'remove-value') {
                                        handleRemoveOption(action.removedValue, 'departments', 'selectedDepartments');
                                    } else if (action.action === 'clear') {
                                        handleClearOptions('departments', 'selectedDepartments');
                                    }
                                }}>
                            </DropdownMultiSelect>
                        }

                        { allTeams?.length > 0 && 
                            <DropdownMultiSelect
                                classes="ms-1"
                                field="departments"
                                options={innerState.teamOptions}
                                placeholder={t('placeholder.please_select_teams')}
                                label={t('label.teams')}
                                value={innerState.selectedTeams}
                                touched={touched}
                                errors={errors}
                                multiple={true}
                                handleChange={(value, action) => {
                                    if (action.action === 'select-option') {
                                        handleAddOption(action.option, 'teams', 'selectedTeams');
                                    } else if (action.action === 'remove-value') {
                                        handleRemoveOption(action.removedValue, 'teams', 'selectedTeams');
                                    } else if (action.action === 'clear') {
                                        handleClearOptions('teams', 'selectedTeams');
                                    }
                                }}>
                            </DropdownMultiSelect>
                        }

                        { allPositions?.length && 
                            <DropdownSelect
                                field="position_id"
                                options={allPositions}
                                placeholder={t('placeholder.please_select_position')}
                                label={t('label.position')}
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}>
                            </DropdownSelect>
                        }

                        <InputText
                            field="password"
                            type="password"
                            placeholder={t('placeholder.password')}
                            label={t('label.password')}
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <InputText
                            field="password_confirmation"
                            type="password"
                            placeholder={t('placeholder.confirm_password')}
                            label={t('label.confirm_password')}
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        {innerState.roles && <Checkbox
                            type="checkbox"
                            options={innerState.roles}
                            field="roles"
                            label={t('label.roles')}
                            touched={touched}
                            errors={errors}
                            values={values}
                            handleChange={handleChange}
                        />}

                        <AddressInputGroup
                            titleLabel={t("address")}
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            handleCityChange={onCitySelected}
                            countryField="country_id"
                            cityField="city_id"
                            streetField="street"
                            numberField="number"
                            floorField="floor"
                            apartmentField="apartment"
                            additionalInfoField="additional_info"
                        />
                    </Form>
                    )}
                    </Formik>
                </CCardBody>
                {canWriteUser && (
                    <CCardFooter className="bg-white">
                        <CButton type="button" color="primary" className="is-btn me-3" onClick={handleAddUserSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                        <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
                    </CCardFooter>
                )}
            </CCard>
        </CCol>
    </CRow>
    )
}

export default AddUser;
