import React from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";

const ConfirmModal = ({showModal, modalTitle, modalBodyText, cancelBtnText, confirmBtnText, onCancel, onConfirm}) => {
    return (
        <CModal
            visible={showModal}
            onClose={onCancel}
        >
            <CModalHeader closeButton>
                <CModalTitle>{modalTitle}</CModalTitle>
            </CModalHeader>
            <CModalBody>{modalBodyText}</CModalBody>
            <CModalFooter>
            <CButton
                color="danger"
                className="is-btn-modal me-2"
                onClick={onConfirm}
            >
                {confirmBtnText}
            </CButton>
            <CButton
                color="light"
                className='is-btn-modal is-btn-modal--secondary'
                onClick={onCancel}
            >
                {cancelBtnText}
            </CButton>
            </CModalFooter>
        </CModal>
    );
}

export default ConfirmModal;