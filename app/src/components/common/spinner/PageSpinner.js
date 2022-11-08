import { CContainer, CSpinner } from "@coreui/react";

const PageSpinner = () =>{
  return (
    <div className="c-app c-default-layout flex-row" style={{ marginTop: '100px' }}>
      <CContainer className="d-flex justify-content-center">
          <CSpinner style={{ width: "1.5rem", height: "1.5rem", borderWidth: 3}} color="secondary" />
        </CContainer>
    </div>
  )
}

export default PageSpinner
