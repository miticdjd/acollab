import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as countriesService from "../../../services/http-services/settings/countries";
import { 
    fetchCountriesList,
    fetchAllCountriesList,
    addCountry,
    editCountry,
    deleteCountry,
    refreshErrors,
    setCountriesData } from './countriesSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getCountriesListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setCountriesData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(countriesService.getCountriesWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setCountriesData.type,
      payload: {
        countriesList: data.data,
        countriesMeta: data.meta
      },
    })
  }

  yield put({
    type: setCountriesData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getAllCountries() {
  yield put({
    type: setCountriesData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(countriesService.getCountries);

  if (response && response.status === 200) {
    yield put({
      type: setCountriesData.type,
      payload: {
        allCountries: response.data.data,
      },
    })
  }

  yield put({
    type: setCountriesData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* countryAdd({ payload }) {
  const {values} = payload;

  yield put({
    type: setCountriesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(countriesService.addCountry, values);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/countries'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setCountriesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setCountriesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* countryEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setCountriesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(countriesService.editCountry, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/countries'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setCountriesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setCountriesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* countryDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(countriesService.deleteCountry, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getCountriesListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* countriesRefreshErrors() {
    yield put({
      type: setCountriesData.type,
      payload: {
        errors: {},
      },
    })
  }
  

export default function* rootSaga() {
  yield all([
    takeEvery(refreshErrors.type, countriesRefreshErrors),
    takeEvery(fetchAllCountriesList.type, getAllCountries),
    takeEvery(fetchCountriesList.type, getCountriesListWithPagination),
    takeEvery(addCountry.type, countryAdd),
    takeEvery(editCountry.type, countryEdit),
    takeEvery(deleteCountry.type, countryDelete),
  ])
}
