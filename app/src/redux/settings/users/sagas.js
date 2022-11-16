import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as usersService from "../../../services/http-services/settings/users";
import { 
    setUsersData,
    refreshErrors,
    fetchUsersList,
    fetchAllUsersList,
    fetchAllManagers,
    fetchAllDevelopers,
    addUser,
    editUser,
    deleteUser,
} from './usersSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getUsersListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setUsersData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(usersService.getUsersWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setUsersData.type,
      payload: {
        usersList: data.data,
        usersMeta: data.meta
      },
    })
  }

  yield put({
    type: setUsersData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getAllUsers() {
  yield put({
    type: setUsersData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(usersService.getUsers);

  if (response && response.status === 200) {
    yield put({
      type: setUsersData.type,
      payload: {
        allUsers: response.data.data,
      },
    })
  }

  yield put({
    type: setUsersData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getAllManagers() {
  yield put({
    type: setUsersData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(usersService.getManagers);

  if (response && response.status === 200) {
    yield put({
      type: setUsersData.type,
      payload: {
        allManagers: response.data.data,
      },
    })
  }

  yield put({
    type: setUsersData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getAllDevelopers() {
  yield put({
    type: setUsersData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(usersService.getDevelopers);

  if (response && response.status === 200) {
    yield put({
      type: setUsersData.type,
      payload: {
        allDevelopers: response.data.data,
      },
    })
  }

  yield put({
    type: setUsersData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* userAdd({ payload }) {
  const {reqBody} = payload;

  yield put({
    type: setUsersData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(usersService.addUser, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/users'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setUsersData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setUsersData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* userEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setUsersData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(usersService.editUser, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/users'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setUsersData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setUsersData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* userDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(usersService.deleteUser, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getUsersListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* usersRefreshErrors() {
    yield put({
        type: setUsersData.type,
        payload: {
        errors: {},
        },
    })
}

export default function* rootSaga() {
  yield all([
    takeEvery(fetchUsersList.type, getUsersListWithPagination),
    takeEvery(fetchAllUsersList.type, getAllUsers),
    takeEvery(fetchAllDevelopers.type, getAllDevelopers),
    takeEvery(fetchAllManagers.type, getAllManagers),
    takeEvery(addUser.type, userAdd),
    takeEvery(editUser.type, userEdit),
    takeEvery(deleteUser.type, userDelete),
    takeEvery(refreshErrors.type, usersRefreshErrors),
  ])
}
