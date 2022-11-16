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
import { fetchProjectsList, deleteProject } from "../../redux/projects/projectsSlice";
import AddNewButton from "../common/button/AddNewButton";

const ProjectsList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [activeSortData, setActiveSortData] = useState({key: 'first_name', sortDirection: 'asc'})
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemForDelete, setItemForDelete] = useState(null);
    const [theadData, setTheadData] = useState([
        {
            title: "Naziv",
            key: 'name',
            sort: 'asc'
        },
        {
            title: "Šifra",
            key: 'code',
            sort: ''
        },
        {
            title: "Status",
            key: 'status',
            sort: '',
            render: (item)=> {
                return (
                    <span className="badge rounded-pill bg-success">
                        {item.status}
                    </span>
                );
            }
        },
    ]);
    const { roles } = useSelector(state => state.auth);
    const { projectsList, projectsMeta, loadingList } = useSelector(state => state.projects);

    const canWriteProject = hasOneOfRoles(roles, [ROLE_ADMINISTRATOR, ROLE_MANAGER]);
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
        dispatch(deleteProject({id: itemForDelete.id, perPage, key, sortDirection, currentPage}));
        setItemForDelete(null);
        setShowDeleteModal(false)
    }

    const handleDeleteModalCancel = () => {
        setItemForDelete(null);
        setShowDeleteModal(false);
    }

    useEffect(() => {
        const {key, sortDirection} = activeSortData;
        dispatch(fetchProjectsList({perPage, key, sortDirection, currentPage}));
    }, [currentPage, activeSortData, perPage, dispatch])

    useEffect(() => {
        return () => {
            if (canWriteProject) {
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
                                            to={`/projects/edit/${item.id}`} 
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
    }, [canWriteProject])

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center bg-white">
                            Projekti
                            {canWriteProject && (
                                <AddNewButton to="/projects/add" label="Dodaj projekat" />
                            )}
                        </CCardHeader>
                        <CCardBody className='mb-100'>
                            <Table theadData={theadData} tbodyData={projectsList} rowsPerPage={perPage} loadingTableData={loadingList} customClass={'table-striped'} onChangeColumnSort={handleColumnSort}></Table>
                            {!loadingList ? <Pagination meta={projectsMeta} onHandlePerPage={handlePerPageChange} onHadlePage={handlePageChange}></Pagination> : null}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            
            <ConfirmModal
                showModal={showDeleteModal}
                modalTitle="Potrvrdi brisanje"
                modalBodyText="Da li ste sigurni da želite da obrišete ovaj projekat?"
                cancelBtnText="Odustani"
                confirmBtnText="Obriši"
                onCancel={handleDeleteModalCancel}
                onConfirm={handleDeleteModalConfirm}
            ></ConfirmModal>
            
        </>            
    )
}

export default ProjectsList;