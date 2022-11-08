import React from "react";
import { returnDefaultMomentFormat, returnDateAndTimeFormat } from "../../../services/helpers/date-helper";

const TableRow = ({columns, data}) => {
    return (
        <tr>
            {columns.map((item, index) => {
                if (item.hasOwnProperty('render')) {
                    return (<td key={`${data.id}-${index}`}>{item.render(data)}</td>);
                }
                if (item.hasOwnProperty('date')) {
                    return (<td key={`${data.id}-${index}`}>{returnDefaultMomentFormat(data[item.key])}</td>);
                }
                if (item.hasOwnProperty('dateAndTime')) {
                    return (<td key={`${data.id}-${index}`}>{returnDateAndTimeFormat(data[item.dataKey])}</td>);
                }
                return <td key={`${data.id}-${index}`}>{data[item.key]}</td>;
            })}
        </tr>
    );
}

export default TableRow;