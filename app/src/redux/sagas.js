import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import general from './settings/general/sagas';
import users from './settings/users/sagas';
import roles from './settings/roles/sagas';
import currencies from './settings/currencies/sagas';
import countries from './settings/countries/sagas';
import companyTypes from './settings/company-types/sagas';
import departments from './settings/departments/sagas';
import teams from './settings/teams/sagas';
import positions from './settings/positions/sagas';
import languages from './settings/languages/sagas';
import cities from './settings/cities/sagas';
import companies from './settings/companies/sagas';
import activities from './activity-tracking/sagas';
import userProfile from './userProfile/sagas';
import config from './config/sagas';

export default function* rootSaga() {
    yield all([
        auth(),
        general(),
        users(),
        roles(),
        currencies(),
        countries(),
        companyTypes(),
        departments(),
        teams(),
        positions(),
        languages(),
        cities(),
        companies(),
        activities(),
        userProfile(),
        config()
    ])
}