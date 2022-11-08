import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as companiesService from "../../../services/http-services/settings/companies";
import { 
    fetchCompaniesList,
    addCompany,
    editCompany,
    deleteCompany,
    refreshErrors,
    setCompaniesData } from './companiesSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getCompaniesListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setCompaniesData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(companiesService.getCompaniesWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setCompaniesData.type,
      payload: {
        companiesList: data.data,
        companiesMeta: data.meta
      },
    })
  }

  yield put({
    type: setCompaniesData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* companyAdd({ payload }) {
  const {reqBody} = payload;

  yield put({
    type: setCompaniesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(companiesService.addCompany, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/companies'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setCompaniesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setCompaniesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* companyEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setCompaniesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(companiesService.editCompany, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/companies'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setCompaniesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setCompaniesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* companyDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(companiesService.deleteCompany, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getCompaniesListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* companiesRefreshErrors() {
    yield put({
      type: setCompaniesData.type,
      payload: {
        errors: {},
      },
    })
  }
  

export default function* rootSaga() {
  yield all([
    takeEvery(refreshErrors.type, companiesRefreshErrors),
    takeEvery(fetchCompaniesList.type, getCompaniesListWithPagination),
    takeEvery(addCompany.type, companyAdd),
    takeEvery(editCompany.type, companyEdit),
    takeEvery(deleteCompany.type, companyDelete),
  ])
}
