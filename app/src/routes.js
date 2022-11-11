import React from 'react';

//import Dashboard
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'))

//import Settings start
const GeneralSettings = React.lazy(() => import('./components/settings/general/GeneralSettings'))
//import Users
const UsersList = React.lazy(() => import('./components/settings/users/UsersList'))
const AddUser = React.lazy(() => import('./components/settings/users/AddUser'))
const EditUser = React.lazy(() => import('./components/settings/users/EditUser'))
//import Roles
const RolesList = React.lazy(() => import('./components/settings/roles/RolesList'))
const AddRole = React.lazy(() => import('./components/settings/roles/AddRole'))
const EditRole = React.lazy(() => import('./components/settings/roles/EditRole'))

//import Activity Tracking components
const ActivityTracking = React.lazy(() => import('./components/activity-tracking/ActivityTracking'))
const ActivityDetails = React.lazy(() => import('./components/activity-tracking/ActivityDetails'))

//import user profile
const UserProfile = React.lazy(() => import('./components/user-profile/UserProfile'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  //settings start
  { path: '/settings/general', name: 'General settings', element: GeneralSettings, exact: true },
  //users
  { path: '/settings/users', name: 'Users settings', element: UsersList, exact: true},
  { path: '/settings/users/add', name: 'Add user', element: AddUser, exact: true},
  { path: '/settings/users/edit/:id', name: 'Edit user', element: EditUser, exact: true},
  // roles
  { path: '/settings/roles', name: 'Roles settings', element: RolesList, exact: true},
  { path: '/settings/roles/add', name: 'Add role', element: AddRole, exact: true},
  { path: '/settings/roles/edit/:id', name: 'Edit role', element: EditRole, exact: true},
  //activity tracking
  { path: '/activity-tracking', name: 'Activity tracking', element: ActivityTracking, exact: true},
  { path: '/activity-tracking/:id', name: 'Activity details', element: ActivityDetails, exact: true},

  //user profile
  { path: '/profile', name: 'User profile', element: UserProfile },
]

export default routes
