import React, {useState, useEffect, useRef} from "react";
import { useParams,useNavigate } from "react-router-dom";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react';

import Spinner from "../common/spinner/Spinner";
import FormContentLoader from "../common/form/FormContentLoader";
import { getSingleSprint, finishSprint } from "../../services/http-services/sprints";
import { updateStatus } from "../../services/http-services/issues";
import { getIssueStatusBg } from "../../services/helpers/badge";
import Table from "../common/table/Table";
import ConfirmModal from "../common/modals/ConfirmModal";
import IssueModal from "../common/modals/IssueModal";

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showIssue, setShowIssue] = useState(false);
    const [displayIssue, setDisplayIssue] = useState(null);
    const [innerState, setInnerState] = useState({
        project: {},
        name: '',
        objective: '',
        start: null,
        end: null,
        issues: []
    });
    const [loadingData, setLoadingData] = useState(false);
    const [theadData, setTheadData] = useState([
        {
            title: "Code",
            key: 'code',
        },
        {
            title: "Naziv",
            key: 'name',
        },
        {
            title: "Tip",
            key: 'issue_type_id',
            render: item => item.issue_type.name
        },
        {
            title: "Dodeljen",
            key: "developer",
            render: item => `${item.user?.first_name} ${item.user?.last_name}`
        },
        {
            title: "Status",
            key: 'status',
            render: item => {
                return (
                    <span className={`badge rounded-pill ${getIssueStatusBg(item.status)}`}>
                        {item.status}
                    </span>
                );
            }
        },
        {
            title: "Opcije",
            key: 'options',
            render: item => {
                return (
                    <span className="d-inline-flex" style={{ textAlign: 'center' }}>
                        <button type="button" className="btn btn-sm btn-outline-primary m-1 table-btn" onClick={() => { setDisplayIssue(item); setShowIssue(true); }}>Pregled</button>
                    </span>
                );
            }
        }
    ]);

    const getSprint = async (sprintId) => {
        setLoadingData(true);
        const response = await getSingleSprint(sprintId);
        if (response && response.status === 200) {
            setInnerState(prevState => {
                const updatedValues = {
                    project: response.data.data.project,
                    name: response.data.data.name,
                    objective: response.data.data.objective,
                    start: response.data.data.start,
                    end: response.data.data.end,
                    issues: response.data.data.issues
                };
                return {...prevState, ...updatedValues};
            });
            setTimeout(() => setLoadingData(false), 400);
        }
    }

    const handleCancel = () => navigate("/sprints");

    useEffect(() => {
        getSprint(id);
    }, [id]);

    const handleConfirmingConfirmation = async () => {
        const response = await finishSprint(id);
        if (response && response.status === 200) {
            setShowConfirmation(false);
            handleCancel();
        }
    }

    const handleCancelingConfirmation = () => {
        setShowConfirmation(false);
    }

    const handleCancelingIssue = () => {
        setShowIssue(false);
        setDisplayIssue(null);
    }

    const handleChangeIssueStatus = (issue, newStatus) => {
        updateStatus(issue.id, newStatus);
        setShowIssue(false);
        setDisplayIssue(null);
        innerState.issues.map(i => {
            if (i.id === issue.id) {
                i.status = newStatus;
            }

            return i;
        });
    }

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="bg-white">
                        {loadingData && <FormContentLoader rows={1} rowHeight={30} />}
                        {!loadingData && (
                            <>
                                {innerState.name}
                                <article style={{ display: "inline-block", gap: "10px", float: "right" }}>
                                <span className="header-code">
                                    Početak: {innerState.start}
                                </span>

                                <span className="header-code m-2">
                                    Kraj: {innerState.end}
                                </span>
                                </article>
                            </>
                        )}
                        </CCardHeader>
                        {loadingData && <FormContentLoader rows={10}/>}
                        {!loadingData && 
                            <CCardBody className='mb-50'>
                                <p>{innerState.objective}</p>
                            </CCardBody>}

                        {!loadingData && (
                            <CCardFooter className="bg-white">
                                <CButton type="button" color="success" className="is-btn me-3" style={{ width: '150px' }} onClick={() => { setShowConfirmation(true) }} disabled={false}>{false ? <Spinner smallSize={true}/> :  '' }Završi sprint</CButton>
                                <CButton type="reset" color="danger" style={{ width: '150px' }} className="is-btn" onClick={handleCancel}>Vrati se nazad</CButton>
                            </CCardFooter>
                        )}
                    </CCard>
                </CCol>
            </CRow>
            <CRow className="mt-5">
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center bg-white">
                            Taskovi
                        </CCardHeader>
                        <CCardBody className='mb-100'>
                            <Table theadData={theadData} tbodyData={innerState.issues} loadingTableData={loadingData} customClass={'table-striped'}></Table>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <ConfirmModal
                showModal={showConfirmation}
                modalTitle="Potrvrdi"
                modalBodyText="Da li ste sigurni da želite da završite ovaj sprint?"
                cancelBtnText="Odustani"
                confirmBtnText="Završi"
                onCancel={handleCancelingConfirmation}
                onConfirm={handleConfirmingConfirmation}
            ></ConfirmModal>

            <IssueModal
                showModal={showIssue && displayIssue}
                issue={displayIssue}
                onCancel={handleCancelingIssue}
                onConfirm={handleChangeIssueStatus}
            ></IssueModal>
        </>
    )
}

export default Details;