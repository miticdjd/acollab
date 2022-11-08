import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import { PERMISSION_USERS_WRITE } from "../../../constants/permissions";
import { hasPermission } from "../../../services/helpers/autorization"
import { fetchUsersList, deleteUser } from "../../../redux/settings/users/usersSlice";
import AddNewButton from "../../common/button/AddNewButton";

const UsersList = () => {
    const { t } = useTranslation();
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
            title: t('label.first_name'),
            key: 'first_name',
            sort: 'asc'
        },
        {
            title: t('label.last_name'),
            key: 'last_name',
            sort: ''
        },
        {
            title: t('label.email'),
            key: 'email',
            sort: ''
        }
    ]);
    const { permissions } = useSelector(state => state.auth);
    const { usersList, usersMeta, loadingList } = useSelector(state => state.users);

    const canWriteUser = hasPermission(permissions, PERMISSION_USERS_WRITE);
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
                            title: t('label.roles'),
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
                            title: t('label.status'),
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
                            title: t('label.options'),
                            key: 'options',
                            render: (item) => {
                                return (
                                    <span className="d-inline-flex">
                                        <Link 
                                            to={`/settings/users/edit/${item.id}`} 
                                            className="btn btn-sm btn-outline-primary m-1 table-btn"
                                        >
                                            {t('label.change')}
                                        </Link>
                
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowDeleteModal(true);
                                                setItemForDelete(item);
                                            }}
                                            className="btn btn-sm btn-outline-danger m-1 ms-2 table-btn"
                                        >
                                            {t('label.remove')}
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
                            {t('label.users_management')}
                            {canWriteUser && (
                                <AddNewButton to="/settings/users/add" label={t('label.add_new')} />
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
                modalTitle={t('text.confirm_delete')}
                modalBodyText={t('text.confirm_user_delete_body_text')}
                cancelBtnText={t('label.cancel')}
                confirmBtnText={t('label.delete')}
                onCancel={handleDeleteModalCancel}
                onConfirm={handleDeleteModalConfirm}
            ></ConfirmModal>
            
        </>            
    )
}

export default UsersList;