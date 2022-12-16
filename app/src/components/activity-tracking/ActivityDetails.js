import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
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
import { ROLE_ADMINISTRATOR } from "../../constants/roles";
import { hasRole } from "../../services/helpers/autorization";
import { fetchActivityDetails } from "../../redux/activity-tracking/activitiesSlice";

const ActivityDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { roles } = useSelector(state => state.auth);
    const { activityDetails, loadingDetails } = useSelector(state => state.activities);
    const canReadAudit = hasRole(roles, ROLE_ADMINISTRATOR);
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
                            Detalji aktivnosti
                        </CCardHeader>
                        {<CCardBody className='mb-100'>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">ID</span>
                                <span className="col-8 is-text">{activityDetails.id}</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">Korisnički ID</span>
                                <span className="col-8 is-text">{activityDetails.user.id}</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">Korisnik</span>
                                <span className="col-8 is-text">{activityDetails.user.first_name } {activityDetails.user.last_name } - { activityDetails.user.email }</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">Događaj</span>
                                <span className="col-8 is-text">{activityDetails.event_type}</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">Datum i vreme</span>
                                <span className="col-8 is-text">{returnDateAndTimeFormat(activityDetails.created_at)}h</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">IP adresa</span>
                                <span className="col-8 is-text">{activityDetails.ip_address}</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">Agent pretraživača</span>
                                <span className="col-8 is-text">{activityDetails.user_agent}</span>
                            </div>
                            <div className="d-flex">
                                <span className="col-4 is-label-text is-label-text--bold">Podaci</span>
                                <span className="col-8 is-text">
                                <ReactJson src={activityDetails.data} />
                                </span>
                            </div>
                        </CCardBody>}
                        <CCardFooter className="bg-white">
                            <CButton type="button" color="danger" className="is-btn" onClick={handleBackBtn}>Nazad</CButton>
                        </CCardFooter>
                    </CCard>
                )}
            </CCol>
        </CRow>
    )
}

export default ActivityDetails;