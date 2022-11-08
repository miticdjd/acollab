
import React from 'react'
import { faGears, faGauge, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CNavGroup, CNavItem } from "@coreui/react";

import {
  PERMISSION_SETTINGS_READ,
  PERMISSION_SETTINGS_WRITE,
  PERMISSION_USERS_READ,
  PERMISSION_USERS_WRITE,
  PERMISSION_ROLES_READ,
  PERMISSION_ROLES_WRITE,
  PERMISSION_AUDIT_READ
} from "./constants/permissions";

const _nav = [
  {
    component: CNavItem,
    permissions: [],
    name: "label.dashboard",
    to: "/dashboard",
    icon: <FontAwesomeIcon className="nav-icon" icon={faGauge} />,
  },
  {
    component: CNavItem,
    permissions: [PERMISSION_AUDIT_READ],
    name: "label.activity_tracking",
    to: "/activity-tracking",
    icon: <FontAwesomeIcon className="nav-icon" icon={faClockRotateLeft} />,
  },
  {
    component: CNavGroup,
    permissions: [
      PERMISSION_SETTINGS_READ,
      PERMISSION_SETTINGS_WRITE,
      PERMISSION_USERS_READ,
      PERMISSION_USERS_WRITE,
      PERMISSION_ROLES_READ,
      PERMISSION_ROLES_WRITE,
    ],
    name: "label.settings",
    to: "/settings",
    icon: <FontAwesomeIcon className="nav-icon" icon={faGears} />,
    items: [
      {
        component: CNavItem,
        permissions: [PERMISSION_SETTINGS_READ, PERMISSION_SETTINGS_WRITE],
        name: "label.general_settings",
        to: "/settings/general",
      },
      {
        component: CNavItem,
        permissions: [PERMISSION_USERS_READ, PERMISSION_USERS_WRITE],
        name: "label.users",
        to: "/settings/users",
      },
      {
        component: CNavItem,
        permissions: [PERMISSION_ROLES_READ, PERMISSION_ROLES_WRITE],
        name: "label.roles",
        to: "/settings/roles",
      },
      {
        component: CNavItem,
        permissions: [PERMISSION_SETTINGS_READ, PERMISSION_SETTINGS_WRITE],
        name: "label.currencies",
        to: "/settings/currencies",
      },
      {
        component: CNavItem,
        permissions: [PERMISSION_SETTINGS_READ, PERMISSION_SETTINGS_WRITE],
        name: "label.countries",
        to: "/settings/countries",
      },
      {
        component: CNavItem,
        permissions: [PERMISSION_SETTINGS_READ, PERMISSION_SETTINGS_WRITE],
        name: 'label.cities',
        to: '/settings/cities',
      },
      {
        component: CNavItem,
        permissions: [PERMISSION_SETTINGS_READ, PERMISSION_SETTINGS_WRITE],
        name: "label.company_types",
        to: "/settings/company-types",
      },
      {
        component: CNavItem,
        permissions: [PERMISSION_SETTINGS_READ, PERMISSION_SETTINGS_WRITE],
        name: 'label.companies',
        to: '/settings/companies',
      },
      {
        component: CNavItem,
        permissions: [PERMISSION_SETTINGS_READ, PERMISSION_SETTINGS_WRITE],
        name: "label.departments",
        to: "/settings/departments",
      },
      {
        component: CNavItem,
        permissions: [PERMISSION_SETTINGS_READ, PERMISSION_SETTINGS_WRITE],
        name: "label.teams",
        to: "/settings/teams",
      },
      {
        component: CNavItem,
        permissions: [PERMISSION_SETTINGS_READ, PERMISSION_SETTINGS_WRITE],
        name: "label.positions",
        to: "/settings/positions",
      },
      {
        component: CNavItem,
        permissions: [PERMISSION_SETTINGS_READ, PERMISSION_SETTINGS_WRITE],
        name: "label.languages",
        to: "/settings/languages",
      },
    ]
  }
];

export default _nav;
