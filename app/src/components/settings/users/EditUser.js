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
    CRow
} from '@coreui/react'

import InputText from "../../common/form/InputText";
import Checkbox from "../../common/form/Checkbox";
import Spinner from "../../common/spinner/Spinner";
import FormContentLoader from "../../common/form/FormContentLoader";
import { getSingleUser } from "../../../services/http-services/settings/users";
import { getAllRoles } from "../../../services/http-services/settings/roles";
import { hasRole } from "../../../services/helpers/autorization"
import { ROLE_ADMINISTRATOR } from "../../../constants/roles";
import { USER_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, editUser } from '../../../redux/settings/users/usersSlice';

const EditUser = () => {
    const { id } = useParams();
    const editUserForm = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        roles: [],
        checkedRoles: [],
    });
    const [loadingData, setLoadingData] = useState(false);
    const { roles } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.users);
    const canWriteUser = hasRole(roles, ROLE_ADMINISTRATOR);

    const getUser = async (userId) => {
        setLoadingData(true);
        const response = await getSingleUser(userId);
        if (response && response.status === 200) {
            const userRoleIds = response.data.data.roles.map(role => role.id.toString());
            setInnerState(prevState => {
                const updatedValues = {
                    first_name: response.data.data.first_name,
                    last_name: response.data.data.last_name,
                    email: response.data.data.email,
                    checkedRoles: userRoleIds
                };
                return {...prevState, ...updatedValues};
            });
            setTimeout(() => setLoadingData(false), 800);
        }
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

    const handleEditUserSave = () => editUserForm.current.submitForm();
    const handleEditUserFormSubmit = (values) => {
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
        dispatch(editUser({id, reqBody}));
    }

    const handleCancel = () => navigate("/settings/users");

    useEffect(() => {
        getRoles();
    }, [])

    useEffect(() => {
        getUser(id);
    }, [id])

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            editUserForm.current.setSubmitting(false);
            editUserForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        Promeni korisnika
                    </CCardHeader>
                    {loadingData && <FormContentLoader rows={10}/>}
                    {!loadingData && <CCardBody className='mb-100'>
                        <Formik
                            innerRef={editUserForm}
                            validationSchema={USER_SETTINGS_FORM}
                            onSubmit={handleEditUserFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                first_name: innerState.first_name,
                                last_name: innerState.last_name,
                                email: innerState.email,
                                password: innerState.password,
                                password_confirmation: innerState.password_confirmation,
                                roles: innerState.checkedRoles,
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
                                placeholder="Molimo vas da unesete prezime"
                                label="Prezime"
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                            />
                            <InputText
                                field="email"
                                placeholder="Molimo Vas da unesete e-mail adresu"
                                label="E-mail adresa"
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                            />

                            <InputText
                                field="password"
                                type="password"
                                placeholder="Molimo Vas da unesete lozinku"
                                label="Lozinka"
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
                    </CCardBody>}

                    {(!loadingData && canWriteUser) && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleEditUserSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }Sačuvaj</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EditUser;