
import React from 'react'
import { faGears, faGauge, faClockRotateLeft, faFolder, faListCheck } from '@fortawesome/free-solid-svg-icons';
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
    name: "Početna",
    to: "/dashboard",
    icon: <FontAwesomeIcon className="nav-icon" icon={faGauge} />,
  },
  {
    component: CNavItem,
    roles: [ROLE_ADMINISTRATOR, ROLE_MANAGER, ROLE_DEVELOPER],
    name: "Projekti",
    to: "/projects",
    icon: <FontAwesomeIcon className="nav-icon" icon={faFolder} />,
  },
  {
    component: CNavItem,
    roles: [ROLE_ADMINISTRATOR, ROLE_MANAGER, ROLE_DEVELOPER],
    name: "Taskovi",
    to: "/issues",
    icon: <FontAwesomeIcon className="nav-icon" icon={faListCheck} />,
  },
  {
    component: CNavItem,
    roles: [ROLE_ADMINISTRATOR],
    name: "Aktivnosti",
    to: "/activity-tracking",
    icon: <FontAwesomeIcon className="nav-icon" icon={faClockRotateLeft} />,
  },
  {
    component: CNavGroup,
    roles: [ROLE_ADMINISTRATOR],
    name: "Podešavanja",
    to: "/settings",
    icon: <FontAwesomeIcon className="nav-icon" icon={faGears} />,
    items: [
      {
        component: CNavItem,
        roles: [ROLE_ADMINISTRATOR],
        name: "Generalna podešavanja",
        to: "/settings/general",
      },
      {
        component: CNavItem,
        roles: [ROLE_ADMINISTRATOR],
        name: "Upravljanje korisnicima",
        to: "/settings/users",
      },
      {
        component: CNavItem,
        roles: [ROLE_ADMINISTRATOR],
        name: "Upravljanje rolama",
        to: "/settings/roles",
      }
    ]
  }
];

export default _nav;
