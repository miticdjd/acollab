import React, {useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
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
import Spinner from "../../common/spinner/Spinner";
import { hasRole } from "../../../services/helpers/autorization"
import { ROLE_ADMINISTRATOR } from "../../../constants/roles";
import { ROLE_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, addRole } from '../../../redux/settings/roles/rolesSlice'

const AddRole = () => {
    const addRoleForm = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { roles } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.roles);

    const canWriteRole = hasRole(roles, ROLE_ADMINISTRATOR);

    const handleAddRoleSave = () => addRoleForm.current.submitForm();
    const handleAddRoleFormSubmit = (values) => {
        dispatch(addRole({values}));
    }

    const handleCancel = () => navigate("/settings/roles");

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            addRoleForm.current.setSubmitting(false);
            addRoleForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        Dodaj novu rolu
                    </CCardHeader>
                    <CCardBody className='mb-100'>
                        <Formik
                            innerRef={addRoleForm}
                            validationSchema={ROLE_SETTINGS_FORM}
                            onSubmit={handleAddRoleFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: ''
                            }}
                        >
                        {({ handleSubmit, touched, errors, values, handleChange }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <InputText
                                field="name"
                                placeholder="Molimo Vas da unesete naziv"
                                label="Naziv"
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                            />
                        </Form>
                        )}
                        </Formik>
                    </CCardBody>
                    {canWriteRole && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleAddRoleSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }Sačuvaj</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AddRole;