
import React from 'react'
import { faGears, faGauge, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CNavGroup, CNavItem } from "@coreui/react";

import {
  ROLE_ADMINISTRATOR,
  ROLE_MANAGER,
  ROLE_DEVELOPER
} from "./constants/roles";

const _nav = [
  {
    component: CNavItem,
    roles: [],
    name: "label.dashboard",
    to: "/dashboard",
    icon: <FontAwesomeIcon className="nav-icon" icon={faGauge} />,
  },
  {
    component: CNavItem,
    roles: [ROLE_ADMINISTRATOR],
    name: "label.activity_tracking",
    to: "/activity-tracking",
    icon: <FontAwesomeIcon className="nav-icon" icon={faClockRotateLeft} />,
  },
  {
    component: CNavGroup,
    roles: [ROLE_ADMINISTRATOR],
    name: "label.settings",
    to: "/settings",
    icon: <FontAwesomeIcon className="nav-icon" icon={faGears} />,
    items: [
      {
        component: CNavItem,
        roles: [ROLE_ADMINISTRATOR],
        name: "label.general_settings",
        to: "/settings/general",
      },
      {
        component: CNavItem,
        roles: [ROLE_ADMINISTRATOR],
        name: "label.users",
        to: "/settings/users",
      },
      {
        component: CNavItem,
        roles: [ROLE_ADMINISTRATOR],
        name: "label.roles",
        to: "/settings/roles",
      }
    ]
  }
];

export default _nav;
