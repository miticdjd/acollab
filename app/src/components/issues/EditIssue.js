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
} from '@coreui/react';

import InputText from "../common/form/InputText";
import InputTextarea from "../common/form/InputTextarea";
import DropdownSelect from "../common/form/DropdownSelect";
import Spinner from "../common/spinner/Spinner";
import FormContentLoader from "../common/form/FormContentLoader";
import { getSingleIssue } from "../../services/http-services/issues";
import { hasRole, hasOneOfRoles } from "../../services/helpers/autorization"
import { ROLE_ADMINISTRATOR, ROLE_MANAGER } from "../../constants/roles";
import { ISSUE_FORM } from "../../services/validation/form.validation";
import { refreshErrors, editIssue, fetchIssuesTypes, fetchIssuesStatuses, deleteAttachment } from '../../redux/issues/issuesSlice';
import { fetchAllProjectsList } from '../../redux/projects/projectsSlice';
import { fetchAllDevelopers } from '../../redux/settings/users/usersSlice';
import { transformForSelect } from "../../services/helpers/issueStatus";
import Attachments from "../common/form/Attachments";
import { convertBase64 } from "../../services/helpers/media/files";

const EditIssue = () => {
    const { id } = useParams();
    const editIssueForm = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [innerState, setInnerState] = useState({
        project_id: null,
        issue_type_id: null,
        user_id: null,
        name: null,
        description: null,
        status: null,
        attachments: []
    });
    const [loadingData, setLoadingData] = useState(false);
    const { roles } = useSelector(state => state.auth);
    const { allProjects } = useSelector(state => state.projects);
    const { allDevelopers } = useSelector(state => state.users);
    const { errors, isSubmitting, issuesTypes, issuesStatuses } = useSelector(state => state.issues);
    const canWriteIssue = hasOneOfRoles(roles, [ROLE_ADMINISTRATOR, ROLE_MANAGER]);
    const isAdministrator = hasRole(roles, ROLE_ADMINISTRATOR);
    const [allIssueStatuses, setIssueStatuses] = useState([]);

    const getIssue = async (issueId) => {
        setLoadingData(true);
        const response = await getSingleIssue(issueId);
        if (response && response.status === 200) {
            setInnerState(prevState => {
                const updatedValues = {
                    project_id: response.data.data.project_id,
                    issue_type_id: response.data.data.issue_type_id,
                    user_id: response.data.data.user_id,
                    name: response.data.data.name,
                    description: response.data.data.description,
                    status: response.data.data.status,
                    attachments: response.data.data.attachments
                };
                return {...prevState, ...updatedValues};
            });
            setTimeout(() => setLoadingData(false), 800);
        }
    }

    const handleEditIssueSave = () => editIssueForm.current.submitForm();
    const handleEditIssueFormSubmit = values => {
        values['attachments'] = innerState.attachments.filter(a => a.id === undefined);
        dispatch(editIssue({id, reqBody: values}));
    }

    const handleCancel = () => navigate("/issues");

    useEffect(() => {
        dispatch(fetchAllProjectsList());
        dispatch(fetchIssuesTypes());
        dispatch(fetchIssuesStatuses());
        dispatch(fetchAllDevelopers());
        getIssue(id);
    }, [id]);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            editIssueForm.current.setSubmitting(false);
            editIssueForm.current.setErrors(errors);
    
            dispatch(refreshErrors());
        }
    }, [errors, dispatch]);

    useEffect(() => {
        if (issuesStatuses) {
            setIssueStatuses(transformForSelect(issuesStatuses));
        }
    }, [issuesStatuses]);

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
    
        setInnerState({...innerState, attachments: innerState.attachments.concat(filesForUpload)});
      };

    const handleRemoveAttachment = file => {
        if (file.id) {
            dispatch(deleteAttachment({ id: file.id }));
        }

        const filtered = innerState.attachments.filter(
            attachment => file.id === undefined ? (attachment.lastModified !== file.lastModified) : (attachment.id !== file.id)
        );

        setInnerState({...innerState, attachments: filtered});
    };

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader className="bg-white">
                        Promeni task
                    </CCardHeader>
                    {loadingData && <FormContentLoader rows={10}/>}
                    {!loadingData && <CCardBody className='mb-100'>
                        <Formik
                            innerRef={editIssueForm}
                            validationSchema={ISSUE_FORM}
                            onSubmit={handleEditIssueFormSubmit}
                            enableReinitialize={true}
                            initialValues={{
                                project_id: innerState.project_id,
                                issue_type_id: innerState.issue_type_id,
                                user_id: innerState.user_id,
                                name: innerState.name,
                                description: innerState.description,
                                status: innerState.status
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
                            <DropdownSelect
                                field="status"
                                options={allIssueStatuses}
                                placeholder="Status taska"
                                label="Status"
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}>
                            </DropdownSelect>
                            <Attachments
                                files={innerState.attachments}
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
                    </CCardBody>}

                    {(!loadingData && canWriteIssue) && (
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="primary" className="is-btn me-3" onClick={handleEditIssueSave} disabled={isSubmitting}>{isSubmitting ? <Spinner smallSize={true}/> :  '' }Sačuvaj</CButton>
                            <CButton type="reset" color="danger" className="is-btn" onClick={handleCancel}>Odustani</CButton>
                        </CCardFooter>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EditIssue;