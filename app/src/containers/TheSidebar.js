import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import { TheSidebarNav } from "./TheSidebarNav";
import { Link } from "react-router-dom";

import logoWhite from "../assets/icons/logo_white.svg";
import { setConfig } from "../redux/config/configSlice";

// sidebar nav config
import navigation from "../_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const { sidebarUnfoldable } = useSelector((state) => state.config);
  const { sidebarShow } = useSelector((state) => state.config);

  return (
    <CSidebar
      position="fixed"
      unfoldable={sidebarUnfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setConfig({ sidebarShow: visible }));
      }}
    >
      <CSidebarBrand className="d-none d-md-flex">
        <Link to="/dashboard">
          <img className="sidebar-brand-full" alt="logo" src={logoWhite} height={20} />
        </Link>
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        <img className="sidebar-brand-narrow" alt="logo" src={logoWhite} height={12} />
      </CSidebarBrand>

      <CSidebarNav>
        <TheSidebarNav items={navigation} />
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch(setConfig({ sidebarUnfoldable: !sidebarUnfoldable }))
        }
      />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
