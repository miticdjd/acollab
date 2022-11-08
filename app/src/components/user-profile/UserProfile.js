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
import { useTranslation } from 'react-i18next';
import { profileUpdate, passwordUpdate, refreshErrors } from '../../redux/userProfile/userProfileSlice'
import InputText from '../common/form/InputText';
import AddressInputGroup from '../common/form/AddressInputGroup';
import Spinner from '../common/spinner/Spinner';
import { fetchAllCitiesList } from "../../redux/settings/cities/citiesSlice";
import { USER_PROFILE, USER_PROFILE_PASSWORD } from '../../services/validation/form.validation';

const UserProfile = () => {
    const navigate = useNavigate();
    const profileForm = useRef();
    const passwordForm = useRef();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { allCities } = useSelector(state => state.cities);
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
        email: values.email,
        phone: values.phone ? values.phone : undefined,
        address_id: values.address_id,
        address: {
          country_id: values.country_id ? values.country_id : undefined,
          city_id: values.city_id ? values.city_id : undefined,
          street: values.street ? values.street : undefined,
          number: values.number ? values.number : undefined,
          apartment: values.apartment ? values.apartment : undefined,
          floor: values.floor ? values.floor : undefined,
        }
      }

      dispatch(profileUpdate(reqBody))
    };

    const onCitySelected = (e) => {
      profileForm.current.setFieldValue('city_id', e.target.value);
      const selectedCityObject = allCities.find(city => {
          return city.id.toString() === e.target.value.toString();
      })

      if (selectedCityObject) {
        profileForm.current.setFieldValue('country_id', selectedCityObject.country_id);
      }
    }

    const handlePasswordSubmit = (values) => {
      dispatch(passwordUpdate(values))
    };

    const handleCancel = () => navigate("/dashboard");

    useEffect(() => {
      dispatch(fetchAllCitiesList());
    }, [dispatch])

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
                {t('label.profile')}
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
                    email: user && user.email,
                    phone: user && user.phone,
                    address_id: user && user.address_id,
                    country_id: user && user.address?.country_id,
                    city_id: user && user.address?.city_id,
                    street: user && user.address?.street,
                    number: user && user.address?.number,
                    apartment: user && user.address?.apartment ?  user.address?.apartment : undefined,
                    floor: user && user.address?.floor ? user.address?.floor : undefined,
                  }}
                >
                  {({ handleSubmit, touched, errors, values, handleChange }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                      <InputText
                        field="first_name"
                        placeholder={t('placeholder.first_name')}
                        label={t('label.first_name')}
                        values={values}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                      />
                      <InputText
                        field="last_name"
                        placeholder={t('placeholder.last_name')}
                        label={t('label.last_name')}
                        values={values}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                      />
                      <InputText
                        field="email"
                        placeholder={t('placeholder.email_address')}
                        label={t('label.email_address')}
                        values={values}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                      />
                       <InputText
                        field="phone"
                        placeholder={t('placeholder.phone')}
                        label={t('label.phone')}
                        values={values}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                      />

                      <AddressInputGroup
                        titleLabel={t("address")}
                        values={values}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        handleCityChange={onCitySelected}
                        countryField="country_id"
                        cityField="city_id"
                        streetField="street"
                        numberField="number"
                        floorField="floor"
                        apartmentField="apartment"
                        additionalInfoField="additional_info"
                      />
                  </Form>
                  )}
                </Formik>
              </CCardBody>
              <CCardFooter className="bg-white">
                <CButton type="button" color="primary" className="is-btn me-3" onClick={handleProfileSave} disabled={isProfileSubmitting}>{isProfileSubmitting ? <Spinner smallSize={true}/> :  '' }{t('label.save')}</CButton>
                <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
        <CRow className='my-4'>
          <CCol>
            <CCard>
              <CCardHeader className="bg-white">
                {t('label.password')}
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
                          placeholder={t('placeholder.current_password')}
                          label={t('label.current_password')}
                          type="password"
                          values={values}
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                        />
                        <InputText
                          field="password"
                          placeholder={t('placeholder.new_password')}
                          label={t('label.new_password')}
                          type="password"
                          values={values}
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                        />
                        <InputText
                          field="password_confirmation"
                          placeholder={t('placeholder.confirm_new_password')}
                          label={t('label.confirm_new_password')}
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
                <CButton type="button" color="primary" className="is-btn me-3" onClick={handlePasswordSave} disabled={isPasswordSubmitting}>{isPasswordSubmitting ? <Spinner smallSize={true}/> : '' }{t('label.save')}</CButton>
                <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>{t('label.cancel')}</CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
}

export default UserProfile;