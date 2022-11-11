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

import Table from "../../common/table/Table";
import Pagination from "../../common/pagination/Pagination";
import ConfirmModal from "../../common/modals/ConfirmModal";
import { ROLE_ADMINISTRATOR } from "../../../constants/roles";
import { hasRole } from "../../../services/helpers/autorization"
import { fetchRolesList, deleteRole } from "../../../redux/settings/roles/rolesSlice";
import AddNewButton from "../../common/button/AddNewButton";

const RolesList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [activeSortData, setActiveSortData] = useState({key: 'name', sortDirection: 'asc'})
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemForDelete, setItemForDelete] = useState(null);
    const [theadData, setTheadData] = useState([
        {
            title: "Naziv",
            key: 'name',
            sort: 'asc'
        }
    ]);
    const { roles } = useSelector(state => state.auth);
    const { rolesList, rolesMeta, loadingList } = useSelector(state => state.roles);

    const canWriteRole = hasRole(roles, ROLE_ADMINISTRATOR);
    const handleColumnSort = (key, sortDirection) => {
        setActiveSortData({key, sortDirection});
        const headDate = [...theadData];
        const headItemIndex = headDate.findIndex(item => {
            return item.key === key;
        }); 

        if (headItemIndex !== -1) {
            headDate[headItemIndex].sort = sortDirection;
            setTheadData(headDate);
        }
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
        dispatch(deleteRole({id: itemForDelete.id, perPage, key, sortDirection, currentPage}));
        setItemForDelete(null);
        setShowDeleteModal(false)
    }

    const handleDeleteModalCancel = () => {
        setItemForDelete(null);
        setShowDeleteModal(false);
    }

    
    useEffect(() => {
        const {key, sortDirection} = activeSortData;
        dispatch(fetchRolesList({perPage, key, sortDirection, currentPage}));
    }, [perPage, currentPage, activeSortData, dispatch])

    useEffect(() => {
        return () => {
            if (canWriteRole) {
                setTheadData(prevState => {
                    return ([
                        ...prevState, 
                        {
                            title: "Opcije",
                            key: 'options',
                            render: (item) => {
                                return (
                                    <span className="d-inline-flex">
                                        <Link 
                                            to={`/settings/roles/edit/${item.id}`} 
                                            className="btn btn-sm btn-outline-primary m-1 table-btn"
                                        >
                                            Promeni
                                        </Link>
                
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
                                    </span>
                                );
                            }
                        }
                    ])
                })
            }
        };  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canWriteRole])
      

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center bg-white">
                            Upravljanje rolama
                            {canWriteRole && (
                                <AddNewButton to="/settings/roles/add" label="Dodaj novu rolu" />
                            )}
                        </CCardHeader>
                        <CCardBody className='mb-100'>
                            <Table theadData={theadData} tbodyData={rolesList} rowsPerPage={perPage} loadingTableData={loadingList} customClass={'table-striped'} onChangeColumnSort={handleColumnSort}></Table>
                            {!loadingList ? <Pagination meta={rolesMeta} onHandlePerPage={handlePerPageChange} onHadlePage={handlePageChange}></Pagination> : null}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            
            <ConfirmModal
                showModal={showDeleteModal}
                modalTitle="Potvrdi brisanje"
                modalBodyText="Da li ste sigurni da želite da obrišete ovu rolu?"
                cancelBtnText="Odustani"
                confirmBtnText="Obriši"
                onCancel={handleDeleteModalCancel}
                onConfirm={handleDeleteModalConfirm}
            ></ConfirmModal>
            
        </>            
    )
}

export default RolesList;