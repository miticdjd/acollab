import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
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
import Spinner from "../../common/spinner/Spinner";
import FormContentLoader from "../../common/form/FormContentLoader";
import { GENERAL_SETTINGS } from "../../../services/validation/form.validation";
import { ROLE_ADMINISTRATOR } from "../../../constants/roles";
import { hasRole } from "../../../services/helpers/autorization"
import { fetchSettings, refreshErrors, settingsUpdate } from '../../../redux/settings/general/generalSlice'

const GeneralSettings = () => {
    const navigate = useNavigate();
    const generalSettingsForm = useRef();
    const { general, errors, isSubmitting, loadingDetails } = useSelector(state => state.general);
    const { roles } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const canUpdateSettings = hasRole(roles, ROLE_ADMINISTRATOR);
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
                        Podešavanja
                    </CCardHeader>
                    {loadingDetails && <FormContentLoader rows={2}/>}
                    {!loadingDetails && <CCardBody className='mb-100'>
                        <Formik
                        innerRef={generalSettingsForm}
                        validationSchema={GENERAL_SETTINGS}
                        onSubmit={handleGeneralSettingsSubmit}
                        enableReinitialize={true}
                        initialValues={{
                            name: general && general.name
                        }}
                        >
                        {({ handleSubmit, touched, errors, values, handleChange }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <InputText
                                field="name"
                                placeholder="Molimo Vas da unesete naziv aplikacije"
                                label="Naziv aplikacije"
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
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleGeneralSettingsSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }Sačuvaj</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default GeneralSettings;