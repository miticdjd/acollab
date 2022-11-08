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
import { fetchLanguagesList, deleteLanguage } from "../../../redux/settings/languages/languagesSlice";
import AddNewButton from "../../common/button/AddNewButton";

const LanguagesList = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [activeSortData, setActiveSortData] = useState({key: 'name', sortDirection: 'asc'})
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemForDelete, setItemForDelete] = useState(null);
    const [theadData, setTheadData] = useState([
        {
            title: t('label.name'),
            key: 'name',
            sort: 'asc'
        },
    ]);
    const { permissions } = useSelector(state => state.auth);
    const { languagesList, languagesMeta, loadingList } = useSelector(state => state.languages);

    const canWriteLanguage = hasPermission(permissions, PERMISSION_SETTINGS_WRITE);
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
        dispatch(deleteLanguage({id: itemForDelete.id, perPage, key, sortDirection, currentPage}));
        setItemForDelete(null);
        setShowDeleteModal(false)
    }

    const handleDeleteModalCancel = () => {
        setItemForDelete(null);
        setShowDeleteModal(false);
    }

    useEffect(() => {
        const {key, sortDirection} = activeSortData;
        dispatch(fetchLanguagesList({perPage, key, sortDirection, currentPage}));
    }, [currentPage, perPage, activeSortData, dispatch])

    useEffect(() => {
        return () => {
            if (canWriteLanguage) {
                setTheadData(prevState => {
                    return ([
                        ...prevState, 
                        {
                            title: t('label.options'),
                            key: 'options',
                            render: (item) => {
                                return (
                                    <span className="d-inline-flex">
                                        <Link 
                                            to={`/settings/languages/edit/${item.id}`} 
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
    }, [canWriteLanguage])
      

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center bg-white">
                            {t('label.languages_management')}
                            {canWriteLanguage && (
                                <AddNewButton to="/settings/languages/add" label={t('label.add_new')} />
                            )}
                        </CCardHeader>
                        <CCardBody className='mb-100'>
                            <Table theadData={theadData} tbodyData={languagesList} rowsPerPage={perPage} loadingTableData={loadingList} customClass={'table-striped'} onChangeColumnSort={handleColumnSort}></Table>
                            {!loadingList? <Pagination meta={languagesMeta} onHandlePerPage={handlePerPageChange} onHadlePage={handlePageChange}></Pagination> : null}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            
            <ConfirmModal
                showModal={showDeleteModal}
                modalTitle={t('text.confirm_delete')}
                modalBodyText={t('text.confirm_language_delete_body_text')}
                cancelBtnText={t('label.cancel')}
                confirmBtnText={t('label.delete')}
                onCancel={handleDeleteModalCancel}
                onConfirm={handleDeleteModalConfirm}
            ></ConfirmModal>
            
        </>            
    )
}

export default LanguagesList;