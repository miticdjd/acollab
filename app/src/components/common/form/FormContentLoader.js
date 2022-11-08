import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

const FormContentLoader = props => {
    const { rows = 5 } = props;
    const rowHeight = 60;

    return (
        <ContentLoader viewBox={`0 0 1500 ${rowHeight * rows}`} {...props}>
        {new Array(rows).fill(' ').map((el, index) => {
            const contentVerticalPosition = contentHeight =>
            rows > 1 ? contentHeight + rowHeight * index : contentHeight
            return (
            <Fragment key={index}>
                <rect
                x="25"
                y={`${contentVerticalPosition(20)}`}
                rx="4"
                ry="4"
                width="200"
                height="20"
                />
                <rect
                x="350"
                y={`${contentVerticalPosition(10)}`}
                rx="10"
                ry="4"
                width="1125"
                height="40"
                />
            </Fragment>
            )
        })}
    </ContentLoader>
  )
}

export default FormContentLoader;