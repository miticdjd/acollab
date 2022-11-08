import React from 'react'
// eslint-disable-next-line
import i18next from './i18n';

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
//import Currencies
const CurrenciesList = React.lazy(() => import('./components/settings/currencies/CurrenciesList'))
const AddCurrency = React.lazy(() => import('./components/settings/currencies/AddCurrency'))
const EditCurrency = React.lazy(() => import('./components/settings/currencies/EditCurrency'))
//import Countries
const CountriesList = React.lazy(() => import('./components/settings/countries/CountriesList'))
const AddCountry = React.lazy(() => import('./components/settings/countries/AddCountry'))
const EditCountry = React.lazy(() => import('./components/settings/countries/EditCountry'))
//import Company types
const CompanyTypesList = React.lazy(() => import('./components/settings/company-types/CompanyTypesList'))
const AddCompanyType = React.lazy(() => import('./components/settings/company-types/AddCompanyType'))
const EditCompanyType = React.lazy(() => import('./components/settings/company-types/EditCompanyType'))
//import Departments
const DepartmentsList = React.lazy(() => import('./components/settings/departments/DepartmentsList'))
const AddDepartment = React.lazy(() => import('./components/settings/departments/AddDepartment'))
const EditDepartment = React.lazy(() => import('./components/settings/departments/EditDepartment'))
//import Teams
const TeamsList = React.lazy(() => import('./components/settings/teams/TeamsList'))
const AddTeam = React.lazy(() => import('./components/settings/teams/AddTeam'))
const EditTeam = React.lazy(() => import('./components/settings/teams/EditTeam'))
//import Positions
const PositionsList = React.lazy(() => import('./components/settings/positions/PositionsList'))
const AddPosition = React.lazy(() => import('./components/settings/positions/AddPosition'))
const EditPosition = React.lazy(() => import('./components/settings/positions/EditPosition'))
//import Cities
const CitiesList = React.lazy(() => import('./components/settings/cities/CitiesList'))
const AddCity = React.lazy(() => import('./components/settings/cities/AddCity'))
const EditCity = React.lazy(() => import('./components/settings/cities/EditCity'))
//import Companies
const CompaniesList = React.lazy(() => import('./components/settings/companies/CompaniesList'))
const AddCompany = React.lazy(() => import('./components/settings/companies/AddCompany'))
const EditCompany = React.lazy(() => import('./components/settings/companies/EditCompany'))
//import Languages
const LanguagesList = React.lazy(() => import('./components/settings/languages/LanguegesList'))
const AddLangeage= React.lazy(() => import('./components/settings/languages/AddLanguege'))
const EditLanguage = React.lazy(() => import('./components/settings/languages/EditLanguage'))
//import Settings end

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
  //currencies
  { path: '/settings/currencies', name: 'Currencies settings', element: CurrenciesList, exact: true},
  { path: '/settings/currencies/add', name: 'Add currency', element: AddCurrency, exact: true},
  { path: '/settings/currencies/edit/:id', name: 'Edit currency', element: EditCurrency, exact: true},
  //countries
  { path: '/settings/countries', name: 'Countries settings', element: CountriesList, exact: true},
  { path: '/settings/countries/add', name: 'Add country', element: AddCountry, exact: true},
  { path: '/settings/countries/edit/:id', name: 'Edit country', element: EditCountry, exact: true},
  //companyTypes
  { path: '/settings/company-types', name: 'Company types settings', element: CompanyTypesList, exact: true},
  { path: '/settings/company-types/add', name: 'Add company type', element: AddCompanyType, exact: true},
  { path: '/settings/company-types/edit/:id', name: 'Edit company type', element: EditCompanyType, exact: true},
  //departments
  { path: '/settings/departments', name: 'Departments settings', element: DepartmentsList, exact: true},
  { path: '/settings/departments/add', name: 'Add department', element: AddDepartment, exact: true},
  { path: '/settings/departments/edit/:id', name: 'Edit department', element: EditDepartment, exact: true},
  //teams
  { path: '/settings/teams', name: 'Teams settings', element: TeamsList, exact: true},
  { path: '/settings/teams/add', name: 'Add team', element: AddTeam, exact: true},
  { path: '/settings/teams/edit/:id', name: 'Edit team', element: EditTeam, exact: true},
  //positions
  { path: '/settings/positions', name: 'Positions settings', element: PositionsList, exact: true},
  { path: '/settings/positions/add', name: 'Add position', element: AddPosition, exact: true},
  { path: '/settings/positions/edit/:id', name: 'Edit position', element: EditPosition, exact: true},
  //cities
  { path: '/settings/cities', name: 'Cities settings', element: CitiesList, exact: true},
  { path: '/settings/cities/add', name: 'Add city', element: AddCity, exact: true},
  { path: '/settings/cities/edit/:id', name: 'Edit city', element: EditCity, exact: true},
  //companies
  { path: '/settings/companies', name: 'Companies settings', element: CompaniesList, exact: true},
  { path: '/settings/companies/add', name: 'Add company', element: AddCompany, exact: true},
  { path: '/settings/companies/edit/:id', name: 'Edit company', element: EditCompany, exact: true},
  //languages
  { path: '/settings/languages', name: 'Languages settings', element: LanguagesList, exact: true},
  { path: '/settings/languages/add', name: 'Add language', element: AddLangeage, exact: true},
  { path: '/settings/languages/edit/:id', name: 'Edit language', element: EditLanguage, exact: true},
  //settings end 

  //activity tracking
  { path: '/activity-tracking', name: 'Activity tracking', element: ActivityTracking, exact: true},
  { path: '/activity-tracking/:id', name: 'Activity details', element: ActivityDetails, exact: true},

  //user profile
  { path: '/profile', name: 'User profile', element: UserProfile },
]

export default routes
