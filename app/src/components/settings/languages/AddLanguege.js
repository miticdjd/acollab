import React, {useEffect, useRef} from "react";
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
import Spinner from "../../common/spinner/Spinner";
import { hasPermission } from "../../../services/helpers/autorization"
import { PERMISSION_SETTINGS_WRITE } from "../../../constants/permissions";
import { LANGUAGE_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, addLanguage} from '../../../redux/settings/languages/languagesSlice'

const AddLanguage = () => {
    const addLanguageForm = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { permissions } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.languages);

    const canWriteLanguage = hasPermission(permissions, PERMISSION_SETTINGS_WRITE);

    const handleAddLanguageFormSave = () => addLanguageForm.current.submitForm();
    const handleAddLanguageFormSubmit = (values) => {
        dispatch(addLanguage({values}));
    }

    const handleCancel = () => navigate("/settings/languages");

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            addLanguageForm.current.setSubmitting(false);
            addLanguageForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        {t('label.create_new_language')}
                    </CCardHeader>
                    <CCardBody className='mb-100'>
                        <Formik
                            innerRef={addLanguageForm}
                            validationSchema={LANGUAGE_SETTINGS_FORM}
                            onSubmit={handleAddLanguageFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: ''
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
                        </Form>
                        )}
                        </Formik>
                    </CCardBody>
                    {canWriteLanguage && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleAddLanguageFormSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AddLanguage;