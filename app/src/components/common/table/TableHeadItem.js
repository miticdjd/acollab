import React from "react";
import TableSortBtn from './TableSortBtn';

const TabeleHeadItem = ({ item, onChangeColumnSort }) => {
    return (
        <th title={item.title} className={item.key === 'options' ? 'options-column' : ''}>
            {item.title} 
            {item.hasOwnProperty('sort') && <TableSortBtn direction={item.sort} itemKey={item.key} onChangeColumnSort={onChangeColumnSort}></TableSortBtn>}
        </th>
    );
}

export default React.memo(TabeleHeadItem);