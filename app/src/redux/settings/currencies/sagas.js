import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as currenciesService from "../../../services/http-services/settings/currencies";
import { 
    fetchCurrenciesList,
    addCurrency,
    editCurrency,
    deleteCurrency,
    refreshErrors,
    setCurrenciesData } from './currenciesSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getCurrenciesListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setCurrenciesData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(currenciesService.getCurrenciesWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setCurrenciesData.type,
      payload: {
        currenciesList: data.data,
        currenciesMeta: data.meta
      },
    })
  }

  yield put({
    type: setCurrenciesData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* currencyAdd({ payload }) {
  const {values} = payload;

  yield put({
    type: setCurrenciesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(currenciesService.addCurrency, values);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/currencies'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setCurrenciesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setCurrenciesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* currencyEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setCurrenciesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(currenciesService.editCurrency, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/currencies'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setCurrenciesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setCurrenciesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* currencyDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(currenciesService.deleteCurrency, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getCurrenciesListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* currenciesRefreshErrors() {
    yield put({
      type: setCurrenciesData.type,
      payload: {
        errors: {},
      },
    })
  }
  

export default function* rootSaga() {
  yield all([
    takeEvery(refreshErrors.type, currenciesRefreshErrors),
    takeEvery(fetchCurrenciesList.type, getCurrenciesListWithPagination),
    takeEvery(addCurrency.type, currencyAdd),
    takeEvery(editCurrency.type, currencyEdit),
    takeEvery(deleteCurrency.type, currencyDelete),
  ])
}
