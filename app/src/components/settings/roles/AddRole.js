import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { useTranslation } from 'react-i18next';
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
import Checkbox from "../../common/form/Checkbox";
import Spinner from "../../common/spinner/Spinner";
import { getAllPermissions } from "../../../services/http-services/settings/roles";
import { hasPermission } from "../../../services/helpers/autorization"
import { PERMISSION_ROLES_WRITE } from "../../../constants/permissions";
import { ROLE_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, addRole } from '../../../redux/settings/roles/rolesSlice'

const AddRole = () => {
    const addRoleForm = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        permissions: []
    });
    const { permissions } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.roles);

    const canWriteRole = hasPermission(permissions, PERMISSION_ROLES_WRITE);

    const getPermissions = async () => {
        const response = await getAllPermissions();
        if (response && response.status === 200) {
            setInnerState(prevState => {
                const updatedValues = {permissions: response.data.data}
                return {...prevState, ...updatedValues};
            });
        }
    }

    const handleAddRoleSave = () => addRoleForm.current.submitForm();
    const handleAddRoleFormSubmit = (values) => {
        let {permissions} = values;
        permissions = permissions.map(Number);
        values = {...values, permissions};
        dispatch(addRole({values}));
    }

    const handleCancel = () => navigate("/settings/roles");

    useEffect(() => {
        getPermissions();
    }, [])

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
                        {t('label.create_new_role')}
                    </CCardHeader>
                    <CCardBody className='mb-100'>
                        <Formik
                            innerRef={addRoleForm}
                            validationSchema={ROLE_SETTINGS_FORM}
                            onSubmit={handleAddRoleFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: '',
                                permissions: []
                            }}
                        >
                        {({ handleSubmit, touched, errors, values, handleChange }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <InputText
                                field="name"
                                placeholder={t('placeholder.name')}
                                label={t('label.name')}
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                            />
                            {innerState.permissions && <Checkbox
                                type="checkbox"
                                options={innerState.permissions}
                                field="permissions"
                                label={t('label.permissions')}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                            />}
                        </Form>
                        )}
                        </Formik>
                    </CCardBody>
                    {canWriteRole && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleAddRoleSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AddRole;