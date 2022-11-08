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
import { CURRENCY_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, addCurrency } from '../../../redux/settings/currencies/currenciesSlice'

const AddCurrency = () => {
    const addCurrencyForm = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { permissions } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.currencies);

    const canWriteCurrency = hasPermission(permissions, PERMISSION_SETTINGS_WRITE);

    const handleAddCurrencySave = () => addCurrencyForm.current.submitForm();
    const handleAddCurrencyFormSubmit = (values) => {
        dispatch(addCurrency({values}));
    }

    const handleCancel = () => navigate("/settings/currencies");

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            addCurrencyForm.current.setSubmitting(false);
            addCurrencyForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        {t('label.create_new_country')}
                    </CCardHeader>
                    <CCardBody className='mb-100'>
                        <Formik
                            innerRef={addCurrencyForm}
                            validationSchema={CURRENCY_SETTINGS_FORM}
                            onSubmit={handleAddCurrencyFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: '',
                                code: '',
                                symbol: ''
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
                                field="code"
                                placeholder={t('placeholder.code')}
                                label={t('label.code')}
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                            />
                            <InputText
                                field="symbol"
                                placeholder={t('placeholder.symbol')}
                                label={t('label.symbol')}
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                            />
                        </Form>
                        )}
                        </Formik>
                    </CCardBody>
                    {canWriteCurrency && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleAddCurrencySave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AddCurrency;