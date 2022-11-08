import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as departmentsService from "../../../services/http-services/settings/departments";
import { 
    fetchDepartmentsList,
    fetchAllDepartmentsList,
    addDepartment,
    editDepartment,
    deleteDepartment,
    refreshErrors,
    setDepartmentsData } from './departmentsSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getDepartmentsListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setDepartmentsData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(departmentsService.getDepartmentsWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setDepartmentsData.type,
      payload: {
        departmentsList: data.data,
        departmentsMeta: data.meta
      },
    })
  }

  yield put({
    type: setDepartmentsData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getAllDepartments() {
  yield put({
    type: setDepartmentsData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(departmentsService.getDepartments);

  if (response && response.status === 200) {
    yield put({
      type: setDepartmentsData.type,
      payload: {
        allDepartments: response.data.data,
      },
    })
  }

  yield put({
    type: setDepartmentsData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* departmentAdd({ payload }) {
  const {values} = payload;

  yield put({
    type: setDepartmentsData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(departmentsService.addDepartment, values);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/departments'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setDepartmentsData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setDepartmentsData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* departmentEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setDepartmentsData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(departmentsService.editDepartment, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/departments'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setDepartmentsData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setDepartmentsData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* departmentDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(departmentsService.deleteDepartment, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getDepartmentsListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* departmentsRefreshErrors() {
    yield put({
      type: setDepartmentsData.type,
      payload: {
        errors: {},
      },
    })
  }
  

export default function* rootSaga() {
  yield all([
    takeEvery(refreshErrors.type, departmentsRefreshErrors),
    takeEvery(fetchDepartmentsList.type, getDepartmentsListWithPagination),
    takeEvery(fetchAllDepartmentsList.type, getAllDepartments),
    takeEvery(addDepartment.type, departmentAdd),
    takeEvery(editDepartment.type, departmentEdit),
    takeEvery(deleteDepartment.type, departmentDelete),
  ])
}

