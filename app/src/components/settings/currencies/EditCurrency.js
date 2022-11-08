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
import Spinner from "../../common/spinner/Spinner";
import FormContentLoader from "../../common/form/FormContentLoader";
import { getSingleCurrency } from "../../../services/http-services/settings/currencies";
import { hasPermission } from "../../../services/helpers/autorization"
import { PERMISSION_SETTINGS_WRITE } from "../../../constants/permissions";
import { CURRENCY_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, editCurrency } from '../../../redux/settings/currencies/currenciesSlice';

const EditCurrency = () => {
    const { id } = useParams();
    const editCurrencyForm = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        name: '',
        code: '',
        symbol: ''
    })
    const [loadingData, setLoadingData] = useState(false);
    const { permissions } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.currencies);
    const canWriteCurrency = hasPermission(permissions, PERMISSION_SETTINGS_WRITE);
 
    const getCurrency = async (currencyId) => {
        setLoadingData(true);
        const response = await getSingleCurrency(currencyId);
        if (response && response.status === 200) {
            setInnerState(prevState => {
                const updatedValues = {
                    name: response.data.data.name, 
                    code: response.data.data.code, 
                    symbol: response.data.data.symbol
                };
                return {...prevState, ...updatedValues};
            });
            setLoadingData(false);
        }
    }

    const handleEditCurrencySave = () => editCurrencyForm.current.submitForm();
    const handleEditCurrencyFormSubmit = (values) => {
        const reqBody = {...values};
        dispatch(editCurrency({id, reqBody}));
    }

    const handleCancel = () => navigate("/settings/currencies");

    useEffect(() => {
        getCurrency(id);
    }, [id])


    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            editCurrencyForm.current.setSubmitting(false);
            editCurrencyForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        {t('label.edit_currency')}
                    </CCardHeader>
                    {loadingData && <FormContentLoader/>}
                    {!loadingData && <CCardBody className='mb-100'>
                        <Formik
                            innerRef={editCurrencyForm}
                            validationSchema={CURRENCY_SETTINGS_FORM}
                            onSubmit={handleEditCurrencyFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: innerState.name,
                                code: innerState.code,
                                symbol: innerState.symbol
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
                    </CCardBody>}
                    {(!loadingData && canWriteCurrency) && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleEditCurrencySave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EditCurrency;