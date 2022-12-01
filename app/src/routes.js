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

//import Projects
const ProjectsList = React.lazy(() => import('./components/projects/ProjectsList'))
const AddProject = React.lazy(() => import('./components/projects/AddProject'))
const EditProject = React.lazy(() => import('./components/projects/EditProject'))

//import Issues
const IssuesList = React.lazy(() => import('./components/issues/IssuesList'))
const AddIssue = React.lazy(() => import('./components/issues/AddIssue'))
const EditIssue = React.lazy(() => import('./components/issues/EditIssue'))

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

  //projects
  { path: '/projects', name: 'Projects', element: ProjectsList, exact: true},
  { path: '/projects/add', name: 'Add project', element: AddProject, exact: true},
  { path: '/projects/edit/:id', name: 'Edit project', element: EditProject, exact: true},

  //projects
  { path: '/issues', name: 'Issues', element: IssuesList, exact: true},
  { path: '/issues/add', name: 'Add issue', element: AddIssue, exact: true},
  { path: '/issues/edit/:id', name: 'Edit issue', element: EditIssue, exact: true},
]

export default routes
