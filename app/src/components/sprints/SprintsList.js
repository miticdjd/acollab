import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react'

import Table from "../common/table/Table";
import Pagination from "../common/pagination/Pagination";
import ConfirmModal from "../common/modals/ConfirmModal";
import { ROLE_ADMINISTRATOR, ROLE_DEVELOPER, ROLE_MANAGER } from "../../constants/roles";
import { hasRole, hasOneOfRoles } from "../../services/helpers/autorization";
import { fetchSprintsList, deleteSprint } from "../../redux/sprints/sprintsSlice";
import AddNewButton from "../common/button/AddNewButton";

const SprintsList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [activeSortData, setActiveSortData] = useState({key: 'start', sortDirection: 'asc'})
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemForDelete, setItemForDelete] = useState(null);
    const [theadData, setTheadData] = useState([
        {
            title: "Projekat",
            key: 'project_id',
            sort: '',
            render: item => item.project.name
        },
        {
            title: "Naziv",
            key: 'name',
            sort: ''
        },
        {
            title: "Početak",
            key: 'start',
            sort: 'asc'
        },
        {
            title: "Kraj",
            key: 'end',
            sort: ''
        },
        {
            title: "Otvoreni/zatvoreni taskovi",
            key: 'statistics',
            render: item => `${item.statistics.in_progress} / ${item.statistics.done}`
        },
        {
            title: 'Završeno',
            key: 'finished',
            render: item => item.statistics.done === 0 ? '0%' : `${parseFloat(item.statistics.done/item.issues.length * 100).toFixed(2)}%`
        }
    ]);
    const { roles } = useSelector(state => state.auth);
    const { sprintsList, sprintsMeta, loadingList } = useSelector(state => state.sprints);

    const canWriteSprint = hasOneOfRoles(roles, [ROLE_ADMINISTRATOR, ROLE_MANAGER]);
    const canViewSprint = hasOneOfRoles(roles, [ROLE_ADMINISTRATOR, ROLE_MANAGER, ROLE_DEVELOPER]);
    const isAdministrator = hasRole(roles, ROLE_ADMINISTRATOR);

    const handleColumnSort = (key, sortDirection) => {
        setActiveSortData({key, sortDirection});
        const headData = theadData
        .map(item => {
            return item.key === key 
                ? {...item, sort: sortDirection} 
                : item.hasOwnProperty('sort') 
                    ? {...item, sort: ''}
                    : {...item};
        });
        setTheadData(headData);
    }

    const handlePerPageChange = (perPage) => {
        setPerPage(perPage);
        setCurrentPage(1);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleDeleteModalConfirm = () => {
        const {key, sortDirection} = activeSortData;
        dispatch(deleteSprint({id: itemForDelete.id, perPage, key, sortDirection, currentPage}));
        setItemForDelete(null);
        setShowDeleteModal(false)
    }

    const handleDeleteModalCancel = () => {
        setItemForDelete(null);
        setShowDeleteModal(false);
    }

    useEffect(() => {
        const {key, sortDirection} = activeSortData;
        dispatch(fetchSprintsList({perPage, key, sortDirection, currentPage}));
    }, [currentPage, activeSortData, perPage, dispatch]);

    useEffect(() => {
        return () => {
            if (canViewSprint || canWriteSprint) {
                setTheadData(prevState => {
                    return ([
                        ...prevState, 
                        {
                            title: "Opcije",
                            key: 'options',
                            render: item => {
                                return (
                                    <span className="d-inline-flex" style={{ textAlign: 'center' }}>
                                        {canViewSprint && (
                                            <Link 
                                                to={`/sprints/view/${item.id}`} 
                                                className="btn btn-sm btn-outline-primary m-1 table-btn"
                                            >
                                                Pregled
                                            </Link>
                                        )}
                                        {canWriteSprint && (
                                            <Link 
                                                to={`/sprints/edit/${item.id}`} 
                                                className="btn btn-sm btn-outline-primary m-1 table-btn"
                                            >
                                                Promeni
                                            </Link>
                                        )}
                                        {isAdministrator && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowDeleteModal(true);
                                                    setItemForDelete(item);
                                                }}
                                                className="btn btn-sm btn-outline-danger m-1 ms-2 table-btn"
                                            >
                                                Obriši
                                            </button>
                                        )}
                                    </span>
                                );
                            }
                        }
                    ])
                })
            }
        };  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canWriteSprint])

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center bg-white">
                            Sprintovi
                            {canWriteSprint && (
                                <AddNewButton to="/sprints/add" label="Kreiraj novi sprint" />
                            )}
                        </CCardHeader>
                        <CCardBody className='mb-100'>
                            <Table theadData={theadData} tbodyData={sprintsList} rowsPerPage={perPage} loadingTableData={loadingList} customClass={'table-striped'} onChangeColumnSort={handleColumnSort}></Table>
                            {!loadingList ? <Pagination meta={sprintsMeta} onHandlePerPage={handlePerPageChange} onHadlePage={handlePageChange}></Pagination> : null}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            
            <ConfirmModal
                showModal={showDeleteModal}
                modalTitle="Potrvrdi brisanje"
                modalBodyText="Da li ste sigurni da želite da obrišete ovaj sprint?"
                cancelBtnText="Odustani"
                confirmBtnText="Obriši"
                onCancel={handleDeleteModalCancel}
                onConfirm={handleDeleteModalConfirm}
            ></ConfirmModal>
            
        </>            
    )
}

export default SprintsList;