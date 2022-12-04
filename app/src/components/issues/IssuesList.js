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
import { ROLE_ADMINISTRATOR, ROLE_MANAGER } from "../../constants/roles";
import { hasRole, hasOneOfRoles } from "../../services/helpers/autorization";
import { fetchIssuesList, deleteIssue } from "../../redux/issues/issuesSlice";
import AddNewButton from "../common/button/AddNewButton";
import { getIssueStatusBg } from "../../services/helpers/badge";
import Filter from "./Filter";

const IssuesList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [filters, setFilters] = useState(null);
    const [activeSortData, setActiveSortData] = useState({key: 'name', sortDirection: 'asc'})
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemForDelete, setItemForDelete] = useState(null);
    const [theadData, setTheadData] = useState([
        {
            title: "Code",
            key: 'code',
            sort: ''
        },
        {
            title: "Naziv",
            key: 'name',
            sort: 'asc'
        },
        {
            title: "Projekat",
            key: 'project_id',
            sort: '',
            render: item => item.project.name
        },
        {
            title: "Tip",
            key: 'issue_type_id',
            sort: '',
            render: item => item.issue_type.name
        },
        {
            title: "Status",
            key: 'status',
            sort: '',
            render: item => {
                return (
                    <span className={`badge rounded-pill ${getIssueStatusBg(item.status)}`}>
                        {item.status}
                    </span>
                );
            }
        },
    ]);
    const { roles } = useSelector(state => state.auth);
    const { issuesList, issuesMeta, loadingList } = useSelector(state => state.issues);

    const canWriteIssue = hasOneOfRoles(roles, [ROLE_ADMINISTRATOR, ROLE_MANAGER]);
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
        dispatch(deleteIssue({id: itemForDelete.id, perPage, key, sortDirection, currentPage}));
        setItemForDelete(null);
        setShowDeleteModal(false)
    }

    const handleDeleteModalCancel = () => {
        setItemForDelete(null);
        setShowDeleteModal(false);
    }

    const handleFilterChanges = (filters) => {
        const hasFilters = Object.values(filters).some(x => x !== undefined);
        setFilters(hasFilters ? filters : null);
    };

    useEffect(() => {
        const {key, sortDirection} = activeSortData;
        dispatch(fetchIssuesList({perPage, key, sortDirection, currentPage, filters}));
    }, [currentPage, activeSortData, perPage, filters, dispatch]);

    useEffect(() => {
        return () => {
            if (canWriteIssue) {
                setTheadData(prevState => {
                    return ([
                        ...prevState, 
                        {
                            title: "Opcije",
                            key: 'options',
                            render: item => {
                                return (
                                    <span className="d-inline-flex" style={{ textAlign: 'center' }}>
                                        <Link 
                                            to={`/issues/edit/${item.id}`} 
                                            className="btn btn-sm btn-outline-primary m-1 table-btn"
                                        >
                                            Promeni
                                        </Link>
                
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
    }, [canWriteIssue])

    return (
        <>
            <Filter onFiltersChange={handleFilterChanges} />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center bg-white">
                            Taskovi
                            {canWriteIssue && (
                                <AddNewButton to="/issues/add" label="Dodaj task" />
                            )}
                        </CCardHeader>
                        <CCardBody className='mb-100'>
                            <Table theadData={theadData} tbodyData={issuesList} rowsPerPage={perPage} loadingTableData={loadingList} customClass={'table-striped'} onChangeColumnSort={handleColumnSort}></Table>
                            {!loadingList ? <Pagination meta={issuesMeta} onHandlePerPage={handlePerPageChange} onHadlePage={handlePageChange}></Pagination> : null}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            
            <ConfirmModal
                showModal={showDeleteModal}
                modalTitle="Potrvrdi brisanje"
                modalBodyText="Da li ste sigurni da želite da obrišete ovaj task?"
                cancelBtnText="Odustani"
                confirmBtnText="Obriši"
                onCancel={handleDeleteModalCancel}
                onConfirm={handleDeleteModalConfirm}
            ></ConfirmModal>
            
        </>            
    )
}

export default IssuesList;