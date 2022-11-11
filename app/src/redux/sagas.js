import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import general from './settings/general/sagas';
import users from './settings/users/sagas';
import roles from './settings/roles/sagas';
import activities from './activity-tracking/sagas';
import userProfile from './userProfile/sagas';
import config from './config/sagas';

export default function* rootSaga() {
    yield all([
        auth(),
        general(),
        users(),
        roles(),
        activities(),
        userProfile(),
        config()
    ])
}