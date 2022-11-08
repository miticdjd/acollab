import React from 'react';
import { faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableSortBtn = ({direction, itemKey, onChangeColumnSort}) => {
    const handleSort = (itemKey, sortDirection) => {
        onChangeColumnSort(itemKey, sortDirection);
    }

    return (
        <span className="d-inline-flex flex-column ms-2 mt-2 position-relative">
            <FontAwesomeIcon onClick={() => handleSort(itemKey, 'desc')} className={`table-sort-arrow up ${direction === "desc" ? 'active' : ''}`} icon={faSortUp}/>
            <FontAwesomeIcon onClick={() => handleSort(itemKey, 'asc')} className={`table-sort-arrow down ${direction === "asc" ? 'active' : ''}`} icon={faSortDown}/>
        </span> 
    ) 
}

export default TableSortBtn;

