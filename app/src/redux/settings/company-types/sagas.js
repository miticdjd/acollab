import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as companyTypesService from "../../../services/http-services/settings/company-types";
import { 
    fetchCompanyTypesList,
    addCompanyType,
    editCompanyType,
    deleteCompanyType,
    refreshErrors,
    setCompanyTypesData } from './companyTypesSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getCompanyTypesListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setCompanyTypesData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(companyTypesService.getCompanyTypesWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setCompanyTypesData.type,
      payload: {
        companyTypesList: data.data,
        companyTypesMeta: data.meta
      },
    })
  }

  yield put({
    type: setCompanyTypesData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* companyTypeAdd({ payload }) {
  const {values} = payload;

  yield put({
    type: setCompanyTypesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(companyTypesService.addCompanyType, values);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/company-types'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setCompanyTypesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setCompanyTypesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* companyTypeEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setCompanyTypesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(companyTypesService.editCompanyType, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/company-types'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setCompanyTypesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setCompanyTypesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* companyTypeDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(companyTypesService.deleteCompanyType, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getCompanyTypesListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* companyTypesRefreshErrors() {
    yield put({
      type: setCompanyTypesData.type,
      payload: {
        errors: {},
      },
    })
  }
  

export default function* rootSaga() {
  yield all([
    takeEvery(refreshErrors.type, companyTypesRefreshErrors),
    takeEvery(fetchCompanyTypesList.type, getCompanyTypesListWithPagination),
    takeEvery(addCompanyType.type, companyTypeAdd),
    takeEvery(editCompanyType.type, companyTypeEdit),
    takeEvery(deleteCompanyType.type, companyTypeDelete),
  ])
}
