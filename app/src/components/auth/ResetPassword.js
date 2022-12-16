import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { Form as RectForm } from 'react-bootstrap';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { RESET_PASSWORD } from '../../services/validation/form.validation';
import { resetPassword } from '../../redux/auth/authSlice';
import Spinner from "../common/spinner/Spinner";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {isAuthenticated, loadingDetails} = useSelector((state) => state.auth);

  const handleSubmit = (values) => {
    dispatch(resetPassword(values))
  };

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
                    validationSchema={RESET_PASSWORD}
                    onSubmit={handleSubmit}
                    initialValues={{
                      token: token,
                      password: '',
                      password_confirmation: ''
                    }}
                  >
                    {({ handleSubmit, isSubmitting, touched, errors, handleChange }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <h3>Promenite lozinku</h3>
                        <p className="text-muted">Unesite novu lozinku za Vaš nalog.</p>
                        <CInputGroup className="mb-3">
                          <RectForm.Control
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Lozinka"
                            isInvalid={touched['password'] && !!errors['password']}
                            onChange={handleChange}
                          />
                          <ErrorMessage field="password" name="password" component="div" className="error invalid-feedback" />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <RectForm.Control
                            className="form-control"
                            type="password"
                            name="password_confirmation"
                            placeholder="Potvrdite novu lozinku"
                            isInvalid={touched['password_confirmation'] && !!errors['password_confirmation']}
                            onChange={handleChange}
                          />
                          <ErrorMessage field="password_confirmation" name="password_confirmation" component="div" className="error invalid-feedback" />
                        </CInputGroup>
                        <CRow>
                          <CCol lg={6}>
                            <CButton type="submit" color="primary" className="px-4" disabled={isSubmitting}>{loadingDetails ? <Spinner /> : ''}Podesi lozinku</CButton>
                          </CCol>
                          <CCol lg="6" className="d-flex justify-content-end text-lg-right pt-2">
                            <Link to="/auth/login" color="link">Nazad na login</Link>
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
};

export default ResetPassword;
