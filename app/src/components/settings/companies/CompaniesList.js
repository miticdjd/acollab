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
import { PERMISSION_SETTINGS_WRITE } from "../../../constants/permissions";
import { hasPermission } from "../../../services/helpers/autorization"
import { fetchCompaniesList, deleteCompany } from "../../../redux/settings/companies/companiesSlice";
import AddNewButton from "../../common/button/AddNewButton";

const CompaniesList = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [activeSortData, setActiveSortData] = useState({key: 'name', sortDirection: 'asc'})
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemForDelete, setItemForDelete] = useState(null);
    const statuses = [
        {id: 1, name: 'Active', bgColor: 'bg-success'},
        {id: 2, name: 'Paused', bgColor: 'bg-warning'},
        {id: 3, name: 'Closed', bgColor: 'bg-danger'}
    ];
    const [theadData, setTheadData] = useState([
        {
            title: t('label.name'),
            key: 'name',
            sort: 'asc'
        },
        {
            title: t('label.company_number'),
            key: 'company_id',
            sort: ''
        },
        {
            title: t('label.incorporation_date'),
            key: 'incorporation_date',
            sort: '',
            date: true
        },
        {
            title: t('label.vat_id'),
            key: 'vat_id',
            sort: ''
        },
        {
            title: t('label.vat'),
            key: 'vat',
            sort: ''
        },
    ]);
    const { permissions } = useSelector(state => state.auth);
    const { companiesList, companiesMeta, loadingList } = useSelector(state => state.companies);

    const canWriteCompany = hasPermission(permissions, PERMISSION_SETTINGS_WRITE);
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
        dispatch(deleteCompany({id: itemForDelete.id, perPage, key, sortDirection, currentPage}));
        setItemForDelete(null);
        setShowDeleteModal(false)
    }

    const handleDeleteModalCancel = () => {
        setItemForDelete(null);
        setShowDeleteModal(false);
    }

    const returnStatusObj = (statusName) => {
        const status = statuses.find(x => {
            return x.name.toLowerCase() === statusName.toLowerCase();
        })

        return status;
    }

    useEffect(() => {
        const {key, sortDirection} = activeSortData;
        dispatch(fetchCompaniesList({perPage, key, sortDirection, currentPage}));
    }, [currentPage, activeSortData, perPage, dispatch])

    useEffect(() => {
        return () => {
            if (canWriteCompany) {
                setTheadData(prevState => {
                    return ([
                        ...prevState, 
                        {
                            title: t('label.status'),
                            key: 'status',
                            sort: '',
                            render: (item) => {
                                return (
                                    <span className={`badge rounded-pill ${returnStatusObj(item.status).bgColor}`}>
                                        {returnStatusObj(item.status).name}
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
                                            to={`/settings/companies/edit/${item.id}`} 
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
    }, [canWriteCompany])
      

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center bg-white">
                            {t('label.companies_management')}
                            {canWriteCompany && (
                                <AddNewButton to="/settings/companies/add" label={t('label.add_new')} />
                            )}
                        </CCardHeader>
                        <CCardBody className='mb-100'>
                            <Table theadData={theadData} tbodyData={companiesList} rowsPerPage={perPage} loadingTableData={loadingList} customClass={'table-striped'} onChangeColumnSort={handleColumnSort}></Table>
                            {!loadingList ? <Pagination meta={companiesMeta} onHandlePerPage={handlePerPageChange} onHadlePage={handlePageChange}></Pagination> : null}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            
            <ConfirmModal
                showModal={showDeleteModal}
                modalTitle={t('text.confirm_delete')}
                modalBodyText={t('text.confirm_company_delete_body_text')}
                cancelBtnText={t('label.cancel')}
                confirmBtnText={t('label.delete')}
                onCancel={handleDeleteModalCancel}
                onConfirm={handleDeleteModalConfirm}
            ></ConfirmModal>
            
        </>            
    )
}

export default CompaniesList;