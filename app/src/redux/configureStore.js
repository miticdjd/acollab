import { configureStore, combineReducers} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

import rootSaga from "./sagas";
import authReducer from "./auth/authSlice";
import generalReducer from "./settings/general/generalSlice";
import usersReducer from "./settings/users/usersSlice";
import rolesReducer from "./settings/roles/rolesSlice";
import userProfileReducer from "./userProfile/userProfileSlice";
import configReducer from "./config/configSlice";
import activitiesReducer from "./activity-tracking/activitiesSlice";
import projectsReducer from "./projects/projectsSlice";

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
  activities: activitiesReducer,
  projects: projectsReducer,
  userProfile: userProfileReducer,
  config: configReducer,
});

export const store = configureStore({
  reducer,
  middleware: [routerMiddleware, sagaMiddleware]
});
sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store);