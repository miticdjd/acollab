import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as rolesService from "../../../services/http-services/settings/roles";
import { 
    setRolesData,
    refreshErrors,
    fetchRolesList,
    addRole,
    editRole,
    deleteRole } from './rolesSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getRolesListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setRolesData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(rolesService.getRolesWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setRolesData.type,
      payload: {
        rolesList: data.data,
        rolesMeta: data.meta
      },
    })
  }

  yield put({
    type: setRolesData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* roleAdd({ payload }) {
  const { values } = payload;
  yield put({
    type: setRolesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(rolesService.addRole, values);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/roles'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setRolesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setRolesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* roleEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setRolesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(rolesService.editRole, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/roles'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setRolesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setRolesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* roleDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(rolesService.deleteRole, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getRolesListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* rolesRefreshErrors() {
    yield put({
        type: setRolesData.type,
        payload: {
        errors: {},
        },
    })
}

export default function* rootSaga() {
  yield all([
    takeEvery(refreshErrors.type, rolesRefreshErrors),
    takeEvery(fetchRolesList.type, getRolesListWithPagination),
    takeEvery(addRole.type, roleAdd),
    takeEvery(editRole.type, roleEdit),
    takeEvery(deleteRole.type, roleDelete),
  ])
}
