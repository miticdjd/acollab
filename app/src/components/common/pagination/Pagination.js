import React from "react";
import { 
    CPagination,
    CPaginationItem,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem
 } from "@coreui/react";
const Pagination = ({meta, onHadlePage, onHandlePerPage}) => {
    const toPage = meta.current_page * meta.per_page < meta.total 
        ? meta.current_page * meta.per_page 
        : meta.total;
    const fromPage = (meta.current_page - 1) * meta.per_page + 1;

    return (
        <div className="d-flex justify-content-between align-items-center">
            <CPagination aria-label="Page navigation">
                <CPaginationItem role="button" aria-label="First page" onClick={() => onHadlePage(1)} disabled={meta.current_page === 1}>
                    <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>
                <CPaginationItem role="button" aria-label="Previous" onClick={() => onHadlePage(meta.current_page - 1)} disabled={meta.current_page === 1}>
                    <span aria-hidden="true">&lsaquo;</span>
                </CPaginationItem>
                {(meta.current_page === meta.last_page && meta.current_page >= 3) ? <CPaginationItem aria-label="Current - 2" role="button" onClick={() => onHadlePage(meta.last_page - 2)}>{meta.last_page  - 2}</CPaginationItem> : null}
                {meta.current_page > 1 ? <CPaginationItem aria-label="Current - 1" role="button" onClick={() => onHadlePage(meta.current_page - 1)}>{meta.current_page  - 1}</CPaginationItem> : null}
                <CPaginationItem aria-label="Current" active>{meta.current_page}</CPaginationItem> 
                {(meta.current_page !== meta.last_page && meta.total > meta.per_page) ? <CPaginationItem aria-label="Current + 1" role="button" onClick={() => onHadlePage(meta.current_page + 1)}>{meta.current_page  + 1}</CPaginationItem> : null}
                {(meta.current_page === 1 && meta.total > meta.per_page * 2) ? <CPaginationItem aria-label="Current + 2" role="button" onClick={() => onHadlePage(meta.current_page + 2)}>{meta.current_page  + 2}</CPaginationItem> : null}
                <CPaginationItem role="button" aria-label="Next" onClick={() => onHadlePage(meta.current_page + 1)} disabled={meta.current_page === meta.last_page}>
                    <span aria-hidden="true" >&rsaquo;</span>
                </CPaginationItem>
                <CPaginationItem role="button" aria-label="Last page" onClick={() => onHadlePage(meta.last_page)} disabled={meta.current_page === meta.last_page}>
                    <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
            </CPagination>
            <div>
                <CDropdown>
                    <CDropdownToggle color="white" className="text-gray-700"><span className="text-gray-700">{meta.per_page}</span></CDropdownToggle>
                    <CDropdownMenu className="dropdown-custom py-0">
                        <CDropdownItem className="text-gray-700" onClick={() => onHandlePerPage(5)}>5</CDropdownItem>
                        <CDropdownItem className="text-gray-700" onClick={() => onHandlePerPage(10)}>10</CDropdownItem>
                        <CDropdownItem className="text-gray-700" onClick={() => onHandlePerPage(20)}>20</CDropdownItem>
                        <CDropdownItem className="text-gray-700" onClick={() => onHandlePerPage(50)}>50</CDropdownItem>
                        <CDropdownItem className="text-gray-700" onClick={() => onHandlePerPage(100)}>100</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
                <span className="text-gray-700">
                    Showing {(meta.total <= meta.per_page) ? meta.total : `${fromPage} - ${toPage}`} of {meta.total}
                </span>
            </div>
        </div>
        
    )
}

export default Pagination;