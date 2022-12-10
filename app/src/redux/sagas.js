import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import general from './settings/general/sagas';
import users from './settings/users/sagas';
import roles from './settings/roles/sagas';
import activities from './activity-tracking/sagas';
import projects from './projects/sagas';
import issues from './issues/sagas';
import sprints from './sprints/sagas';
import userProfile from './userProfile/sagas';
import config from './config/sagas';

export default function* rootSaga() {
    yield all([
        auth(),
        general(),
        users(),
        roles(),
        activities(),
        projects(),
        issues(),
        sprints(),
        userProfile(),
        config()
    ])
}