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
import { ROLE_ADMINISTRATOR } from "../../constants/roles";
import { fetchActivitiesList } from "../../redux/activity-tracking/activitiesSlice";
import { hasRole } from "../../services/helpers/autorization"
import ActivityFilters from "./ActivityFilters";

const ActivityTracking = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState(null);
    const [perPage, setPerPage] = useState(10);
    const [activeSortData, setActiveSortData] = useState({key: 'date', sortDirection: 'desc'});
    const [theadData, setTheadData] = useState([
        {
            title: 'Korisnički ID',
            key: 'id',
            sort: '',
            render: (item)=> {
                return (
                    <span>
                        {item.user.id}
                    </span>
                );
            }
        },
        {
            title: 'Korisnik',
            key: 'user',
            sort: '',
            render: (item)=> {
                return (
                    <span>
                        {`${item.user.first_name} ${item.user.last_name} - ${item.user.email}`}
                    </span>
                );
            }
        },
        {
            title: 'Događaj',
            key: 'event_type',
            sort: ''
        },
        {
            title: 'Datum',
            key: 'date',
            sort: 'desc',
            dataKey: 'created_at',
            dateAndTime: true
        },
        {
            title: 'IP Adresa',
            key: 'ip_address',
            sort: '',
        },
    ]);
    const { roles } = useSelector(state => state.auth);
    const { activitiesList, activitiesMeta, loadingList } = useSelector(state => state.activities);

    const canReadAudit = hasRole(roles, ROLE_ADMINISTRATOR);
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
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleFilterChanges = (filters) => {
        const hasFilters = Object.values(filters).some(x => x !== undefined)
        setFilters(hasFilters ? filters : null)
    }

    useEffect(() => {
        const {key, sortDirection} = activeSortData;
        dispatch(fetchActivitiesList({perPage, key, sortDirection, currentPage, filters}));
    }, [currentPage, perPage, activeSortData, filters])

    useEffect(() => {
        return () => {
            if (canReadAudit) {
                setTheadData(prevState => {
                    return ([
                        ...prevState, 
                        {
                            title: 'Opcije',
                            key: 'options',
                            render: (item) => {
                                return (
                                    <span className="d-flex justify-content-center">
                                        <Link 
                                            to={`/activity-tracking/${item.id}`} 
                                            className="btn btn-sm btn-outline-primary m-1 table-btn"
                                        >
                                            Detalji
                                        </Link>
                                    </span>
                                );
                            }
                        }
                    ])
                })
            }
        };  
    }, [])

    return (
        <>
            <ActivityFilters onFiltersChange={handleFilterChanges}></ActivityFilters>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center bg-white">
                            Praćenje aktivnosti
                        </CCardHeader>
                        {canReadAudit && <CCardBody className='mb-100'>
                            <Table theadData={theadData} tbodyData={activitiesList} rowsPerPage={perPage} loadingTableData={loadingList} customClass={'table-striped'} onChangeColumnSort={handleColumnSort}></Table>
                            {!loadingList ? <Pagination meta={activitiesMeta} onHandlePerPage={handlePerPageChange} onHadlePage={handlePageChange}></Pagination> : null}
                        </CCardBody>}
                    </CCard>
                </CCol>
            </CRow>   
        </>            
    )
}

export default ActivityTracking;