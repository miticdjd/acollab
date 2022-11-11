import React, {useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react'
import { profileUpdate, passwordUpdate, refreshErrors } from '../../redux/userProfile/userProfileSlice'
import InputText from '../common/form/InputText';
import Spinner from '../common/spinner/Spinner';
import { USER_PROFILE, USER_PROFILE_PASSWORD } from '../../services/validation/form.validation';

const UserProfile = () => {
    const navigate = useNavigate();
    const profileForm = useRef();
    const passwordForm = useRef();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { 
      isPasswordSubmitting, 
      isProfileSubmitting,
      resetPasswordForm,
      errors
    } = useSelector(state => state.userProfile);
    
    const handleProfileSave = () => profileForm.current.submitForm();
    const handlePasswordSave = () => passwordForm.current.submitForm();
    const handleProfileSubmit = (values) => {
      const reqBody = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email
      }

      dispatch(profileUpdate(reqBody))
    };

    const handlePasswordSubmit = (values) => {
      dispatch(passwordUpdate(values))
    };

    const handleCancel = () => navigate("/dashboard");

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
          profileForm.current.setSubmitting(false);
          profileForm.current.setErrors(errors);
          passwordForm.current.setSubmitting(false);
          passwordForm.current.setErrors(errors);
    
          dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    useEffect(() => {
        if (resetPasswordForm) {
          passwordForm.current.resetForm();
        }
      }, [resetPasswordForm]);

    return (
        <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader className="bg-white">
                Profil
              </CCardHeader>
              <CCardBody className='mb-100'>
                <Formik
                  innerRef={profileForm}
                  validationSchema={USER_PROFILE}
                  onSubmit={handleProfileSubmit}
                  enableReinitialize={true}
                  initialValues={{
                    first_name: user && user.first_name,
                    last_name: user && user.last_name,
                    email: user && user.email
                  }}
                >
                  {({ handleSubmit, touched, errors, values, handleChange }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                      <InputText
                        field="first_name"
                        placeholder="Molimo Vas da unesete ime"
                        label="Ime"
                        values={values}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                      />
                      <InputText
                        field="last_name"
                        placeholder="Molimo Vas da unesete prezime"
                        label="Prezime"
                        values={values}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                      />
                      <InputText
                        field="email"
                        placeholder="Molimo Vas da unesete e-mail adresu"
                        label="E-mail adresa"
                        values={values}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                      />
                  </Form>
                  )}
                </Formik>
              </CCardBody>
              <CCardFooter className="bg-white">
                <CButton type="button" color="primary" className="is-btn me-3" onClick={handleProfileSave} disabled={isProfileSubmitting}>{isProfileSubmitting ? <Spinner smallSize={true}/> :  '' }Sačuvaj</CButton>
                <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
        <CRow className='my-4'>
          <CCol>
            <CCard>
              <CCardHeader className="bg-white">
                Promenite lozinku
              </CCardHeader>
              <CCardBody className='mb-100'>
                <Formik
                  innerRef={passwordForm}
                  validationSchema={USER_PROFILE_PASSWORD}
                  onSubmit={handlePasswordSubmit}
                  enableReinitialize={true}
                  initialValues={{
                    password_current: '',
                    password: '',
                    password_confirmation: ''
                  }}
                >
                  {({ handleSubmit, touched, errors, values, handleChange }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <InputText
                          field="password_current"
                          placeholder="Molimo Vas da unesete trenutnu lozinku"
                          label="Trenutna lozinka"
                          type="password"
                          values={values}
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                        />
                        <InputText
                          field="password"
                          placeholder="Molimo Vas da unesete novu lozinku"
                          label="Nova lozinka"
                          type="password"
                          values={values}
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                        />
                        <InputText
                          field="password_confirmation"
                          placeholder="Molimo Vas da potvrdite novu lozinku"
                          label="Potvrdite novu lozinku"
                          type="password"
                          values={values}
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                        />
                    </Form>
                  )}
                </Formik>
              </CCardBody>
              <CCardFooter className="bg-white">
                <CButton type="button" color="primary" className="is-btn me-3" onClick={handlePasswordSave} disabled={isPasswordSubmitting}>{isPasswordSubmitting ? <Spinner smallSize={true}/> : '' }Sačuvaj</CButton>
                <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
}

export default UserProfile;