import { configureStore, combineReducers} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

import rootSaga from "./sagas";
import authReducer from "./auth/authSlice";
import generalReducer from "./settings/general/generalSlice";
import usersReducer from "./settings/users/usersSlice";
import rolesReducer from "./settings/roles/rolesSlice";
import currenciesReducer from "./settings/currencies/currenciesSlice";
import countriesReducer from "./settings/countries/countriesSlice";
import companyTypesReducer from "./settings/company-types/companyTypesSlice";
import departmentsReducer from "./settings/departments/departmentsSlice";
import teamsReducer from "./settings/teams/teamsSlice";
import positionsReducer from "./settings/positions/positionsSlice";
import languagesReducer from "./settings/languages/languagesSlice";
import citiesReducer from "./settings/cities/citiesSlice";
import companiesReducer from "./settings/companies/companiesSlice";
import userProfileReducer from "./userProfile/userProfileSlice";
import configReducer from "./config/configSlice";
import activitiesReducer from "./activity-tracking/activitiesSlice";

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  general: generalReducer,
  users: usersReducer,
  roles: rolesReducer,
  currencies: currenciesReducer,
  countries: countriesReducer,
  companyTypes: companyTypesReducer,
  departments: departmentsReducer,
  teams: teamsReducer,
  positions: positionsReducer,
  languages: languagesReducer,
  cities: citiesReducer,
  companies: companiesReducer,
  activities: activitiesReducer,
  userProfile: userProfileReducer,
  config: configReducer,
});

export const store = configureStore({
  reducer,
  middleware: [routerMiddleware, sagaMiddleware]
});
sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store);