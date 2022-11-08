import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

const TableContentLoader = props => {
    const { rows = 10 } = props;
    const rowHeight = 50;

    return (
        <ContentLoader viewBox={`0 0 1500 ${rowHeight * rows}`} {...props}>
        {new Array(rows).fill(' ').map((el, index) => {
            const contentVerticalPosition = contentHeight =>
            rows > 1 ? contentHeight + rowHeight * index : contentHeight
            return (
            <Fragment key={index}>
                <rect
                x="4"
                y={`${contentVerticalPosition(20)}`}
                rx="4"
                ry="4"
                width="130"
                height="30"
                />
                <rect
                x="160"
                y={`${contentVerticalPosition(20)}`}
                rx="10"
                ry="4"
                width="1070"
                height="30"
                />
                <rect
                x="1263"
                y={`${contentVerticalPosition(20)}`}
                rx="10"
                ry="4"
                width="100"
                height="30"
                />
                <rect
                x="1380"
                y={`${contentVerticalPosition(20)}`}
                rx="10"
                ry="4"
                width="100"
                height="30"
                />
            </Fragment>
            )
        })}
    </ContentLoader>
  )
}

export default TableContentLoader;