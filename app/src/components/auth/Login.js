import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CRow
} from '@coreui/react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { LOGIN } from '../../services/validation/form.validation';
import { login } from '../../redux/auth/authSlice'
import InputTextGroup from "../common/form/InputTextGroup";
import Spinner from "../common/spinner/Spinner";

const Login = () => {  
    const dispatch = useDispatch();
    const { isAuthenticated, loadingDetails } = useSelector(state => state.auth);
    let navigate = useNavigate();

    const handleSubmit = (values) => {
        dispatch(login(values));
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
                                        validationSchema={LOGIN}
                                        onSubmit={handleSubmit}
                                        initialValues={{
                                            email: '',
                                            password: ''
                                        }}
                                    >
                                        {({ handleSubmit, touched, errors, handleChange }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <h3>Prijava</h3>
                                            <p className="text-muted">Pristupute svom nalogu</p>
                                            <InputTextGroup
                                                iconName={faUser}
                                                field="email"
                                                placeholder="E-mail adresa"
                                                touched={touched}
                                                errors={errors}
                                                handleChange={handleChange}
                                            />
                                            <InputTextGroup
                                                iconName={faLock}
                                                field="password"
                                                placeholder="Lozinka"
                                                type="password"
                                                touched={touched}
                                                errors={errors}
                                                handleChange={handleChange}
                                                className="mb-4"
                                            />
                                            <CRow>
                                                <CCol lg="6">
                                                    <CButton type="submit" color="primary" className="px-4" disabled={loadingDetails}>{loadingDetails ? <Spinner /> : ''}Prijava</CButton>
                                                </CCol>
                                                <CCol lg="6" className="d-flex justify-content-end text-lg-right pt-2">
                                                    <Link to="/auth/forgot-password" color="link">Zaboravili ste lozinku?</Link>
                                                </CCol>
                                            </CRow>
                                        </Form>)}
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

export default Login;