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
import DropdownSelect from "../../common/form/DropdownSelect";
import Spinner from "../../common/spinner/Spinner";
import FormContentLoader from "../../common/form/FormContentLoader";
import { getSingleCompanyType } from "../../../services/http-services/settings/company-types";
import { hasPermission } from "../../../services/helpers/autorization"
import { PERMISSION_SETTINGS_WRITE } from "../../../constants/permissions";
import { COMPANY_TYPES_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, editCompanyType } from '../../../redux/settings/company-types/companyTypesSlice';
import { fetchAllCountriesList } from "../../../redux/settings/countries/countriesSlice";

const EditCompanyType = () => {
    const { id } = useParams();
    const editCompanyTypesForm = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        name: '',
        country_id: ''
    })
    const [loadingData, setLoadingData] = useState(false);
    const { permissions } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.companyTypes);
    const canWriteCompanyType = hasPermission(permissions, PERMISSION_SETTINGS_WRITE);
    const { allCountries } = useSelector(state => state.countries);
 
    const getCompanyType = async (companyTypeId) => {
        setLoadingData(true);
        const response = await getSingleCompanyType(companyTypeId);
        if (response && response.status === 200) {
            setInnerState(prevState => {
                const updatedValues = {
                    name: response.data.data.name,
                    country_id: response.data.data.country.id
                };
                return {...prevState, ...updatedValues};
            });
            setLoadingData(false);
        }
    }

    const handleEditCompanyTypesFormSave = () => editCompanyTypesForm.current.submitForm();
    const handleEditCompanyTypesFormFormSubmit = (values) => {
        const reqBody = {...values};
        dispatch(editCompanyType({id, reqBody}));
    }

    const handleCancel = () => navigate("/settings/company-types");

    useEffect(() => {
        getCompanyType(id);
    }, [id])


    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            editCompanyTypesForm.current.setSubmitting(false);
            editCompanyTypesForm.current.setErrors(errors);
    
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
                        {t('label.edit_company_type')}
                    </CCardHeader>
                    {loadingData && <FormContentLoader/>}
                    {!loadingData && <CCardBody className='mb-100'>
                        <Formik
                            innerRef={editCompanyTypesForm}
                            validationSchema={COMPANY_TYPES_SETTINGS_FORM}
                            onSubmit={handleEditCompanyTypesFormFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: innerState.name,
                                country_id: innerState.country_id,
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
                        </Form>
                        )}
                        </Formik>
                    </CCardBody>}
                    {(!loadingData && canWriteCompanyType) && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleEditCompanyTypesFormSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EditCompanyType;