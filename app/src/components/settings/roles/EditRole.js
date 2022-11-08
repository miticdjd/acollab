import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
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
import FormContentLoader from "../../common/form/FormContentLoader";
import { getAllPermissions, getSingleRole } from "../../../services/http-services/settings/roles";
import { hasPermission } from "../../../services/helpers/autorization"
import { PERMISSION_ROLES_WRITE } from "../../../constants/permissions";
import { ROLE_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, editRole } from '../../../redux/settings/roles/rolesSlice';

const EditRole = () => {
    const { id } = useParams();
    const editRoleForm = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        permissions: [],
        checkedPermissions: [],
        name: ''
    })
    const [loadingData, setLoadingData] = useState(false);
    const { permissions } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.roles);
    const canWriteRole = hasPermission(permissions, PERMISSION_ROLES_WRITE);

    const getPermissions = async () => {
        const response = await getAllPermissions();
        if (response && response.status === 200) {
            setInnerState(prevState => {
                const updatedValues = {permissions: response.data.data};
                return {...prevState, ...updatedValues};
            });
        }
    }
 
    const getRole = async (roleId) => {
        setLoadingData(true);
        const response = await getSingleRole(roleId);
        if (response && response.status === 200) {
            const userPermissionsIds = response.data.data.permissions.map(permission => permission.id.toString());
            setInnerState(prevState => {
                const updatedValues = {name: response.data.data.name, checkedPermissions: userPermissionsIds};
                return {...prevState, ...updatedValues};
            });
            setLoadingData(false);
        }
    }

    const handleEditRoleSave = () => editRoleForm.current.submitForm();
    const handleEditRoleFormSubmit = (values) => {
        let {permissions} = values;
        permissions = permissions.map(Number);
        const reqBody = {...values, permissions};
        dispatch(editRole({id, reqBody}));
    }

    const handleCancel = () => navigate("/settings/roles");

    useEffect(() => {
        getPermissions();
    }, [])

    useEffect(() => {
        getRole(id);
    }, [id])


    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            editRoleForm.current.setSubmitting(false);
            editRoleForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        {t('label.edit_role')}
                    </CCardHeader>
                    {loadingData && <FormContentLoader/>}
                    {!loadingData && <CCardBody className='mb-100'>
                        <Formik
                            innerRef={editRoleForm}
                            validationSchema={ROLE_SETTINGS_FORM}
                            onSubmit={handleEditRoleFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: innerState.name,
                                permissions: innerState.checkedPermissions
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
                                optionsCaption={t('label.settings')}
                                options={innerState.permissions}
                                field="permissions"
                                label={t('label.permissions')}
                                touched={touched}
                                errors={errors}
                                values={values}
                                handleChange={handleChange}
                            />}
                        </Form>
                        )}
                        </Formik>
                    </CCardBody>}
                    {(!loadingData && canWriteRole) && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleEditRoleSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EditRole;