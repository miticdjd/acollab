import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CContainer,
  CHeaderToggler,
  CHeaderNav
} from "@coreui/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TheHeaderDropdown from "./TheHeaderDropdown";
import { setConfig } from "../redux/config/configSlice";

import logoBlack from "../assets/icons/logo_black.svg";
import { Link } from "react-router-dom";

const TheHeader = () => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state.config);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1 d-flex"
          onClick={() => dispatch(setConfig({ sidebarShow: !sidebarShow }))}
        >
          <FontAwesomeIcon className="header-bars" icon={faBars} />
        </CHeaderToggler>
        <Link className="ms-2 d-flex  d-md-none" to="/dashboard">
          <img src={logoBlack} height={16} alt="Logo" />
        </Link>
        <CHeaderNav className="ms-auto">
          <TheHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default TheHeader;
