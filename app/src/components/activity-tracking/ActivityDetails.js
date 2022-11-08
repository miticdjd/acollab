import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
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
import ReactJson from 'react-json-view';

import { returnDateAndTimeFormat } from "../../services/helpers/date-helper";
import { PERMISSION_AUDIT_READ } from "../../constants/permissions";
import { hasPermission } from "../../services/helpers/autorization";
import { fetchActivityDetails } from "../../redux/activity-tracking/activitiesSlice";



const ActivityDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { permissions } = useSelector(state => state.auth);
    const { activityDetails, loadingDetails } = useSelector(state => state.activities);
    const canReadAudit = hasPermission(permissions, PERMISSION_AUDIT_READ);
    const handleBackBtn = () => navigate("/activity-tracking");

    useEffect(() => {
        dispatch(fetchActivityDetails({id}));
    }, [id])

    return (
        <CRow>
            <CCol>
                {(canReadAudit && !loadingDetails) && (
                    <CCard>
                        <CCardHeader className="bg-white">
                            {t('label.details_of_activity')}
                        </CCardHeader>
                        {<CCardBody className='mb-100'>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">ID</span>
                                <span className="col-8 is-text">{activityDetails.id}</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">User ID</span>
                                <span className="col-8 is-text">{activityDetails.user.id}</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">User</span>
                                <span className="col-8 is-text">{activityDetails.user.first_name } {activityDetails.user.last_name } - { activityDetails.user.email }</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">Event</span>
                                <span className="col-8 is-text">{activityDetails.event_type}</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">Date and time</span>
                                <span className="col-8 is-text">{returnDateAndTimeFormat(activityDetails.created_at)}h</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">IP Address</span>
                                <span className="col-8 is-text">{activityDetails.ip_address}</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">User agent</span>
                                <span className="col-8 is-text">{activityDetails.user_agent}</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">Data</span>
                                <span className="col-8 is-text">
                                <ReactJson src={activityDetails.data} />
                                </span>
                            </div>
                        </CCardBody>}
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="danger" className="is-btn" onClick={handleBackBtn}>{t('label.go_back')}</CButton>
                        </CCardFooter>
                    </CCard>
                )}
            </CCol>
        </CRow>
    )
}

export default ActivityDetails;