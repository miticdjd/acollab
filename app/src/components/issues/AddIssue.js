import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'

import InputText from "../common/form/InputText";
import InputTextarea from "../common/form/InputTextarea";
import DropdownSelect from "../common/form/DropdownSelect";
import Spinner from "../common/spinner/Spinner";
import { hasRole, hasOneOfRoles } from "../../services/helpers/autorization"
import { ROLE_ADMINISTRATOR, ROLE_MANAGER } from "../../constants/roles";
import { ISSUE_FORM } from "../../services/validation/form.validation";
import { refreshErrors, addIssue, fetchIssuesTypes } from '../../redux/issues/issuesSlice';
import { fetchAllProjectsList } from '../../redux/projects/projectsSlice';
import { fetchAllDevelopers } from '../../redux/settings/users/usersSlice';
import Attachments from "../common/form/Attachments";
import { convertBase64 } from "../../services/helpers/media/files";

const AddIssue = () => {
    const addIssueForm = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { roles } = useSelector(state => state.auth);
    const { allProjects } = useSelector(state => state.projects);
    const { allDevelopers } = useSelector(state => state.users);
    const { errors, isSubmitting, issuesTypes } = useSelector(state => state.issues);
    const canWriteIssue = hasOneOfRoles(roles, [ROLE_ADMINISTRATOR, ROLE_MANAGER]);
    const isAdministrator = hasRole(roles, ROLE_ADMINISTRATOR);
    const [attachmentsForUpload, setAttachmentsForUpload] = useState([]);

    const handleAddIssueSave = () => {
        addIssueForm.current.submitForm();
    }
    
    const handleAddIssueFormSubmit = (values) => {
        values['attachments'] = attachmentsForUpload;

        dispatch(addIssue({reqBody : values}));
    }

    const handleCancel = () => navigate("/issues");

    useEffect(() => {
        dispatch(fetchAllProjectsList());
        dispatch(fetchIssuesTypes());
        dispatch(fetchAllDevelopers());
    }, []);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            addIssueForm.current.setSubmitting(false);
            addIssueForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    const handleNewAttachments = async files => {
        let filesForUpload = [];

        for (let i = 0; i < files.length; i++) {
            let file = files.item(i);
            filesForUpload[i] = {
                name: file.name,
                file: await convertBase64(file),
                size: file.size,
                type: file.type,
                lastModified: file.lastModified
            };
        }
    
        setAttachmentsForUpload(attachmentsForUpload.concat(filesForUpload));
      };

    const handleRemoveAttachment = file => {
        const filtered = attachmentsForUpload.filter(attachment => attachment.lastModified !== file.lastModified);

        setAttachmentsForUpload(filtered);
    };

    return (
        <CRow>
        <CCol>
            <CCard>
                <CCardHeader className="bg-white">
                    Kreiraj novi task
                </CCardHeader>
                <CCardBody className='mb-100'>
                    <Formik
                        innerRef={addIssueForm}
                        validationSchema={ISSUE_FORM}
                        onSubmit={handleAddIssueFormSubmit}
                        enableReinitialize={true}
                        initialValues={{
                            project_id: null,
                            issue_type_id: 1,
                            user_id: null,
                            name: '',
                            description: '',
                            status: 'open'
                        }}
                    >
                    {({ handleSubmit, touched, errors, values, handleChange }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <DropdownSelect
                            field="project_id"
                            options={allProjects}
                            placeholder="Molimo Vas da izaberete projekat"
                            label="Projekat"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}>
                        </DropdownSelect>
                        <DropdownSelect
                            field="issue_type_id"
                            options={issuesTypes}
                            placeholder="Molimo Vas da izaberete tip taska"
                            label="Tip taska"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}>
                        </DropdownSelect>
                        <DropdownSelect
                            field="user_id"
                            options={allDevelopers}
                            placeholder="Dodelite task developeru"
                            label="Dodelite task"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}>
                        </DropdownSelect>
                        <InputText
                            field="name"
                            placeholder="Molimo Vas da unesete naziv taska"
                            label="Naziv"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />
                        <InputTextarea
                            field="description"
                            placeholder="Molimo Vas da unesete opis taska"
                            label="Opis"
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                        />
                        <Attachments
                            files={attachmentsForUpload}
                            type="file"
                            field="attachmentsForUpload"
                            errors={errors}
                            touched={touched}
                            onChange={handleNewAttachments}
                            onRemove={handleRemoveAttachment}
                            placeholder="Dodaj prilog"
                            label="Prilozi"
                            multiple={true}
                            required={false}
                            />
                    </Form>
                    )}
                    </Formik>
                </CCardBody>
                {canWriteIssue && (
                    <CCardFooter className="bg-white">
                        <CButton type="button" color="primary" className="is-btn me-3" onClick={handleAddIssueSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }Sačuvaj</CButton>
                        <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
                    </CCardFooter>
                )}
            </CCard>
        </CCol>
    </CRow>
    )
}

export default AddIssue;
