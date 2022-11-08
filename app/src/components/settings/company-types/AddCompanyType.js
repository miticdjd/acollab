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
import DropdownSelect from "../../common/form/DropdownSelect";
import Spinner from "../../common/spinner/Spinner";
import { hasPermission } from "../../../services/helpers/autorization"
import { PERMISSION_SETTINGS_WRITE } from "../../../constants/permissions";
import { COMPANY_TYPES_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, addCompanyType } from '../../../redux/settings/company-types/companyTypesSlice'
import { fetchAllCountriesList } from "../../../redux/settings/countries/countriesSlice";

const AddCompanyType = () => {
    const addCompanyTypeForm = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { permissions } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.companyTypes);
    const { allCountries } = useSelector(state => state.countries);

    const canWriteCompanyType = hasPermission(permissions, PERMISSION_SETTINGS_WRITE);

    const handleAddCompanyTypeSave = () => addCompanyTypeForm.current.submitForm();
    const handleAddCompanyTypeFormSubmit = (values) => {
        dispatch(addCompanyType({values}));
    }

    const handleCancel = () => navigate("/settings/company-types");

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            addCompanyTypeForm.current.setSubmitting(false);
            addCompanyTypeForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    useEffect(() => {
        dispatch(fetchAllCountriesList());
    }, [dispatch])

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        {t('label.create_new_company_type')}
                    </CCardHeader>
                    <CCardBody className='mb-100'>
                        <Formik
                            innerRef={addCompanyTypeForm}
                            validationSchema={COMPANY_TYPES_SETTINGS_FORM}
                            onSubmit={handleAddCompanyTypeFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: '',
                                country_id: '',
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
                            {allCountries?.length && 
                                <DropdownSelect
                                    field="country_id"
                                    options={allCountries}
                                    placeholder={t('placeholder.please_select_country')}
                                    label={t('label.country')}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}>
                                </DropdownSelect>
                            }
                        </Form>
                        )}
                        </Formik>
                    </CCardBody>
                    {canWriteCompanyType && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleAddCompanyTypeSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AddCompanyType;