import React, {useEffect, useState} from 'react'
import {CCol, CRow, CWidgetStatsB} from "@coreui/react";
import Spinner from '../common/spinner/Spinner';

import { fetchStatistics } from "../../services/http-services/settings/general";

const Dashboard = () => {

  const [loadingData, setLoadingData] = useState(false);
  const [innerState, setInnerState] = useState({
    projects: 0,
    issues: 0,
    sprints: 0
});

  const getStatistics = async () => {
    setLoadingData(true);
    const response = await fetchStatistics();
    if (response && response.status === 200) {
        setInnerState(prevState => {
            const updatedValues = {
                projects: response.data.data.projects,
                issues: response.data.data.issues,
                sprints: response.data.data.sprints,
            };
            return {...prevState, ...updatedValues};
        });
        setTimeout(() => setLoadingData(false), 400);
    }
  }

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <h1>Dobrodošli</h1>
        </CCol>
      </CRow>
      {loadingData && (
        <CRow className="text-center h-100">
          <CCol><Spinner /></CCol>
        </CRow>
      )}
      {
        !loadingData && (
          <CRow>
            <CCol sm="6" md="6" lg={4}>
            <CWidgetStatsB
              className="mb-3"
              color="primary"
              inverse
              progress={{ value: 100 }}
              text="Ukupan broj projekata"
              title="Projekta"
              value={innerState.projects}
            />
            </CCol>
            <CCol sm="6" md="6" lg={4}>
            <CWidgetStatsB
              className="mb-3"
              color="info"
              inverse
              progress={{ value: 100 }}
              text="Ukupan broj taskova"
              title="Taska"
              value={innerState.issues}
            />
            </CCol>
            <CCol sm="6" md="6" lg={4}>
            <CWidgetStatsB
              className="mb-3"
              color="warning"
              inverse
              progress={{ value: 100 }}
              text="Ukupan broj sprintova"
              title="Sprinta"
              value={innerState.sprints}
            />
            </CCol>
          </CRow>
        )
      }
    </>
  );
};

export default Dashboard
