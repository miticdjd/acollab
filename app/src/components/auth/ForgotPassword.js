import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { Form as RectForm } from 'react-bootstrap';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInputGroup,
  CRow
} from '@coreui/react';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { FORGOT_PASSWORD } from '../../services/validation/form.validation';
import { forgotPassword } from '../../redux/auth/authSlice';
import Spinner from "../common/spinner/Spinner";

const ForgotPassword = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        dispatch(forgotPassword(values));
    }
    const { isAuthenticated, loadingDetails } = useSelector(state => state.auth);
    let navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
        return navigate("/dashboard");
        }
    }, [isAuthenticated, navigate])

    return (
        <div className='bg-light'>
            <CContainer>
                <CRow className="min-vh-100 align-items-center justify-content-center">
                    <CCol md="6">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <Formik
                                        validationSchema={FORGOT_PASSWORD}
                                        onSubmit={handleSubmit}
                                        initialValues={{
                                            email: ''
                                        }}
                                    >
                                        {({ handleSubmit, isSubmitting, touched, errors, handleChange }) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <h3>{t('text.reset_password')}</h3>
                                            <p className="text-muted">{t('text.enter_email_address_to_reset_password')}</p>
                                            <CInputGroup className="mb-3">
                                                <RectForm.Control
                                                    className="form-control"
                                                    type="email"
                                                    name="email"
                                                    placeholder={t('label.email')}
                                                    isInvalid={touched['email'] && !!errors['email']}
                                                    onChange={handleChange}
                                                />
                                                <ErrorMessage field="email" name="email" component="div" className="error invalid-feedback" />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol lg={6}>
                                                    <CButton type="submit" color="primary" className="px-4" disabled={isSubmitting}>{loadingDetails ? <Spinner /> : ''}{t('label.reset')}</CButton>
                                                </CCol>
                                                <CCol lg="6" className="d-flex justify-content-end text-lg-right pt-2">
                                                    <Link to="/auth/login" color="link">{t('text.back_to_login')}</Link>
                                                </CCol>
                                            </CRow>
                                        </Form>
                                        )}
                                    </Formik>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>    
    )
}

export default ForgotPassword;