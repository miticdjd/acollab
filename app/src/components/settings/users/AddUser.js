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
    CRow
} from '@coreui/react'

import InputText from "../../common/form/InputText";
import Checkbox from "../../common/form/Checkbox";
import Spinner from "../../common/spinner/Spinner";
import { getAllRoles } from "../../../services/http-services/settings/roles";
import { hasRole } from "../../../services/helpers/autorization"
import { ROLE_ADMINISTRATOR } from "../../../constants/roles";
import { USER_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, addUser } from '../../../redux/settings/users/usersSlice';

const AddUser = () => {
    const addUserForm = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        roles: [],
        teamOptions: [],
        selectedTeams: []
    })
    const { roles } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.users);
    const canWriteUser = hasRole(roles, ROLE_ADMINISTRATOR);

    const getRoles = async () => {
        const response = await getAllRoles();
        if (response && response.status === 200) {
            setInnerState(prevState => {
                const updatedValues = {roles: response.data.data};
                return {...prevState, ...updatedValues};
            });
        }
    }

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
                    Dodaj novog korisnika
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
                            password: '',
                            password_confirmation: '',
                            roles: []
                        }}
                    >
                    {({ handleSubmit, touched, errors, values, handleChange }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <InputText
                            field="first_name"
                            placeholder="Molimo Vas da unesete ime"
                            label="Ime"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <InputText
                            field="last_name"
                            placeholder="Molimo Vas da unesete prezime"
                            label="Prezime"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <InputText
                            field="email"
                            placeholder="Molimo Vas da unesete e-mail adresu"
                            label="E-mail"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <InputText
                            field="password"
                            type="password"
                            placeholder="Molimo Vas da unesete lozinku"
                            label="Loznika"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <InputText
                            field="password_confirmation"
                            type="password"
                            placeholder="Molimo Vas da potvrdite lozinku"
                            label="Potvrdite lozinku"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        {innerState.roles && <Checkbox
                            type="checkbox"
                            options={innerState.roles}
                            field="roles"
                            label="Role"
                            touched={touched}
                            errors={errors}
                            values={values}
                            handleChange={handleChange}
                        />}
                    </Form>
                    )}
                    </Formik>
                </CCardBody>
                {canWriteUser && (
                    <CCardFooter className="bg-white">
                        <CButton type="button" color="primary" className="is-btn me-3" onClick={handleAddUserSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }Sačuvaj</CButton>
                        <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
                    </CCardFooter>
                )}
            </CCard>
        </CCol>
    </CRow>
    )
}

export default AddUser;
