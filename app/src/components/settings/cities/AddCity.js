import React, {useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
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
import DropdownSelect from "../../common/form/DropdownSelect";
import { hasPermission } from "../../../services/helpers/autorization"
import { PERMISSION_SETTINGS_WRITE } from "../../../constants/permissions";
import { CITY_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, addCity } from "../../../redux/settings/cities/citiesSlice";
import { fetchAllCountriesList } from "../../../redux/settings/countries/countriesSlice";

const AddCity = () => {
    const addCityForm = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { permissions } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.cities);
    const { allCountries } = useSelector(state => state.countries);

    const canWriteCity= hasPermission(permissions, PERMISSION_SETTINGS_WRITE);

    const handleAddCityFormSave = () => addCityForm.current.submitForm();
    const handleAddCityFormSubmit = (values) => {
        dispatch(addCity({values}));
    }

    const handleCancel = () => navigate("/settings/cities");

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            addCityForm.current.setSubmitting(false);
            addCityForm.current.setErrors(errors);
    
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
                        {t('label.create_new_city')}
                    </CCardHeader>
                    <CCardBody className='mb-100'>
                        <Formik
                            innerRef={addCityForm}
                            validationSchema={CITY_SETTINGS_FORM}
                            onSubmit={handleAddCityFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: '',
                                country_id: '',
                            }}
                        >
                        {({ handleSubmit, touched, errors, values, handleChange }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            { allCountries?.length && 
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
                    {canWriteCity && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleAddCityFormSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AddCity;