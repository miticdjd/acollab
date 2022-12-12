import React from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from "@coreui/react";
import { getIssueStatusColor, getAllStatuses } from "../../../services/helpers/badge";

const IssueModal = ({showModal, issue, onCancel, onConfirm}) => {

    if (issue) {
        return (
            <CModal
                visible={showModal}
                onClose={onCancel}
                size="xl"
            >
                <CModalHeader closeButton>
                    <CModalTitle>{issue.name}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p><strong>Projekat: </strong> {issue.project.name}</p>
                    <p><strong>Kod: </strong> {issue.code}</p>
                    <p><strong>Opis: </strong> {issue.description}</p>
                </CModalBody>
                <CModalFooter>
                <CDropdown>
                <CDropdownToggle
                  href={void 0}
                  color={getIssueStatusColor(issue.status)}
                  size="sm"
                >
                  {issue.status}
                </CDropdownToggle>
                <CDropdownMenu>
                  {getAllStatuses().map(status => (
                    <CDropdownItem
                      href={void 0}
                      key={status}
                      onClick={(e) => {
                        e.preventDefault();
                        onConfirm(issue, status);
                      }}
                    >
                      {status}
                    </CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
                <CButton
                    color="light"
                    className='is-btn-modal is-btn-modal--secondary'
                    onClick={onCancel}
                >
                    Zatvori
                </CButton>
                </CModalFooter>
            </CModal>
        );
    }

    return <></>;
}

export default IssueModal;