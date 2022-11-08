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
import { getSingleLanguage } from "../../../services/http-services/settings/languages";
import { hasPermission } from "../../../services/helpers/autorization"
import { PERMISSION_SETTINGS_WRITE } from "../../../constants/permissions";
import { LANGUAGE_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, editLanguage } from '../../../redux/settings/languages/languagesSlice';

const EditLangauge = () => {
    const { id } = useParams();
    const editLanguageForm = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        name: ''
    })
    const [loadingData, setLoadingData] = useState(false);
    const { permissions } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.languages);
    const canWriteLanguage = hasPermission(permissions, PERMISSION_SETTINGS_WRITE);
 
    const getLanguage = async (languageId) => {
        setLoadingData(true);
        const response = await getSingleLanguage(languageId);
        if (response && response.status === 200) {
            setInnerState(prevState => {
                const updatedValues = {
                    name: response.data.data.name
                };
                return {...prevState, ...updatedValues};
            });
            setLoadingData(false);
        }
    }

    const handleEditLanguageSave = () => editLanguageForm.current.submitForm();
    const handleEditLanguageFormSubmit = (values) => {
        const reqBody = {...values};
        dispatch(editLanguage({id, reqBody}));
    }

    const handleCancel = () => navigate("/settings/languages");

    useEffect(() => {
        getLanguage(id);
    }, [id])


    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            editLanguageForm.current.setSubmitting(false);
            editLanguageForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        {t('label.edit_language')}
                    </CCardHeader>
                    {loadingData && <FormContentLoader/>}
                    {!loadingData && <CCardBody className='mb-100'>
                        <Formik
                            innerRef={editLanguageForm}
                            validationSchema={LANGUAGE_SETTINGS_FORM}
                            onSubmit={handleEditLanguageFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: innerState.name
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
                    </CCardBody>}
                    {(!loadingData && canWriteLanguage) && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleEditLanguageSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EditLangauge;