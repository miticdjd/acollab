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
import { hasRole } from "../../../services/helpers/autorization";
import { fetchUsersList, deleteUser } from "../../../redux/settings/users/usersSlice";
import AddNewButton from "../../common/button/AddNewButton";

const UsersList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [activeSortData, setActiveSortData] = useState({key: 'first_name', sortDirection: 'asc'})
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemForDelete, setItemForDelete] = useState(null);
    const [theadData, setTheadData] = useState([
        {
            title: "",
            key: "avatar",
            render: (item)=> {
                return (
                    <span>
                        <img width={18} height={18} src={item.avatar} alt={item.first_name}  />
                    </span>
                );
            }
        },
        {
            title: "Ime",
            key: 'first_name',
            sort: 'asc'
        },
        {
            title: "Prezime",
            key: 'last_name',
            sort: ''
        },
        {
            title: "E-mail adresa",
            key: 'email',
            sort: ''
        }
    ]);
    const { roles } = useSelector(state => state.auth);
    const { usersList, usersMeta, loadingList } = useSelector(state => state.users);

    const canWriteUser = hasRole(roles, ROLE_ADMINISTRATOR);
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
        dispatch(deleteUser({id: itemForDelete.id, perPage, key, sortDirection, currentPage}));
        setItemForDelete(null);
        setShowDeleteModal(false)
    }

    const handleDeleteModalCancel = () => {
        setItemForDelete(null);
        setShowDeleteModal(false);
    }

    useEffect(() => {
        const {key, sortDirection} = activeSortData;
        dispatch(fetchUsersList({perPage, key, sortDirection, currentPage}));
    }, [currentPage, activeSortData, perPage, dispatch])

    useEffect(() => {
        return () => {
            if (canWriteUser) {
                setTheadData(prevState => {
                    return ([
                        ...prevState, 
                        {
                            title: "Role",
                            key: 'roles',
                            render: (item)=> {
                                return (
                                    <span>
                                        {(item.roles.length && item.roles[0]?.name) ? item.roles[0].name : '/'}
                                    </span>
                                );
                            }
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
                        {
                            title: "Opcije",
                            key: 'options',
                            render: (item) => {
                                return (
                                    <span className="d-inline-flex">
                                        <Link 
                                            to={`/settings/users/edit/${item.id}`} 
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
    }, [canWriteUser])

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center bg-white">
                            Upravljanje korisnicima
                            {canWriteUser && (
                                <AddNewButton to="/settings/users/add" label="Dodaj novog" />
                            )}
                        </CCardHeader>
                        <CCardBody className='mb-100'>
                            <Table theadData={theadData} tbodyData={usersList} rowsPerPage={perPage} loadingTableData={loadingList} customClass={'table-striped'} onChangeColumnSort={handleColumnSort}></Table>
                            {!loadingList ? <Pagination meta={usersMeta} onHandlePerPage={handlePerPageChange} onHadlePage={handlePageChange}></Pagination> : null}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            
            <ConfirmModal
                showModal={showDeleteModal}
                modalTitle="Potrvrdi brisanje"
                modalBodyText="Da li ste sigurni da želite da obrišete ovog korisnika?"
                cancelBtnText="Odustani"
                confirmBtnText="Obriši"
                onCancel={handleDeleteModalCancel}
                onConfirm={handleDeleteModalConfirm}
            ></ConfirmModal>
            
        </>            
    )
}

export default UsersList;