import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
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
import Spinner from "../../common/spinner/Spinner";
import FormContentLoader from "../../common/form/FormContentLoader";
import { GENERAL_SETTINGS } from "../../../services/validation/form.validation";
import { PERMISSION_SETTINGS_WRITE } from "../../../constants/permissions";
import { hasPermission } from "../../../services/helpers/autorization"
import { fetchSettings, refreshErrors, settingsUpdate } from '../../../redux/settings/general/generalSlice'

const GeneralSettings = () => {
    const navigate = useNavigate();
    const generalSettingsForm = useRef();
    const { t } = useTranslation();
    const { general, errors, isSubmitting, loadingDetails } = useSelector(state => state.general);
    const { permissions } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const canUpdateSettings = hasPermission(permissions, PERMISSION_SETTINGS_WRITE);
    const handleGeneralSettingsSave = () => generalSettingsForm.current.submitForm();
    const handleGeneralSettingsSubmit = (values) => dispatch(settingsUpdate({values}));
    const handleCancel = () => navigate("/dashboard");

    useEffect(() => {
        dispatch(fetchSettings())
    }, [dispatch]);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            generalSettingsForm.current.setSubmitting(false);
            generalSettingsForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        {t('label.general_settings')}
                    </CCardHeader>
                    {loadingDetails && <FormContentLoader rows={2}/>}
                    {!loadingDetails && <CCardBody className='mb-100'>
                        <Formik
                        innerRef={generalSettingsForm}
                        validationSchema={GENERAL_SETTINGS}
                        onSubmit={handleGeneralSettingsSubmit}
                        enableReinitialize={true}
                        initialValues={{
                            name: general && general.name,
                            tax: general && general.tax
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
                            <InputText
                                field="tax"
                                placeholder={t('placeholder.tax')}
                                label={t('label.tax')}
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                            />
                        </Form>
                        )}
                        </Formik>
                    </CCardBody>}
                    {(!loadingDetails && canUpdateSettings) && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleGeneralSettingsSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default GeneralSettings;