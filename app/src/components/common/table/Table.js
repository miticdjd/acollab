import React from "react";
import TableRow from "./TableRow";
import TableHeadItem from "./TableHeadItem";
import TableContentLoader from "./TableContentLoader";

const Table = ({ theadData, tbodyData, customClass, rowsPerPage, loadingTableData, onChangeColumnSort }) => {
    return (
        <div className="position-relative table-responsive">
            {loadingTableData && <TableContentLoader rows={rowsPerPage}></TableContentLoader>}
            {!loadingTableData && 
            <table className={'table ' + customClass}>
                <thead>
                    <tr>
                        {theadData.map((headItem) => {
                            return <TableHeadItem key={headItem.key} item={headItem} onChangeColumnSort={onChangeColumnSort}/>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tbodyData.map((item) => {
                        return <TableRow key={item.id} data={item} columns={theadData}/>;
                    })}
                </tbody>
            </table>}
        </div>
    );
};

export default Table;