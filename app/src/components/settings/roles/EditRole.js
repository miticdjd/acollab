import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
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
import { getSingleRole } from "../../../services/http-services/settings/roles";
import { hasRole } from "../../../services/helpers/autorization"
import { ROLE_ADMINISTRATOR } from "../../../constants/roles";
import { ROLE_SETTINGS_FORM } from "../../../services/validation/form.validation";
import { refreshErrors, editRole } from '../../../redux/settings/roles/rolesSlice';

const EditRole = () => {
    const { id } = useParams();
    const editRoleForm = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        name: ''
    })
    const [loadingData, setLoadingData] = useState(false);
    const { roles } = useSelector(state => state.auth);
    const { errors, isSubmitting } = useSelector(state => state.roles);
    const canWriteRole = hasRole(roles, ROLE_ADMINISTRATOR);
 
    const getRole = async (roleId) => {
        setLoadingData(true);
        const response = await getSingleRole(roleId);
        if (response && response.status === 200) {
            setInnerState(prevState => {
                const updatedValues = {name: response.data.data.name};
                return {...prevState, ...updatedValues};
            });
            setLoadingData(false);
        }
    }

    const handleEditRoleSave = () => editRoleForm.current.submitForm();
    const handleEditRoleFormSubmit = (values) => {
        const reqBody = {...values};
        dispatch(editRole({id, reqBody}));
    }

    const handleCancel = () => navigate("/settings/roles");

    useEffect(() => {
        getRole(id);
    }, [id])


    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            editRoleForm.current.setSubmitting(false);
            editRoleForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        Promeni rolu
                    </CCardHeader>
                    {loadingData && <FormContentLoader/>}
                    {!loadingData && <CCardBody className='mb-100'>
                        <Formik
                            innerRef={editRoleForm}
                            validationSchema={ROLE_SETTINGS_FORM}
                            onSubmit={handleEditRoleFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                name: innerState.name
                            }}
                        >
                        {({ handleSubmit, touched, errors, values, handleChange }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <InputText
                                field="name"
                                placeholder="Molimo Vas da unesete naziv"
                                label="Naziv"
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                            />
                        </Form>
                        )}
                        </Formik>
                    </CCardBody>}
                    {(!loadingData && canWriteRole) && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleEditRoleSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }Sačuvaj</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EditRole;