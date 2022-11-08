import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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
import DropdownSelect from "../../common/form/DropdownSelect";
import Spinner from "../../common/spinner/Spinner";
import FormContentLoader from "../../common/form/FormContentLoader";
import { getSingleCity } from "../../../services/http-services/settings/cities";
import { hasPermission } from "../../../services/helpers/autorization"
import { PERMISSION_SETTINGS_WRITE } from "../../../constants/permissions";
import { CITY_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, editCity } from '../../../redux/settings/cities/citiesSlice';
import { fetchAllCountriesList } from "../../../redux/settings/countries/countriesSlice";

const EditCity = () => {
    const { id } = useParams();
    const editCityForm = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        name: '',
        country_id: ''
    })
    const [loadingData, setLoadingData] = useState(false);
    const { permissions } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.cities);
    const { allCountries } = useSelector(state => state.countries);
    const canWriteCity = hasPermission(permissions, PERMISSION_SETTINGS_WRITE);
 
    const getCity = async (cityId) => {
        setLoadingData(true);
        const response = await getSingleCity(cityId);
        if (response && response.status === 200) {
            setInnerState(prevState => {
                const updatedValues = {
                    name: response.data.data.name,
                    country_id: response.data.data.country_id
                };
                return {...prevState, ...updatedValues};
            });
            setLoadingData(false);
        }
    }

    const handleEditCitySave = () => editCityForm.current.submitForm();
    const handleEditCityFormSubmit = (values) => {
        const reqBody = {...values};
        dispatch(editCity({id, reqBody}));
    }

    const handleCancel = () => navigate("/settings/cities");

    useEffect(() => {
        getCity(id);
    }, [id])

    useEffect(() => {
        dispatch(fetchAllCountriesList());
    }, [dispatch])


    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            editCityForm.current.setSubmitting(false);
            editCityForm.current.setErrors(errors);
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        {t('label.edit_city')}
                    </CCardHeader>
                    {loadingData && <FormContentLoader/>}
                    {!loadingData && <CCardBody className='mb-100'>
                        <Formik
                            innerRef={editCityForm}
                            validationSchema={CITY_SETTINGS_FORM}
                            onSubmit={handleEditCityFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: innerState.name,
                                country_id: innerState.country_id
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
                    </CCardBody>}
                    {(!loadingData && canWriteCity) && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleEditCitySave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EditCity;